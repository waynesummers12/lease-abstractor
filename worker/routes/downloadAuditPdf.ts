// worker/routes/downloadAuditPdf.ts
/**
 * WORKER ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Runtime:
 * - Deno + Oak
 *
 * Responsibilities:
 * - Fetch completed audit
 * - Generate signed PDF URL
 *
 * This route is called ONLY by the web API proxy.
 */

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router();

router.get("/downloadAuditPdf/:auditId", async (ctx) => {
  const auditId = ctx.params.auditId;

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing auditId" };
    return;
  }

  const { data, error } = await supabase
    .from("lease_audits")
    .select("status, audit_pdf_path")
    .eq("id", auditId)
    .single();

  if (error || !data || data.status !== "complete" || !data.audit_pdf_path) {
    ctx.response.status = 404;
    ctx.response.body = { error: "PDF not ready" };
    return;
  }

  // audit_pdf_path is stored as: "audit-pdfs/<auditId>.pdf" OR "<auditId>.pdf"
  const fileName = data.audit_pdf_path.replace(/^audit-pdfs\//, "");

  const { data: signed, error: signedError } = await supabase.storage
    .from("audit-pdfs")
    .createSignedUrl(fileName, 60 * 10);

  if (signedError || !signed?.signedUrl) {
    console.error("❌ Signed URL error:", signedError);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to create signed URL" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = { url: signed.signedUrl };
});

export default router;
