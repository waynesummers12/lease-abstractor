// worker/utils/getLatestPaidAudit.ts
import { supabase } from "./supabaseClient.ts";

export async function getLatestPaidAudit() {
  const { data, error } = await supabase
    .from("lease_audits")
    .select("*")
    .eq("status", "paid")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load latest audit", error);
    throw error;
  }

  if (!data || data.length === 0) {
    return null;
  }

  // ✅ Find the first paid audit that actually has a PDF
  const validAudit = data.find(
    (audit) => typeof audit.pdf_path === "string" && audit.pdf_path.length > 0
  );

  // ✅ If none are usable, return null instead of crashing
  if (!validAudit) {
    console.warn("No paid audits with pdf_path found");
    return null;
  }

  return validAudit;
}
