// worker/utils/getLatestPaidAudit.ts

import { supabase } from "../lib/supabase.ts";

/**
 * Fetch the most recent PAID lease audit
 *
 * INVARIANTS:
 * - status = 'paid' is the ONLY payment indicator
 * - object_path MUST be present for paid audits
 * - This function NEVER guesses or repairs data
 */
export async function getLatestPaidAudit() {
  const { data, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("status", "paid")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(`getLatestPaidAudit failed: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return null;
  }

  const audit = data[0];

  // 🔒 Hard invariant: paid audits MUST have object_path
  if (!audit.object_path) {
    throw new Error(
      `Invariant violation: paid audit ${audit.id} missing object_path`
    );
  }

  return audit;
}




