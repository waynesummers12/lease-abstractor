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

  const { data, error } = await supabaseServer
    .from("lease_audits")
    .select("audit_pdf_path")
    .eq("id", auditId)
    .single();

  if (error || !data?.audit_pdf_path) {
    return NextResponse.json(
      { error: "Audit PDF not available" },
      { status: 404 }
    );
  }

  const { data: signed, error: signError } =
    await supabaseServer.storage
      .from("audit-pdfs") // 🔴 MUST MATCH WORKER BUCKET
      .createSignedUrl(data.audit_pdf_path, 60 * 10);

  if (signError || !signed?.signedUrl) {
    return NextResponse.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    );
  }

  return NextResponse.json({ signedUrl: signed.signedUrl });
}
