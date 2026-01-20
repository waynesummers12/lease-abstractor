// worker/utils/getPaidAudits.ts
import { supabase } from "./supabaseClient.ts";

export type PaidAudit = {
  id: string;
  pdf_path: string | null;
  created_at: string;
};

export async function getPaidAudits(
  userId: string
): Promise<PaidAudit[]> {
  const { data, error } = await supabase
    .from("lease_audits")
    .select("id, pdf_path, created_at")
    .eq("status", "paid")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch paid audits:", error);
    throw error;
  }

  return data ?? [];
}


