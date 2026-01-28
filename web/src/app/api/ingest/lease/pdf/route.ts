// src/app/api/ingest/lease/pdf/route.ts

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const WORKER_URL = process.env.LEASE_WORKER_URL;
    const WORKER_KEY = process.env.LEASE_WORKER_KEY;

    if (!WORKER_URL || !WORKER_KEY) {
      console.error("❌ Missing worker config", {
        WORKER_URL: Boolean(WORKER_URL),
        WORKER_KEY: Boolean(WORKER_KEY),
      });

      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const { objectPath, auditId } = body ?? {};

    if (!objectPath || !auditId) {
      console.error("❌ Missing required fields", {
        objectPath,
        auditId,
      });

      return NextResponse.json(
        { error: "Missing objectPath or auditId" },
        { status: 400 }
      );
    }

    const workerRes = await fetch(`${WORKER_URL}/ingest/lease/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-lease-worker-key": WORKER_KEY,
      },
      body: JSON.stringify({ objectPath, auditId }),
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
