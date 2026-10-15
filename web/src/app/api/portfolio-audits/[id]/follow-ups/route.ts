import { NextResponse } from "next/server";
import { portfolioAccess } from "@/lib/server/portfolioAccess";
import { reportFollowUpTasks } from "@/lib/reportFollowups";

export const dynamic = "force-dynamic";
const privateHeaders = { "Cache-Control": "private, no-store" };
type Context = { params: Promise<{ id: string }> };

async function ownedReport(req: Request, context: Context) {
  const access = await portfolioAccess(req);
  if (!access) return null;
  const { id } = await context.params;
  const { data: audit, error } = await access.db.from("lease_audits")
    .select("id,analysis").eq("id", id).eq("user_id", access.userId)
    .eq("status", "complete").maybeSingle();
  if (error) throw error;
  return { access, audit };
}

export async function GET(req: Request, context: Context) {
  try {
    const owned = await ownedReport(req, context);
    if (!owned) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    if (!owned.audit) return NextResponse.json({ error: "Report not found" }, { status: 404 });
    const { data, error } = await owned.access.db.from("report_followups")
      .select("item_key,status,note,updated_at")
      .eq("audit_id", owned.audit.id).eq("user_id", owned.access.userId);
    if (error) throw error;
    return NextResponse.json({ tasks: reportFollowUpTasks(owned.audit.analysis), progress: data ?? [] }, { headers: privateHeaders });
  } catch {
    return NextResponse.json({ error: "Unable to load follow-up checklist" }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: Context) {
  try {
    const owned = await ownedReport(req, context);
    if (!owned) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    if (!owned.audit) return NextResponse.json({ error: "Report not found" }, { status: 404 });
    const body = await req.json().catch(() => null);
    const key = body?.key;
    const status = body?.status;
    const note = body?.note;
    if (typeof key !== "string" || !reportFollowUpTasks(owned.audit.analysis).some((task) => task.key === key) ||
        !["open", "waiting", "reviewed"].includes(status) || typeof note !== "string" || note.length > 2000) {
      return NextResponse.json({ error: "Invalid follow-up update" }, { status: 400 });
    }
    const { data, error } = await owned.access.db.from("report_followups")
      .upsert({ audit_id: owned.audit.id, user_id: owned.access.userId, item_key: key, status, note: note.trim(), updated_at: new Date().toISOString() }, { onConflict: "audit_id,item_key" })
      .select("item_key,status,note,updated_at").single();
    if (error) throw error;
    return NextResponse.json({ progress: data }, { headers: privateHeaders });
  } catch {
    return NextResponse.json({ error: "Unable to save follow-up" }, { status: 500 });
  }
}
