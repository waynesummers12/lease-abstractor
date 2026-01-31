import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ auditId: string }> }
) {
  const { auditId } = await params;

  if (!auditId) {
    return NextResponse.json({ error: "Missing auditId" }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from("lease_audits")
    .select("audit_pdf_path")
    .eq("id", auditId)
    .single();

  console.log("🔎 Audit lookup:", { auditId, data, error });

  if (error || !data?.audit_pdf_path) {
    return NextResponse.json({ error: "PDF not ready" }, { status: 404 });
  }

  /**
   * IMPORTANT:
   * audit_pdf_path is stored as:
   *   audit-pdfs/<auditId>.pdf
   *
   * Supabase expects:
   *   bucket: audit-pdfs
   *   path:   <auditId>.pdf
   */
  const rawPath = data.audit_pdf_path;

// 🔥 HARD NORMALIZE — DB PATH IS WRONG
const objectName = rawPath.includes("/")
  ? rawPath.split("/").pop()!
  : rawPath;

const { data: signed, error: signError } =
  await supabaseServer.storage
    .from("audit-pdfs")
    .createSignedUrl(objectName, 60 * 10);

if (signError || !signed?.signedUrl) {
  return NextResponse.json(
    { error: "Failed to generate download link" },
    { status: 500 }
  );
}

return NextResponse.json({ url: signed.signedUrl });

}
