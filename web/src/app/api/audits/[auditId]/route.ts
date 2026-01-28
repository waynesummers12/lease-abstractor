import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ auditId: string }> }
): Promise<Response> {
  const { auditId } = await context.params;

  const { data, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("id", auditId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}


