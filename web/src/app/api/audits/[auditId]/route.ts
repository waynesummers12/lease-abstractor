// web/src/app/api/audits/[auditId]/route.ts

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * NEXT.JS API ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Purpose:
 * - Fetch a single audit by ID
 * - Thin proxy to Worker only
 *
 * CRITICAL RULES (NON-NEGOTIABLE):
 * - params are ASYNC → MUST be awaited
 * - No business logic
 * - No Supabase client usage
 * - No Stripe SDK usage
 *
 * Allowed:
 * - fetch() to Worker
 * - Header forwarding only
 *
 * Forbidden:
 * - React imports
 * - Database access
 * - Any transformation logic
 */

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
