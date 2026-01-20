// worker/utils/getLatestPaidAudit.ts
import { supabase } from "../lib/supabase.ts";

export async function getLatestPaidAudit() {
  const { data, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("status", "paid") // ✅ FIXED COLUMN
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getLatestPaidAudit error:", error);
    return null;
  }

  return data;
}



