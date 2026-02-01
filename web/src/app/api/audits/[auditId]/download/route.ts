import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ auditId: string }> }
): Promise<Response> {
  const { auditId } = await context.params;

  console.log("🔥 DOWNLOAD ROUTE HIT", auditId);

  if (!auditId) {
    return NextResponse.json(
      { error: "Missing auditId" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("lease_audits")
    .select("audit_pdf_path, object_path")
    .eq("id", auditId)
    .maybeSingle();

  if (error || (!data?.audit_pdf_path && !data?.object_path)) {
    console.error("❌ PDF path missing", { auditId, data, error });
    return NextResponse.json(
      { error: "PDF not ready" },
      { status: 404 }
    );
  }

  // ✅ Support BOTH historical fields
  const filePath = data.audit_pdf_path ?? data.object_path;

  const { data: signed, error: signError } = await supabase
    .storage
    .from("audit-pdfs") // ✅ CORRECT BUCKET
    .createSignedUrl(filePath, 3600);

  if (signError || !signed?.signedUrl) {
    console.error("❌ Signed URL failed", signError);
    return NextResponse.json(
      { error: "Failed to generate download URL" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: signed.signedUrl });
}
