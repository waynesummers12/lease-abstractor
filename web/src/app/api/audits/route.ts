// web/src/app/api/audits/[auditId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

/* ---------------------------------
   GET — poll for analysis result
---------------------------------- */
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
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json(
      { success: false, status: "analysis_pending", auditId },
      { status: 200 }
    );
  }

  if (!data.analysis) {
    return NextResponse.json(
      { success: false, status: "analysis_pending", auditId },
      { status: 200 }
    );
  }

  return NextResponse.json({
    success: true,
    status: "analysis_ready",
    auditId,
    analysis: data.analysis,
  });
}

/* ---------------------------------
   POST — create audit record
---------------------------------- */
export async function POST(req: NextRequest) {
  try {
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
        status: "created",
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, auditId });
  } catch (err) {
    console.error("POST /api/audits failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

