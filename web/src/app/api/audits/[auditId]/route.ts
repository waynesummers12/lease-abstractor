import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { auditId: string } }
) {
  const { auditId } = params;

  const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;

  const res = await fetch(
    `${workerUrl}/downloadAuditPdf/${auditId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: await res.text() },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
