import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

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
    .select("object_path")
    .eq("id", auditId)
    .single();

  if (error || !data?.object_path) {
    return NextResponse.json(
      { error: "PDF not ready" },
      { status: 404 }
    );
  }

  const { data: signedUrl, error: signError } = await supabaseServer
    .storage
    .from("audits")
    .createSignedUrl(data.object_path, 3600);

  if (signError || !signedUrl?.signedUrl) {
    return NextResponse.json(
      { error: "Failed to generate download URL" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: signedUrl.signedUrl });
}
