// worker/routes/stripeWebhook.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

import { markAuditPaid } from "../utils/markAuditPaid.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

const router = new Router();

/* --------------------------------------------------
   STRIPE WEBHOOK
-------------------------------------------------- */
router.post("/webhooks/stripe", async (ctx) => {
  const sig = ctx.request.headers.get("stripe-signature");
  const body = await ctx.request.body.text();

  if (!sig) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing Stripe signature" };
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed", err.message);
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid signature" };
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await markAuditPaid(session);
  }

  ctx.response.status = 200;
  ctx.response.body = { received: true };
});

export default router;
