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

/**
 * GET /downloadAuditPdf/:auditId
 */
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
    .maybeSingle();

  if (
    error ||
    !data ||
    data.status !== "complete" ||
    !data.audit_pdf_path
  ) {
    ctx.response.status = 404;
    ctx.response.body = { error: "PDF not ready" };
    return;
  }

  // Stored value is "<auditId>.pdf"
  const fileName = data.audit_pdf_path;

  const { data: signed, error: signedError } =
    await supabase.storage
      .from("audit-pdfs")
      .createSignedUrl(fileName, 60 * 10);

  if (signedError || !signed?.signedUrl) {
    console.error("❌ Failed to sign PDF:", signedError);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to create signed URL" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = { url: signed.signedUrl };
});

export default router;
