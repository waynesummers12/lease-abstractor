// src/app/api/audits/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const auditId = searchParams.get("auditId");

  // 🔹 If auditId is provided, return that audit
  if (auditId) {
    const { data, error } = await supabase
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

  // 🔹 Fallback (optional): return empty list or latest audits
  return NextResponse.json({ audits: [] });
}

