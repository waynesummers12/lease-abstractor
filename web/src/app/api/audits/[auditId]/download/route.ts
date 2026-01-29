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

  const { data, error } = await supabase
    .from("lease_audits")
    .select("audit_pdf_path, object_path")
    .eq("id", auditId)
    .maybeSingle();

  if (error || (!data?.audit_pdf_path && !data?.object_path)) {
    ctx.response.status = 404;
    ctx.response.body = { error: "PDF not found for audit" };
    return;
  }

  const fullPath = data.audit_pdf_path ?? data.object_path;

  const [bucket, ...rest] = fullPath.split("/");
  const objectPath = rest.join("/");

  const { data: signed, error: signError } =
    await supabase.storage
      .from(bucket)
      .createSignedUrl(objectPath, 60 * 10);

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
