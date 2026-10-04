// web/src/app/api/audits/[auditId]/route.ts

import { NextResponse } from "next/server";
import { canReadAudit, workerProof } from "@/lib/server/auditAccess";

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
  req: Request,
  context: { params: Promise<{ auditId: string }> }
) {
  const { auditId } = await context.params;

  if (!auditId) {
    return NextResponse.json(
      { error: "Missing auditId" },
      { status: 400 }
    );
  }

  if (!(await canReadAudit(req, auditId))) {
    return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  }
  const path = `/auditById/${encodeURIComponent(auditId)}`;
  const proof = await workerProof("GET", path);
  if (!proof) return NextResponse.json({ error: "Audit unavailable" }, { status: 503 });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORKER_URL}${path}`,
    {
      headers: {
        "X-Audit-Proxy-Proof": proof,
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
  return NextResponse.json(audit, { headers: { "Cache-Control": "private, no-store" } });
}
