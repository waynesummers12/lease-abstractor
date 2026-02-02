// web/src/app/api/audits/[auditId]/download/route.ts

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * DOWNLOAD API ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Purpose:
 * - Generate a signed PDF download URL
 * - Thin proxy to Worker only
 *
 * Rules (NON-NEGOTIABLE):
 * - params MUST be awaited (Next.js App Router)
 * - No React imports
 * - No Supabase client usage
 * - No Stripe SDK usage
 * - No business logic
 *
 * Input:
 * - auditId (route param)
 *
 * Output:
 * - { url: string }
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
    `${process.env.NEXT_PUBLIC_WORKER_URL}/downloadAuditPdf/${auditId}`,
    {
      headers: {
        "X-Lease-Worker-Key": process.env.NEXT_PUBLIC_WORKER_KEY!,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "PDF not ready" },
      { status: 404 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
