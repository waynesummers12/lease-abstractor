// worker/routes/ingestLeasePdf.ts
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
import pdfParse from "npm:pdf-parse@1.1.1";
import { abstractLease } from "../utils/abstractLease.ts";
import { normalizeAuditForSuccess } from "../utils/normalizeAuditForSuccess.ts";
import { supabase } from "../lib/supabase.ts";

const router = new Router({
  prefix: "/ingest/lease",
});

router.post("/pdf", async (ctx) => {
  try {
    const body = ctx.request.body({ type: "form-data" });
    const form = await body.value.read();

    const file = form.files?.[0];
    const auditId = form.fields?.auditId;
    const objectPathField = form.fields?.objectPath;

    if (!file || !auditId) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing file or auditId" };
      return;
    }

    const objectPath =
      objectPathField && typeof objectPathField === "string"
        ? objectPathField.replace(/^\//, "")
        : `${auditId}.pdf`;

    console.info("[ingest] uploading lease pdf", { objectPath });

    const fileBuffer = file.content
      ? new Uint8Array(file.content)
      : await Deno.readFile(file.filename!);

    // 1️⃣ Upload PDF to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("leases")
      .upload(objectPath, fileBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      throw new Error("Failed to upload lease PDF");
    }

    // 2️⃣ Extract text
    const parsed = await pdfParse(fileBuffer);
    const leaseText = parsed.text;

    if (!leaseText?.trim()) {
      throw new Error("No text extracted from lease PDF");
    }

    console.info("[ingest] extracted lease text", {
      length: leaseText.length,
    });

    // 3️⃣ Analyze lease
    const rawAnalysis = abstractLease(leaseText);
    const normalized = normalizeAuditForSuccess(rawAnalysis);

    // 4️⃣ Persist audit + analysis (✅ CORRECT COLUMN)
    const { error: dbError } = await supabase
  .from("lease_audits")
  .upsert({
    id: auditId,
    // objectPath already includes "leases/..."
    audit_pdf_path: objectPath,
    analysis: normalized,
    status: "analyzed",
    created_at: new Date().toISOString(),
  });


    if (dbError) {
      console.error("❌ DB update failed:", dbError);
      throw new Error("Failed to save analysis");
    }

    console.log("✅ Lease ingest complete:", auditId);

    ctx.response.status = 200;
    ctx.response.body = { success: true, auditId };
  } catch (err) {
  const message =
    err instanceof Error ? err.message : String(err);

  console.error("❌ LEASE INGEST ERROR:", err);

  ctx.response.status = 500;
  ctx.response.body = {
    error: "Lease ingest failed",
    details: message,
  };
}


});

export default router;
