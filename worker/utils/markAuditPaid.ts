import { supabase } from "../utils/supabaseClient.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { generateAuditPdf } from "./generateAuditPdf.ts";


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

  // 2️⃣ Generate PDF
  const pdfBytes = await generateAuditPdf(audit.analysis_json);

  // 3️⃣ Upload PDF
  const objectPath = `audit-pdfs/${auditId}.pdf`;

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
