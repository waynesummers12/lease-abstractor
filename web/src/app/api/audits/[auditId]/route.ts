// src/app/api/audits/[auditId]/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Audit lookup handled by worker — disabled in web
 */
export async function GET() {
  return NextResponse.json(
    { error: "Audit lookup handled by worker" },
    { status: 503 }
  );
}





