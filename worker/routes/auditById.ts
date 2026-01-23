// worker/routes/auditById.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { normalizeAuditForSuccess } from "../utils/normalizeAuditForSuccess.ts";

const router = new Router();

console.log("✅ auditById route file loaded");

/**
 * GET /api/audits/:auditId
 *
 * Public, read-only endpoint for Success page
 * - No auth
 * - UUID only
 * - Poll-safe
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

  // Only allow PDF download after payment
  if (audit.status === "paid" && audit.object_path) {
    const { data, error: signError } = await supabase.storage
      .from("leases")
      .createSignedUrl(audit.object_path, 60 * 60); // 1 hour

    if (!signError && data?.signedUrl) {
      signedUrl = data.signedUrl;
    }
  }

  ctx.response.status = 200;
  ctx.response.body = {
    status: audit.status, // helpful for frontend
    analysis: audit.analysis
      ? normalizeAuditForSuccess(audit.analysis)
      : null,
    signedUrl,
  };
});

export default router;
