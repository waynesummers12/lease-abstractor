import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const milestones = [180, 90, 30, 7] as const;
type Lease = { id: string; user_id: string; property_name: string; renewal_date: string };

function dateAfter(days: number) {
  const date = new Date();
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "Reminder job is not configured" }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const emailKey = process.env.RESEND_API_KEY;
  if (!url || !key || !emailKey) return NextResponse.json({ error: "Reminder job is not configured" }, { status: 503 });

  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const resend = new Resend(emailKey);
  let sent = 0;
  let failed = 0;
  for (const days of milestones) {
    const renewalDate = dateAfter(days);
    const { data, error } = await db.from("portfolio_leases")
      .select("id,user_id,property_name,renewal_date")
      .eq("renewal_date", renewalDate)
      .eq("renewal_reminders_enabled", true)
      .is("deleted_at", null)
      .not("user_id", "is", null)
      .limit(500);
    if (error) return NextResponse.json({ error: "Unable to load lease reminders" }, { status: 500 });
    for (const lease of (data ?? []) as Lease[]) {
      const event = { lease_id: lease.id, user_id: lease.user_id, renewal_date: renewalDate, days_before: days };
      const { error: claimError } = await db.from("portfolio_renewal_reminder_events").insert(event);
      if (claimError?.code === "23505") continue;
      if (claimError) { failed++; continue; }
      try {
        const { data: current } = await db.from("portfolio_leases").select("id")
          .eq("id", lease.id).eq("user_id", lease.user_id).eq("renewal_date", renewalDate)
          .eq("renewal_reminders_enabled", true).is("deleted_at", null).maybeSingle();
        if (!current) continue;
        const { data: userResult, error: userError } = await db.auth.admin.getUserById(lease.user_id);
        if (userError || !userResult.user?.email) throw new Error("Account email unavailable");
        const link = `https://www.saveonlease.com/product/app/leases/${encodeURIComponent(lease.id)}?utm_source=email&utm_medium=renewal_reminder&utm_campaign=portfolio_followup`;
        const { error: sendError } = await resend.emails.send({
          from: "SaveOnLease <audit@saveonlease.com>",
          to: userResult.user.email,
          subject: `${lease.property_name}: saved renewal date in ${days} days`,
          text: `Your saved renewal date for ${lease.property_name} is ${renewalDate} (${days} days away).\n\nOpen the lease and its free preview to review CAM and NNN terms: ${link}\n\nCheck your signed lease for any earlier notice or audit deadline. This reminder does not calculate or extend those deadlines. You can turn renewal emails off on the lease page.`,
        });
        if (sendError) throw sendError;
        await db.from("portfolio_renewal_reminder_events").update({ sent_at: new Date().toISOString() })
          .eq("lease_id", lease.id).eq("renewal_date", renewalDate).eq("days_before", days);
        sent++;
      } catch (cause) {
        failed++;
        console.error("Portfolio reminder delivery failed", cause instanceof Error ? cause.message : "Unknown error");
        await db.from("portfolio_renewal_reminder_events").delete()
          .eq("lease_id", lease.id).eq("renewal_date", renewalDate).eq("days_before", days)
          .is("sent_at", null);
      }
    }
  }
  return NextResponse.json({ sent, failed }, { status: failed ? 500 : 200 });
}
