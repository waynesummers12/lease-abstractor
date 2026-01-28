import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

/* ---------- CREATE AUDIT ROW ---------- */
export async function POST(req: NextRequest) {
  try {
    const { auditId } = await req.json();

    if (!auditId) {
      return NextResponse.json(
        { error: "Missing auditId" },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from("lease_audits")
      .insert({
        id: auditId,
        status: "pending",          // ✅ NOT paid
        currency: "usd",
        object_path: null,          // ✅ allowed for pending
      });

    if (error) {
      console.error("❌ Failed to create audit row:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ /api/audits POST error:", err);
    return NextResponse.json(
      { error: err?.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}

/* ---------- READ AUDIT ---------- */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const auditId = searchParams.get("auditId");

  if (!auditId) {
    return NextResponse.json(
      { error: "Missing auditId" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseServer
    .from("lease_audits")
    .select("*")
    .eq("id", auditId)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Audit not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
