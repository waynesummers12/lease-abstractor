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

  const { data: audit, error } = await supabase
    .from("lease_audits")
    .select("id, status, analysis, audit_pdf_path")
    .eq("id", auditId)
    .maybeSingle();

  if (error) {
    console.error("❌ auditById query error:", error);
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
    status: audit.status,
    hasAnalysis: !!audit.analysis,
  });

  const normalizedAnalysis = audit.analysis
    ? normalizeAuditForSuccess(audit.analysis)
    : null;

  ctx.response.status = 200;
  ctx.response.body = {
    analysis: normalizedAnalysis,
    status: audit.status,
  };
});

export default router;

