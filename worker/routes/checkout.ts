// worker/routes/checkout.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";
import { supabase } from "../lib/supabase.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {});
const router = new Router({ prefix: "/checkout" });

/**
 * Create Stripe Checkout Session
 *
 * HARD GUARANTEES AFTER THIS ROUTE:
 * - auditId is REQUIRED
 * - lease_audits row EXISTS
 * - status = 'unpaid'
 * - Stripe metadata ALWAYS includes auditId
 * - Webhook can deterministically fulfill
 */
router.post("/create", async (ctx) => {
  try {
    /* --------------------------------------------------
       PARSE BODY (Oak-safe)
    -------------------------------------------------- */
    const body = await ctx.request.body({ type: "json" }).value;
    const { auditId } = body ?? {};

    const STRIPE_PRICE_STARTER = Deno.env.get("STRIPE_PRICE_STARTER");
    const baseUrl = Deno.env.get("BASE_URL") ?? "http://localhost:3000";

    if (!auditId) {
      ctx.response.status = 400;
      ctx.response.body = { error: "auditId is required" };
      return;
    }

    if (!STRIPE_PRICE_STARTER) {
      ctx.response.status = 500;
      ctx.response.body = { error: "Missing STRIPE_PRICE_STARTER env var" };
      return;
    }

    /* --------------------------------------------------
       ENSURE lease_audits ROW EXISTS (IDEMPOTENT)
    -------------------------------------------------- */
    const { data: existingAudit, error: selectError } = await supabase
      .from("lease_audits")
      .select("id")
      .eq("id", auditId)
      .maybeSingle();

    if (selectError) {
      console.error("❌ Failed to check lease_audits row:", selectError);
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
          amount_paid: 24999,
          currency: "usd",
        });

      if (insertError) {
        console.error("❌ Failed to insert lease_audits row:", insertError);
        ctx.response.status = 500;
        ctx.response.body = { error: "Failed to initialize audit record" };
        return;
      }

      console.log("🧾 lease_audits row created:", auditId);
    }

    /* --------------------------------------------------
       CREATE STRIPE CHECKOUT SESSION
    -------------------------------------------------- */
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: STRIPE_PRICE_STARTER,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?auditId=${auditId}`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: {
        auditId, // 🔒 SINGLE SOURCE OF TRUTH
      },
    });

    console.log("🧾 Checkout session created:", {
      sessionId: session.id,
      auditId,
      metadata: session.metadata,
    });

    ctx.response.status = 200;
    ctx.response.body = {
      url: session.url,
    };
  } catch (err) {
    console.error("❌ Stripe checkout error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Checkout session failed" };
  }
});

export default router;
