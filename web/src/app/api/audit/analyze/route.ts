// web/src/app/api/audit/analyze/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const auditId = formData.get("auditId") as string | null;
    const objectPath = formData.get("objectPath") as string | null;

    if (!auditId || !objectPath) {
      return NextResponse.json(
        { error: "Missing auditId or objectPath" },
        { status: 400 }
      );
    }

    const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;
    const workerKey = process.env.NEXT_PUBLIC_WORKER_KEY;

    if (!workerUrl || !workerKey) {
      return NextResponse.json(
        { error: "Worker not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(`${workerUrl}/ingest/lease/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lease-Worker-Key": workerKey,
      },
      body: JSON.stringify({
        auditId,
        objectPath,
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        { error: text || "Worker ingest failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Analyze route error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}


