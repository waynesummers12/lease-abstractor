import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { canReadAudit } from "@/lib/server/auditAccess";

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
    return NextResponse.json({ feedback: data }, { headers: privateHeaders });
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
    return NextResponse.json({ feedback: data }, { headers: privateHeaders });
  } catch {
    return NextResponse.json({ error: "Unable to save feedback" }, { status: 500, headers: privateHeaders });
  }
}
