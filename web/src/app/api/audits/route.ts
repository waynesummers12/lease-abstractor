import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

/**
 * GET /api/audits/:auditId
 * Used by Step-3 polling to fetch analysis
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { auditId: string } }
) {
  const { auditId } = params;

  if (!auditId) {
    return NextResponse.json(
      { success: false, error: "Missing auditId" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("lease_audits")
    .select("analysis, status")
    .eq("id", auditId)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { success: false, status: "analysis_pending", auditId },
      { status: 404 }
    );
  }

  if (!data.analysis) {
    return NextResponse.json({
      success: false,
      status: "analysis_pending",
      auditId,
    });
  }

  return NextResponse.json({
    success: true,
    status: "analysis_ready",
    auditId,
    analysis: data.analysis,
  });
}

/**
 * POST /api/audits
 * Used to initialize audit row (keep this)
 */
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
