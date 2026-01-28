// src/app/api/audits/[auditId]/download/route.ts

// src/app/api/audits/[auditId]/download/route.ts

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ auditId: string }> }
) {
  const { auditId } = await context.params;

  if (!auditId) {
    return NextResponse.json(
      { error: "Missing auditId" },
      { status: 400 }
    );
  }

  const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;

  if (!workerUrl) {
    return NextResponse.json(
      { error: "Worker URL not configured" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `${workerUrl}/audits/${auditId}/download`,
    { method: "GET" }
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: text || "Failed to fetch download URL" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}









