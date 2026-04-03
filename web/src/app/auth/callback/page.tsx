"use client";

import { useEffect, Suspense } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
      },
    }
  );

  useEffect(() => {
    const handleAuth = async () => {
      await supabase.auth.exchangeCodeForSession(window.location.href);
      const next = searchParams.get("next") || "/product/app/dashboard";
      router.replace(next);
    };

    handleAuth();
  }, [router, supabase, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-600">Logging you in…</p>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-sm text-gray-600">Logging you in…</p></div>}>
      <AuthCallbackInner />
    </Suspense>
  );
}
