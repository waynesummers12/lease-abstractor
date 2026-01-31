// web/src/app/api/audit/[auditId]/download/route.ts

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

  if (error || !data?.audit_pdf_path) {
    return NextResponse.json({ error: "PDF not ready" }, { status: 404 });
  }

  const rawPath = data.audit_pdf_path;

  // 🔒 HARD BUCKET RESOLUTION (this is the missing piece)
  let bucket: "audit-pdfs" | "leases";
  let objectPath: string;

  if (rawPath.startsWith("audit-pdfs/")) {
    bucket = "audit-pdfs";
    objectPath = rawPath.replace("audit-pdfs/", "");
  } else if (rawPath.startsWith("leases/")) {
    bucket = "leases";
    objectPath = rawPath.replace("leases/", "");
  } else {
    return NextResponse.json(
      { error: "Invalid PDF path" },
      { status: 500 }
    );
  }

  const { data: signed, error: signError } =
    await supabaseServer.storage
      .from(bucket)
      .createSignedUrl(objectPath, 60 * 10);

  if (signError || !signed?.signedUrl) {
    console.error("❌ Failed to sign PDF", {
      auditId,
      bucket,
      objectPath,
      signError,
    });

    return NextResponse.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: signed.signedUrl });
}
