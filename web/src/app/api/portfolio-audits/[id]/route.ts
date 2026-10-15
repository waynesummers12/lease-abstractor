import { NextResponse } from "next/server";
import { portfolioAccess } from "@/lib/server/portfolioAccess";

export const dynamic = "force-dynamic";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const access = await portfolioAccess(req);
  if (!access) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const { id } = await context.params;
  const { data: audit, error } = await access.db.from("lease_audits")
    .select("id,status,completed_at,portfolio_lease_id,analysis,audit_pdf_path,object_path")
    .eq("id", id).eq("user_id", access.userId).eq("status", "complete").maybeSingle();
  if (error) return NextResponse.json({ error: "Failed to load audit" }, { status: 500 });
  if (!audit) return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  let downloadUrl: string | null = null;
  if (audit.audit_pdf_path) {
    const path = audit.audit_pdf_path.replace(/^audit-pdfs\//, "").replace(/^leases\//, "");
    const { data } = await access.db.storage.from("audit-pdfs").createSignedUrl(path, 60 * 10);
    downloadUrl = data?.signedUrl ?? null;
  }
  const sourceDocuments: Array<{ label: string; url: string }> = [];
  if (audit.object_path?.startsWith(`leases/${id}.pdf`)) {
    const { data } = await access.db.storage.from("leases").createSignedUrl(audit.object_path, 60 * 10);
    if (data?.signedUrl) sourceDocuments.push({ label: "Uploaded lease", url: data.signedUrl });
  }
  const { data: uploads } = await access.db.storage.from("leases").list(`reconciliation/${id}`, { limit: 10 });
  for (const file of uploads ?? []) {
    if (!/^(statement|support-[1-4])\.pdf$/.test(file.name)) continue;
    const { data } = await access.db.storage.from("leases").createSignedUrl(`reconciliation/${id}/${file.name}`, 60 * 10);
    if (data?.signedUrl) sourceDocuments.push({ label: file.name === "statement.pdf" ? "Annual statement" : `Supporting PDF ${file.name.match(/\d/)?.[0]}`, url: data.signedUrl });
  }
  const { audit_pdf_path: _path, object_path: _sourcePath, ...safeAudit } = audit;
  void _path;
  void _sourcePath;
  return NextResponse.json({ audit: safeAudit, downloadUrl, sourceDocuments }, { headers: { "Cache-Control": "private, no-store" } });
}
