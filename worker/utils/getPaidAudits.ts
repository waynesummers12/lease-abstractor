// worker/utils/getPaidAudits.ts
import { supabase } from "../lib/supabase.ts";

export async function getPaidAudits(userId: string) {
  const { data, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("user_id", userId)
    .eq("payment_status", "paid")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getPaidAudits error:", error);
    return [];
  }

  return data;
}
