import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/audits
 * Initialize audit row
 */

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { auditId } = body;

  if (!auditId) {
    return NextResponse.json(
      { error: "Missing auditId" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServer();

  const { error } = await supabase
    .from("lease_audits")
    .insert({
      id: auditId,
      status: "processing",
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, auditId });
}
