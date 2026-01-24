import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { Buffer } from "node:buffer";
import Stripe from "npm:stripe@20.2.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {});
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

const router = new Router();

router.post("/api/stripe/webhook", async (ctx) => {
  console.log("🔥 Stripe webhook hit");

  const sig = ctx.request.headers.get("stripe-signature");
  if (!sig) {
    ctx.response.status = 400;
    return;
  }

  // ✅ RAW BODY — REQUIRED FOR STRIPE
  const rawBody = await ctx.request.body({ type: "bytes" }).value;

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      Buffer.from(rawBody),
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error("❌ Stripe signature verification failed", err);
    ctx.response.status = 400;
    return;
  }

  if (event.type === "checkout.session.completed") {
    console.log("💳 checkout.session.completed received");
    // your existing logic continues here
  }

  ctx.response.status = 200;
  ctx.response.body = { received: true };
});

export default router;
