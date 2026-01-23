// worker/routes/auditById.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { normalizeAuditForSuccess } from "../utils/normalizeAuditForSuccess.ts";

const router = new Router();

console.log("✅ auditById route file loaded");

/**
 * GET /api/audits/:auditId
 *
 * Public, read-only endpoint for success page
 * UUID only, no auth
 */
router.get("/api/audits/:auditId", async (ctx) => {
  const auditId = ctx.params.auditId;

  console.log("🔥 auditById hit:", auditId);

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing auditId" };
    return;
  }

  const { data: audit, error } = await supabase
    .from("lease_audits")
    .select("id, status, analysis, object_path")
    .eq("id", auditId)
    .maybeSingle();

  if (error || !audit) {
    ctx.response.status = 404;
    ctx.response.body = { error: "Audit not found" };
    return;
  }

  let signedUrl: string | null = null;

  // Only generate PDF URL if audit is paid and file exists
  if (audit.status === "paid" && audit.object_path) {
    const { data, error: signError } = await supabase.storage
      .from("leases")
      .createSignedUrl(audit.object_path, 60 * 60);

    if (!signError && data?.signedUrl) {
      signedUrl = data.signedUrl;
    }
  }

  ctx.response.status = 200;
  ctx.response.body = {
    analysis: normalizeAuditForSuccess(audit.analysis),
    signedUrl,
  };
});

export default router;
