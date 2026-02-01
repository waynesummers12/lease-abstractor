import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ auditId: string }> }
): Promise<Response> {
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
    .select("object_path, audit_pdf_path")
    .eq("id", auditId)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json(
      { error: "Audit not found" },
      { status: 404 }
    );
  }

  // ✅ SUPPORT BOTH FIELDS
  const pdfPath = data.object_path || data.audit_pdf_path;

  if (!pdfPath) {
    return NextResponse.json(
      { error: "PDF not ready" },
      { status: 404 }
    );
  }

  // Normalize path if it includes bucket prefix
  const filePath = pdfPath.replace(/^audit-pdfs\//, "");

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
