// worker/routes/auditById.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { normalizeAuditForSuccess } from "../utils/normalizeAuditForSuccess.ts";

const router = new Router();

console.log("✅ auditById route file loaded");

router.get("/api/audits/:auditId", async (ctx) => {
  const auditId = ctx.params.auditId;

  console.log("🔥 auditById hit:", auditId);

  const { data: audit, error } = await supabase
    .from("lease_audits")
    .select("status, analysis, object_path")
    .eq("id", auditId)
    .maybeSingle();

  if (error || !audit) {
    ctx.response.status = 404;
    return;
  }

  let signedUrl: string | null = null;

  if (audit.status === "paid" && audit.object_path) {
    const { data } = await supabase.storage
      .from("leases")
      .createSignedUrl(audit.object_path, 60 * 60);

    signedUrl = data?.signedUrl ?? null;
  }

  ctx.response.body = {
    analysis: audit.analysis
      ? normalizeAuditForSuccess(audit.analysis)
      : null,
    signedUrl,
  };
});

export default router;

