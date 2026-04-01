import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan");

  // ✅ Validate plan
  if (!plan || !["pro", "enterprise"].includes(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  // TODO: replace with real user (next step)
  const userId = "temp-user-id"; // will fix in webhook step
  const userEmail = "test@example.com"; // replace soon

  const priceId =
    plan === "pro"
      ? process.env.STRIPE_PRO_PRICE_ID
      : process.env.STRIPE_ENTERPRISE_PRICE_ID;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",

    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],

    customer_email: userEmail,

    metadata: {
      user_id: userId,
      plan,
    },

    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/app/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/marketing/pricing`,
  });

  return NextResponse.redirect(session.url!);
}