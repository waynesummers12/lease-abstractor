// worker/routes/auditById.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { normalizeAuditForSuccess } from "../utils/normalizeAuditForSuccess.ts";

const router = new Router();

router.get("/auditById/:auditId", async (ctx) => {
  const auditId = ctx.params.auditId;

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "auditId required" };
    return;
  }

  // 🔑 Try BOTH id and audit_id — only one will exist
  const { data: audit, error } = await supabase
    .from("lease_audits")
    .select("id, audit_id, status, analysis, audit_pdf_path")
    .or(`id.eq.${auditId},audit_id.eq.${auditId}`)
    .maybeSingle();

  if (error) {
    console.error("❌ Supabase query error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Database query failed" };
    return;
  }

  if (!audit) {
    console.warn("⚠️ Audit not found:", auditId);
    ctx.response.status = 404;
    ctx.response.body = { error: "Audit not found" };
    return;
  }

  console.log("🔥 auditById hit:", {
    id: audit.id,
    audit_id: audit.audit_id,
    status: audit.status,
    hasAnalysis: !!audit.analysis,
  });

  const normalizedAnalysis = audit.analysis
    ? normalizeAuditForSuccess(audit.analysis)
    : null;

  let signedUrl: string | null = null;

  if (audit.status === "complete" && audit.audit_pdf_path) {
    const objectPath = audit.audit_pdf_path.replace(/^audit-pdfs\//, "");

    const { data: signed, error: signError } = await supabase.storage
      .from("audit-pdfs")
      .createSignedUrl(objectPath, 60 * 60);

    if (!signError) {
      signedUrl = signed?.signedUrl ?? null;
    }
  }

  ctx.response.status = 200;
  ctx.response.body = {
    id: audit.id,
    audit_id: audit.audit_id,
    status: audit.status,
    analysis: normalizedAnalysis,
    signedUrl,
  };
});

export default router;


