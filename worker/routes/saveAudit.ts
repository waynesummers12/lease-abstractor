// worker/routes/saveAudit.ts

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
  analysis: Record<string, unknown>;
  stripeSessionId: string;
};

/**
 * Persist a PAID lease audit
 * Called AFTER successful Stripe checkout
 */
export async function savePaidAudit({
  analysis,
  stripeSessionId,
}: SavePaidAuditParams) {
  if (!analysis || !stripeSessionId) {
    throw new Error("Missing analysis or stripeSessionId");
  }

  const { error } = await supabase.from("lease_audits").insert({
    analysis,
    stripe_session_id: stripeSessionId,
    paid: true,
  });

  if (error) {
    console.error("❌ Failed to save paid audit:", error.message);
    throw error;
  }

  return { success: true };
}


