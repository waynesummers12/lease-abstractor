// worker/routes/auditPdf.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { generateAuditPdf } from "../utils/generateAuditPdf.ts";

const router = new Router({
  prefix: "/audit",
});

router.post("/generate-pdf", async (ctx) => {
  const body = await ctx.request.body({ type: "json" }).value;
  const { auditId } = body;

  if (!auditId) {
    ctx.throw(400, "Missing auditId");
  }

  const { data: audit, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("id", auditId)
    .single();

  if (error || !audit) {
    ctx.throw(404, "Audit not found");
  }

  const pdfBytes = await generateAuditPdf(audit.analysis);

  const path = `audits/${auditId}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from("audit-pdfs")
    .upload(path, pdfBytes, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadError) {
    ctx.throw(500, uploadError.message);
  }

  await supabase
    .from("lease_audits")
    .update({ pdf_path: path })
    .eq("id", auditId);

  ctx.response.body = {
    success: true,
    pdf_path: path,
  };
});

export default router;
