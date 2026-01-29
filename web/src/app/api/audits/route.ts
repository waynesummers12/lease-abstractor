// web/src/app/api/audits/route.ts

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { auditId, filename, objectPath } = body;

    if (!auditId || !filename || !objectPath) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    const res = await fetch(`${workerUrl}/audits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-lease-worker-key": workerKey,
      },
      body: JSON.stringify({
        auditId,
        filename,
        objectPath,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: text || "Worker failed to create audit" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      success: true,
      auditId,
      data,
    });
  } catch (err: any) {
    console.error("POST /api/audits error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Unexpected server error" },
      { status: 500 }
    );
  }
}
