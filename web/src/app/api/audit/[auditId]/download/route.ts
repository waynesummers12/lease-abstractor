// web/src/app/api/audit/[auditId]/download/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  const { data: audit, error } = await supabaseServer
    .from("lease_audits")
    .select("audit_pdf_path")
    .eq("id", auditId)
    .single();

  if (error || !audit?.audit_pdf_path) {
    return NextResponse.json(
      { error: "PDF not ready" },
      { status: 404 }
    );
  }

  // Invariant: always audit-pdfs/{auditId}.pdf
  const objectName = audit.audit_pdf_path.replace(/^audit-pdfs\//, "");

  const { data: signed, error: signError } =
    await supabaseServer.storage
      .from("audit-pdfs")
      .createSignedUrl(objectName, 60 * 5);

  if (signError || !signed?.signedUrl) {
    console.error("❌ Signed URL failed", {
      auditId,
      objectName,
      signError,
    });

    return NextResponse.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: signed.signedUrl });
}

