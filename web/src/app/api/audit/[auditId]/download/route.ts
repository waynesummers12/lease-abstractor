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
    // 1️⃣ Fetch audit row
    const { data, error } = await supabaseServer
      .from("lease_audits")
      .select("audit_pdf_path")
      .eq("id", auditId)
      .single();

    if (error || !data?.audit_pdf_path) {
      return NextResponse.json(
        { error: "Audit PDF not available" },
        { status: 404 }
      );
    }

    // 2️⃣ Generate signed URL
    const { data: signed, error: signError } =
      await supabaseServer.storage
        .from("leases")
        .createSignedUrl(data.audit_pdf_path, 60 * 10); // 10 min

    if (signError || !signed?.signedUrl) {
      return NextResponse.json(
        { error: "Failed to generate download URL" },
        { status: 500 }
      );
    }

    // 3️⃣ Return JSON (contract-safe)
    return NextResponse.json(
      { url: signed.signedUrl },
      { status: 200 }
    );
  } catch (err) {
    console.error(
      "GET /api/audit/[auditId]/download error:",
      err
    );
    return NextResponse.json(
      { error: "Failed to fetch download" },
      { status: 500 }
    );
  }
}
