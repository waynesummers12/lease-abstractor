import { NextResponse } from "next/server";

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
      { error: "Worker request failed", detail: text },
      { status: res.status }
    );
  }

  const data = await res.json();

  return NextResponse.json(data, { status: 200 });
}
