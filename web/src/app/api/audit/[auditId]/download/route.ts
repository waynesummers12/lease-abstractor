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

  const { data: audit, error } = await supabaseServer
    .from("lease_audits")
    .select("audit_pdf_path, status")
    .eq("id", auditId)
    .single();

  if (error || !audit?.audit_pdf_path) {
    return NextResponse.json(
      { error: "Audit not found or PDF not ready" },
      { status: 404 }
    );
  }

  const objectPath = audit.audit_pdf_path.replace(/^audit-pdfs\//, "");

  const { data: signed, error: signError } =
    await supabaseServer.storage
      .from("audit-pdfs")
      .createSignedUrl(objectPath, 60 * 5);

  if (signError || !signed?.signedUrl) {
    return NextResponse.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    signedUrl: signed.signedUrl,
  });
}



