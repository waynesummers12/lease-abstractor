import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: { auditId: string } }
): Promise<Response> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("id", params.auditId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

