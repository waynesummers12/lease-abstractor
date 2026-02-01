import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ auditId: string }> }
) {
  const { auditId } = await context.params;

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

  // audit_pdf_path is stored as: audit-pdfs/<filename>.pdf
  const filePath = data.audit_pdf_path.replace(/^audit-pdfs\//, "");

  const { data: signed, error: signError } = await supabase
    .storage
    .from("audit-pdfs")
    .createSignedUrl(filePath, 3600);

  if (signError || !signed?.signedUrl) {
    return NextResponse.json(
      { error: "Failed to generate download URL" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: signed.signedUrl });
}
