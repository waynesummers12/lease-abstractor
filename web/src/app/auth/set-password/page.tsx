"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { createClient } from "@/lib/supabase/client";

export default function SetPasswordPage() {
  const router = useRouter();
  const { session, loading: authLoading } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 12) {
      setError("Use at least 12 characters for your password.");
      return;
    }
    if (password !== confirmation) {
      setError("The passwords don’t match.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const { error: updateError } = await createClient().auth.updateUser({ password });
      if (updateError) throw updateError;
      router.replace("/product/app/dashboard");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We couldn’t save your password. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f7f2] px-5 py-16 text-[#102b25]">
      <div className="w-full max-w-md rounded-2xl border border-[#d7e1d8] bg-white p-7 shadow-sm sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">Your account</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Set your password</h1>
        {authLoading ? (
          <p className="mt-5 text-slate-600">Checking your sign-in…</p>
        ) : !session ? (
          <p className="mt-5 leading-7 text-slate-600">Your password link is no longer active. <Link href="/login" className="font-semibold text-emerald-800 underline underline-offset-4">Return to sign in</Link> and request a new one.</p>
        ) : (
          <>
            <p className="mt-4 leading-7 text-slate-600">Create a password for {session.user.email}. You can then sign in to your dashboard without a new email link.</p>
            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label htmlFor="new-password" className="block text-sm font-semibold">New password</label>
                <input id="new-password" type="password" autoComplete="new-password" minLength={12} required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#cbd9cd] px-4 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200" />
                <p className="mt-2 text-xs text-slate-500">At least 12 characters.</p>
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-semibold">Confirm password</label>
                <input id="confirm-password" type="password" autoComplete="new-password" minLength={12} required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#cbd9cd] px-4 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200" />
              </div>
              {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
              <button type="submit" disabled={saving} className="min-h-12 w-full rounded-xl bg-[#102b25] px-5 font-semibold text-white hover:bg-emerald-900 disabled:opacity-60">{saving ? "Saving…" : "Save password and open dashboard"}</button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
