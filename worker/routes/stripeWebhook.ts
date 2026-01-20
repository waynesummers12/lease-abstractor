// worker/routes/stripeWebhook.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";
import { supabase } from "../lib/supabase.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  // Stripe v20 enforces API version internally
});

const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

const router = new Router();

router.post("/stripe/webhook", async (ctx) => {
  const sig = ctx.request.headers.get("stripe-signature");
  if (!sig) {
    ctx.response.status = 400;
    ctx.response.body = "Missing stripe-signature";
    return;
  }

  const rawBody = await ctx.request.body({ type: "text" }).value;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error("❌ Stripe webhook signature verification failed", err);
    ctx.response.status = 400;
    ctx.response.body = "Invalid signature";
    return;
  }

  // ✅ Handle successful payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const auditId = session.metadata?.auditId;
    const stripeSessionId = session.id;

    if (!auditId) {
      console.error("❌ Missing auditId in Stripe metadata");
    } else {
      const { error } = await supabase
        .from("lease_audits")
        .update({
          status: "paid",
          stripe_session_id: stripeSessionId,
        })
        .eq("id", auditId);

      if (error) {
        console.error("❌ Failed to mark audit as paid:", error);
      } else {
        console.log("✅ Audit marked as paid:", auditId);
      }
    }
  }

  ctx.response.status = 200;
  ctx.response.body = { received: true };
});

export default router;
