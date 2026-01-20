import { supabase } from "./supabaseClient.ts";
import type Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { generateAuditPdf } from "./generateAuditPdf.ts";

export async function markAuditPaid(
  session: Stripe.Checkout.Session
) {
  const auditId = session.metadata?.auditId;

  if (!auditId) {
    throw new Error("Missing auditId in Stripe session metadata");
  }

  // 1️⃣ Load audit
  const { data: audit, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("id", auditId)
    .single();

  if (error || !audit) {
    throw new Error("Audit not found for payment");
  }

  // 2️⃣ Generate PDF
  const pdfBuffer = await generateAuditPdf(audit);

  // 3️⃣ Upload to storage
  const objectPath = `audit-pdfs/${auditId}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from("leases")
    .upload(objectPath, pdfBuffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadError) {
    throw new Error("Failed to upload audit PDF");
  }

  // 4️⃣ Mark paid + attach object_path
  const { error: updateError } = await supabase
    .from("lease_audits")
    .update({
      status: "paid",
      object_path: objectPath,
      paid_at: new Date().toISOString(),
    })
    .eq("id", auditId);

  if (updateError) {
    throw new Error("Failed to mark audit paid");
  }

  console.log(`✅ Audit ${auditId} marked paid with PDF`);
}

