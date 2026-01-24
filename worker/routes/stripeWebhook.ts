// worker/routes/stripeWebhook.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";
import { supabase } from "../lib/supabase.ts";
import { generateAuditPdf } from "../utils/generateAuditPdf.ts";
import { sendAuditEmail } from "../utils/sendAuditEmail.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {});
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
const isLocal = Deno.env.get("ENV") === "local";

const router = new Router();

router.post("/api/stripe/webhook", async (ctx) => {
  console.log("🔥 Stripe webhook hit");

  let event: Stripe.Event;

  /* --------------------------------------------------
     LOCAL DEV MODE — TRUST STRIPE CLI
     -------------------------------------------------- */
  if (isLocal) {
    console.log("⚠️ DEV MODE: skipping Stripe signature verification");
    const body = await ctx.request.body({ type: "json" }).value;
    event = body as Stripe.Event;
  } else {
    /* --------------------------------------------------
       PRODUCTION — VERIFY SIGNATURE
       -------------------------------------------------- */
    const sig = ctx.request.headers.get("stripe-signature");
    if (!sig) {
      ctx.response.status = 400;
      ctx.response.body = "Missing stripe-signature";
      return;
    }

    const rawText = await ctx.request.body({ type: "text" }).value;

    try {
      event = await stripe.webhooks.constructEventAsync(
        rawText,
        sig,
        endpointSecret
      );
    } catch (err) {
      console.error("❌ Stripe signature verification failed", err);
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

    const pdfBytes = await generateAuditPdf(data.analysis);
console.log("📦 PDF bytes length:", pdfBytes?.length);
    if (!pdfBytes || pdfBytes.length === 0) {
      console.error("❌ PDF generation failed:", auditId);
      ctx.response.status = 200;
      return;
    }

    const filePath = `audit-pdfs/${auditId}.pdf`;
    console.log("📄 Uploading PDF:", filePath);

    const { error: uploadError } = await supabase.storage
      .from("audit-pdfs")
      .upload(`${auditId}.pdf`, pdfBytes, {
        contentType: "application/pdf",
        upsert: true,
      });
console.log("📤 Upload result:", uploadError ?? "success");
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
        audit_pdf_path: filePath,
        completed_at: new Date().toISOString(),
      })
      .eq("id", auditId);

    console.log("✅ Audit marked complete:", auditId);

    /* --------------------------------------------------
       5) CREATE SIGNED URL + EMAIL
       -------------------------------------------------- */
    const { data: signed, error: signedError } = await supabase.storage
      .from("audit-pdfs")
      .createSignedUrl(`${auditId}.pdf`, 60 * 10);

    if (signedError || !signed?.signedUrl) {
      console.error("❌ Failed to create signed URL:", signedError);
      ctx.response.status = 200;
      return;
    }

    await sendAuditEmail({
      leaseName: "Your Lease Audit",
      signedUrl: signed.signedUrl,
      toEmail:
        session.customer_details?.email ??
        session.customer_email ??
        null,
    });

    console.log("📧 Audit email sent:", auditId);
  }

  ctx.response.status = 200;
  ctx.response.body = { received: true };
});

export default router;
