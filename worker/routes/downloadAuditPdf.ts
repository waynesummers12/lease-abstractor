import type { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";

export async function downloadAuditPdf(
  ctx: RouterContext<"/downloadAuditPdf/:auditId">
) {
  const auditId = ctx.params.auditId;

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing auditId" };
    return;
  }

  // LIST files in the leases bucket root
  const { data: files, error: listError } =
    await supabase.storage
      .from("leases")
      .list("leases", { limit: 1000 });

  if (listError || !files) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to list storage files" };
    return;
  }

  const match = files.find(
    (f) => f.name === `${auditId}.pdf`
  );

  if (!match) {
    ctx.response.status = 404;
    ctx.response.body = { error: "PDF not ready" };
    return;
  }

  const { data: signed, error: signError } =
    await supabase.storage
      .from("leases")
      .createSignedUrl(`leases/${match.name}`, 60 * 10);

  if (signError || !signed?.signedUrl) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to create signed URL" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = {
    signedUrl: signed.signedUrl,
  };
}
