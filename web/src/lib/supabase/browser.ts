// src/lib/supabase/browser.ts

export function getSupabaseBrowser(): never {
  throw new Error(
    "Supabase browser client disabled. Use worker APIs only."
  );
}

