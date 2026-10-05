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
import { fulfillPaidCheckout } from "../utils/fulfillPaidCheckout.ts";

const router = new Router({ prefix: "/checkout" });

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
const STRIPE_PRICE_STARTER = Deno.env.get("STRIPE_PRICE_STARTER");

// ✅ Canonical public app URL (NO localhost in prod)
const PUBLIC_APP_URL =
  Deno.env.get("PUBLIC_APP_URL") ?? "http://localhost:3000";

if (!STRIPE_SECRET_KEY) {
  console.error("❌ Missing STRIPE_SECRET_KEY");
}

if (!STRIPE_PRICE_STARTER) {
  console.error("❌ Missing STRIPE_PRICE_STARTER");
}

const stripe = new Stripe(STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-12-15.clover",
});

router.post("/create", async (ctx) => {
  console.log("🔥 /checkout/create HIT");

  /* ---------- PARSE BODY (Oak v12 SAFE) ---------- */
  const bodyResult = ctx.request.body({ type: "json" });
  const body = await bodyResult.value;

  if (!body || typeof body !== "object") {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid JSON body" };
    return;
  }

const { auditId, ref } = body as { auditId?: string; ref?: string };

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

  /* ---------- REQUIRE AN EXISTING ANALYZED AUDIT ---------- */
  const { data: existingAudit, error: selectError } = await supabase
    .from("lease_audits")
    .select("id,status,analysis")
    .eq("id", auditId)
    .maybeSingle();

  if (selectError) {
    console.error("❌ Supabase select error:", selectError);
    ctx.response.status = 500;
    ctx.response.body = { error: "Database error" };
    return;
  }

  if (!existingAudit || !existingAudit.analysis || existingAudit.status !== "analyzed") {
    ctx.response.status = 409;
    ctx.response.body = { error: "Audit is not ready for checkout" };
    return;
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
      success_url: `${PUBLIC_APP_URL}/success?auditId=${encodeURIComponent(auditId)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${PUBLIC_APP_URL}/cancel?auditId=${encodeURIComponent(auditId)}`,
      metadata: {
        auditId,
        referrer_code: ref ?? "none",
      },
    });

    console.log("✅ Stripe session created:", session.id);

    ctx.response.status = 200;
    ctx.response.body = { url: session.url };
  } catch (err) {
    console.error("❌ Stripe error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Checkout session failed" };
  }
});

// The return page can recover a paid session when webhook delivery is delayed.
// Stripe is queried server-side; the browser's session ID is never proof of payment.
router.post("/recover", async (ctx) => {
  const body = await ctx.request.body({ type: "json" }).value;
  const auditId = body?.auditId;
  const sessionId = body?.sessionId;
  if (typeof auditId !== "string" || !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(auditId) ||
      typeof sessionId !== "string" || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid checkout reference" };
    return;
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.mode !== "payment" || session.metadata?.auditId !== auditId) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Checkout not found" };
      return;
    }
    if (session.payment_status !== "paid") {
      ctx.response.body = { status: "pending" };
      return;
    }
    await fulfillPaidCheckout(session);
    ctx.response.body = { status: "complete" };
  } catch (error) {
    console.error("Checkout recovery failed", { auditId, sessionId, error });
    ctx.response.status = 503;
    ctx.response.body = { error: "Recovery pending" };
  }
});

export default router;
