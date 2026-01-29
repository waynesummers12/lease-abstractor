// web/src/app/api/audits/route.ts

import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { filename } = await req.json();

    if (!filename) {
      return NextResponse.json(
        { error: "Missing filename" },
        { status: 400 }
      );
    }

    const auditId = randomUUID();

    const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;
    const workerKey = process.env.NEXT_PUBLIC_WORKER_KEY;

    if (!workerUrl || !workerKey) {
      return NextResponse.json(
        { error: "Worker not configured" },
        { status: 500 }
      );
    }

    // 🔁 Delegate audit creation to worker
    const res = await fetch(`${workerUrl}/audits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-lease-worker-key": workerKey,
      },
      body: JSON.stringify({
        auditId,
        filename,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: text || "Worker failed to create audit" },
        { status: res.status }
      );
    }

    return NextResponse.json({ auditId });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
