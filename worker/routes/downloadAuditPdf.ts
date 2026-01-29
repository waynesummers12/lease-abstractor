// worker/routes/downloadAuditPdf.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router();

router.get("/downloadAuditPdf/:auditId", async (ctx) => {
  console.log("🔥 downloadAuditPdf hit", ctx.params.auditId);
  const auditId = ctx.params.auditId;

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing audit id" };
    return;
  }

  const { data, error } = await supabase
    .from("lease_audits")
    .select("audit_pdf_path")
    .eq("id", auditId)
    .maybeSingle();

  if (error || !data?.audit_pdf_path) {
    ctx.response.status = 404;
    ctx.response.body = { error: "PDF not ready" };
    return;
  }

  // audit_pdf_path example: "leases/<auditId>.pdf"
const fullPath = data.audit_pdf_path;

// Dynamically derive bucket + object path
const [bucket, ...pathParts] = fullPath.split("/");
const objectPath = pathParts.join("/");

const { data: signed, error: signedError } = await supabase.storage
  .from(bucket)
  .createSignedUrl(objectPath, 60 * 10);
  if (signedError || !signed?.signedUrl) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to create signed URL" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = { url: signed.signedUrl };
});

export default router;
