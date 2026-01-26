import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(
req: NextRequest,
{ params }: { params: Promise<{ auditId: string }> }
) {
const { auditId } = await params;

if (!auditId) {
return NextResponse.json({ error: "Missing auditId" }, { status: 400 });
}

const { data, error } = await supabaseServer
.from("lease_audits")
.select("audit_pdf_path")
.eq("id", auditId)
.single();

if (error || !data?.audit_pdf_path) {
return NextResponse.json({ error: "PDF not ready" }, { status: 404 });
}
const fileName = data.audit_pdf_path.replace(/^audit-pdfs//, "");

const { data: signedUrl, error: signError } = await supabaseServer
.storage
.from("audit-pdfs")
.createSignedUrl(fileName, 3600);

if (signError || !signedUrl?.signedUrl) {
return NextResponse.json({ error: "Failed to generate download URL" }, { status: 500 });
}

return NextResponse.json({ url: signedUrl.signedUrl });
}