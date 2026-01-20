// worker/utils/getPaidAudits.ts
import { supabase } from "./supabaseClient.ts";

export async function getPaidAudits() {
  const { data, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("paid", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch paid audits:", error);
    throw error;
  }

  return data ?? [];
}
