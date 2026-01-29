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

  const bodyText = await res.text();

  // Pass through worker errors cleanly
  if (!res.ok) {
    return NextResponse.json(
      { error: bodyText },
      { status: res.status }
    );
  }

  return new NextResponse(bodyText, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
