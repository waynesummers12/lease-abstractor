// web/src/app/api/audit/[auditId]/download/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ auditId: string }> }
) {
  const { auditId } = await params;

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
    return NextResponse.json(
      { error: "Audit not found or PDF not ready" },
      { status: 404 }
    );
  }

  // audit_pdf_path is stored as: leases/{auditId}.pdf
  const objectName = audit.audit_pdf_path.replace(/^leases\//, "");

  // 2) Generate signed URL from the *correct bucket*
  const { data: signed, error: signError } =
    await supabaseServer.storage
      .from("leases")
      .createSignedUrl(objectName, 60 * 5);

  if (signError || !signed?.signedUrl) {
    console.error("❌ Signed URL error:", signError);
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
