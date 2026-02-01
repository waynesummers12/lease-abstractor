// web/src/app/api/audits/[auditId]/download/route.ts
/**
 * DOWNLOAD API ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Purpose:
 * - Generate signed download URL
 * - Proxy to Worker only
 *
 * Rules:
 * - No React
 * - No Supabase client
 * - params MUST be awaited
 *
 * Output:
 * { url: string }
 * export async function GET(
  _req: Request,
  context: { params: Promise<{ auditId: string }> }
) {
  const { auditId } = await context.params;
}
 */



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
