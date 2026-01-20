import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { supabase } from "./supabaseClient.ts";

export async function markAuditPaid(
  session: Stripe.Checkout.Session
) {
  const auditId = session.metadata?.auditId;

  if (!auditId) {
    console.warn("⚠️ No auditId on checkout session");
    return;
  }

  const { error } = await supabase
    .from("lease_audits")
    .update({
      paid: true,
      paid_at: new Date().toISOString(),
    })
    .eq("id", auditId);

  if (error) {
    console.error("❌ Failed to mark audit paid", error);
    throw error;
  }

  console.log("✅ Audit marked paid:", auditId);
}
