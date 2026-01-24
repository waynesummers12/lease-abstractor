import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import Stripe from "npm:stripe@20.2.0";
import { supabase } from "../lib/supabase.ts";
import { generateAuditPdf } from "../utils/generateAuditPdf.ts";

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

  const rawBody = await ctx.request.body({ type: "text" }).value;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error("❌ Stripe webhook signature verification failed", err);
    ctx.response.status = 400;
    ctx.response.body = "Invalid signature";
    return;
  }

/* ------------------------------------------------------------
   HANDLE PAYMENT SUCCESS
------------------------------------------------------------- */

if (event.type === "checkout.session.completed") {
  const session = event.data.object as Stripe.Checkout.Session;

  const auditId = session.metadata?.auditId;
  const stripeSessionId = session.id;

  if (!auditId) {
    console.error("❌ Missing auditId in Stripe metadata");
  } else {
    console.log("💳 Stripe payment completed for audit:", auditId);

    /* ---------- MARK AUDIT AS PAID ---------- */
    const { error: updateError } = await supabase
      .from("lease_audits")
      .update({
        status: "paid",
        stripe_session_id: stripeSessionId,
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

          console.log("📄 PDF generated", {
  byteLength: pdfBytes?.length,
  type: pdfBytes?.constructor?.name,
});
          const pdfPath = `${auditId}.pdf`;

          /* ---------- UPLOAD PDF ---------- */
          const { error: uploadError } = await supabase.storage
            .from("leases")
            .upload(pdfPath, pdfBytes, {
              contentType: "application/pdf",
              upsert: true,
            });

          if (uploadError) {
            console.error("❌ Failed to upload audit PDF:", uploadError);
          } else {
            console.log("📄 Audit PDF uploaded:", pdfPath);

            /* ---------- SAVE PDF PATH (OPTIONAL BUT CLEAN) ---------- */
            const { error: pathError } = await supabase
              .from("lease_audits")
              .update({
                object_path: pdfPath,
              })
              .eq("id", auditId);

            if (pathError) {
              console.error("⚠️ Failed to save PDF path:", pathError);
            }
          }
        } catch (pdfErr) {
          console.error("❌ PDF generation/upload failed:", pdfErr);
        }
      }
    }
  }
}

/* ---------- ALWAYS ACK STRIPE ---------- */
ctx.response.status = 200;
ctx.response.body = { received: true };
});