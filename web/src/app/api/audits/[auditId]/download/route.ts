// src/app/api/audits/[auditId]/download/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Download handled by worker — disabled in web
 */
export async function GET() {
  return NextResponse.json(
    { error: "Download handled by worker" },
    { status: 503 }
  );
}


