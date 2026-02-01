// web/src/app/api/audits/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Create audit via worker
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { auditId } = body;

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
        { error: "Worker env vars not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(`${workerUrl}/audits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lease-Worker-Key": workerKey,
      },
      body: JSON.stringify({ auditId }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Worker failed to create audit", details: text },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, auditId });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected error creating audit" },
      { status: 500 }
    );
  }
}


