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

  // 1️⃣ Load audit
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

  // 2️⃣ Generate signed URL
  const filePath = audit.audit_pdf_path.replace(/^audit-pdfs\//, "");

  const { data: signed, error: signError } =
    await supabaseServer.storage
      .from("audit-pdfs")
      .createSignedUrl(filePath, 60 * 5); // 5 min

  if (signError || !signed?.signedUrl) {
    return NextResponse.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    );
  }

  // 3️⃣ Return signed URL
  return NextResponse.json({
    signedUrl: signed.signedUrl,
  });
}

