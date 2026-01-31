// web/src/app/api/audit/[auditId]/download/route.ts

import { NextResponse } from "next/server";

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

  const workerUrl = process.env.WORKER_URL;

  if (!workerUrl) {
    return NextResponse.json(
      { error: "Worker not configured" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `${workerUrl}/audit/${auditId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Audit not found" },
      { status: 404 }
    );
  }

  const data = await res.json();

  if (!data?.signedUrl) {
    return NextResponse.json(
      { error: "PDF not ready" },
      { status: 404 }
    );
  }

  return NextResponse.json({ url: data.signedUrl });
}
