// /Users/waynesmacbookpro13/lease-abstractor/web/src/app/api/audits/[auditId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { auditId: string } }
) {
  const { auditId } = params;

  if (!auditId) {
    return NextResponse.json(
      { error: "Missing auditId" },
      { status: 400 }
    );
  }

  try {
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

    // 🔑 IMPORTANT: return the raw row (no wrapping)
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("GET /api/audits/[auditId] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch audit" },
      { status: 500 }
    );
  }
}


