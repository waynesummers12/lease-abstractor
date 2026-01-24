import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router();

/**
 * GET /api/audits/:auditId/download
 * Returns a signed URL for the audit PDF
 */
router.get("/api/audits/:auditId/download", async (ctx) => {
  const auditId = ctx.params.auditId;

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing auditId" };
    return;
  }

  const { data, error } = await supabase
    .from("lease_audits")
    .select("object_path")
    .eq("id", auditId)
    .single();

  if (error || !data?.object_path) {
    ctx.response.status = 404;
    ctx.response.body = { error: "PDF not ready" };
    return;
  }

  const fileName = data.object_path.replace(/^leases\//, "");

  const { data: signed, error: signedError } =
    await supabase.storage
      .from("leases")
      .createSignedUrl(fileName, 60 * 10);

  if (signedError || !signed?.signedUrl) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to generate signed URL" };
    return;
  }

  ctx.response.body = { url: signed.signedUrl };
});

export default router;
