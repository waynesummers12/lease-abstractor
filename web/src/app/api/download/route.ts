// web/src/app/api/audit/[auditId]/download/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { auditId: string } }
) {
  const { auditId } = params;

  if (!auditId) {
    return NextResponse.json(
      { error: "Missing auditId" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("lease_audits")
    .select("audit_pdf_path")
    .eq("id", auditId)
    .single();

  if (error || !data?.audit_pdf_path) {
    return NextResponse.json(
      { error: "PDF not ready" },
      { status: 404 }
    );
  }

  const filePath = data.audit_pdf_path.replace(/^audit-pdfs\//, "");

  const { data: signed, error: signError } = await supabase
    .storage
    .from("audit-pdfs")
    .createSignedUrl(filePath, 60 * 5);

  if (signError || !signed?.signedUrl) {
    return NextResponse.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: signed.signedUrl });
}
