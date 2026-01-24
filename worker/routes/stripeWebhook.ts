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

  /* ---------------- RAW BODY (OAK v12 SAFE) ---------------- */
  const rawBody = await ctx.request.body({ type: "text" }).value;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Stripe webhook signature verification failed", err);
    ctx.response.status = 400;
    ctx.response.body = "Invalid signature";
    return;
  }

  /* --------------------------------------------------------
     PAYMENT COMPLETED
  --------------------------------------------------------- */
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const auditId = session.metadata?.auditId;

    if (!auditId) {
      console.error("❌ Missing auditId in Stripe metadata");
    } else {
      console.log("💳 Stripe payment completed for audit:", auditId);

      /* ---------- MARK AUDIT AS PAID ---------- */
      const { error: updateError } = await supabase
        .from("lease_audits")
        .update({
          status: "paid",
          stripe_session_id: session.id,
        })
        .eq("id", auditId);

      if (updateError) {
        console.error("❌ Failed to mark audit as paid:", updateError);
      } else {
        console.log("✅ Audit marked as paid:", auditId);

        /* ---------- FETCH ANALYSIS ---------- */
        const { data, error: fetchError } = await supabase
          .from("lease_audits")
          .select("analysis")
          .eq("id", auditId)
          .single();

        if (fetchError || !data?.analysis) {
          console.error("❌ Missing analysis for paid audit:", auditId);
        } else {
          try {
            /* ---------- GENERATE PDF ---------- */
            console.log("🧠 Generating audit PDF…");

            const pdfBytes = await generateAuditPdf(data.analysis);

            if (!pdfBytes || pdfBytes.length === 0) {
              console.error("❌ PDF generation returned empty output");
              throw new Error("Empty PDF");
            }

            console.log("📄 PDF generated:", pdfBytes.length, "bytes");

            const fileName = `${auditId}.pdf`;
            const bucket = "audit-pdfs";
            const objectPath = `${bucket}/${fileName}`;

            /* ---------- UPLOAD TO STORAGE ---------- */
            console.log("☁️ Uploading PDF to Supabase Storage:", objectPath);

            const { error: uploadError } = await supabase.storage
              .from(bucket)
              .upload(fileName, pdfBytes, {
                contentType: "application/pdf",
                upsert: true,
              });

            if (uploadError) {
              console.error("❌ Failed to upload audit PDF:", uploadError);
              throw uploadError;
            }

            console.log("✅ Audit PDF uploaded");

            /* ---------- SAVE OBJECT PATH ---------- */
            const { error: pathError } = await supabase
              .from("lease_audits")
              .update({ object_path: objectPath })
              .eq("id", auditId);

            if (pathError) {
              console.error("⚠️ Failed to save PDF object path:", pathError);
            }

            /* ---------- SIGNED URL + EMAIL ---------- */
            const { data: signed, error: signedError } =
              await supabase.storage
                .from(bucket)
                .createSignedUrl(fileName, 60 * 10);

            if (signedError || !signed?.signedUrl) {
              console.error("❌ Failed to create signed URL", signedError);
            } else {
              await sendAuditEmail({
  leaseName: "Your Lease Audit",
  signedUrl: signed.signedUrl,
  toEmail:
    session.customer_details?.email ??
    session.customer_email ??
    null,
});

            }
          } catch (err) {
            console.error("❌ PDF generation pipeline failed:", err);
          }
        }
      }
    }
  }

  /* ---------- ALWAYS ACK STRIPE ---------- */
  ctx.response.status = 200;
  ctx.response.body = { received: true };
});

export default router;

