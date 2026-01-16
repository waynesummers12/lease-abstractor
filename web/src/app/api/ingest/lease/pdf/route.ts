// src/app/api/ingest/lease/pdf/route.ts
//
// Purpose:
// - Trigger lease parsing after a PDF is uploaded to Supabase Storage
// - Forward the storage object path to the Deno worker
//
// Constraints:
// - This route does NOT parse PDFs
// - This route does NOT read file contents
// - This route only signals the worker to process the uploaded file

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const WORKER_URL = process.env.LEASE_WORKER_URL;
    const WORKER_KEY = process.env.LEASE_WORKER_KEY;

    if (!WORKER_URL || !WORKER_KEY) {
      console.error("❌ Missing worker config");
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { objectPath } = body;

    if (!objectPath) {
      return NextResponse.json(
        { error: "Missing objectPath" },
        { status: 400 }
      );
    }

    const workerRes = await fetch(`${WORKER_URL}/ingest/lease/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-worker-key": WORKER_KEY,
      },
      body: JSON.stringify({ objectPath }),
    });

    const data = await workerRes.json();

    if (!workerRes.ok) {
      console.error("❌ Worker lease ingest failed:", data);
      return NextResponse.json(
        { error: data?.error || "Lease ingest failed" },
        { status: workerRes.status }
      );
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("❌ /api/ingest/lease/pdf error:", err);
    return NextResponse.json(
      { error: err?.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
