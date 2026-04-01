"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
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

  const supabase = useMemo(() => {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }, []);

  const [plan, setPlan] = useState<"free" | "pro" | "enterprise">("free");

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (data.session?.user && data.session.user.email) {
        await ensureProfile(data.session.user);

        const { data: profile } = await supabase
          .from("profiles")
          .select("plan")
          .eq("id", data.session.user.id)
          .single();

        if (profile?.plan) setPlan(profile.plan);
      }

      setLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (session?.user && session.user.email) {
        await ensureProfile(session.user);

        const { data: profile } = await supabase
          .from("profiles")
          .select("plan")
          .eq("id", session.user.id)
          .single();

        if (profile?.plan) setPlan(profile.plan);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ session, loading, plan }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);