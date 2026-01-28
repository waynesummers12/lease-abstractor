import { createClient } from "@supabase/supabase-js";

export function getSupabaseServer() {
  // During `next build`, env vars may not be available
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return null;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });
}
