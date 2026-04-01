import { NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: () => {},
        remove: () => {},
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan");

  // ✅ Validate plan
  if (!plan || !["pro", "enterprise"].includes(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const userId = user.id;
  const userEmail = user.email ?? undefined;

  const priceId =
    plan === "pro"
      ? process.env.STRIPE_PRO_PRICE_ID
      : process.env.STRIPE_ENTERPRISE_PRICE_ID;

  if (!priceId) {
    return NextResponse.json({ error: "Missing Stripe price ID" }, { status: 500 });
  }

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