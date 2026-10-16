import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";
import { supabase } from "../lib/supabase.ts";
import { processReferralPayouts } from "../utils/processReferralPayouts.ts";

const router = new Router({ prefix: "/referral-payouts" });
const key = Deno.env.get("STRIPE_SECRET_KEY");
const stripe = key ? new Stripe(key) : null;
const site = (Deno.env.get("PUBLIC_APP_URL") ?? "https://www.saveonlease.com").replace(/\/$/, "");

async function partnerFor(userId: string) {
  const { data, error } = await supabase.from("referral_partners")
    .select("code,user_id,contact_email,contact_name,status,stripe_account_id,stripe_platform_account_id")
    .eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data;
}

async function payoutStatus(accountId: string) {
  if (!stripe) throw new Error("Stripe is not configured");
  const account = await stripe.v2.core.accounts.retrieve(accountId, { include: ["configuration.recipient"] });
  const balance = account.configuration?.recipient?.capabilities?.stripe_balance;
  return {
    transfersReady: balance?.stripe_transfers?.status === "active",
    payoutsReady: balance?.payouts?.status === "active",
    transferStatus: balance?.stripe_transfers?.status ?? "pending",
    payoutStatus: balance?.payouts?.status ?? "pending",
  };
}

router.get("/status", async (ctx) => {
  const userId = ctx.request.url.searchParams.get("userId") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(userId)) { ctx.response.status = 400; return; }
  try {
    const partner = await partnerFor(userId);
    if (!partner || partner.status !== "active") { ctx.response.status = 404; return; }
    if (!stripe || Deno.env.get("REFERRAL_PAYOUTS_ENABLED") !== "true") { ctx.response.body = { configured: false, state: "unavailable" }; return; }
    if (!partner.stripe_account_id) { ctx.response.body = { configured: true, state: "needs_setup" }; return; }
    const platform = await stripe.accounts.retrieve();
    if (partner.stripe_platform_account_id !== platform.id) {
      ctx.response.status = 503;
      ctx.response.body = { error: "Payment account mismatch. Payouts are paused." };
      return;
    }
    const status = await payoutStatus(partner.stripe_account_id);
    ctx.response.body = { configured: true, state: status.transfersReady && status.payoutsReady ? "ready" : "needs_details", ...status };
  } catch (error) {
    console.error("Referral payout status failed", error);
    ctx.response.status = 503;
    ctx.response.body = { error: "Could not check payout setup." };
  }
});

router.post("/onboard", async (ctx) => {
  const body = await ctx.request.body({ type: "json" }).value;
  const userId = typeof body?.userId === "string" ? body.userId : "";
  if (!/^[0-9a-f-]{36}$/i.test(userId)) { ctx.response.status = 400; return; }
  if (!stripe || Deno.env.get("REFERRAL_PAYOUTS_ENABLED") !== "true") { ctx.response.status = 503; ctx.response.body = { error: "Stripe payouts are not configured yet." }; return; }
  try {
    const partner = await partnerFor(userId);
    if (!partner || partner.status !== "active") { ctx.response.status = 404; return; }
    const platform = await stripe.accounts.retrieve();
    let accountId = partner.stripe_account_id as string | null;
    if (accountId && partner.stripe_platform_account_id !== platform.id) throw new Error("Payment account mismatch");
    if (!accountId) {
      const account = await stripe.v2.core.accounts.create({
        contact_email: partner.contact_email,
        display_name: partner.contact_name,
        dashboard: "express",
        defaults: { responsibilities: { fees_collector: "application", losses_collector: "application" } },
        configuration: { recipient: { capabilities: { stripe_balance: { stripe_transfers: { requested: true } } } } },
        metadata: { referral_code: partner.code, saveonlease_user_id: userId },
      }, { idempotencyKey: `saveonlease-referral-account-${userId}` });
      accountId = account.id;
      const { data, error } = await supabase.from("referral_partners")
        .update({ stripe_account_id: accountId, stripe_platform_account_id: platform.id })
        .eq("code", partner.code).eq("user_id", userId).is("stripe_account_id", null)
        .select("code").maybeSingle();
      if (error || !data) throw error ?? new Error("Could not save payout account");
    }
    const link = await stripe.v2.core.accountLinks.create({
      account: accountId,
      use_case: {
        type: "account_onboarding",
        account_onboarding: {
          configurations: ["recipient"],
          refresh_url: `${site}/marketing/referral?onboarding=refresh#create-link`,
          return_url: `${site}/marketing/referral?onboarding=return#create-link`,
        },
      },
    });
    ctx.response.body = { url: link.url };
  } catch (error) {
    console.error("Referral payout onboarding failed", error);
    ctx.response.status = 503;
    ctx.response.body = { error: "Could not open Stripe payout setup. Please try again." };
  }
});

router.post("/run", async (ctx) => {
  if (!stripe || Deno.env.get("REFERRAL_PAYOUTS_ENABLED") !== "true") {
    ctx.response.status = 503;
    ctx.response.body = { error: "Automatic referral payouts are not enabled." };
    return;
  }
  try {
    const result = await processReferralPayouts(stripe);
    ctx.response.status = result.failed ? 500 : 200;
    ctx.response.body = result;
  } catch (error) {
    console.error("Referral payout run failed", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Referral payout run failed." };
  }
});

export default router;
