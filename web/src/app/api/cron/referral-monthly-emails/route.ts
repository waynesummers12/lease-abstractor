import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type Partner = { code: string; user_id: string };
type Summary = {
  referrer_code: string;
  free_previews: number;
  paid_reports: number;
  commission_earned_usd: number;
  commission_marked_paid_usd: number;
  commission_unpaid_usd: number;
};

async function claimDelivery(db: SupabaseClient, code: string, month: string) {
  const claimedAt = new Date().toISOString();
  const { error } = await db.from("referral_monthly_email_deliveries")
    .insert({ code, month_utc: month, claimed_at: claimedAt });
  if (!error) return claimedAt;
  if (error.code !== "23505") throw error;

  // A previous invocation may have stopped before marking a send complete.
  const staleBefore = new Date(Date.now() - 30 * 60_000).toISOString();
  const { data, error: retryError } = await db.from("referral_monthly_email_deliveries")
    .update({ claimed_at: claimedAt })
    .eq("code", code).eq("month_utc", month)
    .is("sent_at", null).lt("claimed_at", staleBefore)
    .select("code").maybeSingle();
  if (retryError) throw retryError;
  return data ? claimedAt : null;
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "Referral email job is not configured" }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const emailKey = process.env.RESEND_API_KEY;
  if (!url || !key || !emailKey) return NextResponse.json({ error: "Referral email job is not configured" }, { status: 503 });

  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const resend = new Resend(emailKey);
  const now = new Date();
  const firstOfLastMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
  const month = firstOfLastMonth.toISOString().slice(0, 10);
  const label = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(firstOfLastMonth);

  const { data: partners, error: partnersError } = await db.from("referral_partners")
    .select("code,user_id").eq("status", "active")
    .eq("monthly_email_enabled", true).not("user_id", "is", null).order("code").limit(1000);
  if (partnersError) return NextResponse.json({ error: "Unable to load opted-in partners" }, { status: 500 });

  const { data: summaries, error: summaryError } = await db.from("referral_monthly_report")
    .select("referrer_code,free_previews,paid_reports,commission_earned_usd,commission_marked_paid_usd,commission_unpaid_usd")
    .eq("month_utc", month).limit(1000);
  if (summaryError) return NextResponse.json({ error: "Unable to load the monthly referral report" }, { status: 500 });
  const byCode = new Map((summaries as Summary[] ?? []).map((row) => [row.referrer_code, row]));

  let sent = 0;
  let failed = 0;
  for (const partner of (partners ?? []) as Partner[]) {
    let claimedAt: string | null = null;
    try {
      claimedAt = await claimDelivery(db, partner.code, month);
      if (!claimedAt) continue;
      const { data: userResult, error: userError } = await db.auth.admin.getUserById(partner.user_id);
      if (userError || !userResult.user?.email) throw new Error("Account email unavailable");
      const row = byCode.get(partner.code);
      const analyzed = row?.free_previews ?? 0;
      const paid = row?.paid_reports ?? 0;
      const earned = Number(row?.commission_earned_usd ?? 0).toFixed(2);
      const markedPaid = Number(row?.commission_marked_paid_usd ?? 0).toFixed(2);
      const unpaid = Number(row?.commission_unpaid_usd ?? 0).toFixed(2);
      const { data, error: sendError } = await resend.emails.send({
        from: "SaveOnLease <audit@saveonlease.com>",
        to: userResult.user.email,
        subject: `Your SaveOnLease referral summary — ${label}`,
        text: `Your ${label} referral summary for code ${partner.code}\n\nLeases that reached analysis: ${analyzed}\nPaid reports: ${paid}\nCommission earned on those reports: $${earned}\nOf that month's commission, marked paid: $${markedPaid}\nOf that month's commission, not yet marked paid: $${unpaid}\n\nA free preview does not earn a commission. These amounts reflect our recorded purchases for ${label}; they are not a payment confirmation. Our team coordinates payouts separately.\n\nManage your monthly email preference: https://www.saveonlease.com/marketing/referral#create-link\nQuestions? Email audits@saveonlease.com.`,
      }, { idempotencyKey: `referral-summary/${partner.code}/${month}` });
      if (sendError) throw sendError;
      const { error: saveError } = await db.from("referral_monthly_email_deliveries")
        .update({ sent_at: new Date().toISOString(), resend_email_id: data?.id ?? null })
        .eq("code", partner.code).eq("month_utc", month).eq("claimed_at", claimedAt);
      if (saveError) throw saveError;
      sent++;
    } catch (cause) {
      failed++;
      console.error("Referral monthly email failed", partner.code, cause instanceof Error ? cause.message : "Unknown error");
    }
  }
  return NextResponse.json({ month, sent, failed }, { status: failed ? 500 : 200 });
}
