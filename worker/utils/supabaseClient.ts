// worker/utils/supabaseClient.ts
/**
 * SHARED UTILITY — SAVEONLEASE V1
 *
 * Rules:
 * - Pure functions only
 * - No side effects
 * - No network calls
 * - No environment variables
 *
 * Safe to use in:
 * - Worker
 * - API routes
 *
 * NOT safe for client unless explicitly reviewed.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get(
  "SUPABASE_SERVICE_ROLE_KEY"
);

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase env vars");
}

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);
