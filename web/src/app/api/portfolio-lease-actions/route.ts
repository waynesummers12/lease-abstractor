import { NextResponse } from "next/server";
import { portfolioAccess } from "@/lib/server/portfolioAccess";

export const dynamic = "force-dynamic";

const privateHeaders = { "Cache-Control": "private, no-store" };
const categories = new Set(["renewal", "billing", "insurance", "maintenance", "other"]);

function validDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export async function GET(req: Request) {
  const access = await portfolioAccess(req);
  if (!access) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const { db, userId } = access;
  const leaseId = new URL(req.url).searchParams.get("leaseId");
  const activeIds = new Set<string>();
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await db.from("portfolio_leases").select("id")
      .eq("user_id", userId).is("deleted_at", null).order("id").range(offset, offset + 999);
    if (error) return NextResponse.json({ error: "Could not load lease actions" }, { status: 500 });
    for (const lease of data ?? []) activeIds.add(lease.id);
    if ((data ?? []).length < 1000) break;
  }
  if (leaseId && !activeIds.has(leaseId)) return NextResponse.json({ error: "Lease not found" }, { status: 404 });
  if (activeIds.size === 0) return NextResponse.json({ actions: [] }, { headers: privateHeaders });
  const actions = [];
  for (let offset = 0; ; offset += 1000) {
    let query = db.from("portfolio_lease_actions").select("id,lease_id,title,owner_name,due_date,source_note,category,completed_at,created_at")
      .eq("user_id", userId).order("created_at", { ascending: false }).order("id").range(offset, offset + 999);
    if (leaseId) query = query.eq("lease_id", leaseId);
    const { data, error } = await query;
    if (error) return NextResponse.json({ error: "Could not load lease actions" }, { status: 500 });
    actions.push(...(data ?? []).filter((action) => activeIds.has(action.lease_id)));
    if ((data ?? []).length < 1000) break;
  }
  return NextResponse.json({ actions }, { headers: privateHeaders });
}

export async function POST(req: Request) {
  const access = await portfolioAccess(req);
  if (!access) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const { db, userId } = access;
  const body = await req.json().catch(() => null);
  const leaseId = body?.leaseId;
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const ownerName = typeof body?.ownerName === "string" ? body.ownerName.trim() : "";
  const sourceNote = typeof body?.sourceNote === "string" ? body.sourceNote.trim() : "";
  const category = body?.category ?? "other";
  const dueDate = body?.dueDate || null;
  if (typeof leaseId !== "string" || !/^[0-9a-f-]{36}$/i.test(leaseId)
    || title.length < 1 || title.length > 160 || ownerName.length < 1 || ownerName.length > 100
    || sourceNote.length > 500 || !categories.has(category) || (dueDate !== null && !validDate(dueDate))) {
    return NextResponse.json({ error: "Enter an action, owner, and a valid date if known" }, { status: 400 });
  }
  const { data: lease } = await db.from("portfolio_leases").select("id").eq("id", leaseId).eq("user_id", userId).is("deleted_at", null).maybeSingle();
  if (!lease) return NextResponse.json({ error: "Lease not found" }, { status: 404 });
  const { data, error } = await db.from("portfolio_lease_actions").insert({
    lease_id: leaseId, user_id: userId, title, owner_name: ownerName, due_date: dueDate,
    source_note: sourceNote || null, category,
  }).select("id,lease_id,title,owner_name,due_date,source_note,category,completed_at,created_at").single();
  if (error) return NextResponse.json({ error: "Could not save lease action" }, { status: 500 });
  return NextResponse.json({ action: data }, { status: 201, headers: privateHeaders });
}

export async function PATCH(req: Request) {
  const access = await portfolioAccess(req);
  if (!access) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const { db, userId } = access;
  const body = await req.json().catch(() => null);
  if (typeof body?.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) {
    return NextResponse.json({ error: "Action ID is required" }, { status: 400 });
  }
  const { data: existing } = await db.from("portfolio_lease_actions").select("lease_id")
    .eq("id", body.id).eq("user_id", userId).maybeSingle();
  if (!existing) return NextResponse.json({ error: "Action not found" }, { status: 404 });
  const { data: lease } = await db.from("portfolio_leases").select("id")
    .eq("id", existing.lease_id).eq("user_id", userId).is("deleted_at", null).maybeSingle();
  if (!lease) return NextResponse.json({ error: "Lease not found" }, { status: 404 });
  let updates: Record<string, string | null>;
  if (typeof body.completed === "boolean") {
    updates = { completed_at: body.completed ? new Date().toISOString() : null };
  } else {
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const ownerName = typeof body.ownerName === "string" ? body.ownerName.trim() : "";
    const sourceNote = typeof body.sourceNote === "string" ? body.sourceNote.trim() : "";
    const category = body.category;
    const dueDate = body.dueDate || null;
    if (title.length < 1 || title.length > 160 || ownerName.length < 1 || ownerName.length > 100
      || sourceNote.length > 500 || !categories.has(category) || (dueDate !== null && !validDate(dueDate))) {
      return NextResponse.json({ error: "Enter an action, owner, and a valid date if known" }, { status: 400 });
    }
    updates = { title, owner_name: ownerName, due_date: dueDate, source_note: sourceNote || null, category };
  }
  const { data, error } = await db.from("portfolio_lease_actions")
    .update(updates)
    .eq("id", body.id).eq("user_id", userId)
    .select("id,lease_id,title,owner_name,due_date,source_note,category,completed_at,created_at").maybeSingle();
  if (error) return NextResponse.json({ error: "Could not update lease action" }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Action not found" }, { status: 404 });
  return NextResponse.json({ action: data }, { headers: privateHeaders });
}
