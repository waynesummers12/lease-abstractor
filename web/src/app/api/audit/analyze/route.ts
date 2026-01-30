// web/src/app/api/audit/analyze/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const auditId = formData.get("auditId") as string | null;

    if (!file || !auditId) {
      return NextResponse.json(
        { error: "Missing file or auditId" },
        { status: 400 }
      );
    }

    // Convert File → ArrayBuffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Call WORKER ingest endpoint
    const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;
    const workerKey = process.env.NEXT_PUBLIC_WORKER_KEY;

    if (!workerUrl || !workerKey) {
      throw new Error("Worker not configured");
    }

    const res = await fetch(`${workerUrl}/ingest/lease/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lease-Worker-Key": workerKey,
      },
      body: JSON.stringify({
        auditId,
        fileBase64: buffer.toString("base64"),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Worker ingest failed");
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[analyze] error", err);
    return NextResponse.json(
      { error: err.message || "Analyze failed" },
      { status: 500 }
    );
  }
}

