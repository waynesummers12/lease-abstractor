import Stripe from "npm:stripe@20.2.0";
import { supabase } from "../lib/supabase.ts";

type Referral = {
  id: string;
  audit_id: string;
  referrer_code: string;
  commission: number;
  paid: boolean | null;
  stripe_transfer_id: string | null;
  transfer_amount_cents: number | null;
  transfer_reversed_cents: number;
};

const HOLD_DAYS = 30;
const groupFor = (id: string) => `sol_referral_${id.replaceAll("-", "")}`;

async function sourceCharge(stripe: Stripe, referral: Referral) {
  const { data: audit, error } = await supabase.from("lease_audits")
    .select("stripe_session_id,paid_at")
    .eq("id", referral.audit_id).maybeSingle();
  if (error || !audit?.stripe_session_id || !audit.paid_at) throw error ?? new Error("Paid audit reference unavailable");
  const session = await stripe.checkout.sessions.retrieve(audit.stripe_session_id);
  if (session.payment_status !== "paid" || session.metadata?.auditId !== referral.audit_id ||
      session.metadata?.referrer_code !== referral.referrer_code) {
    throw new Error("Checkout attribution does not match the referral");
  }
  const paymentIntentId = typeof session.payment_intent === "string"
    ? session.payment_intent : session.payment_intent?.id;
  if (!paymentIntentId) throw new Error("Checkout payment has no PaymentIntent");
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId, { expand: ["latest_charge"] });
  const chargeId = typeof intent.latest_charge === "string" ? intent.latest_charge : intent.latest_charge?.id;
  if (!chargeId) throw new Error("Checkout payment has no charge");
  const charge = await stripe.charges.retrieve(chargeId);
  if (charge.currency !== "usd" || !charge.paid) throw new Error("Referral charge is not a paid USD charge");
  return { charge, paidAt: new Date(audit.paid_at).getTime() };
}

async function reverseRefund(stripe: Stripe, referral: Referral) {
  if (!referral.stripe_transfer_id || !referral.transfer_amount_cents) return false;
  const { charge } = await sourceCharge(stripe, referral);
  const retained = charge.disputed ? 0 : Math.max(0, charge.amount - charge.amount_refunded);
  const desired = Math.min(referral.transfer_amount_cents, Math.round(retained * 0.2));
  const reversals = await stripe.transfers.listReversals(referral.stripe_transfer_id, { limit: 100 });
  if (reversals.has_more) throw new Error("Too many transfer reversals to reconcile safely");
  const alreadyReversed = reversals.data.reduce((sum, reversal) => sum + reversal.amount, 0);
  const difference = Math.max(0, referral.transfer_amount_cents - desired - alreadyReversed);
  if (difference > 0) {
    await stripe.transfers.createReversal(referral.stripe_transfer_id, { amount: difference },
      { idempotencyKey: `sol-referral-reversal-${referral.id}-${desired}` });
  }
  if (difference > 0 || alreadyReversed !== referral.transfer_reversed_cents) {
    const { error } = await supabase.from("referrals")
      .update({ transfer_reversed_cents: alreadyReversed + difference })
      .eq("id", referral.id);
    if (error) throw error;
    return true;
  }
  return false;
}

