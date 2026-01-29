// src/app/api/audits/[auditId]/download/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { auditId: string } }
) {
  const { auditId } = params;

  if (!auditId) {
    return NextResponse.json(
      { error: "Missing auditId" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORKER_URL}/downloadAuditPdf/${auditId}`,
      {
        headers: {
          "X-Lease-Worker-Key": process.env.NEXT_PUBLIC_WORKER_KEY!,
        },
        cache: "no-store",
      }
    );

    const body = await res.json();

    if (!res.ok || !body?.signedUrl) {
      return NextResponse.json(
        { error: "Audit PDF not ready" },
        { status: res.status || 500 }
      );
    }

    return NextResponse.json(
      { signedUrl: body.signedUrl },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Download proxy failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch signed PDF URL" },
      { status: 500 }
    );
  }
}
