import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

// ❌ DO NOT THROW AT BUILD TIME
if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn(
    "⚠️ Supabase env vars missing during build. API routes will be unavailable."
  );
}

export const supabaseServer =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;



