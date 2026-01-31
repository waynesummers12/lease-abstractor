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

  // 🔒 canonical filenames we support
  const candidates = [
    `${auditId}.pdf`,
    `leases/${auditId}.pdf`,
    `audit-pdfs/${auditId}.pdf`,
  ];

  let signedUrl: string | null = null;
  let lastError: unknown = null;

  for (const path of candidates) {
    const objectName = path.replace(/^audit-pdfs\//, "");

    const { data, error } = await supabaseServer.storage
      .from("audit-pdfs")
      .createSignedUrl(objectName, 60 * 10);

    if (data?.signedUrl) {
      signedUrl = data.signedUrl;
      break;
    }

    lastError = error;
  }

  if (!signedUrl) {
    console.error("❌ Failed to sign PDF", {
      auditId,
      lastError,
    });

    return NextResponse.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: signedUrl });
}

