// worker/routes/auditById.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { normalizeAuditForSuccess } from "../utils/normalizeAuditForSuccess.ts";

const router = new Router();

router.get("/auditById/:auditId", async (ctx) => {
  const auditId = ctx.params.auditId;

  if (!auditId) {
    console.error("❌ Missing auditId param");
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
    hasPdfPath: !!audit.audit_pdf_path,
  });

  /* --------------------------------------------------
     Normalize analysis (ALWAYS returned when present)
  -------------------------------------------------- */
  const normalizedAnalysis = audit.analysis
    ? normalizeAuditForSuccess(audit.analysis)
    : null;

  /* --------------------------------------------------
     Only expose PDF if generation is COMPLETE
  -------------------------------------------------- */
  let signedUrl: string | null = null;

  if (audit.status === "complete" && audit.audit_pdf_path) {
    console.log("📄 Creating signed URL for PDF:", audit.audit_pdf_path);

    const objectPath = audit.audit_pdf_path.replace(/^audit-pdfs\//, "");

    const { data: signed, error: signError } = await supabase.storage
      .from("audit-pdfs")
      .createSignedUrl(objectPath, 60 * 60);

    if (signError) {
      console.error("❌ Signed URL error:", signError);
    } else {
      signedUrl = signed?.signedUrl ?? null;
      console.log("🔗 Signed URL created:", !!signedUrl);
    }
  } else {
    console.log(
      "ℹ️ PDF not available yet:",
      "status =", audit.status,
      "path =", audit.audit_pdf_path
    );
  }

  ctx.response.status = 200;
  ctx.response.body = {
    id: audit.id,
    status: audit.status,
    analysis: normalizedAnalysis,
    audit_pdf_path: audit.audit_pdf_path,
    signedUrl,
  };
});

export default router;

