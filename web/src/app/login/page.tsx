"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/providers/AuthProvider";

const signInDestination = () => {
  const requested = new URLSearchParams(window.location.search).get("next");
  return requested?.startsWith("/") && !requested.startsWith("//")
    ? requested : "/product/app/dashboard";
};
const dashboardRedirect = () => {
  const next = signInDestination();
  const callback = `${window.location.origin}/auth/callback`;
  return next === "/product/app/dashboard" ? callback : `${callback}?next=${encodeURIComponent(next)}`;
};

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const { session, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<"email" | "password" | "reset" | "google" | null>(null);
  const [notice, setNotice] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  async function handleEmailLink() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setNotice({ kind: "error", text: "Enter a valid email address above, then request your sign-in link." });
      return;
    }
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
        setNotice({ kind: "success", text: `We sent a secure sign-in link to ${email.trim()}. Open it to continue.` });
      }
    } catch {
      setNotice({ kind: "error", text: "We couldn’t send the link right now. Please try again." });
    } finally {
      setLoading(null);
    }
  }

  async function handlePasswordLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading("password");
    setNotice(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        setNotice({ kind: "error", text: "That email and password didn’t match. You can reset your password or use an email link." });
      } else {
        router.replace(signInDestination());
      }
    } catch {
      setNotice({ kind: "error", text: "We couldn’t sign you in right now. Please try again." });
    } finally {
      setLoading(null);
    }
  }

  async function handlePasswordReset() {
    if (!email.trim()) {
      setNotice({ kind: "error", text: "Enter your email address first, then choose Set or reset password." });
      return;
    }
    setLoading("reset");
    setNotice(null);
    try {
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent("/auth/set-password")}`;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
      if (error) throw error;
      setNotice({ kind: "success", text: "If this email has an account, we’ll send a link to set its password. After that, you can sign in directly." });
    } catch {
      setNotice({ kind: "error", text: "We couldn’t send a password link right now. Please try again shortly." });
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Account access</p>
            <h2 id="sign-in-title" className="mt-3 text-4xl font-semibold tracking-tight text-[#102b25]">Sign in to your account.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">Use Google or sign in with your email and password. You can also request a sign-in link if you don’t remember your password.</p>
            <button type="button" onClick={handleGoogleLogin} disabled={loading !== null} className="mt-9 flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-[#cbd9cd] bg-white px-5 font-semibold text-[#172820] shadow-sm transition hover:border-emerald-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60">
              <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.9-6.9C35.68 2.68 30.2 0 24 0 14.82 0 6.94 5.24 2.98 12.86l8.06 6.26C12.9 13.1 17.96 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.7-.15-3.33-.43-4.9H24v9.27h12.7c-.55 2.96-2.23 5.47-4.76 7.16l7.32 5.7C43.93 37.9 46.5 31.7 46.5 24.5z"/><path fill="#FBBC05" d="M11.04 28.62a14.5 14.5 0 010-9.24l-8.06-6.26A23.94 23.94 0 000 24c0 3.9.93 7.59 2.98 10.88l8.06-6.26z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2.04 15.2-5.55l-7.32-5.7c-2.03 1.36-4.64 2.17-7.88 2.17-6.04 0-11.1-3.6-12.96-8.62l-8.06 6.26C6.94 42.76 14.82 48 24 48z"/></svg>
              {loading === "google" ? "Connecting to Google…" : "Sign in with Google"}
            </button>
            <div className="my-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"><span className="h-px flex-1 bg-[#d7e1d8]" />Or use your email<span className="h-px flex-1 bg-[#d7e1d8]" /></div>
            <form onSubmit={handlePasswordLogin}>
              <label htmlFor="login-email" className="block text-sm font-semibold text-[#172820]">Email address</label>
              <input id="login-email" type="email" required autoComplete="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-14 w-full rounded-xl border border-[#cbd9cd] bg-white px-4 text-base text-[#172820] outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200" />
              <button type="button" onClick={handleEmailLink} disabled={loading !== null} className="mt-3 text-sm font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-60">{loading === "email" ? "Sending sign-in link…" : "Email me a sign-in link instead"}</button>
              <label htmlFor="login-password" className="mt-5 block text-sm font-semibold text-[#172820]">Password</label>
              <div className="mt-2 flex min-h-14 overflow-hidden rounded-xl border border-[#cbd9cd] bg-white transition focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-200">
                <input id="login-password" type={showPassword ? "text" : "password"} required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="min-w-0 flex-1 bg-transparent px-4 text-base text-[#172820] outline-none" />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} aria-controls="login-password" className="flex w-14 shrink-0 items-center justify-center text-[#526b5d] transition hover:bg-[#f2f7f3] hover:text-[#102b25] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-700">
                  {showPassword ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3l18 18"/><path d="M10.6 10.7a2 2 0 0 0 2.7 2.7"/><path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.7 3.3 10 7a11.9 11.9 0 0 1-3.1 4.7"/><path d="M6.6 6.6A11.8 11.8 0 0 0 2 12c1.3 3.7 5 7 10 7 1.3 0 2.5-.2 3.6-.7"/></svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              <button type="submit" disabled={loading !== null} className="mt-4 flex min-h-14 w-full items-center justify-center rounded-xl bg-[#102b25] px-5 font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60">{loading === "password" ? "Signing in…" : "Sign in to dashboard"}</button>
            </form>
            <div className="mt-5 flex flex-wrap justify-between gap-x-5 gap-y-3 text-sm">
              <button type="button" onClick={handlePasswordReset} disabled={loading !== null} className="font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950 disabled:opacity-60">{loading === "reset" ? "Sending…" : "Set or reset password"}</button>
            </div>
            {notice && <p role="status" aria-live="polite" className={`mt-6 rounded-xl border px-4 py-3 text-sm leading-6 ${notice.kind === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-red-200 bg-red-50 text-red-800"}`}>{notice.text}</p>}
            {!authLoading && session && <div className="mt-8 rounded-xl border border-[#d7e1d8] bg-white px-5 py-4 text-sm leading-7 text-slate-600">Already signed in? <Link href={signInDestination()} className="font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950">Continue ↗</Link></div>}
            <div className="mt-8 border-t border-[#d7e1d8] pt-6 text-sm leading-7 text-slate-600">Need a hand getting in? <Link href="/marketing/contact" className="font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950">Contact SaveOnLease ↗</Link></div>
          </div>
        </section>
      </div>
    </div>
  );
}
