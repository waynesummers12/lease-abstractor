import { NextResponse } from "next/server";
import { portfolioAccess } from "@/lib/server/portfolioAccess";

export const dynamic = "force-dynamic";
const privateHeaders = { "Cache-Control": "private, no-store" };

export async function GET(req: Request) {
  const access = await portfolioAccess(req);
  if (!access) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const { data, error } = await access.db.from("lease_audits")
    .select("id,status,created_at,completed_at,portfolio_lease_id,analysis")
    .eq("user_id", access.userId).eq("status", "complete")
    .order("completed_at", { ascending: false });
  if (error) return NextResponse.json({ error: "Failed to load audits" }, { status: 500 });
  return NextResponse.json({ audits: data }, { headers: privateHeaders });
}

export async function PATCH(req: Request) {
  const access = await portfolioAccess(req);
  if (!access) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const { auditId, portfolioLeaseId } = await req.json().catch(() => ({}));
  if (typeof auditId !== "string" || typeof portfolioLeaseId !== "string") {
    return NextResponse.json({ error: "Audit and lease are required" }, { status: 400 });
  }
  const { data: lease } = await access.db.from("portfolio_leases")
    .select("id").eq("id", portfolioLeaseId).eq("user_id", access.userId)
    .is("deleted_at", null).maybeSingle();
  if (!lease) return NextResponse.json({ error: "Lease not found" }, { status: 404 });
  const { data, error } = await access.db.from("lease_audits")
    .update({ portfolio_lease_id: portfolioLeaseId })
    .eq("id", auditId).eq("user_id", access.userId).eq("status", "complete")
    .select("id,portfolio_lease_id").maybeSingle();
  if (error) return NextResponse.json({ error: "Failed to link audit" }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  return NextResponse.json({ audit: data }, { headers: privateHeaders });
}
