// worker/utils/getPaidAudits.ts
import { supabase } from "./supabaseClient.ts";

export type LeaseAudit = {
  id: string;
  audit_id: string;
  pdf_path: string | null;
  paid: boolean;
  created_at: string;
};

export async function getPaidAudits(): Promise<LeaseAudit[]> {
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

