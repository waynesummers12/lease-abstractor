// web/src/app/api/audits/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Create audit via worker
 */
export async function POST(req: Request) {
  const body = await req.json();
  const { auditId } = body;

  if (!auditId) {
    return NextResponse.json({ error: "Missing auditId" }, { status: 400 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORKER_URL}/audits`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lease-Worker-Key": process.env.NEXT_PUBLIC_WORKER_KEY!,
      },
      body: JSON.stringify({ auditId }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to create audit" }, { status: 500 });
  }

  return NextResponse.json({ success: true, auditId });
}

