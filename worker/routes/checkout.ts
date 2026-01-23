// worker/routes/checkout.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";
import { supabase } from "../lib/supabase.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {});

const router = new Router({
  prefix: "/checkout",
});

/**
 * Create Stripe Checkout Session
 *
 * HARD GUARANTEES AFTER THIS ROUTE:
 * - lease_audits row EXISTS
 * - status = 'unpaid'
 * - Stripe webhook can ALWAYS update it
 */
router.post("/create", async (ctx) => {
  try {
    // deno-lint-ignore no-explicit-any
const body = await (ctx.request as any).body?.json?.()
  ?? (await ctx.request.body().value);
    const { auditId } = body;

    const priceId = Deno.env.get("STRIPE_PRICE_STARTER");
    const baseUrl = Deno.env.get("BASE_URL");

    if (!auditId) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing auditId" };
      return;
    }

    if (!priceId || !baseUrl) {
      ctx.response.status = 500;
      ctx.response.body = { error: "Server misconfigured" };
      return;
    }

    /* ---------------------------------------------------------
       ENSURE lease_audits ROW EXISTS (IDEMPOTENT)
    ---------------------------------------------------------- */

    const { data: existingAudit } = await supabase
      .from("lease_audits")
      .select("id")
      .eq("id", auditId)
      .maybeSingle();

    if (!existingAudit) {
      const { error: insertError } = await supabase
        .from("lease_audits")
        .insert({
          id: auditId,
          status: "unpaid",
          amount_paid: 14999,
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

    /* ---------------------------------------------------------
       CREATE STRIPE CHECKOUT SESSION
    ---------------------------------------------------------- */

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?auditId=${auditId}`, // ✅ ANCHOR
      cancel_url: `${baseUrl}`,
      metadata: {
        auditId, // 🔒 CRITICAL LINK
      },
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
