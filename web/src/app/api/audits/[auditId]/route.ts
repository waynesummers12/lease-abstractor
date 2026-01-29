import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

  const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;
  const workerKey = process.env.NEXT_PUBLIC_WORKER_KEY;

  if (!workerUrl || !workerKey) {
    return NextResponse.json(
      { error: "Worker not configured" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `${workerUrl}/auditById/${auditId}`,
    {
      headers: {
        "X-Lease-Worker-Key": workerKey,
      },
      cache: "no-store",
    }
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
