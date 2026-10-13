"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export default function AuthCallback() {
  const router = useRouter();
  const started = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    async function finishSignIn() {
      const params = new URLSearchParams(window.location.search);
      const fragment = new URLSearchParams(window.location.hash.slice(1));
      const authError = params.get("error_description") || fragment.get("error_description");
      if (authError) {
        setError(authError);
        return;
      }

      try {
        const supabase = createClient();
        // The browser client processes the PKCE code during initialization.
        // Exchanging it here again would consume the one-time code twice.
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw userError || new Error("The sign-in link is invalid or has expired.");

        const requested = params.get("next");
        const next = requested?.startsWith("/") && !requested.startsWith("//")
          ? requested
          : "/product/app/dashboard";
        router.replace(next);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "We couldn’t complete sign-in. Please request a new link.");
      }
    }

    void finishSignIn();
  }, [router]);

  return (
    <main className="flex min-h-[55vh] items-center justify-center bg-[#f5f7f2] px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[#d7e1d8] bg-white p-8 text-center shadow-sm">
        {error ? (
          <>
            <h1 className="text-2xl font-semibold text-[#102b25]">That sign-in link didn’t work.</h1>
            <p role="alert" className="mt-4 text-sm leading-6 text-slate-600">{error}</p>
            <Link href="/login" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#102b25] px-5 font-semibold text-white hover:bg-emerald-900">Request a new sign-in link</Link>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-[#102b25]">Signing you in…</h1>
            <p className="mt-4 text-sm text-slate-600">You’ll be taken to your dashboard in a moment.</p>
          </>
        )}
      </div>
    </main>
  );
}
