// web/src/app/api/audits/[auditId]/download/route.ts

import { NextResponse } from "next/server";
import { canReadAudit, workerProof } from "@/lib/server/auditAccess";

export const dynamic = "force-dynamic";

/**
 * DOWNLOAD API ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Purpose:
 * - Proxy download requests to Worker
 * - Return signed PDF URL
 *
 * Rules:
 * - No Supabase usage
 * - No Stripe usage
 * - No business logic
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
  const path = `/downloadAuditPdf/${encodeURIComponent(auditId)}`;
  const proof = await workerProof("GET", path);
  if (!proof) return NextResponse.json({ error: "PDF unavailable" }, { status: 503 });

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
      { error: res.status === 503 ? "Report temporarily unavailable" : "PDF not ready" },
      { status: res.status === 503 ? 503 : 404 }
    );
  }

  const data = await res.json();

  return NextResponse.json(data, { headers: { "Cache-Control": "private, no-store" } });
}
