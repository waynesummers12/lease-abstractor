// src/app/api/audits/[auditId]/download/route.ts

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // ⬅️ critical

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

  const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;

  if (!workerUrl) {
    return NextResponse.json(
      { error: "Worker URL not configured" },
      { status: 500 }
    );
  }

  // 🔁 Proxy request to backend worker
  const res = await fetch(
    `${workerUrl}/audits/${auditId}/download`,
    {
      method: "GET",
    }
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






