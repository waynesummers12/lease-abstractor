// worker/utils/getLatestPaidAudit.ts
import { supabase } from "../lib/supabase.ts";

export async function getLatestPaidAudit() {
  const { data, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("payment_status", "paid")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("getLatestPaidAudit error:", error);
    return null;
  }

  return data;
}

