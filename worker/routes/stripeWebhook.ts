import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";
import { supabase } from "../lib/supabase.ts";
import { generateAuditPdf } from "../utils/generateAuditPdf.ts";
import { sendAuditEmail } from "../utils/sendAuditEmail.ts";
import { Buffer } from "node:buffer";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);

const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
const router = new Router();

/**
 * Stripe Webhook
 */
router.post("/api/stripe/webhook", async (ctx) => {
  console.log("🔥 Stripe webhook hit");

  const sig = ctx.request.headers.get("stripe-signature");
  if (!sig) {
    ctx.response.status = 400;
    ctx.response.body = "Missing stripe-signature";
    return;
  }

  // 🔑 IMPORTANT: raw body as Uint8Array
  const rawBody = await ctx.request.body({ type: "bytes" }).value;

  let event: Stripe.Event;

  try {
    // ✅ DENO-SAFE ASYNC VERIFIER
    const payload = Buffer.from(rawBody);

event = await stripe.webhooks.constructEventAsync(
  payload,
  sig,
  endpointSecret
);

  } catch (err) {
    console.error("❌ Stripe signature verification failed", err);
    ctx.response.status = 400;
    return;
  }

  /* --------------------------------------------------
     CHECKOUT COMPLETED
  -------------------------------------------------- */
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const auditId = session.metadata?.auditId;

    if (!auditId) {
      console.error("❌ Missing auditId in Stripe metadata");
      ctx.response.status = 200;
      return;
    }

    console.log("💳 Payment completed for audit:", auditId);

    /* ---------- MARK PAID ---------- */
    await supabase
      .from("lease_audits")
      .update({
        status: "paid",
        stripe_session_id: session.id,
        paid_at: new Date().toISOString(),
      })
      .eq("id", auditId);

    /* ---------- FETCH ANALYSIS ---------- */
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

    /* ---------- GENERATE PDF ---------- */
    console.log("🧠 Generating audit PDF…");
    const pdfBytes = await generateAuditPdf(data.analysis);

    if (!pdfBytes || pdfBytes.length === 0) {
      console.error("❌ PDF generation failed");
      ctx.response.status = 200;
      return;
    }

    const fileName = `${auditId}.pdf`;
    const storagePath = `audit-pdfs/${fileName}`;

    /* ---------- UPLOAD ---------- */
    const { error: uploadError } = await supabase.storage
      .from("audit-pdfs")
      .upload(fileName, pdfBytes, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      console.error("❌ Upload failed", uploadError);
      ctx.response.status = 200;
      return;
    }

    /* ---------- SAVE PATH ---------- */
    await supabase
      .from("lease_audits")
      .update({
        status: "complete",
        audit_pdf_path: storagePath,
        completed_at: new Date().toISOString(),
      })
      .eq("id", auditId);

    /* ---------- EMAIL ---------- */
    const { data: signed } = await supabase.storage
      .from("audit-pdfs")
      .createSignedUrl(fileName, 60 * 10);

    if (signed?.signedUrl) {
      await sendAuditEmail({
        leaseName: "Your Lease Audit",
        signedUrl: signed.signedUrl,
        toEmail:
          session.customer_details?.email ??
          session.customer_email ??
          null,
      });
    }

    console.log("✅ Audit PDF generated & stored:", storagePath);
  }

  ctx.response.status = 200;
  ctx.response.body = { received: true };
});

export default router;
