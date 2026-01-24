// worker/routes/stripeWebhook.ts
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";
import { supabase } from "../lib/supabase.ts";
import { generateAuditPdf } from "../utils/generateAuditPdf.ts";
import { sendAuditEmail } from "../utils/sendAuditEmail.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {});
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

const router = new Router();

router.post("/stripe/webhook", async (ctx) => {
  const sig = ctx.request.headers.get("stripe-signature");
  if (!sig) {
    ctx.response.status = 400;
    ctx.response.body = "Missing stripe-signature";
    return;
  }

  const rawBody = await ctx.request.body().value;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Stripe signature verification failed", err);
    ctx.response.status = 400;
    return;
  }

  /* -------------------- CHECKOUT COMPLETE -------------------- */
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

    const filePath = `audit-pdfs/${auditId}.pdf`;

    /* ---------- UPLOAD PDF ---------- */
    const { error: uploadError } = await supabase.storage
      .from("audit-pdfs")
      .upload(`${auditId}.pdf`, pdfBytes, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      console.error("❌ Failed to upload audit PDF:", uploadError);
      ctx.response.status = 200;
      return;
    }

    /* ---------- SAVE PATH ---------- */
    await supabase
      .from("lease_audits")
      .update({
        status: "complete",
        audit_pdf_path: filePath,
        completed_at: new Date().toISOString(),
      })
      .eq("id", auditId);

    /* ---------- EMAIL ---------- */
    const { data: signed } = await supabase.storage
      .from("audit-pdfs")
      .createSignedUrl(`${auditId}.pdf`, 60 * 10);

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

    console.log("✅ Audit PDF generated and stored:", filePath);
  }

  ctx.response.status = 200;
  ctx.response.body = { received: true };
});

export default router;