async function transferReferral(stripe: Stripe, referral: Referral, platformId: string) {
  const { data: partner, error: partnerError } = await supabase.from("referral_partners")
    .select("status,stripe_account_id,stripe_platform_account_id")
    .eq("code", referral.referrer_code).maybeSingle();
  if (partnerError) throw partnerError;
  if (!partner || partner.status !== "active" || !partner.stripe_account_id) return false;
  if (partner.stripe_platform_account_id !== platformId) throw new Error("Connected account belongs to a different Stripe platform");
  const account = await stripe.v2.core.accounts.retrieve(partner.stripe_account_id, { include: ["configuration.recipient"] });
  const balance = account.configuration?.recipient?.capabilities?.stripe_balance;
  if (balance?.stripe_transfers?.status !== "active" || balance?.payouts?.status !== "active") return false;

  const { charge, paidAt } = await sourceCharge(stripe, referral);
  if (Date.now() - paidAt < HOLD_DAYS * 24 * 60 * 60 * 1000) return false;
  if (charge.disputed || charge.amount_refunded >= charge.amount) return false;
  const retained = charge.amount - charge.amount_refunded;
  const recorded = Math.round(Number(referral.commission) * 100);
  const amount = Math.min(recorded, Math.round(retained * 0.2));
  if (!Number.isSafeInteger(amount) || amount <= 0) return false;

  const group = groupFor(referral.id);
  const prior = await stripe.transfers.list({ transfer_group: group, limit: 2 });
  if (prior.data.length > 1) throw new Error("Multiple Stripe transfers found for one referral");
  const transfer = prior.data[0] ?? await stripe.transfers.create({
    amount, currency: "usd", destination: partner.stripe_account_id,
    source_transaction: charge.id, transfer_group: group,
    description: "SaveOnLease referral commission",
    metadata: { referral_id: referral.id, referral_code: referral.referrer_code },
  }, { idempotencyKey: `sol-referral-transfer-${referral.id}` });
  if (transfer.destination !== partner.stripe_account_id || transfer.source_transaction !== charge.id) {
    throw new Error("Stripe transfer reconciliation mismatch");
  }
  const { error } = await supabase.from("referrals").update({
    stripe_transfer_id: transfer.id, transfer_amount_cents: transfer.amount,
    payout_paid_at: new Date().toISOString(), paid: true, payout_error: null,
  }).eq("id", referral.id);
  if (error) throw error;
  return true;
}

export async function processReferralPayouts(stripe: Stripe) {
  const platform = await stripe.accounts.retrieve();
  const cutoff = new Date(Date.now() - HOLD_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const { data: unpaid, error: unpaidError } = await supabase.from("referrals")
    .select("id,audit_id,referrer_code,commission,paid,stripe_transfer_id,transfer_amount_cents,transfer_reversed_cents")
    .is("stripe_transfer_id", null).eq("paid", false).lt("created_at", cutoff).order("created_at").limit(500);
  if (unpaidError) throw unpaidError;
  let sent = 0;
  let reversed = 0;
  let failed = 0;
  for (const referral of (unpaid ?? []) as Referral[]) {
    try {
      if (await transferReferral(stripe, referral, platform.id)) sent++;
    } catch (cause) {
      failed++;
      const message = cause instanceof Error ? cause.message : "Unknown payout error";
      console.error("Referral transfer failed", referral.id, message);
      await supabase.from("referrals").update({ payout_error: message.slice(0, 500) }).eq("id", referral.id);
    }
  }
  for (let offset = 0; ; offset += 500) {
    const { data: transferred, error: transferredError } = await supabase.from("referrals")
      .select("id,audit_id,referrer_code,commission,paid,stripe_transfer_id,transfer_amount_cents,transfer_reversed_cents")
      .not("stripe_transfer_id", "is", null).order("created_at").order("id").range(offset, offset + 499);
    if (transferredError) throw transferredError;
    for (const referral of (transferred ?? []) as Referral[]) {
      try {
        if (!referral.paid) {
          const { error } = await supabase.from("referrals").update({ paid: true, payout_paid_at: new Date().toISOString(), payout_error: null }).eq("id", referral.id);
          if (error) throw error;
        }
        if (await reverseRefund(stripe, referral)) reversed++;
      } catch (cause) {
        failed++;
        const message = cause instanceof Error ? cause.message : "Unknown reversal error";
        console.error("Referral reversal failed", referral.id, message);
        await supabase.from("referrals").update({ payout_error: message.slice(0, 500) }).eq("id", referral.id);
      }
    }
    if (!transferred || transferred.length < 500) break;
  }
  return { sent, reversed, failed };
}
