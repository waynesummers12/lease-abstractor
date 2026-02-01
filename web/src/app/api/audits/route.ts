// web/src/app/api/audits/route.ts
/**
 * WORKER ROUTE (DENO + OAK)
 * - Owns business logic
 * - Owns Supabase access
 * - Owns Stripe logic
 * - NEVER imported by frontend
 */

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { auditId: string } }
) {
  const { auditId } = params;

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
      { analysis: null },
      { status: 404 }
    );
  }

  const audit = await res.json();

  return NextResponse.json({
    analysis: audit.analysis,
    audit,
  });
}




