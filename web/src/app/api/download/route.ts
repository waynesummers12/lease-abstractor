// NOTE: Support legacy PDFs stored under `object_path` (leases bucket)
// and newer PDFs stored under `audit_pdf_path` (audit-pdfs bucket)

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
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
    .select("audit_pdf_path, object_path")
    .eq("id", auditId)
    .single();

  if (error || !data?.object_path) {
    return NextResponse.json(
      { error: "PDF not ready" },
      { status: 404 }
    );
  }

  const { data: signed, error: signError } = await supabase
    .storage
    .from("audits")
    .createSignedUrl(data.object_path, 3600);

  if (signError || !signed?.signedUrl) {
    return NextResponse.json(
      { error: "Failed to generate download URL" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: signed.signedUrl });
}

