// worker/routes/checkout.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  // Stripe v20 enforces API version internally — do NOT set apiVersion
});

const router = new Router({
  prefix: "/checkout",
});

/**
 * Create Stripe Checkout Session
 *
 * IMPORTANT INVARIANTS:
 * - auditId already exists
 * - PDF is already generated & uploaded
 * - object_path is already persisted
 * - This route ONLY starts payment
 */
router.post("/create", async (ctx) => {
  try {
    const body = await ctx.request.body({ type: "json" }).value;
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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success`,
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
