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

  const filePath = data.audit_pdf_path.replace(/^audit-pdfs\//, "");

  const { data: signed, error: signedError } = await supabase.storage
    .from("audit-pdfs")
    .createSignedUrl(filePath, 60 * 10);

  if (signedError || !signed?.signedUrl) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to create signed URL" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = { url: signed.signedUrl };
});

export default router;
