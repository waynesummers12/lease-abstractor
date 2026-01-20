// worker/utils/getPaidAudits.ts
import { supabase } from "./supabaseClient.ts";

/**
 * Returns all PAID audits.
 * NOTE:
 * - We intentionally do NOT filter by user_id
 * - Lease audits are keyed by audit_id + payment status
 */
export async function getPaidAudits() {
  const { data, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("status", "paid")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch paid audits:", error);
    throw error;
  }

  return data ?? [];
}

