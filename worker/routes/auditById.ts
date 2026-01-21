import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { createAuditPdfSignedUrl } from "../utils/createAuditPdfSignedUrl.ts";

const router = new Router();

/**
 * GET /api/audits/:auditId
 *
 * Deterministic audit fetch for success page
 * NO AUTH
 * NO SESSION
 * UUID ONLY
 */
router.get("/api/audits/:auditId", async (ctx) => {
  const auditId = ctx.params.auditId;

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing auditId" };
    return;
  }

  const { data: audit, error } = await supabase
    .from("lease_audits")
    .select(
      `
      id,
      status,
      analysis,
      pdf_path
    `
    )
    .eq("id", auditId)
    .single();

  if (error || !audit) {
    ctx.response.status = 404;
    ctx.response.body = { error: "Audit not found" };
    return;
  }

  let signedUrl: string | null = null;

  if (audit.status === "paid" && audit.pdf_path) {
    signedUrl = await createAuditPdfSignedUrl(audit.pdf_path);
  }

  ctx.response.status = 200;
  ctx.response.body = {
    analysis: audit.analysis,
    signedUrl,
  };
});

export default router;
