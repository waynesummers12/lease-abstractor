import Stripe from "npm:stripe@20.2.0";
import { supabase } from "../lib/supabase.ts";
import { commissionCents, ownerPayoutCents } from "./payoutMath.ts";

type PayoutJob = {
  payout_date: string;
  amount_cents: number;
  stripe_payout_id: string | null;
};

async function unpaidCommissionCents() {
  let reserve = 0;
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await supabase.from("referrals")
      .select("commission")
      .or("paid.is.false,paid.is.null")
      .order("id")
      .range(offset, offset + 999);
    if (error) throw error;
    for (const referral of data ?? []) {
      reserve += commissionCents(Number(referral.commission));
      if (!Number.isSafeInteger(reserve)) throw new Error("Referral reserve exceeds safe range");
    }
    if (!data || data.length < 1000) return reserve;
  }
}

/** Send the platform's available USD balance to its bank, less every unpaid commission. */
export async function processOwnerPayout(stripe: Stripe) {
  const settings = await stripe.balanceSettings.retrieve();
  if (settings.payments.payouts?.schedule?.interval !== "manual") {
    throw new Error("Owner payout requires a manual Stripe payout schedule");
  }

  const date = new Date().toISOString().slice(0, 10);
  const { data: existing, error: existingError } = await supabase.from("referral_owner_payouts")
    .select("payout_date,amount_cents,stripe_payout_id")
    .eq("payout_date", date).maybeSingle();
  if (existingError) throw existingError;
  if (existing?.stripe_payout_id) return { state: "already_sent", amountCents: existing.amount_cents };

  let job = existing as PayoutJob | null;
  if (!job) {
    const reserve = await unpaidCommissionCents();
    const balance = await stripe.balance.retrieve();
    const available = balance.available.find((item) => item.currency === "usd")?.amount ?? 0;
    const amount = ownerPayoutCents(available, reserve);
    if (!amount) return { state: "reserved", amountCents: 0, reserveCents: reserve };
    const { data: created, error: createError } = await supabase.from("referral_owner_payouts")
      .insert({ payout_date: date, amount_cents: amount, commission_reserve_cents: reserve })
      .select("payout_date,amount_cents,stripe_payout_id").maybeSingle();
    if (createError && createError.code !== "23505") throw createError;
    if (created) job = created as PayoutJob;
    else {
      const { data: concurrent, error } = await supabase.from("referral_owner_payouts")
        .select("payout_date,amount_cents,stripe_payout_id")
        .eq("payout_date", date).single();
      if (error) throw error;
      job = concurrent as PayoutJob;
    }
    if (job.stripe_payout_id) return { state: "already_sent", amountCents: job.amount_cents };
  }

  try {
    const payout = await stripe.payouts.create({
      amount: job.amount_cents,
      currency: "usd",
      description: "SaveOnLease daily proceeds after referral reserve",
      metadata: { source: "saveonlease_owner_sweep", payout_date: date },
    }, { idempotencyKey: `sol-owner-payout-${date}` });
    const { error } = await supabase.from("referral_owner_payouts")
      .update({ stripe_payout_id: payout.id, completed_at: new Date().toISOString(), error: null })
      .eq("payout_date", date);
    if (error) throw error;
    return { state: "sent", amountCents: job.amount_cents };
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Unknown owner payout error";
    await supabase.from("referral_owner_payouts")
      .update({ error: message.slice(0, 500) }).eq("payout_date", date);
    throw cause;
  }
}
