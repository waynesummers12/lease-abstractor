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

  // 🔑 Canonical lookup: audit_pdf_path embeds the UUID
  const pdfPath = `leases/${auditId}.pdf`;

  const { data: audit, error } = await supabase
    .from("lease_audits")
    .select("id, status, analysis, audit_pdf_path")
    .eq("audit_pdf_path", pdfPath)
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
    status: audit.status,
    hasAnalysis: !!audit.analysis,
    audit_pdf_path: audit.audit_pdf_path,
  });

  const normalizedAnalysis = audit.analysis
    ? normalizeAuditForSuccess(audit.analysis)
    : null;

  let signedUrl: string | null = null;

  if (audit.status === "complete" && audit.audit_pdf_path) {
    const objectPath = audit.audit_pdf_path.replace(/^audit-pdfs\//, "");

    const { data: signed } = await supabase.storage
      .from("audit-pdfs")
      .createSignedUrl(objectPath, 60 * 60);

    signedUrl = signed?.signedUrl ?? null;
  }

  ctx.response.status = 200;
  ctx.response.body = {
    id: audit.id,
    status: audit.status,
    analysis: normalizedAnalysis,
    signedUrl,
  };
});

export default router;
