import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { auditId } = await req.json();

    if (!auditId) {
      return NextResponse.json(
        { error: "auditId is required" },
        { status: 400 }
      );
    }

    const workerUrl = process.env.LEASE_WORKER_URL;
    const workerKey = process.env.LEASE_WORKER_KEY;

    if (!workerUrl || !workerKey) {
      return NextResponse.json(
        { error: "Worker not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(`${workerUrl}/checkout/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lease-Worker-Key": workerKey,
      },
      body: JSON.stringify({ auditId }),
    });

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        { error: text || "Checkout failed" },
        { status: res.status }
      );
    }

    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
