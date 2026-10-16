import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { portfolioAccess } from "@/lib/server/portfolioAccess";

export const dynamic = "force-dynamic";

const privateHeaders = { "Cache-Control": "private, no-store" };
const validCode = /^[a-z0-9_-]{1,48}$/;

export async function GET(req: Request) {
  const access = await portfolioAccess(req);
  if (!access) return NextResponse.json({ error: "Sign in to see your codes." }, { status: 401 });

  const { data, error } = await access.db.from("referral_partners")
    .select("code,registered_at,status,monthly_email_enabled")
    .eq("user_id", access.userId)
    .order("registered_at", { ascending: false });
  if (error) return NextResponse.json({ error: "Could not load your referral codes." }, { status: 500 });
  return NextResponse.json({ codes: data ?? [] }, { headers: privateHeaders });
}

export async function POST(req: Request) {
  const access = await portfolioAccess(req);
  if (!access?.email) return NextResponse.json({ error: "Sign in with an email address to get your referral link." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const code = typeof body?.code === "string" ? body.code.trim() : "";
  const monthlyEmailEnabled = body?.monthlyEmailEnabled === true;
  if (!code) {
    const { data: owned, error: ownedError } = await access.db.from("referral_partners")
      .select("code,status,monthly_email_enabled")
      .eq("user_id", access.userId)
      .order("registered_at", { ascending: true }).limit(1).maybeSingle();
    if (ownedError) return NextResponse.json({ error: "Could not check your referral link." }, { status: 500 });
    if (owned) {
      if (owned.status !== "active") return NextResponse.json({ error: "Your referral link is paused. Contact us for help." }, { status: 409 });
      return NextResponse.json({ code: owned.code, registered: true, monthlyEmailEnabled: owned.monthly_email_enabled }, { headers: privateHeaders });
    }

    const contactName = (access.displayName?.trim() || access.email.split("@")[0]).slice(0, 100);
    for (let attempt = 0; attempt < 4; attempt++) {
      const generated = `sol-${randomBytes(6).toString("hex")}`;
      const [purchase, preview] = await Promise.all([
        access.db.from("referrals").select("id").eq("referrer_code", generated).limit(1),
        access.db.from("lease_audits").select("id").eq("referrer_code", generated).limit(1),
      ]);
      if (purchase.error || preview.error) return NextResponse.json({ error: "Could not check your referral link." }, { status: 500 });
      if (purchase.data?.length || preview.data?.length) continue;
      const { error } = await access.db.from("referral_partners").insert({
        code: generated, user_id: access.userId, contact_name: contactName,
        contact_email: access.email, status: "active", monthly_email_enabled: monthlyEmailEnabled,
      });
      if (!error) return NextResponse.json({ code: generated, registered: true, monthlyEmailEnabled }, { status: 201, headers: privateHeaders });
      if (error.code !== "23505") return NextResponse.json({ error: "Could not create your referral link. Please try again." }, { status: 500 });
      const { data: concurrent } = await access.db.from("referral_partners")
        .select("code,status,monthly_email_enabled").eq("user_id", access.userId).limit(1).maybeSingle();
      if (concurrent?.status === "active") return NextResponse.json({ code: concurrent.code, registered: true, monthlyEmailEnabled: concurrent.monthly_email_enabled }, { headers: privateHeaders });
      if (concurrent) return NextResponse.json({ error: "Your referral link is paused. Contact us for help." }, { status: 409 });
    }
    return NextResponse.json({ error: "Could not create a unique referral link. Please try again." }, { status: 503 });
  }
  if (!validCode.test(code) || code === "none") {
    return NextResponse.json({ error: "Use 1–48 lowercase letters, numbers, hyphens, or underscores." }, { status: 400 });
  }

  const { data: ownedCode, error: ownerError } = await access.db.from("referral_partners")
    .select("code").eq("user_id", access.userId).limit(1).maybeSingle();
  if (ownerError) return NextResponse.json({ error: "Could not check your existing referral link." }, { status: 500 });
  if (ownedCode && ownedCode.code !== code) {
    return NextResponse.json({ error: "Your account already has a referral link. Use that link to keep all referrals together." }, { status: 409 });
  }

  const { data: existing, error: readError } = await access.db.from("referral_partners")
    .select("user_id,status").eq("code", code).maybeSingle();
  if (readError) return NextResponse.json({ error: "Could not check that code." }, { status: 500 });
  if (existing) {
    if (existing.user_id === access.userId) {
      if (existing.status !== "active") return NextResponse.json({ error: "This code is paused. Contact us before sharing it." }, { status: 409 });
      const { error: updateError } = await access.db.from("referral_partners")
        .update({ contact_email: access.email, monthly_email_enabled: monthlyEmailEnabled })
        .eq("code", code).eq("user_id", access.userId);
      if (updateError) return NextResponse.json({ error: "Could not update this code. Please try again." }, { status: 500 });
      return NextResponse.json({ code, status: existing.status, registered: true }, { headers: privateHeaders });
    }
    return NextResponse.json({ error: "That code is already registered. Please choose another." }, { status: 409 });
  }

  // Older links could have activity before self-registration was available.
  // Require an ownership check instead of allowing someone else to claim it.
  const [purchase, preview] = await Promise.all([
    access.db.from("referrals").select("id").eq("referrer_code", code).limit(1),
    access.db.from("lease_audits").select("id").eq("referrer_code", code).limit(1),
  ]);
  if (purchase.error || preview.error) {
    return NextResponse.json({ error: "Could not check earlier activity for this code." }, { status: 500 });
  }
  if (purchase.data?.length || preview.data?.length) {
    return NextResponse.json({ error: "This code has earlier activity. Contact us so we can confirm ownership before registering it." }, { status: 409 });
  }

  const contactName = (access.displayName?.trim() || access.email.split("@")[0]).slice(0, 100);
  const { error } = await access.db.from("referral_partners").insert({
    code, user_id: access.userId, contact_name: contactName,
    contact_email: access.email, status: "active", monthly_email_enabled: monthlyEmailEnabled,
  });
  if (error) {
    if (error.code === "23505") return NextResponse.json({ error: "That code was just registered. Please choose another." }, { status: 409 });
    return NextResponse.json({ error: "Could not register your code. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ code, status: "active", registered: true }, { status: 201, headers: privateHeaders });
}

export async function PATCH(req: Request) {
  const access = await portfolioAccess(req);
  if (!access) return NextResponse.json({ error: "Sign in to change your email preference." }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const code = typeof body?.code === "string" ? body.code.trim() : "";
  if (!validCode.test(code) || typeof body?.monthlyEmailEnabled !== "boolean") {
    return NextResponse.json({ error: "Choose a registered code and an email preference." }, { status: 400 });
  }
  const { data, error } = await access.db.from("referral_partners")
    .update({ monthly_email_enabled: body.monthlyEmailEnabled, contact_email: access.email })
    .eq("code", code).eq("user_id", access.userId).eq("status", "active")
    .select("code,monthly_email_enabled").maybeSingle();
  if (error) return NextResponse.json({ error: "Could not save your email preference." }, { status: 500 });
  if (!data) return NextResponse.json({ error: "This code is not registered to your account." }, { status: 404 });
  return NextResponse.json(data, { headers: privateHeaders });
}
