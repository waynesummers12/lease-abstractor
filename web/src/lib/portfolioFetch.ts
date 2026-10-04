import { createClient } from "@/lib/supabase/client";

/** Attach the current session token; the API validates it with Supabase Auth. */
export async function portfolioFetch(init?: RequestInit): Promise<Response> {
  const supabase = createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session?.access_token) {
    throw new Error("Please log in to access your portfolio.");
  }

  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${session.access_token}`);
  return fetch("/api/portfolio-leases", {
    ...init,
    headers,
    cache: "no-store",
  });
}
