// worker/routes/auditById.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router();

/**
 * GET /api/audits/:id
 *
 * Returns minimal analysis for success page + signed PDF URL
 * Deterministic — no "latest", no tenant lookup
 */
router.get("/api/audits/:id", async (ctx) => {
  const auditId = ctx.params.id;

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing auditId" };
    return;
  }

  const { data, error } = await supabase
    .from("lease_audits")
    .select("analysis, object_path")
    .eq("id", auditId)
    .maybeSingle();

  if (error || !data || !data.object_path) {
    ctx.response.status = 404;
    ctx.response.body = { error: "Audit not found or not available" };
    return;
  }

  const { data: signed } = await supabase.storage
    .from("leases")
    .createSignedUrl(data.object_path, 60 * 60);

  ctx.response.status = 200;
  ctx.response.body = {
    analysis: data.analysis,
    signedUrl: signed?.signedUrl ?? null,
  };
});

export default router;
