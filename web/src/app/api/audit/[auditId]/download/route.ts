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
    return NextResponse.json(
      { error: "Missing auditId" },
      { status: 400 }
    );
  }

  // 🔒 DO NOT TRUST DB PATH — WORKER IS SOURCE OF TRUTH
  const objectName = `${auditId}.pdf`;

  const { data: signed, error: signError } =
    await supabaseServer.storage
      .from("audit-pdfs")
      .createSignedUrl(objectName, 60 * 10);

  if (signError || !signed?.signedUrl) {
    console.error("❌ Signed URL failed", {
      auditId,
      signError,
    });

    return NextResponse.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: signed.signedUrl });
}
