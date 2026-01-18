// worker/routes/checkout.ts

import { Router, Context } from "@oak/oak";
import Stripe from "stripe";

/* ---------------- STRIPE CLIENT ---------------- */

const stripe = new Stripe(
  Deno.env.get("STRIPE_SECRET_KEY")!,
  {
    // ✅ MUST be a released API version
    apiVersion: "2024-06-20",
  }
);

/* ---------------- ROUTER ---------------- */

const router = new Router({
  prefix: "/checkout",
});

/* ---------------- CREATE CHECKOUT SESSION ---------------- */

router.post("/create", async (ctx: Context) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "One-time CAM / NNN Audit Summary",
              description:
                "Lease abstraction. Total avoidable exposure. Escalation risk. Audit guidance. PDF download. Delivered instantly.",
            },
            unit_amount: 14999, // $149.99
          },
          quantity: 1,
        },
      ],

      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000",
    });

    ctx.response.status = 200;
    ctx.response.body = {
      url: session.url,
    };
  } catch (err) {
    console.error("❌ Stripe checkout error:", err);

    ctx.response.status = 500;
    ctx.response.body = {
      error: "Checkout session failed",
    };
  }
});

/* ---------------- EXPORT ---------------- */

export default router;

