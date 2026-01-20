// worker/utils/getPaidAudits.ts

import { supabase } from "../lib/supabase.ts";

export type LeaseAudit = {
  id: string;
  status: string;
  object_path: string | null;
  created_at: string;
};

export async function getPaidAudits(): Promise<LeaseAudit[]> {
  const { data, error } = await supabase
    .from("lease_audits")
    .select("id, status, object_path, created_at")
    .eq("status", "paid")
    .not("object_path", "is", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch paid audits:", error);
    throw error;
  }

  return data ?? [];
}


