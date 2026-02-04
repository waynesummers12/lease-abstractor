// worker/routes/checkout.ts
/**
 * WORKER ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Runtime:
 * - Deno + Oak
 *
 * Responsibilities:
 * - Fetch completed audit
 * - Generate signed PDF URL
 *
 * This route is called ONLY by the web API proxy.
 */
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";
import { supabase } from "../lib/supabase.ts";

const router = new Router({ prefix: "/checkout" });

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
const STRIPE_PRICE_STARTER = Deno.env.get("STRIPE_PRICE_STARTER");
const BASE_URL = Deno.env.get("BASE_URL") ?? "http://localhost:3000";

if (!STRIPE_SECRET_KEY) {
  console.error("❌ Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-12-15.clover",
});

router.post("/create", async (ctx) => {
  console.log("🔥 /checkout/create HIT");

  /* ---------- PARSE BODY (Oak v12 SAFE) ---------- */
  const bodyValue = await ctx.request.body({ type: "json" }).value;

  if (!bodyValue || typeof bodyValue !== "object") {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid JSON body" };
    return;
  }

  const auditId = (bodyValue as { auditId?: string }).auditId;

  if (!auditId || typeof auditId !== "string") {
    ctx.response.status = 400;
    ctx.response.body = { error: "auditId is required" };
    return;
  }

  console.log("🧾 auditId:", auditId);
  console.log("💳 Stripe key present:", Boolean(STRIPE_SECRET_KEY));
  console.log("💵 Price ID:", STRIPE_PRICE_STARTER);

  if (!STRIPE_SECRET_KEY || !STRIPE_PRICE_STARTER) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Stripe not configured" };
    return;
  }

  /* ---------- ENSURE lease_audits ROW EXISTS ---------- */
  const { data: existingAudit, error: selectError } = await supabase
    .from("lease_audits")
    .select("id")
    .eq("id", auditId)
    .maybeSingle();

  if (selectError) {
    console.error("❌ Supabase select error:", selectError);
    ctx.response.status = 500;
    ctx.response.body = { error: "Database error" };
    return;
  }

  if (!existingAudit) {
    const { error: insertError } = await supabase
      .from("lease_audits")
      .insert({
        id: auditId,
        status: "unpaid",
        amount_paid: 4999,
        currency: "usd",
      });

    if (insertError) {
      console.error("❌ Supabase insert error:", insertError);
      ctx.response.status = 500;
      ctx.response.body = { error: "Failed to create audit record" };
      return;
    }

    console.log("🧾 lease_audits row created:", auditId);
  }

  /* ---------- CREATE STRIPE CHECKOUT SESSION ---------- */
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: STRIPE_PRICE_STARTER,
          quantity: 1,
        },
      ],
      success_url: `${BASE_URL}/success?auditId=${auditId}`,
      cancel_url: `${BASE_URL}/cancel`,
      metadata: {
        auditId, // 🔒 SINGLE SOURCE OF TRUTH
      },
    });

    console.log("🧪 ENV CHECK", {
  STRIPE_PRICE_STARTER,
  STRIPE_SECRET_KEY_PREFIX: STRIPE_SECRET_KEY?.slice(0, 10),
});

console.log(
  "🔐 Stripe key prefix:",
  STRIPE_SECRET_KEY?.slice(0, 8)
);
    console.log("✅ Stripe session created:", session.id);

    ctx.response.status = 200;
    ctx.response.body = { url: session.url };
  } catch (err) {
    console.error("❌ Stripe error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Checkout session failed" };
  }
});

export default router;