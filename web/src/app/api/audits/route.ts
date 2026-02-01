// web/src/app/api/audits/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { auditId } = await req.json();

  if (!auditId) {
    return NextResponse.json(
      { error: "Missing auditId" },
      { status: 400 }
    );
  }

  // 🔑 CRITICAL: worker requires objectPath
  const objectPath = `leases/${auditId}.pdf`;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORKER_URL}/audits`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lease-Worker-Key": process.env.NEXT_PUBLIC_WORKER_KEY!,
      },
      body: JSON.stringify({
        auditId,
        objectPath,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Worker audit creation failed:", text);

    return NextResponse.json(
      { error: "Worker failed to create audit", details: text },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, auditId });
}
