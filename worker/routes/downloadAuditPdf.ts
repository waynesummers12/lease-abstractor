// worker/routes/downloadAuditPdf.ts

import type { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";

export async function downloadAuditPdf(
  ctx: RouterContext<"/downloadAuditPdf/:auditId">
) {
  const auditId = ctx.params.auditId;

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing auditId" };
    return;
  }

  /* --------------------------------------------------
     FETCH AUDIT PDF PATH (POST-PROCESSED ONLY)
  -------------------------------------------------- */
  const { data, error } = await supabase
    .from("lease_audits")
    .select("audit_pdf_path, status")
    .eq("id", auditId)
    .single();

  if (error || !data?.audit_pdf_path) {
    ctx.response.status = 404;
    ctx.response.body = { error: "Audit PDF not ready" };
    return;
  }

  /* --------------------------------------------------
     SIGN AUDIT PDF (audit-pdfs BUCKET ONLY)
  -------------------------------------------------- */
  const bucket = "audit-pdfs";

  // audit_pdf_path is stored as: audit-pdfs/<auditId>.pdf
  const objectPath = data.audit_pdf_path.replace("audit-pdfs/", "");

  const { data: signed, error: signError } = await supabase.storage
    .from(bucket)
    .createSignedUrl(objectPath, 60 * 10);

  if (signError || !signed?.signedUrl) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to generate signed URL" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = {
    url: signed.signedUrl,
  };
}


