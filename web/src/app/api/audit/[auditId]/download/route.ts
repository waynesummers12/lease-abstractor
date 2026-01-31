// web/src/app/api/audit/[auditId]/download/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { auditId: string } }
) {
  const { auditId } = params;

  if (!auditId) {
    return NextResponse.json(
      { error: "Missing auditId" },
      { status: 400 }
    );
  }

  // 1) Fetch audit row
  const { data: audit, error } = await supabaseServer
    .from("lease_audits")
    .select("audit_pdf_path")
    .eq("id", auditId)
    .single();

  if (error || !audit?.audit_pdf_path) {
    console.error("❌ Audit lookup failed", { error, auditId });
    return NextResponse.json(
      { error: "Audit not found or PDF not ready" },
      { status: 404 }
    );
  }

  const rawPath = audit.audit_pdf_path;
  const bucket = rawPath.startsWith("audit-pdfs/")
    ? "audit-pdfs"
    : rawPath.startsWith("leases/")
    ? "leases"
    : "audit-pdfs";

  const objectName = rawPath.replace(/^[^/]+\//, "");
  console.log("🔑 Signing PDF", { auditId, bucket, objectName, rawPath });

  const { data: signed, error: signError } =
    await supabaseServer.storage
      .from(bucket)
      .createSignedUrl(objectName, 60 * 5);

  if (signError || !signed?.signedUrl) {
    console.error("❌ Signed URL error", { signError, bucket, objectName });
    return NextResponse.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    );
  }

  // 3) Return signed URL
  return NextResponse.json({
    signedUrl: signed.signedUrl,
  });
}
