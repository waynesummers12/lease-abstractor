// worker/routes/downloadAuditPdf.ts
/**
 * WORKER ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Runtime:
 * - Deno + Oak
 *
 * Responsibilities:
 * - Fetch completed audit
 * - Generate signed PDF URL
 *
 * This route is called ONLY by the web API proxy.
 */

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { supabase } from "../lib/supabase.ts";
import Stripe from "npm:stripe@20.2.0";
import { fulfillPaidCheckout } from "../utils/fulfillPaidCheckout.ts";
import { normalizeAuditForSuccess } from "../utils/normalizeAuditForSuccess.ts";
import { generateAuditPdfV4 } from "../utils/generateAuditPdf_v4.ts";
import { readLeasePagesForReport } from "../utils/readLeasePagesForReport.ts";

const router = new Router();

router.get("/downloadAuditPdf/:auditId", async (ctx) => {
  const auditId = ctx.params.auditId;

  if (!auditId) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Missing auditId" };
    return;
  }

  const { data, error } = await supabase
    .from("lease_audits")
    .select("status, audit_pdf_path, stripe_session_id, analysis")
    .eq("id", auditId)
    .single();

  if (error || !data || data.status !== "complete" || !data.audit_pdf_path) {
    ctx.response.status = 404;
    ctx.response.body = { error: "PDF not ready" };
    return;
  }

  let pdfPath = data.audit_pdf_path;
  // Paid reports made by the older template contained unsupported dollar claims.
  // Replace one only when its original paid analysis is available.
  if (!pdfPath.endsWith(`${auditId}-v5.pdf`) && data.stripe_session_id && data.analysis) {
    try {
      const secret = Deno.env.get("STRIPE_SECRET_KEY");
      if (!secret) throw new Error("Stripe is not configured");
      const session = await new Stripe(secret).checkout.sessions.retrieve(data.stripe_session_id);
      if (session.metadata?.auditId !== auditId || session.payment_status !== "paid") {
        throw new Error("Stored payment could not be verified");
      }
      const normalized = normalizeAuditForSuccess(data.analysis);
      if (!normalized) throw new Error("Stored analysis could not be normalized");
      const newPath = `${auditId}-v5.pdf`;
      const sourcePages = await readLeasePagesForReport(auditId);
      const pdf = await generateAuditPdfV4({ ...normalized, audit_id: auditId, sourcePages });
      const { error: uploadError } = await supabase.storage.from("audit-pdfs")
        .upload(newPath, pdf, { contentType: "application/pdf", upsert: true });
      if (uploadError) throw uploadError;
      const { data: updated, error: updateError } = await supabase.from("lease_audits")
        .update({ audit_pdf_path: newPath, object_path: newPath })
        .eq("id", auditId).eq("status", "complete").eq("stripe_session_id", session.id)
        .select("audit_pdf_path").maybeSingle();
      if (updateError || !updated) throw updateError ?? new Error("Updated report was not recorded");
      pdfPath = newPath;
    } catch (refreshError) {
      console.error("Paid report refresh failed", { auditId, refreshError });
      ctx.response.status = 503;
      ctx.response.body = { error: "Updated report temporarily unavailable" };
      return;
    }
  }

  let bucket = pdfPath.startsWith("leases/") ? "leases" : "audit-pdfs";
  let fileName = pdfPath.replace(/^(audit-pdfs|leases)\//, "");
  const { data: file, error: fileError } = await supabase.storage.from(bucket).info(fileName);
  if (fileError && String(fileError.statusCode) !== "404") {
    ctx.response.status = 500;
    ctx.response.body = { error: "PDF temporarily unavailable" };
    return;
  }
  let signed: { signedUrl: string } | null = null;
  let signedError: unknown = fileError;
  if (file) {
    ({ data: signed, error: signedError } = await supabase.storage
      .from(bucket).createSignedUrl(fileName, 60 * 10));
  }

  if ((signedError || !signed?.signedUrl) && data.stripe_session_id) {
    try {
      const secret = Deno.env.get("STRIPE_SECRET_KEY");
      if (!secret) throw new Error("Stripe is not configured");
      const session = await new Stripe(secret).checkout.sessions.retrieve(data.stripe_session_id);
      if (session.metadata?.auditId !== auditId || session.payment_status !== "paid") {
        throw new Error("Stored payment could not be verified");
      }
      await fulfillPaidCheckout(session, { notifyCustomer: false, recordPaidAt: false });
      bucket = "audit-pdfs";
      fileName = `${auditId}-v5.pdf`;
      ({ data: signed, error: signedError } = await supabase.storage
        .from(bucket).createSignedUrl(fileName, 60 * 10));
    } catch (recoveryError) {
      console.error("Paid report recovery failed", { auditId, recoveryError });
    }
  }

  if (signedError || !signed?.signedUrl) {
    console.error("❌ Signed URL error:", signedError);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to create signed URL" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = { url: signed.signedUrl };
});

export default router;
