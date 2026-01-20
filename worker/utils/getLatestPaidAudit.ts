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
export async function getLatestPaidAudit(userId: string) {
  const { data, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "paid")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch paid audits:", error);
    throw error;
  }

  if (!data || data.length === 0) {
    return null;
  }

  // ✅ Skip broken historical rows
  const validAudit = data.find((a) => a.object_path);

  if (!validAudit) {
    console.warn(
      "Paid audits exist but none have object_path — likely legacy rows"
    );
    return null;
  }

  return validAudit;
}




