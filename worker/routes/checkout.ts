import Stripe from "npm:stripe";
import type { Context } from "oak";

/* -------------------- STRIPE CLIENT -------------------- */

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

/* -------------------- CHECKOUT HANDLER -------------------- */

export async function createCheckoutSession(ctx: Context) {
  try {
    const body = await ctx.request.body().json();
    const { leaseId } = body;

    if (!leaseId) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing leaseId" };
      return;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: Deno.env.get("STRIPE_PRICE_ID")!,
          quantity: 1,
        },
      ],
      success_url: `${Deno.env.get("PUBLIC_APP_URL")}/success?leaseId=${leaseId}`,
      cancel_url: `${Deno.env.get("PUBLIC_APP_URL")}/`,
      metadata: {
        leaseId,
        product: "cam_nnn_audit_summary",
      },
    });

    ctx.response.status = 200;
    ctx.response.body = {
      checkoutUrl: session.url,
    };
  } catch (err) {
    console.error("Stripe checkout error:", err);

    ctx.response.status = 500;
    ctx.response.body = {
      error: "Failed to create checkout session",
    };
  }
}
