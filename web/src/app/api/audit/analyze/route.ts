// web/src/app/api/audit/analyze/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { auditId, objectPath } = await req.json();

    if (!auditId || !objectPath) {
      return NextResponse.json(
        { error: "Missing auditId or objectPath" },
        { status: 400 }
      );
    }

    // ✅ CREATE ROW FIRST
    const { error: insertError } = await supabaseServer
      .from("lease_audits")
      .insert({
        id: auditId,
        status: "pending",
        object_path: objectPath,
      });

    if (insertError) {
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    const workerUrl = process.env.WORKER_URL;
    const workerKey = process.env.WORKER_KEY;

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
      body: JSON.stringify({ auditId, objectPath }),
    });

    if (!res.ok) {
      throw new Error(await res.text());
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
