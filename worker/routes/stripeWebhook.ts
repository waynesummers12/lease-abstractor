// Register before middleware that reads the request body.
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";
import { fulfillPaidCheckout } from "../utils/fulfillPaidCheckout.ts";

const secret = Deno.env.get("STRIPE_SECRET_KEY");
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
if (!secret || !endpointSecret) throw new Error("Stripe webhook is not configured");
const stripe = new Stripe(secret);
const router = new Router();

router.post("/stripe/webhook", async (ctx) => {
  const rawBody = await ctx.request.body({ type: "text" }).value;
  const signature = ctx.request.headers.get("stripe-signature");
  if (!signature || typeof rawBody !== "string") {
    ctx.response.status = 400;
    return;
  }

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, endpointSecret);
  } catch (error) {
    console.error("Stripe signature verification failed", error);
    ctx.response.status = 400;
    return;
  }

  if (event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "paid") {
      try {
        await fulfillPaidCheckout(session);
      } catch (error) {
        console.error("Paid checkout fulfillment failed", { eventId: event.id, sessionId: session.id, error });
        ctx.response.status = 500; // Stripe retries; do not acknowledge lost work.
        ctx.response.body = { error: "Fulfillment pending" };
        return;
      }
    }
  }

  ctx.response.status = 200;
  ctx.response.body = { received: true };
});

export default router;
