// worker/routes/downloadAuditPdf.ts
/**
 * WORKER ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Runtime:
 * - Deno + Oak
 *
 * Responsibilities:
 * - Business logic
 * - Supabase access
 * - PDF processing
 * - Stripe operations
 *
 * Forbidden:
 * - Frontend imports
 * - Next.js APIs
 *
 * This file must NEVER be imported by frontend code.
 */


import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router();

/**
 * GET /api/audits/:auditId/download
 */
router.get("/api/audits/:auditId/download", async (ctx) => {
  const auditId = ctx.params.auditId;

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing audit id" };
    return;
  }

  const { data, error } = await supabase
    .from("lease_audits")
    .select("audit_pdf_path")
    .eq("id", auditId)
    .single();

  if (error || !data?.audit_pdf_path) {
    ctx.response.status = 404;
    ctx.response.body = { error: "PDF not ready" };
    return;
  }

  // Stored value example: audit-pdfs/<auditId>.pdf has to be leases
  const filePath = data.audit_pdf_path.replace(/^leases\//, "");

  const { data: signed, error: signedError } = await supabase.storage
    .from("audit-pdfs")
    .createSignedUrl(filePath, 60 * 10);

  if (signedError || !signed?.signedUrl) {
    console.error("❌ Signed URL error:", signedError);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to create signed URL" };
    return;
  }

  ctx.response.body = { url: signed.signedUrl };
});

export default router;
