"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await createClient().auth.getUser();
      setEmail(user?.email || null);
      setLoading(false);
    };
    void getUser();
  }, []);

  const handleLogout = async () => {
    await createClient().auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return <main className="min-h-[70vh] bg-[#f5f7f3] px-6 py-20 text-center text-sm text-slate-600">Loading account settings…</main>;
  }

  return (
    <main className="min-h-[70vh] bg-[#f5f7f3] text-[#122c25]">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#497465]">SaveOnLease / Your account</p>

        <header className="relative mt-7 overflow-hidden rounded-[30px] bg-[#102c25] px-7 py-12 text-white shadow-[0_22px_70px_rgba(16,44,37,0.14)] sm:px-12 sm:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-44 h-[450px] w-[450px] rounded-full border border-white/10" />
          <div className="relative grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Account settings</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Your account, <span className="text-[#a9e9be]">all in one place.</span></h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#d9e9df]">Keep your sign-in details close and get back to the leases and reports you have saved.</p>
            </div>
            <div className="min-w-0 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm md:w-72">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a9e9be]">Signed in as</p>
              <p className="mt-2 break-all text-sm font-medium text-white">{email}</p>
            </div>
          </div>
        </header>

        <section className="mt-14" aria-labelledby="account-essentials-title">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d7459]">Your details</p>
          <h2 id="account-essentials-title" className="mt-2 text-3xl font-semibold tracking-tight">Account essentials</h2>
          <p className="mt-3 max-w-2xl leading-7 text-[#60736a]">The basics for returning to your workspace and keeping access to your reviews.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-[#dce5dc] bg-white p-7 shadow-sm sm:p-8">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e4f2e8] text-sm font-bold text-[#0d7459]">01</span>
              <h3 className="mt-6 text-xl font-semibold">Email address</h3>
              <p className="mt-2 break-all text-lg text-[#30483e]">{email}</p>
              <p className="mt-3 text-sm leading-6 text-[#60736a]">This is the email associated with your SaveOnLease account.</p>
            </article>
            <article className="rounded-3xl border border-[#dce5dc] bg-white p-7 shadow-sm sm:p-8">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e4f2e8] text-sm font-bold text-[#0d7459]">02</span>
              <h3 className="mt-6 text-xl font-semibold">Password &amp; access</h3>
              <p className="mt-2 text-sm leading-6 text-[#60736a]">Set or change the password you use to sign in with your email.</p>
              <Link href="/auth/set-password" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#cbded0] px-5 py-2 text-sm font-semibold text-[#0d604b] hover:bg-[#f1f8f2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d604b]">Set or change password <span aria-hidden="true">↗</span></Link>
            </article>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-6 rounded-3xl border border-[#cfe2d3] bg-[#e4f2e8] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9" aria-labelledby="workspace-title">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d7459]">Your workspace</p>
            <h2 id="workspace-title" className="mt-2 text-2xl font-semibold">Back to your lease command center</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#526b5d]">Find saved leases, renewal dates, and completed reports in your dashboard.</p>
          </div>
          <Link href="/product/app/dashboard" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#102c25] px-6 py-3 text-sm font-semibold text-white hover:bg-[#195040] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102c25]">Open dashboard <span aria-hidden="true">↗</span></Link>
        </section>

        <section className="mt-12 flex flex-col gap-4 border-t border-[#dce5dc] pt-7 sm:flex-row sm:items-center sm:justify-between" aria-label="Sign out">
          <div>
            <h2 className="font-semibold">Done for now?</h2>
            <p className="mt-1 text-sm text-[#60736a]">Sign out of this browser when you are finished.</p>
          </div>
          <button type="button" onClick={handleLogout} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#cbded0] bg-white px-5 py-2 text-sm font-semibold text-[#30483e] hover:bg-[#f0f5f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102c25]">Log out</button>
        </section>
      </div>
    </main>
  );
}
