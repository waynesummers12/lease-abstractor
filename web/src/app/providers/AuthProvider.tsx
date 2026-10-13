"use client";

import { createClient } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { ensureProfile } from "@/lib/supabase/createProfile";

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  plan: "free" | "pro" | "enterprise";
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  plan: "free",
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<"free" | "pro" | "enterprise">("free");
  const userId = session?.user.id;
  const userEmail = session?.user.email;

  useEffect(() => {
    const supabase = createClient();
    // Auth callbacks must return immediately. Awaiting another Supabase call
    // here can hold the auth lock and block the dashboard's data requests.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId || !userEmail) {
      return;
    }
    let active = true;
    const supabase = createClient();
    void (async () => {
      try {
        await ensureProfile({ id: userId, email: userEmail });
        const { data } = await supabase.from("profiles").select("plan").eq("id", userId).maybeSingle();
        if (active && (data?.plan === "free" || data?.plan === "pro" || data?.plan === "enterprise")) {
          setPlan(data.plan);
        }
      } catch (error) {
        console.error("Unable to load profile:", error);
      }
    })();
    return () => { active = false; };
  }, [userId, userEmail]);

  return <AuthContext.Provider value={{ session, loading, plan }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
