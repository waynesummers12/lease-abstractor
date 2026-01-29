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

  // The PDF lives at: leases/leases/<auditId>.pdf
  // Bucket = leases
  // Object path must be RELATIVE to bucket
  const bucket = "leases";
  const objectPath = `leases/${auditId}.pdf`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(objectPath, 60 * 10);

  if (error || !data?.signedUrl) {
    ctx.response.status = 404;
    ctx.response.body = { error: "PDF not ready" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = {
    signedUrl: data.signedUrl,
  };
}

