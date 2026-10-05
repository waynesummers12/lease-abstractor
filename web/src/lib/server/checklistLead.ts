import { createClient } from "@supabase/supabase-js";

export async function saveChecklistLead(value: unknown, source: string) {
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { email: null, error: "invalid" as const };
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { email: null, error: "unavailable" as const };

  const db = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await db.from("checklist_leads").insert({ email, source });
  if (error) {
    console.error("Unable to save checklist lead", error.code);
    return { email: null, error: "unavailable" as const };
  }
  return { email, error: null };
}
