import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { auditId: string } }
) {
  const auditId = params.auditId;

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
    `${workerUrl}/auditById/${auditId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: text || "Audit not ready" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
