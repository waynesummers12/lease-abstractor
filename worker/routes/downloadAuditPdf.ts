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

  // FINAL SOURCE OF TRUTH
  // Stripe webhook always writes PDFs here
  const bucket = "audit-pdfs";
  const objectPath = `${auditId}.pdf`;

  const { data: signed, error } =
    await supabase.storage
      .from(bucket)
      .createSignedUrl(objectPath, 60 * 10);

  if (error || !signed?.signedUrl) {
    ctx.response.status = 404;
    ctx.response.body = { error: "PDF not ready" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = {
    signedUrl: signed.signedUrl,
  };
}
