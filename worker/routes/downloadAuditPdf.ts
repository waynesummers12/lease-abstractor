import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router();

/**
 * GET /api/audits/:id/download
 */
router.get("/api/audits/:id/download", async (ctx) => {
  const auditId = ctx.params.id;

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing audit id" };
    return;
  }

  // fetch stored object path
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

  const { data: signed, error: signedError } =
    await supabase.storage
      .from("leases")
      .createSignedUrl(data.object_path.replace("leases/", ""), 60 * 10);

  if (signedError || !signed?.signedUrl) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to create signed URL" };
    return;
  }

  ctx.response.body = { url: signed.signedUrl };
});

export default router;
