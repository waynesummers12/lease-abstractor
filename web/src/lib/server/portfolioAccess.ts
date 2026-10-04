import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export async function portfolioAccess(req: Request): Promise<{ db: SupabaseClient; userId: string } | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const token = req.headers.get("authorization")?.match(/^Bearer (\S+)$/i)?.[1];
  if (!url || !anon || !service || !token) return null;

  const auth = createClient(url, anon, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: { user }, error } = await auth.auth.getUser(token);
  if (error || !user) return null;

  return {
    db: createClient(url, service, { auth: { autoRefreshToken: false, persistSession: false } }),
    userId: user.id,
  };
}
