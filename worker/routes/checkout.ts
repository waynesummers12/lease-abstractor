// worker/routes/checkout.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";

const stripe = new Stripe(
  Deno.env.get("STRIPE_SECRET_KEY")!,
  {
    // ❗️DO NOT set apiVersion — Stripe v20 enforces it internally
  }
);

const router = new Router({
  prefix: "/checkout",
});

router.post("/create", async (ctx) => {
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
      success_url: `${Deno.env.get("BASE_URL")}/success`,
      cancel_url: `${Deno.env.get("BASE_URL")}`,
    });

    ctx.response.status = 200;
    ctx.response.body = { url: session.url };
  } catch (err) {
    console.error("❌ Stripe checkout error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Checkout session failed" };
  }
});

export default router;


