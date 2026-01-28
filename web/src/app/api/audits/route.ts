import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/audits hit");

    const body = await req.json();
    const { analysis } = body;

    if (!analysis) {
      return NextResponse.json(
        { error: "Missing analysis" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();

    const { data, error } = await supabase
      .from("lease_audits")
      .insert({
        status: "pending",
        analysis,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert failed:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      auditId: data.id,
    });
  } catch (err) {
    console.error("POST /api/audits failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
