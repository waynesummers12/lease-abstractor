// web/src/app/api/audits/[auditId]/download/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * TEMPORARILY DISABLED
 * Download is handled via worker in prod
 */
export async function GET() {
  return NextResponse.json(
    {
      error: "Download temporarily disabled in web",
    },
    { status: 503 }
  );
}

