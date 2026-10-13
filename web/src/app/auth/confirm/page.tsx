"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ConfirmSignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirmSignIn() {
    if (loading) return;
    setLoading(true);
    setError(null);

    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get("token_hash");
    if (!tokenHash || params.get("type") !== "email") {
      setError("This sign-in link is incomplete. Please request a new one.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: verifyError } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: "email",
      });

      if (verifyError) throw verifyError;

      window.history.replaceState(null, "", "/auth/confirm");
      router.replace("/product/app/dashboard");
    } catch {
      setError("This sign-in link is invalid or has expired. Please request a new one.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[55vh] items-center justify-center bg-[#f5f7f2] px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[#d7e1d8] bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-[#102b25]">Open your SaveOnLease dashboard</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Confirm this sign-in to continue to your reports and lease questions.
        </p>
        {error && <p role="alert" className="mt-5 text-sm text-red-700">{error}</p>}
        <button
          type="button"
          onClick={confirmSignIn}
          disabled={loading}
          className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#102b25] px-5 font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing you in…" : "Continue to my dashboard"}
        </button>
        <Link href="/login" className="mt-5 inline-block text-sm font-medium text-emerald-800 underline underline-offset-4">
          Request a new sign-in link
        </Link>
      </div>
    </main>
  );
}
