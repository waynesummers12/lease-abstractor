import Stripe from "npm:stripe@20.2.0";
import { supabase } from "../lib/supabase.ts";
import { generateAuditPdfV4 } from "./generateAuditPdf_v4.ts";
import { normalizeAuditForSuccess } from "./normalizeAuditForSuccess.ts";
import { sendAuditEmail } from "./sendAuditEmail.ts";

/** Safe to call again for the same paid Checkout Session. */
export async function fulfillPaidCheckout(session: Stripe.Checkout.Session) {
  if (session.mode !== "payment" || session.payment_status !== "paid") {
    throw new Error("Checkout session is not paid");
  }
  const auditId = session.metadata?.auditId;
  if (!auditId || !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(auditId)) {
    throw new Error("Paid checkout is missing a valid audit ID");
  }

  const { data: audit, error: readError } = await supabase.from("lease_audits")
    .select("id,status,analysis,stripe_session_id,audit_pdf_path")
    .eq("id", auditId).single();
  if (readError || !audit) throw readError ?? new Error("Audit not found");
  if (audit.stripe_session_id && audit.stripe_session_id !== session.id) {
    throw new Error("Audit is linked to another payment session");
  }
  const paymentFields = {
    stripe_session_id: session.id,
    paid_at: new Date().toISOString(),
    amount_paid: session.amount_total,
    currency: session.currency,
  };
  const matchingSession = audit.stripe_session_id
    ? { column: "stripe_session_id", value: session.id }
    : null;
  if (audit.status === "complete" && audit.audit_pdf_path) {
    if (audit.stripe_session_id === session.id) return;
    let query = supabase.from("lease_audits").update(paymentFields).eq("id", auditId);
    query = matchingSession ? query.eq(matchingSession.column, matchingSession.value)
      : query.is("stripe_session_id", null);
    const { data, error } = await query.select("id").maybeSingle();
    if (error || !data) throw error ?? new Error("Completed audit payment was not recorded");
    return;
  }
  if (!audit.analysis) throw new Error("Paid audit is missing analysis");

  // Record Stripe's actual payment before attempting the report. A failed report
  // leaves a recoverable paid audit rather than an unrecorded payment.
  let paymentQuery = supabase.from("lease_audits")
    .update({
      status: "paid",
      ...paymentFields,
    })
    .eq("id", auditId)
    .in("status", ["analyzed", "paid", "error", "complete"]);
  paymentQuery = matchingSession ? paymentQuery.eq(matchingSession.column, matchingSession.value)
    : paymentQuery.is("stripe_session_id", null);
  const { data: recorded, error: paymentError } = await paymentQuery.select("id").maybeSingle();
  if (paymentError || !recorded) throw paymentError ?? new Error("Payment was not recorded");

  const normalized = normalizeAuditForSuccess(audit.analysis);
  if (!normalized) throw new Error("Paid audit analysis could not be normalized");
  const exposureRange = {
    low: normalized.rollup.camEscalation.low + normalized.rollup.capitalItems.low + normalized.rollup.managementFees.low,
    high: normalized.rollup.camEscalation.high + normalized.rollup.capitalItems.high + normalized.rollup.managementFees.high,
  };
  const pdf = await generateAuditPdfV4({ ...normalized, exposureRange });
  if (!pdf?.length) throw new Error("Paid audit PDF is empty");

  const objectPath = `${auditId}.pdf`;
  const { error: uploadError } = await supabase.storage.from("audit-pdfs")
    .upload(objectPath, pdf, { contentType: "application/pdf", upsert: true });
  if (uploadError) throw uploadError;

  const { data: completed, error: completeError } = await supabase.from("lease_audits")
    .update({ status: "complete", audit_pdf_path: objectPath,
      object_path: objectPath, completed_at: new Date().toISOString() })
    .eq("id", auditId).eq("stripe_session_id", session.id).eq("status", "paid")
    .select("id").maybeSingle();
  if (completeError) throw completeError;
  if (!completed) {
    const { data: current, error } = await supabase.from("lease_audits")
      .select("status,audit_pdf_path,stripe_session_id").eq("id", auditId).single();
    if (error || current?.status !== "complete" || !current.audit_pdf_path ||
        current.stripe_session_id !== session.id) {
      throw error ?? new Error("Report completion was not recorded");
    }
    return; // Another delivery finished while this attempt generated the PDF.
  }

  // Delivery and referral tracking are secondary to granting report access.
  const referrer = session.metadata?.referrer_code;
  if (referrer && referrer !== "none") {
    const amountPaid = (session.amount_total ?? 0) / 100;
    const { error } = await supabase.from("referrals").insert({
      audit_id: auditId, referrer_code: referrer,
      amount_paid: amountPaid, commission: amountPaid * 0.2,
    });
    if (error) console.error("Referral recording failed", { auditId, error });
  }

  const recipient = session.customer_details?.email ?? session.customer_email;
  if (recipient) {
    const { data: signed, error } = await supabase.storage.from("audit-pdfs")
      .createSignedUrl(objectPath, 60 * 10);
    if (error || !signed?.signedUrl) {
      console.error("Audit email link creation failed", { auditId, error });
    } else {
      try {
        await sendAuditEmail({ leaseName: "Your Lease Audit", signedUrl: signed.signedUrl, toEmail: recipient });
      } catch (error) {
        console.error("Audit email failed", { auditId, error });
      }
    }
  }
}
