import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";

const router = new Router();
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

router.post("/api/stripe/webhook", async (ctx) => {
  console.log("🔥 Stripe webhook hit");

  const sig = ctx.request.headers.get("stripe-signature");
  if (!sig) {
    ctx.response.status = 400;
    ctx.response.body = "Missing stripe-signature header";
    return;
  }

// 🔑 RAW BODY — UNTOUCHED
const rawBody = new Uint8Array(
  await ctx.request.body({ type: "bytes" }).value
);

let event: Stripe.Event;

try {
  event = await stripe.webhooks.constructEventAsync(
    rawBody as any,   // 👈 THIS IS THE KEY
    sig,
    endpointSecret
  );
} catch (err) {
  console.error("❌ Stripe signature verification failed", err);
  ctx.response.status = 400;
  ctx.response.body = "Webhook Error";
  return;
}

console.log("✅ Stripe event verified:", event.type);


  if (event.type === "checkout.session.completed") {
    console.log("💳 checkout.session.completed received");
    const _session = event.data.object as Stripe.Checkout.Session;
    // TODO: mark audit paid, generate PDF
  }

  ctx.response.status = 200;
  ctx.response.body = { received: true };
});

export default router;
