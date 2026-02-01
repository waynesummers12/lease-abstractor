// worker/routes/saveAudit.ts
/**
 * WORKER ROUTE — SAVEONLEASE V1 (LOCKED)
 *
 * Runtime:
 * - Deno + Oak
 *
 * Responsibilities:
 * - Business logic
 * - Supabase access
 * - PDF processing
 * - Stripe operations
 *
 * Forbidden:
 * - Frontend imports
 * - Next.js APIs
 *
 * This file must NEVER be imported by frontend code.
 */



import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Supabase server client (SERVICE ROLE)
 * Never use anon key here
 */
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

type SavePaidAuditParams = {
  auditId: string;
  stripeSessionId: string;
  amountPaid?: number;
  currency?: string;
};

/**
 * Mark an EXISTING lease audit as PAID
 * Called AFTER successful Stripe checkout
 *
 * IMPORTANT:
 * - Does NOT create a new audit
 * - Does NOT touch object_path
 * - Only updates status + payment metadata
 */
export async function savePaidAudit({
  auditId,
  stripeSessionId,
  amountPaid,
  currency,
}: SavePaidAuditParams) {
  if (!auditId || !stripeSessionId) {
    throw new Error("Missing auditId or stripeSessionId");
  }

  // --------------------
  // 1. Ensure audit exists and has PDF attached
  // --------------------
  const { data: audit, error: fetchError } = await supabase
    .from("lease_audits")
    .select("id, object_path")
    .eq("id", auditId)
    .single();

  if (fetchError || !audit) {
    throw new Error(`Audit not found: ${auditId}`);
  }

  if (!audit.object_path) {
    throw new Error(
      `Invariant violation: audit ${auditId} missing object_path`
    );
  }

  // --------------------
  // 2. Mark audit as paid
  // --------------------
  const { error: updateError } = await supabase
    .from("lease_audits")
    .update({
      status: "paid",
      stripe_session_id: stripeSessionId,
      amount_paid: amountPaid ?? null,
      currency: currency ?? null,
    })
    .eq("id", auditId);

  if (updateError) {
    console.error("❌ Failed to mark audit as paid:", updateError.message);
    throw updateError;
  }

  return { success: true };
}



