// web/src/app/api/audits/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * AUDITS COLLECTION ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Purpose:
 * - Create initial audit record
 *
 * Rules:
 * - POST ONLY
 * - NO params
 * - Proxy to Worker only
 *
 * Forbidden:
 * - Supabase
 * - Stripe
 * - React
 * - auditId params
 */
export async function POST(req: Request) {
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
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: text || "Failed to create audit" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
