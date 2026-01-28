// NOTE: Support legacy PDFs stored under `object_path` (leases bucket)
// and newer PDFs stored under `audit_pdf_path` (audit-pdfs bucket)

import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const auditId = searchParams.get("auditId");

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

  const { data: signedUrl, error: signError } = await supabase.storage
    .from("audit-pdfs")
    .createSignedUrl(filePath, 3600);

  if (signError || !signedUrl?.signedUrl) {
    return NextResponse.json(
      { error: "Failed to generate download URL" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: signedUrl.signedUrl });
}


