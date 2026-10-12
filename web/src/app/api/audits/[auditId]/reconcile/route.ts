import { NextResponse } from "next/server";
import { auditCapability, canReadAudit } from "@/lib/server/auditAccess";

export const dynamic = "force-dynamic";

export async function GET(req: Request, context: { params: Promise<{ auditId: string }> }) {
  const { auditId } = await context.params;
  if (!(await canReadAudit(req, auditId))) return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  const capability = await auditCapability(auditId);
  if (!capability) return NextResponse.json({ error: "Document analysis unavailable" }, { status: 503 });
  return NextResponse.json({ capability }, { headers: { "Cache-Control": "private, no-store" } });
}
