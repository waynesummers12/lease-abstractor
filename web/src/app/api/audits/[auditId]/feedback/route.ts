import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { canReadAudit } from "@/lib/server/auditAccess";
import { portfolioAccess } from "@/lib/server/portfolioAccess";

export const dynamic = "force-dynamic";
type Context = { params: Promise<{ auditId: string }> };
const privateHeaders = { "Cache-Control": "private, no-store" };
const usefulAnswers = ["yes", "no", "not_sure"];
const actions = ["not_yet", "reviewing", "requested_records", "contacted_landlord", "resolved", "other"];

function database() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function completedReport(req: Request, id: string) {
  if (!(await canReadAudit(req, id))) return null;
  const db = database();
  if (!db) throw new Error("Feedback storage unavailable");
  const { data, error } = await db.from("lease_audits")
    .select("id").eq("id", id).eq("status", "complete").maybeSingle();
  if (error) throw error;
  return data ? db : null;
}

export async function GET(req: Request, context: Context) {
  try {
    const { auditId } = await context.params;
    const db = await completedReport(req, auditId);
    if (!db) return NextResponse.json({ error: "Report not found" }, { status: 404, headers: privateHeaders });
    const { data, error } = await db.from("report_feedback")
      .select("useful_question,next_action,note,updated_at").eq("audit_id", auditId).maybeSingle();
    if (error) throw error;
    const [{ data: claim, error: claimError }, { count, error: countError }, { data: audit, error: auditError }] = await Promise.all([
      db.from("feedback_gift_card_claims").select("id").eq("audit_id", auditId).maybeSingle(),
      db.from("feedback_gift_card_claims").select("id", { count: "exact", head: true }),
      db.from("lease_audits").select("amount_paid,email,user_id").eq("id", auditId).single(),
    ]);
    if (claimError || countError || auditError) throw claimError ?? countError ?? auditError;
    const access = await portfolioAccess(req);
    const recipientEmail = audit.email || (audit.user_id === access?.userId ? access?.email : null);
    const { data: priorClaim, error: priorClaimError } = recipientEmail
      ? await db.from("feedback_gift_card_claims").select("audit_id").eq("recipient_email", recipientEmail.trim().toLowerCase()).maybeSingle()
      : { data: null, error: null };
    if (priorClaimError) throw priorClaimError;
    return NextResponse.json({ feedback: data, rewardClaimed: Boolean(claim),
      claimedOnAnotherReport: Boolean(priorClaim && priorClaim.audit_id !== auditId),
      promotionSpotsRemaining: Math.max(0, 50 - (count ?? 0)),
      offerAvailable: Boolean((audit.amount_paid ?? 0) > 0 && recipientEmail) }, { headers: privateHeaders });
  } catch {
    return NextResponse.json({ error: "Unable to load feedback" }, { status: 500, headers: privateHeaders });
  }
}

export async function PUT(req: Request, context: Context) {
  try {
    if (new URL(req.url).origin !== req.headers.get("origin")) {
      return NextResponse.json({ error: "Invalid request origin" }, { status: 403, headers: privateHeaders });
    }
    const { auditId } = await context.params;
    const db = await completedReport(req, auditId);
    if (!db) return NextResponse.json({ error: "Report not found" }, { status: 404, headers: privateHeaders });
    const body = await req.json().catch(() => null);
    if (!body || !usefulAnswers.includes(body.usefulQuestion) || !actions.includes(body.nextAction) ||
        typeof body.note !== "string" || body.note.trim().length > 500) {
      return NextResponse.json({ error: "Choose an answer and keep your note under 500 characters" }, { status: 400, headers: privateHeaders });
    }
    const { data, error } = await db.from("report_feedback")
      .upsert({ audit_id: auditId, useful_question: body.usefulQuestion, next_action: body.nextAction,
        note: body.note.trim(), updated_at: new Date().toISOString() }, { onConflict: "audit_id" })
      .select("useful_question,next_action,note,updated_at").single();
    if (error) throw error;
    let rewardStatus = "needs_note";
    if (data.note.length >= 10) {
      const { data: audit, error: auditError } = await db.from("lease_audits").select("email,user_id").eq("id", auditId).single();
      if (auditError) throw auditError;
      const access = await portfolioAccess(req);
      const { data: result, error: rewardError } = await db.rpc("reserve_feedback_gift_card", {
        p_audit_id: auditId,
        p_email: audit.email || (audit.user_id === access?.userId ? access?.email : null) || "",
      });
      rewardStatus = rewardError ? "unavailable" : String(result);
      if (rewardError) console.error("Could not reserve feedback gift card:", rewardError);
    }
    return NextResponse.json({ feedback: data, rewardStatus }, { headers: privateHeaders });
  } catch {
    return NextResponse.json({ error: "Unable to save feedback" }, { status: 500, headers: privateHeaders });
  }
}
