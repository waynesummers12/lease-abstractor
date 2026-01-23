// worker/routes/auditById.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { normalizeAuditForSuccess } from "../utils/normalizeAuditForSuccess.ts";

const router = new Router();
console.log("✅ auditById route file loaded");
router.get("/audits/:auditId", async (ctx) => {
  console.log("🔥 auditById hit:", ctx.params.auditId);

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

  if (audit.status === "paid" && audit.object_path) {
    const { data } = await supabase.storage
      .from("leases")
      .createSignedUrl(audit.object_path, 60 * 60);

    signedUrl = data?.signedUrl ?? null;
  }

  ctx.response.status = 200;
  ctx.response.body = {
    analysis: normalizeAuditForSuccess(audit.analysis),
    signedUrl,
  };
});

export default router;
