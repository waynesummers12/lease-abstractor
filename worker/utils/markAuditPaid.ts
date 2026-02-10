import { supabase } from "../lib/supabase.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { generateAuditPdfV3 as generateAuditPdf } from "./generateAuditPdf_v3.ts";
import { normalizeAuditForSuccess } from "./normalizeAuditForSuccess.ts";


export async function markAuditPaid(
  session: Stripe.Checkout.Session
) {
  const auditId = session.metadata?.auditId;

  if (!auditId) {
    throw new Error("Missing auditId in Stripe metadata");
  }

  // 1️⃣ Load audit
  const { data: audit, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("id", auditId)
    .single();

  if (error || !audit) {
    throw new Error("Audit not found");
  }

  // 2️⃣ Normalize + generate PDF (V3)
  const normalized = normalizeAuditForSuccess(audit.analysis);

  if (!normalized) {
    throw new Error("Failed to normalize audit analysis");
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

  // 3️⃣ Upload PDF
  const objectPath = `leases/${auditId}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from("leases")
    .upload(objectPath, pdfBytes, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadError) {
    throw uploadError;
  }

  // 4️⃣ Mark audit paid + attach PDF
  const { error: updateError } = await supabase
    .from("lease_audits")
    .update({
      status: "paid",
      object_path: objectPath,
      paid_at: new Date().toISOString(),
    })
    .eq("id", auditId);

  if (updateError) {
    throw updateError;
  }

  console.log(`✅ Audit ${auditId} marked paid with PDF`);
}
