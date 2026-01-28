import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { auditId: string } }
) {
  const auditId = params.auditId;

  if (!auditId) {
    return NextResponse.json({ error: "Missing auditId" }, { status: 400 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORKER_URL}/audit/${auditId}/download`,
    {
      headers: {
        "X-Lease-Worker-Key": process.env.NEXT_PUBLIC_WORKER_KEY!,
      },
      cache: "no-store",
    }
  );

  const body = await res.text();

  return new NextResponse(body, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}





