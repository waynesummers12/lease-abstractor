// worker/routes/auditPdf.ts
/**
 * WORKER ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Runtime:
 * - Deno + Oak
 *
 * Responsibilities:
 * - Business logic
 * - Supabase access
 * - PDF processing
 * - Stripe operations
 *
 * Forbidden:
 * - Frontend imports
 * - Next.js APIs
 *
 * This file must NEVER be imported by frontend code.
 */


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
  // deno-lint-ignore no-explicit-any
const body = await (ctx.request as any).body?.json?.()
  ?? (await ctx.request.body().value);
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
  let pdfBytes: Uint8Array;
  
  try {
    console.log("🧠 Starting PDF generation for audit", auditId);
    pdfBytes = await generateAuditPdf(audit.analysis);
  } catch (err) {
    console.error("❌ PDF generation failed for audit", auditId, err);
  
    await supabase
      .from("lease_audits")
      .update({
        status: "error",
      })
      .eq("id", auditId);
  
    ctx.response.status = 200;
    ctx.response.body = {
      success: false,
      error: "PDF generation failed",
    };
    return;
  }

  // --------------------
  // 4. Upload PDF (CORRECT PATH — NO PREFIX)
  // --------------------
  const objectPath = `audit-pdfs/${auditId}.pdf`;

  const { error: uploadError } = await supabase.storage
  .from("audit-pdfs")
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
      audit_pdf_path: objectPath,
      object_path: objectPath,
      status: "complete",
      completed_at: new Date().toISOString(),
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

