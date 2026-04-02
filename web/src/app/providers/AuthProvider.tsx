"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
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

  const [supabase] = useState<SupabaseClient | null>(() => {
    if (typeof window === "undefined") return null;

    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: window.localStorage,
          cookieOptions: {
            domain: ".saveonlease.com",
            sameSite: "lax",
          },
        },
      }
    );
  });

  const [plan, setPlan] = useState<"free" | "pro" | "enterprise">("free");

  useEffect(() => {
    if (!supabase) return;

    const init = async () => {
      try {
        // 🔥 Handle OAuth redirect code (ensures session is created)
        if (typeof window !== "undefined") {
          const url = window.location.href;
          if (url.includes("code=") || url.includes("access_token")) {
            try {
              await supabase.auth.exchangeCodeForSession(url);
            } catch {
              // ignore if already exchanged
            }
          }
        }

        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Session error:", error);
        }

        const session = data.session;
        console.log("INIT SESSION:", session);

        setSession(session);

        if (session?.user && session.user.email) {
          await ensureProfile({
            ...session.user,
            email: session.user.email!,
          });

          const { data: profile } = await supabase
            .from("profiles")
            .select("plan")
            .eq("id", session.user.id)
            .single();

          if (profile?.plan) setPlan(profile.plan);
        }
      } catch (err) {
        console.error("Init error:", err);
      }

      setLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("AUTH EVENT:", event, session);
      setSession(session);

      if (session?.user && session.user.email) {
        await ensureProfile({
          ...session.user,
          email: session.user.email!,
        });

        const { data: profile } = await supabase
          .from("profiles")
          .select("plan")
          .eq("id", session.user.id)
          .single();

        if (profile?.plan) setPlan(profile.plan);
      }

      // 🔥 Handle initial + sign-in events without full reload
      if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setSession(data.session);
        }
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