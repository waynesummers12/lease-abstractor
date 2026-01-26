// worker/utils/getPaidAudits.ts

import { supabase } from "../lib/supabase.ts";

export type LeaseAudit = {
  id: string;
  lease_name: string | null;
  status: string;
  audit_pdf_path: string | null;
  created_at: string;
  avoidable_exposure: number | null;
  email_sent: boolean;
};

export async function getPaidAudits(): Promise<LeaseAudit[]> {
  const { data, error } = await supabase
    .from("lease_audits")
    .select("id, lease_name, status, audit_pdf_path, created_at, analysis, email_sent")
    .eq("status", "complete")
    .not("audit_pdf_path", "is", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch complete audits:", error);
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    lease_name: row.lease_name,
    status: row.status,
    audit_pdf_path: row.audit_pdf_path,
    created_at: row.created_at,
    avoidable_exposure: row.analysis?.avoidable_exposure ?? null,
    email_sent: row.email_sent ?? false,
  }));
}


