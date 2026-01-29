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

  // PDF IS STORED IN: bucket = leases, path = leases/<auditId>.pdf
  const bucket = "leases";
  const rawPath = `leases/${auditId}.pdf`;

  // IMPORTANT: Supabase expects object path *relative to bucket*
  const objectPath = rawPath.replace(/^leases\//, "");

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



