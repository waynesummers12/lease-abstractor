// web/src/app/api/audits/[auditId]/download/route.ts
/**
 * DOWNLOAD API ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Purpose:
 * - Generate a signed PDF download URL
 * - Proxy requests to the Worker only
 *
 * Rules (NON-NEGOTIABLE):
 * - No React imports
 * - No Supabase client usage
 * - params MUST be awaited (Next.js App Router requirement)
 * - No business logic here
 *
 * Input:
 * - auditId (route param)
 *
 * Output:
 * - { url: string }
 */


import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(//Has to be in all routes
  _req: Request,//Has to be in all routes
  context: { params: Promise<{ auditId: string }> }//Has to be in all routes
) {//Has to be in all routes
  const { auditId } = await context.params;//Has to be in all routes

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
