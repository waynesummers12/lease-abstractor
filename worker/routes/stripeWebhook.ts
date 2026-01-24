// worker/routes/stripeWebhook.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {});
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
const isLocal = Deno.env.get("ENV") === "local";

const router = new Router();

router.post("/api/stripe/webhook", async (ctx) => {
  console.log("🔥 Stripe webhook hit");

  let event: Stripe.Event;

  /* --------------------------------------------------
     LOCAL DEV MODE — TRUST STRIPE CLI, NO VERIFICATION
     -------------------------------------------------- */
  if (isLocal) {
    console.log("⚠️ DEV MODE: skipping Stripe signature verification");

    const body = await ctx.request.body({ type: "json" }).value;
    event = body as Stripe.Event;
  } else {
    /* --------------------------------------------------
       PRODUCTION — FULL SIGNATURE VERIFICATION
       -------------------------------------------------- */
    const sig = ctx.request.headers.get("stripe-signature");
    if (!sig) {
      ctx.response.status = 400;
      ctx.response.body = "Missing stripe-signature";
      return;
    }

    const rawText = await ctx.request.body({ type: "text" }).value;

    try {
      event = await stripe.webhooks.constructEventAsync(
        rawText,
        sig,
        endpointSecret
      );
    } catch (err) {
      console.error("❌ Stripe signature verification failed", err);
      ctx.response.status = 400;
      ctx.response.body = "Webhook Error";
      return;
    }
  }

  /* --------------------------------------------------
     EVENT HANDLING
     -------------------------------------------------- */
  console.log("✅ Stripe event received:", event.type);

  if (event.type === "checkout.session.completed") {
    console.log("💳 checkout.session.completed received");

    const session = event.data.object as Stripe.Checkout.Session;
    const auditId = session.metadata?.auditId ?? null;

    console.log("🧾 auditId:", auditId);

    // NEXT STEP: mark paid, generate PDF, email, etc
  }

  ctx.response.status = 200;
  ctx.response.body = { received: true };
});

export default router;
