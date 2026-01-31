// web/src/app/api/audit/[auditId]/route.ts

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  context: { params: { auditId: string } }
) {
  const auditId = context.params.auditId;

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
    console.error("❌ Audit lookup failed", { auditId, error });
    return NextResponse.json(
      { error: "PDF not ready" },
      { status: 404 }
    );
  }

  // 2) Normalize path
  const rawPath = audit.audit_pdf_path;
  const bucket = rawPath.startsWith("audit-pdfs/")
    ? "audit-pdfs"
    : "audit-pdfs";

  const objectName = rawPath.replace(/^audit-pdfs\//, "");

  // 3) Signed URL
  const { data: signed, error: signError } =
    await supabaseServer.storage
      .from(bucket)
      .createSignedUrl(objectName, 60 * 10);

  if (signError || !signed?.signedUrl) {
    console.error("❌ Signed URL failed", signError);
    return NextResponse.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    url: signed.signedUrl,
  });
}



