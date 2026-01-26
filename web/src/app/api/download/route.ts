// NOTE: Support legacy PDFs stored under `object_path` (leases bucket)
// and newer PDFs stored under `audit_pdf_path` (audit-pdfs bucket)

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const auditId = searchParams.get("auditId");

  if (!auditId) {
    return NextResponse.json({ error: "Missing auditId" }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from("lease_audits")
    .select("audit_pdf_path, object_path")
    .eq("id", auditId)
    .single();

  if (error) {
    return NextResponse.json({ error: "PDF lookup failed" }, { status: 500 });
  }

  const path = data?.audit_pdf_path ?? data?.object_path;
  if (!path) {
    return NextResponse.json({ error: "PDF not ready" }, { status: 404 });
  }

  const isAuditBucket = Boolean(data?.audit_pdf_path);
  const bucket = isAuditBucket ? "audit-pdfs" : "leases";
  const objectName = isAuditBucket
    ? path.replace(/^audit-pdfs\//, "")
    : path.replace(/^leases\//, "");

  const { data: signedUrl, error: signError } = await supabaseServer.storage
    .from(bucket)
    .createSignedUrl(objectName, 3600);

  if (signError || !signedUrl?.signedUrl) {
    return NextResponse.json({ error: "Failed to generate download URL" }, { status: 500 });
  }

  return NextResponse.json({ url: signedUrl.signedUrl });
}
