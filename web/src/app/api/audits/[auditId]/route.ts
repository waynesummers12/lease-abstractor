// web/src/app/api/audits/[auditId]/route.ts
/**
 * NEXT.JS API ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Purpose:
 * - Thin proxy only
 * - No business logic
 * - No Supabase queries
 *
 * CRITICAL RULES:
 * - params are ASYNC → must be awaited
 * - Always use dynamic = "force-dynamic"
 *
 * Allowed:
 * - fetch() to Worker
 * - Header forwarding
 *
 * Forbidden:
 * - Supabase client
 * - Stripe SDK
 * - React imports
 */

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  context: { params: Promise<{ auditId: string }> }
) {
  const { auditId } = await context.params;

  if (!auditId) {
    return NextResponse.json(
      { error: "Missing auditId" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORKER_URL}/auditById/${auditId}`,
    {
      headers: {
        "X-Lease-Worker-Key": process.env.NEXT_PUBLIC_WORKER_KEY!,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Audit not found" },
      { status: res.status }
    );
  }

  const audit = await res.json();
  return NextResponse.json(audit);
}

