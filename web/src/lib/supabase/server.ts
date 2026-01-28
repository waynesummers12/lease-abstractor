import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

let _supabaseServer: SupabaseClient | null = null;

export function getSupabaseServer() {
  if (_supabaseServer) return _supabaseServer;

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("supabaseUrl is required.");
  }

  _supabaseServer = createClient(supabaseUrl, serviceRoleKey);
  return _supabaseServer;
}




