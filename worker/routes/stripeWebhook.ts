// worker/routes/stripeWebhook.ts
/**
 * STRIPE WEBHOOK — SAVEONLEASE V1 (LOCKED)
 *
 * ABSOLUTE RULES:
 * - Must be registered BEFORE any body middleware
 * - Signature verification is mandatory
 *
 * DO NOT:
 * - Add logging that mutates body
 * - Change event parsing
 * - Move this route
 *
 * Violations break fulfillment silently.
 */

import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";
import { supabase } from "../lib/supabase.ts";
import { generateAuditPdfV4 as generateAuditPdf } from "../utils/generateAuditPdf_v4.ts";
import { normalizeAuditForSuccess } from "../utils/normalizeAuditForSuccess.ts";
import { sendAuditEmail } from "../utils/sendAuditEmail.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {});

/* ---------- ENV FLAGS ---------- */
const isLocal = Deno.env.get("ENV") === "local";
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

/* ---------- SAFETY CHECK ---------- */
if (!endpointSecret && !isLocal) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET");
}

const router = new Router();

router.post("/stripe/webhook", async (ctx) => {
  console.log("🔥 Stripe webhook hit");

  /* --------------------------------------------------
     READ RAW BODY (OAK v12 – CORRECT)
  -------------------------------------------------- */
  const body = ctx.request.body({ type: "text" });
const rawBody = await body.value;

  if (!rawBody || typeof rawBody !== "string") {
    ctx.throw(400, "Empty or invalid webhook body");
  }

  // ✅ DECLARE ONCE
  let event: Stripe.Event;

  /* --------------------------------------------------
     LOCAL DEV MODE — TRUST STRIPE CLI
  -------------------------------------------------- */
  if (isLocal) {
    console.log("⚠️ DEV MODE: skipping Stripe signature verification");

    try {
      event = JSON.parse(rawBody) as Stripe.Event;
    } catch (err) {
      console.error("❌ Failed to parse webhook body (local)", err);
      ctx.response.status = 400;
      return;
    }
  } else {
    /* --------------------------------------------------
       PRODUCTION — VERIFY SIGNATURE (DENO SAFE)
    -------------------------------------------------- */
    const sig = ctx.request.headers.get("stripe-signature");

    if (!sig || typeof sig !== "string") {
      ctx.response.status = 400;
      ctx.response.body = "Missing stripe-signature";
      return;
    }

    try {
      event = await stripe.webhooks.constructEventAsync(
        rawBody,
        sig,
        endpointSecret as string
      );
    } catch (err) {
      console.error("❌ Stripe signature verification failed:", err);
      ctx.response.status = 400;
      ctx.response.body = "Webhook Error";
      return;
    }
  }

  /* --------------------------------------------------
     EVENT HANDLING
  -------------------------------------------------- */
  console.log("✅ Stripe event received:", event.type);

  if (event.type === "checkout.session.completed") {
    console.log("💳 checkout.session.completed received");

    const session = event.data.object as Stripe.Checkout.Session;
    const auditId = session.metadata?.auditId ?? null;

    console.log("🧾 auditId:", auditId);

    if (!auditId) {
      console.warn("⚠️ No auditId on session");
      ctx.response.status = 200;
      ctx.response.body = { received: true };
      return;
    }

    /* --------------------------------------------------
       1) MARK AUDIT PAID
    -------------------------------------------------- */
    await supabase
      .from("lease_audits")
      .update({
        status: "paid",
        stripe_session_id: session.id,
        paid_at: new Date().toISOString(),
      })
      .eq("id", auditId);

    console.log("✅ Audit marked paid:", auditId);

    /* --------------------------------------------------
       OPTIONAL: RECORD REFERRAL COMMISSION
       (SAFE — DOES NOT AFFECT PAYMENT FLOW)
    -------------------------------------------------- */

    try {
      const referrer = session.metadata?.referrer_code ?? "none";

      if (referrer && referrer !== "none") {
        const amountPaid = (session.amount_total ?? 0) / 100;
        const commission = amountPaid * 0.20;

        await supabase.from("referrals").insert({
          audit_id: auditId,
          referrer_code: referrer,
          amount_paid: amountPaid,
          commission,
        });

        console.log("💰 Referral recorded:", referrer, commission);
      }
    } catch (err) {
      console.error("⚠️ Referral tracking failed (non‑blocking):", err);
    }

    /* --------------------------------------------------
       2) FETCH ANALYSIS
    -------------------------------------------------- */
    const { data, error } = await supabase
      .from("lease_audits")
      .select("analysis")
      .eq("id", auditId)
      .single();

    if (error || !data?.analysis) {
      console.error("❌ Missing analysis for audit:", auditId, error);
      ctx.response.status = 200;
      return;
    }

    /* --------------------------------------------------
       3) GENERATE + UPLOAD PDF
    -------------------------------------------------- */
    console.log("🧠 Generating audit PDF…");
    console.log("🧠 PDF generation starting for audit:", auditId);

    const normalized = normalizeAuditForSuccess(data.analysis);

if (!normalized) {
  console.error("❌ Failed to normalize audit analysis:", auditId);
  ctx.response.status = 200;
  return;
}

const exposureRange = {
  low:
    normalized.rollup.camEscalation.low +
    normalized.rollup.capitalItems.low +
    normalized.rollup.managementFees.low,

  high:
    normalized.rollup.camEscalation.high +
    normalized.rollup.capitalItems.high +
    normalized.rollup.managementFees.high,
};

const pdfBytes = await generateAuditPdf({
  ...normalized,
  exposureRange,
});
    console.log("📄 PDF bytes length:", pdfBytes?.length ?? 0);

    if (!pdfBytes || pdfBytes.length === 0) {
      console.error("❌ PDF generation failed:", auditId);
      ctx.response.status = 200;
      return;
    }

    const fileName = `${auditId}.pdf`;
const objectPath = fileName;

const { error: uploadError } = await supabase.storage
  .from("audit-pdfs")
  .upload(objectPath, pdfBytes, {
    contentType: "application/pdf",
    upsert: true,
  });

if (uploadError) {
  console.error("❌ PDF upload failed:", uploadError);
  ctx.response.status = 200;
  return;
}

    /* --------------------------------------------------
       4) SAVE PATH + MARK COMPLETE
    -------------------------------------------------- */
    await supabase
  .from("lease_audits")
  .update({
    status: "complete",
    audit_pdf_path: objectPath,
    object_path: objectPath,
    completed_at: new Date().toISOString(),
  })
  .eq("id", auditId);

    const { data: verify } = await supabase
      .from("lease_audits")
      .select("status, audit_pdf_path, object_path")
      .eq("id", auditId)
      .single();

    console.log("🔎 Post-complete audit state:", verify);

    console.log("✅ Audit marked complete:", auditId);

    /* --------------------------------------------------
       5) CREATE SIGNED URL + EMAIL
    -------------------------------------------------- */
    const { data: signed, error: signedError } = await supabase.storage
      .from("audit-pdfs")
      .createSignedUrl(objectPath, 60 * 10);

    if (signedError || !signed?.signedUrl) {
      console.error("❌ Failed to create signed URL:", signedError);
      ctx.response.status = 200;
      return;
    }

    try {
      await sendAuditEmail({
        leaseName: "Your Lease Audit",
        signedUrl: signed.signedUrl,
        toEmail:
          session.customer_details?.email ??
          session.customer_email ??
          null,
      });
      console.log("📧 Audit email sent:", auditId);
    } catch (err) {
      console.error("⚠️ Email send failed (audit still complete):", err);
    }
  }

  ctx.response.status = 200;
  ctx.response.body = { received: true };
});

export default router;
