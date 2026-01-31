// worker/routes/downloadAuditPdf.ts

import type { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../utils/supabaseClient.ts";
import { generateAuditPdf } from "../utils/generateAuditPdf.ts";

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
     1) Load audit row
     -------------------------------------------------- */
  const { data: audit, error } = await supabase
    .from("lease_audits")
    .select("analysis, audit_pdf_path, completed_at")
    .eq("id", auditId)
    .single();

  if (error || !audit?.analysis) {
    ctx.response.status = 404;
    ctx.response.body = { error: "Audit not found" };
    return;
  }

  /* --------------------------------------------------
     2) Generate PDF if missing
     -------------------------------------------------- */
  const bucket = "audit-pdfs";
  const objectPath = `${auditId}.pdf`;

  if (!audit.audit_pdf_path || !audit.completed_at) {
    console.log("🧠 Generating PDF on demand:", auditId);

    const pdfBytes = await generateAuditPdf(audit.analysis);

    if (!pdfBytes || pdfBytes.length === 0) {
      ctx.response.status = 500;
      ctx.response.body = { error: "PDF generation failed" };
      return;
    }

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(objectPath, pdfBytes, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      ctx.response.status = 500;
      ctx.response.body = { error: "PDF upload failed" };
      return;
    }

    await supabase
      .from("lease_audits")
      .update({
        audit_pdf_path: `audit-pdfs/${auditId}.pdf`,
        completed_at: new Date().toISOString(),
        status: "complete",
      })
      .eq("id", auditId);
  }

  /* --------------------------------------------------
     3) Sign + return
     -------------------------------------------------- */
  const { data, error: signError } = await supabase.storage
    .from(bucket)
    .createSignedUrl(objectPath, 60 * 10);

  if (signError || !data?.signedUrl) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to sign PDF" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = { signedUrl: data.signedUrl };
}
