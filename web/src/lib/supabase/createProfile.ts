import { createClient } from "@/lib/supabase/client";

interface User {
  id: string;
  email: string;
}

export async function ensureProfile(user: User) {
  const supabase = createClient();

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!data) {
    await supabase.from("profiles").insert({
      id: user.id,
      email: user.email,
      plan: "free",
    });
  }
}