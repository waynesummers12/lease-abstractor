// web/src/app/api/audits/route.ts

/**
 * NEXT.JS API ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Purpose:
 * - Thin proxy ONLY
 * - Forward audit creation to Worker
 *
 * Rules:
 * - NO Supabase
 * - NO Stripe
 * - NO business logic
 * - JSON passthrough only
 */

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { auditId, objectPath } = body ?? {};

    if (!auditId || !objectPath) {
      return NextResponse.json(
        { error: "Missing auditId or objectPath" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORKER_URL}/audits`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lease-Worker-Key": process.env.NEXT_PUBLIC_WORKER_KEY!,
        },
        body: JSON.stringify({ auditId, objectPath }),
        cache: "no-store",
      }
    );

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        { error: text || "Worker failed to create audit" },
        { status: res.status }
      );
    }

    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("POST /api/audits failed", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
