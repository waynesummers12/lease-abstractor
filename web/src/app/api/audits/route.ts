import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/audits hit");

    const body = await req.json();
    const { auditId, analysis } = body;

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
        status: "pending", // ✅ IMPORTANT: NOT paid yet
        analysis: analysis ?? null,
      });

    if (error) {
      console.error("Supabase insert failed:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/audits failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
