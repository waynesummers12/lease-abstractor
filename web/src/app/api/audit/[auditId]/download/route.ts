// web/src/app/api/audit/[auditId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  const { data, error } = await supabaseServer
    .from("lease_audits")
    .select(
      `
      id,
      status,
      completed_at,
      audit_pdf_path,
      stripe_session_id,
      created_at
    `
    )
    .eq("id", auditId)
    .single();

  if (error || !data) {
    console.error("❌ Audit lookup failed", { auditId, error });
    return NextResponse.json(
      { error: "Audit not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}


