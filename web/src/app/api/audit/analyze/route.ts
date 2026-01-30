import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { auditId, objectPath } = await req.json();

    if (
      typeof auditId !== "string" ||
      typeof objectPath !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid auditId or objectPath" },
        { status: 400 }
      );
    }

    /* ---------- INSERT AUDIT ROW (CRITICAL) ---------- */
    const { error: insertError } = await supabaseServer
      .from("lease_audits")
      .insert({
        id: auditId,
        status: "pending",
        object_path: objectPath,
      });

    if (insertError) {
      console.error("Failed to insert audit:", insertError);
      return NextResponse.json(
        { error: "Failed to create audit record" },
        { status: 500 }
      );
    }

    /* ---------- CALL WORKER ---------- */
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

    const text = await res.text();

    if (!res.ok) {
      console.error("Worker ingest failed:", text);
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
