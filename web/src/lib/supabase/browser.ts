"use client";

import { createClient } from "@supabase/supabase-js";

let supabaseBrowser: ReturnType<typeof createClient> | null = null;

export function getSupabaseBrowser() {
  if (!supabaseBrowser) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      throw new Error("Missing browser Supabase env vars");
    }

    supabaseBrowser = createClient(url, anonKey);
  }

  return supabaseBrowser;
}

