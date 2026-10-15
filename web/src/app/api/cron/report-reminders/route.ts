import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

type Reminder = {
  audit_id: string;
  item_key: "first:deadline" | "next:statement";
  user_id: string;
  due_date: string;
};

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
  const today = new Date().toISOString().slice(0, 10);
  const oldest = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  const { data, error } = await db.from("report_followups")
    .select("audit_id,item_key,user_id,due_date")
    .in("item_key", ["first:deadline", "next:statement"])
    .eq("reminder_enabled", true)
    .is("reminder_sent_at", null)
    .gte("due_date", oldest)
    .lte("due_date", today)
    .order("due_date", { ascending: true })
    .limit(100);
  if (error) return NextResponse.json({ error: "Unable to load reminders" }, { status: 500 });

  let sent = 0;
  let failed = 0;
  for (const reminder of (data ?? []) as Reminder[]) {
    const claimedAt = new Date().toISOString();
    const { data: claimed, error: claimError } = await db.from("report_followups")
      .update({ reminder_sent_at: claimedAt })
      .eq("audit_id", reminder.audit_id)
      .eq("item_key", reminder.item_key)
      .eq("user_id", reminder.user_id)
      .eq("due_date", reminder.due_date)
      .eq("reminder_enabled", true)
      .is("reminder_sent_at", null)
      .select("audit_id")
      .maybeSingle();
    if (claimError || !claimed) { if (claimError) failed++; continue; }

    try {
      const { data: userResult, error: userError } = await db.auth.admin.getUserById(reminder.user_id);
      if (userError || !userResult.user?.email) throw new Error("Account email unavailable");
      const isDeadline = reminder.item_key === "first:deadline";
      const title = isDeadline ? "Review the date you confirmed" : "Look for your next annual statement";
      const detail = isDeadline
        ? "Check your signed lease, amendments, statement receipt, and notice requirements before taking action. This reminder does not determine or extend a legal deadline."
        : "When your next CAM or NNN statement arrives, bring it together with your current lease and compare it with last year's report.";
      const link = `https://www.saveonlease.com/product/app/audits/${encodeURIComponent(reminder.audit_id)}`;
      const { error: sendError } = await resend.emails.send({
        from: "SaveOnLease <audit@saveonlease.com>",
        to: userResult.user.email,
        subject: `SaveOnLease reminder: ${title}`,
        text: `${title}\n\nYou saved ${reminder.due_date} as the date for this follow-up.\n\n${detail}\n\nOpen your report and turn reminders off anytime: ${link}`,
      });
      if (sendError) throw sendError;
      sent++;
    } catch (cause) {
      failed++;
      console.error("Report reminder delivery failed", cause instanceof Error ? cause.message : "Unknown error");
      await db.from("report_followups").update({ reminder_sent_at: null })
        .eq("audit_id", reminder.audit_id).eq("item_key", reminder.item_key)
        .eq("reminder_sent_at", claimedAt);
    }
  }
  return NextResponse.json({ sent, failed }, { status: failed ? 500 : 200 });
}
