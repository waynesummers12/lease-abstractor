// web/src/app/api/audit/[auditId]/download/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
 
const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;

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

  // 1) Fetch audit row
  const { data: audit, error } = await supabaseServer
    .from("lease_audits")
    .select("audit_pdf_path")
    .eq("id", auditId)
    .single();

  if (error || !audit?.audit_pdf_path) {
    console.error("❌ Audit lookup failed", { error, auditId });
    return NextResponse.json(
      { error: "Audit not found or PDF not ready" },
      { status: 404 }
    );
  }

  const rawPath = audit.audit_pdf_path;
  const bucket = rawPath.startsWith("audit-pdfs/")
    ? "audit-pdfs"
    : rawPath.startsWith("leases/")
    ? "leases"
    : "audit-pdfs";

  const objectName = rawPath.replace(/^[^/]+\//, "");

  const attempts = [
    { bucket, key: objectName },
    { bucket, key: rawPath },
    { bucket: bucket === "audit-pdfs" ? "leases" : "audit-pdfs", key: objectName },
    { bucket: bucket === "audit-pdfs" ? "leases" : "audit-pdfs", key: rawPath },
    { bucket: "audit-pdfs", key: `${auditId}.pdf` },
  ];

  for (const attempt of attempts) {
    const { data: signed, error: signError } = await supabaseServer.storage
      .from(attempt.bucket)
      .createSignedUrl(attempt.key, 60 * 5);

    if (!signError && signed?.signedUrl) {
      console.log("🔑 Signed PDF", { auditId, bucket: attempt.bucket, objectName: attempt.key });
      return NextResponse.json({ signedUrl: signed.signedUrl });
    }

    console.error("❌ Signed URL error", {
      auditId,
      bucket: attempt.bucket,
      objectName: attempt.key,
      signError,
    });
  }

  if (workerUrl) {
    try {
      const res = await fetch(`${workerUrl}/downloadAuditPdf/${auditId}`);
      if (res.ok) {
        const json = await res.json();
        if (json?.signedUrl) {
          console.log("🔑 Signed via worker", { auditId });
          return NextResponse.json({ signedUrl: json.signedUrl });
        }
      } else {
        const text = await res.text();
        console.error("❌ Worker download failed", { auditId, status: res.status, text });
      }
    } catch (err) {
      console.error("❌ Worker download error", { auditId, err });
    }
  } else {
    console.error("❌ Worker URL missing; cannot fallback", { auditId });
  }

  return NextResponse.json(
    { error: "Failed to generate download link" },
    { status: 500 }
  );
}
