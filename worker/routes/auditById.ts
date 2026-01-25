// worker/routes/auditById.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { normalizeAuditForSuccess } from "../utils/normalizeAuditForSuccess.ts";

const router = new Router();

console.log("✅ auditById route file loaded");

router.get("/auditById/:auditId", async (ctx) => {
  const auditId = ctx.params.auditId;

  console.log("🔥 auditById hit:", auditId);

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "auditId required" };
    return;
  }

  const { data: audit, error } = await supabase
    .from("lease_audits")
    .select("status, analysis, audit_pdf_path")
    .eq("id", auditId)
    .maybeSingle();

  if (error || !audit) {
    ctx.response.status = 404;
    ctx.response.body = { error: "Audit not found" };
    return;
  }

  let signedUrl: string | null = null;

  // Only expose PDF AFTER payment + generation
  if (audit.status === "complete" && audit.audit_pdf_path) {
    const { data } = await supabase.storage
      .from("audit-pdfs")
      .createSignedUrl(audit.audit_pdf_path, 60 * 60);

    signedUrl = data?.signedUrl ?? null;
  }

  ctx.response.status = 200;
  ctx.response.body = {
    analysis: audit.analysis
      ? normalizeAuditForSuccess(audit.analysis)
      : null,
    signedUrl,
  };
});

export default router;
