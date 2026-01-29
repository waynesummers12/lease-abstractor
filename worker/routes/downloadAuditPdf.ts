import type { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";

/**
 * GET /downloadAuditPdf/:auditId
 */
export async function downloadAuditPdf(
  ctx: RouterContext<"/downloadAuditPdf/:auditId">
) {
  const auditId = ctx.params.auditId;

  /* ---------- VALIDATION ---------- */
  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing auditId" };
    return;
  }

  /* ---------- FETCH audit_pdf_path ---------- */
  const { data, error } = await supabase
    .from("lease_audits")
    .select("audit_pdf_path")
    .eq("id", auditId)
    .single();

  if (error || !data?.audit_pdf_path) {
    console.error("❌ audit_pdf_path not found", error);
    ctx.response.status = 404;
    ctx.response.body = { error: "PDF not ready" };
    return;
  }

  /**
   * Example audit_pdf_path:
   *   "leases/<auditId>.pdf"
   */
  const fullPath = data.audit_pdf_path;
  const [bucket, ...rest] = fullPath.split("/");
  const objectPath = rest.join("/");

  console.log("📦 bucket:", bucket);
  console.log("📄 objectPath:", objectPath);

  /* ---------- CREATE SIGNED URL ---------- */
  const { data: signed, error: signError } =
    await supabase.storage
      .from(bucket)
      .createSignedUrl(objectPath, 60 * 10); // 10 minutes

  if (signError || !signed?.signedUrl) {
    console.error("❌ Failed to create signed URL", signError);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to create signed URL" };
    return;
  }

  /* ---------- SUCCESS ---------- */
  ctx.response.status = 200;
  ctx.response.body = {
    signedUrl: signed.signedUrl,
  };
}
