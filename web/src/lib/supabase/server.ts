// src/lib/supabase/server.ts

/**
 * ⚠️ TEMPORARILY DISABLED
 * Web app no longer talks directly to Supabase.
 * All DB access happens in the worker.
 *
 * This file is intentionally inert to prevent
 * Vercel build-time execution errors.
 */

export function getSupabaseServer(): never {
  throw new Error(
    "Supabase is disabled in the web app. Use the worker instead."
  );
}


