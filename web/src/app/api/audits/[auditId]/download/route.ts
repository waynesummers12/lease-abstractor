// src/app/api/audits/[auditId]/download/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ auditId: string }> }
) {
  const { auditId } = await context.params;

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

    if (!res.ok) {
      return NextResponse.json(body, { status: res.status });
    }

    return NextResponse.json(
      { signedUrl: body.signedUrl },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch signed PDF URL" },
      { status: 500 }
    );
  }
}

