// worker/routes/auditPdf.ts

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { generateAuditPdf } from "../utils/generateAuditPdf.ts";

const router = new Router({
  prefix: "/audit",
});

router.post("/generate-pdf", async (ctx) => {
  // --------------------
  // 1. Parse request
  // --------------------
  const body = await ctx.request.body({ type: "json" }).value;
  const { auditId } = body;

  if (!auditId) {
    ctx.throw(400, "Missing auditId");
  }

  // --------------------
  // 2. Load audit record
  // --------------------
  const { data: audit, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("id", auditId)
    .single();

  if (error || !audit) {
    ctx.throw(404, "Audit not found");
  }

  if (!audit.analysis) {
    ctx.throw(400, "Audit analysis missing");
  }

  // --------------------
  // 3. Generate PDF
  // --------------------
  const pdfBytes = await generateAuditPdf(audit.analysis);

  // --------------------
  // 4. Upload PDF (CORRECT PATH — NO PREFIX)
  // --------------------
  const objectPath = `${auditId}.pdf`;

  const { error: uploadError } = await supabase.storage
  .from("leases")
  .upload(objectPath, pdfBytes, {
    contentType: "application/pdf",
    upsert: true, // ✅ required so retries don’t fail
    cacheControl: "3600",
  });

  if (uploadError) {
    ctx.throw(500, uploadError.message);
  }

  // --------------------
  // 5. Persist object_path (CRITICAL)
  // --------------------
  const { error: updateError } = await supabase
    .from("lease_audits")
    .update({
      object_path: objectPath,
    })
    .eq("id", auditId);

  if (updateError) {
    ctx.throw(500, updateError.message);
  }

  // --------------------
  // 6. Respond
  // --------------------
  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    object_path: objectPath,
  };
});

export default router;

