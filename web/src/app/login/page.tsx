"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/providers/AuthProvider";

const dashboardRedirect = () => `${window.location.origin}/auth/callback?next=/product/app/dashboard`;

export default function LoginPage() {
  const supabase = createClient();
  const { session, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<"email" | "google" | null>(null);
  const [notice, setNotice] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading("email");
    setNotice(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: dashboardRedirect() },
      });
      if (error) {
        const detail = error.message.toLowerCase();
        setNotice({
          kind: "error",
          text: detail.includes("rate") || detail.includes("limit")
            ? "Please wait a moment before requesting another sign-in link."
            : error.message,
        });
      } else {
        setNotice({ kind: "success", text: `We sent a secure sign-in link to ${email.trim()}. Open it to continue to your dashboard.` });
      }
    } catch {
      setNotice({ kind: "error", text: "We couldn’t send the link right now. Please try again." });
    } finally {
      setLoading(null);
    }
  }

  async function handleGoogleLogin() {
    setLoading("google");
    setNotice(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: dashboardRedirect(),
          queryParams: { prompt: "select_account" },
        },
      });
      if (error) {
        setNotice({ kind: "error", text: error.message });
        setLoading(null);
      }
    } catch {
      setNotice({ kind: "error", text: "Google sign-in couldn’t start. Please try again." });
      setLoading(null);
    }
  }

  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#f5f7f2] text-[#122820]">
      <div className="mx-auto grid max-w-7xl lg:min-h-[720px] lg:grid-cols-[1.04fr_.96fr]">
        <section className="relative isolate overflow-hidden bg-[#102b25] px-6 py-16 text-white sm:px-12 sm:py-20 lg:flex lg:flex-col lg:justify-between lg:px-16" aria-labelledby="login-intro-title">
          <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-48 h-[36rem] w-[36rem] rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[27rem] w-[27rem] rounded-full border border-white/10" />
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#a8edbf]/35 bg-[#a8edbf]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#b8f0ca]"><span className="h-2 w-2 rounded-full bg-[#a8edbf]" /> Your workspace</p>
            <h1 id="login-intro-title" className="mt-8 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">Your lease questions, <span className="text-[#a8edbf]">all in one place.</span></h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-200 sm:text-lg">Sign in to pick up where you left off, revisit your review, and keep your source documents and next steps together.</p>
          </div>
          <div className="relative z-10 mt-12 max-w-lg rounded-[1.75rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/10 backdrop-blur-sm sm:p-7">
            <div className="flex items-center justify-between border-b border-white/15 pb-5"><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#a8edbf]">Inside your dashboard</p><span aria-hidden="true" className="text-[#a8edbf]">↗</span></div>
            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-[2.5rem_1fr] items-start gap-x-4"><span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a8edbf]/15 text-[#a8edbf]">01</span><div className="min-w-0"><p className="pt-1 font-semibold leading-6 text-white">Your reports</p><p className="mt-1 text-sm leading-6 text-slate-300">Return to reviews and download available PDFs.</p></div></div>
              <div className="grid grid-cols-[2.5rem_1fr] items-start gap-x-4"><span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a8edbf]/15 text-[#a8edbf]">02</span><div className="min-w-0"><p className="pt-1 font-semibold leading-6 text-white">Your next questions</p><p className="mt-1 text-sm leading-6 text-slate-300">Keep lease terms and billing questions close at hand.</p></div></div>
            </div>
          </div>
          <p className="relative z-10 mt-8 text-sm text-slate-300">New to SaveOnLease? <Link href="/app/step-1-upload" className="font-semibold text-[#b8f0ca] underline underline-offset-4 hover:text-white">Start a free lease preview ↗</Link></p>
        </section>

        <section className="flex items-center px-6 py-16 sm:px-12 lg:px-16" aria-labelledby="sign-in-title">
          <div className="mx-auto w-full max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Returning users</p>
            <h2 id="sign-in-title" className="mt-3 text-4xl font-semibold tracking-tight text-[#102b25]">Sign in to your account.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">Use the same Google account or email address you used before. We&apos;ll take you back to your dashboard—no password needed.</p>
            <button type="button" onClick={handleGoogleLogin} disabled={loading !== null} className="mt-9 flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-[#cbd9cd] bg-white px-5 font-semibold text-[#172820] shadow-sm transition hover:border-emerald-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60">
              <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.9-6.9C35.68 2.68 30.2 0 24 0 14.82 0 6.94 5.24 2.98 12.86l8.06 6.26C12.9 13.1 17.96 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.7-.15-3.33-.43-4.9H24v9.27h12.7c-.55 2.96-2.23 5.47-4.76 7.16l7.32 5.7C43.93 37.9 46.5 31.7 46.5 24.5z"/><path fill="#FBBC05" d="M11.04 28.62a14.5 14.5 0 010-9.24l-8.06-6.26A23.94 23.94 0 000 24c0 3.9.93 7.59 2.98 10.88l8.06-6.26z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2.04 15.2-5.55l-7.32-5.7c-2.03 1.36-4.64 2.17-7.88 2.17-6.04 0-11.1-3.6-12.96-8.62l-8.06 6.26C6.94 42.76 14.82 48 24 48z"/></svg>
              {loading === "google" ? "Connecting to Google…" : "Sign in with Google"}
            </button>
            <div className="my-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"><span className="h-px flex-1 bg-[#d7e1d8]" />Or use your email<span className="h-px flex-1 bg-[#d7e1d8]" /></div>
            <form onSubmit={handleLogin}>
              <label htmlFor="login-email" className="block text-sm font-semibold text-[#172820]">Email address</label>
              <input id="login-email" type="email" required autoComplete="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-14 w-full rounded-xl border border-[#cbd9cd] bg-white px-4 text-base text-[#172820] outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200" />
              <button type="submit" disabled={loading !== null} className="mt-4 flex min-h-14 w-full items-center justify-center rounded-xl bg-[#102b25] px-5 font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60">{loading === "email" ? "Sending your link…" : "Email me a sign-in link ↗"}</button>
              <p className="mt-4 text-center text-sm leading-6 text-slate-500">Returning users: enter the email linked to your existing reviews. The sign-in link is one-time use and expires.</p>
            </form>
            {notice && <p role="status" aria-live="polite" className={`mt-6 rounded-xl border px-4 py-3 text-sm leading-6 ${notice.kind === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-red-200 bg-red-50 text-red-800"}`}>{notice.text}</p>}
            {!authLoading && session && <div className="mt-8 rounded-xl border border-[#d7e1d8] bg-white px-5 py-4 text-sm leading-7 text-slate-600">Already signed in? <Link href="/product/app/dashboard" className="font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950">Open your dashboard ↗</Link></div>}
            <div className="mt-8 border-t border-[#d7e1d8] pt-6 text-sm leading-7 text-slate-600">Need a hand getting in? <Link href="/marketing/contact" className="font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950">Contact SaveOnLease ↗</Link></div>
          </div>
        </section>
      </div>
    </div>
  );
}
