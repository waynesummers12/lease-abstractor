"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";

const cleanCode = (value: string) => value.trim().toLowerCase()
  .replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 48);

const steps = [
  { n: "01", title: "Register and share", body: "Sign in, register a code to your account, then send your link to a tenant." },
  { n: "02", title: "They review their lease", body: "Your client starts with a free lease preview and can add an annual statement and supporting records." },
  { n: "03", title: "Earn when they buy", body: "If they purchase the $49.99 report through your referral, the purchase is recorded with your code." },
];

export default function ReferralPage() {
  const { session, loading: authLoading } = useAuth();
  const [name, setName] = useState("");
  const [copied, setCopied] = useState<"link" | "message" | null>(null);
  const [copyFailed, setCopyFailed] = useState(false);
  const [registeredCodes, setRegisteredCodes] = useState<string[]>([]);
  const [monthlyEmailByCode, setMonthlyEmailByCode] = useState<Record<string, boolean>>({});
  const [monthlyEmailOptIn, setMonthlyEmailOptIn] = useState(false);
  const [preferenceSaving, setPreferenceSaving] = useState(false);
  const [preferenceNotice, setPreferenceNotice] = useState("");
  const [registeredAccount, setRegisteredAccount] = useState<string | null>(null);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const code = cleanCode(name);
  const isRegistered = code !== "" && registeredAccount === session?.user.id && registeredCodes.includes(code);
  const referralLink = code ? `https://www.saveonlease.com/app/step-1-upload?ref=${encodeURIComponent(code)}` : "";
  const returnToRegistration = `/login?next=${encodeURIComponent(`/marketing/referral?code=${encodeURIComponent(code)}#create-link`)}`;
  const message = `Hi,\n\nIf you're looking at a commercial lease or this year's CAM or NNN statement, this may help. SaveOnLease starts with a free preview of lease terms worth checking. You can add your annual statement, and the optional $49.99 report brings the questions, source pages, and records to request into one place.\n\nTake a look here: ${referralLink}\n\nThe report points to items to verify; it doesn't claim a confirmed overcharge.`;
  const emailShareLink = `mailto:?subject=${encodeURIComponent("A lease review tool you may find useful")}&body=${encodeURIComponent(message)}`;
  const textShareLink = `sms:?body=${encodeURIComponent(message)}`;

  useEffect(() => {
    const requestedCode = new URLSearchParams(window.location.search).get("code");
    if (requestedCode) setName(cleanCode(requestedCode));
  }, []);

  useEffect(() => {
    setRegisteredCodes([]);
    setMonthlyEmailByCode({});
    setRegisteredAccount(null);
    if (!session?.access_token) return;
    let active = true;
    fetch("/api/referral-partners", { headers: { Authorization: `Bearer ${session.access_token}` }, cache: "no-store" })
      .then(async (response) => { if (!response.ok) throw new Error("Could not load your registered codes."); return response.json(); })
      .then((result) => { if (active) { const codes = (result.codes ?? []).filter((item: { status: string }) => item.status === "active") as { code: string; monthly_email_enabled: boolean }[]; setRegisteredCodes(codes.map((item) => item.code)); setMonthlyEmailByCode(Object.fromEntries(codes.map((item) => [item.code, item.monthly_email_enabled]))); setRegisteredAccount(session.user.id); } })
      .catch(() => { if (active) { setRegisteredAccount(null); setRegistrationError("Could not load your registered codes. Please refresh the page."); } });
    return () => { active = false; };
  }, [session?.access_token, session?.user.id]);

  async function registerCode() {
    if (!code || !session?.access_token || registrationLoading) return;
    setRegistrationLoading(true);
    setRegistrationError("");
    try {
      const response = await fetch("/api/referral-partners", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ code, monthlyEmailEnabled: monthlyEmailOptIn }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Could not register this code.");
      setRegisteredCodes((previous) => previous.includes(code) ? previous : [...previous, code]);
      setMonthlyEmailByCode((previous) => ({ ...previous, [code]: monthlyEmailOptIn }));
      setRegisteredAccount(session.user.id);
    } catch (error) {
      setRegistrationError(error instanceof Error ? error.message : "Could not register this code.");
    } finally {
      setRegistrationLoading(false);
    }
  }

  async function changeMonthlyEmail(enabled: boolean) {
    setPreferenceNotice("");
    if (!isRegistered || !session?.access_token) { setMonthlyEmailOptIn(enabled); return; }
    setPreferenceSaving(true);
    try {
      const response = await fetch("/api/referral-partners", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ code, monthlyEmailEnabled: enabled }),
      });
      if (!response.ok) throw new Error("Could not save your email preference. Please try again.");
      setMonthlyEmailByCode((previous) => ({ ...previous, [code]: enabled }));
      setPreferenceNotice(enabled ? "Monthly email summaries are on." : "Monthly email summaries are off.");
    } catch (error) {
      setPreferenceNotice(error instanceof Error ? error.message : "Could not save your email preference.");
    } finally {
      setPreferenceSaving(false);
    }
  }

  async function copy(text: string, kind: "link" | "message") {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopyFailed(false);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2500);
    } catch {
      setCopied(null);
      setCopyFailed(true);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f7f2] text-[#14251f]">
      <section className="relative overflow-hidden border-b border-[#dce5dc] bg-[#102b25] text-white">
        <div className="pointer-events-none absolute -right-32 -top-48 h-[35rem] w-[35rem] rounded-full border border-emerald-300/20" />
        <div className="pointer-events-none absolute -right-16 -top-32 h-[27rem] w-[27rem] rounded-full border border-emerald-300/20" />
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200"><span className="h-2 w-2 rounded-full bg-emerald-300" /> SaveOnLease partner program</p>
            <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl">Help tenants understand their lease. <span className="text-[#99e2bd]">Earn 20% when they buy.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">Give a client a practical starting point for reviewing CAM and NNN charges. They can begin with a free lease preview, then choose whether to buy the full report.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#create-link" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a8edbf] px-6 py-3 text-sm font-bold text-[#102b25] transition hover:bg-white">Create your referral link <span aria-hidden className="ml-3">↗</span></a>
              <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">See how it works</a>
            </div>
            <p className="mt-5 text-sm text-slate-300">20% applies when a referred customer purchases a report.</p>
          </div>
          <div className="relative z-10 rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-6" aria-label="Referral process overview">
            <div className="rounded-[1.4rem] bg-white p-6 text-[#14251f] shadow-xl sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">A simple introduction</p><p className="mt-1 text-lg font-semibold">From your link to a clearer report</p></div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-2xl text-emerald-800" aria-hidden>↗</div>
              </div>
              <div className="mt-6 space-y-3">
                {[["1", "Your introduction", "A tenant opens your personal link."], ["2", "A useful free preview", "They see what their lease says first."], ["3", "A paid report, if they choose", "Your code is attached to the purchase."]].map(([n, title, body]) => (
                  <div key={n} className="flex items-center gap-4 rounded-2xl bg-[#f3f8f3] p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-semibold text-emerald-800 shadow-sm">{n}</span><div><p className="font-semibold">{title}</p><p className="text-sm text-slate-600">{body}</p></div></div>
                ))}
              </div>
              <div className="mt-6 flex items-end justify-between rounded-2xl bg-[#102b25] p-5 text-white"><div><p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Example on a $49.99 report</p><p className="mt-1 text-sm text-slate-300">Your 20% commission</p></div><p className="text-3xl font-semibold text-white">$10<span className="text-base text-slate-300"> approx.</span></p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 sm:py-24">
        <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">How it works</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A helpful introduction in three steps.</h2><p className="mt-4 text-slate-600">The client decides whether to purchase. Your role is simply to share a relevant tool at the right time.</p></div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">{steps.map((step) => <article key={step.n} className="rounded-3xl border border-[#dce5dc] bg-white p-7 shadow-sm"><p className="text-sm font-bold text-emerald-700">{step.n} / 03</p><h3 className="mt-8 text-xl font-semibold">{step.title}</h3><p className="mt-3 leading-7 text-slate-600">{step.body}</p></article>)}</div>
      </section>

      <section id="create-link" className="scroll-mt-28 border-y border-[#dce5dc] bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">Your next step</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Make a link you can actually use.</h2><p className="mt-5 leading-8 text-slate-600">Choose a short code that identifies you or your firm. Sign in once to register it to your account, then share your link. Your account email becomes your referral contact.</p><p className="mt-5 text-sm text-slate-500">Use letters, numbers, hyphens, or underscores. Avoid private information in a public link.</p></div>
          <div className="rounded-3xl border border-[#dce5dc] bg-[#f8faf7] p-6 shadow-sm sm:p-8">
            <label htmlFor="partner-code" className="block text-sm font-semibold">Your referral code</label>
            <input id="partner-code" type="text" autoComplete="off" maxLength={48} value={name} onChange={(event) => { setName(event.target.value); setRegistrationError(""); setPreferenceNotice(""); }} placeholder="e.g. northstar-advisors" className="mt-3 w-full rounded-xl border border-[#cbd8cd] bg-white px-4 py-3 text-base outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200" />
            {referralLink ? (
              <div role="status" className="mt-5 flex items-start gap-4 rounded-2xl border border-emerald-300 bg-[#102b25] p-5 text-white shadow-lg shadow-emerald-950/15 sm:p-6">
                <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#a8edbf] text-2xl font-bold text-[#102b25]">✓</span>
                <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a8edbf]">{isRegistered ? "Code registered" : "Link created"}</p><p className="mt-1 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">{isRegistered ? "Ready to share!" : "Register your code next"}</p><p className="mt-2 text-sm leading-6 text-slate-200">{isRegistered ? "Your code is attached to your account. Use the link or message below to introduce a tenant." : "Your link is created. Register the code to your account below before you share it."}</p></div>
              </div>
            ) : <p className="mt-3 text-sm text-slate-500">Enter a code to create your referral link and message.</p>}
            {code && <div className="mt-4 rounded-2xl border border-[#b9cebd] bg-white p-5"><p className="font-semibold text-[#17392c]">{isRegistered ? "✓ This code is registered to you" : "Register this code to your account"}</p><p className="mt-2 text-sm leading-6 text-slate-600">{isRegistered ? `Your account email is ${session?.user.email ?? "on file"}.` : authLoading ? "Checking your account…" : session ? `Register instantly with ${session.user.email ?? "your account"}. No email to us is needed.` : "Sign in with Google, a password, or an email link. You will return here with your code ready to register."}</p>{!isRegistered && !authLoading && (session ? <button type="button" onClick={registerCode} disabled={registrationLoading} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#102b25] px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900 disabled:opacity-60">{registrationLoading ? "Registering…" : "Register my code"}</button> : <Link href={returnToRegistration} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#102b25] px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900">Sign in to register ↗</Link>)}{registrationError && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{registrationError}</p>}</div>}
            {code && <div className="mt-4 rounded-2xl border border-[#b9cebd] bg-white p-5"><label className="flex cursor-pointer items-start gap-3"><input type="checkbox" checked={isRegistered ? monthlyEmailByCode[code] ?? false : monthlyEmailOptIn} disabled={preferenceSaving} onChange={(event) => changeMonthlyEmail(event.target.checked)} className="mt-1 h-4 w-4 accent-emerald-800" /><span><strong className="block text-sm text-[#17392c]">Email me a monthly referral summary</strong><span className="mt-1 block text-sm leading-6 text-slate-600">After each month ends, receive counts of analyzed leases and paid reports, plus commissions earned for this code. You can turn this off here anytime.</span></span></label>{preferenceSaving && <p role="status" className="mt-3 text-sm text-slate-600">Saving your preference…</p>}{preferenceNotice && <p role="status" className="mt-3 text-sm font-semibold text-emerald-800">{preferenceNotice}</p>}</div>}
            <div className="mt-7 rounded-2xl border border-[#dce5dc] bg-white p-4"><p className="text-xs font-bold uppercase tracking-[0.13em] text-slate-500">Your shareable link</p><p className="mt-2 break-all font-mono text-sm text-[#17392c]">{referralLink || "www.saveonlease.com/app/step-1-upload?ref=your-code"}</p><p className="mt-2 text-xs text-slate-500">This takes your client straight to the free lease preview upload.</p></div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#b9cebd] bg-white shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dce5dc] bg-[#eaf5ec] px-5 py-4"><div><p className="text-xs font-bold uppercase tracking-[0.13em] text-emerald-800">{isRegistered ? "Ready to share" : "Message preview"}</p><p className="mt-1 font-semibold text-[#17392c]">Preview your intro message</p></div><div className="flex flex-wrap gap-2">{isRegistered ? <><a href={emailShareLink} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm hover:bg-emerald-50">Email message ↗</a><a href={textShareLink} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm hover:bg-emerald-50">Text message ↗</a></> : <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-800">Register to share</span>}</div></div><div className="p-5"><p className="text-sm leading-6 text-slate-600">This is exactly what Copy intro message will copy. Personalize it after pasting.</p><p className="mt-4 whitespace-pre-wrap break-words rounded-xl border border-[#dce5dc] bg-[#f8faf7] p-5 text-sm leading-6 text-[#17392c]">{referralLink ? message : "Enter a referral code above to preview your message with its link."}</p></div></div>
            <div className="mt-5 flex flex-wrap gap-3"><button type="button" disabled={!isRegistered} onClick={() => copy(referralLink, "link")} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#102b25] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-40">{copied === "link" ? "Link copied" : "Copy link"}</button><button type="button" disabled={!isRegistered} onClick={() => copy(message, "message")} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#b9cebd] bg-white px-5 py-3 text-sm font-semibold text-[#17392c] transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40">{copied === "message" ? "Message copied" : "Copy intro message"}</button></div>
            <p aria-live="polite" className={`mt-3 text-sm font-semibold ${copyFailed ? "text-red-700" : "text-emerald-800"}`}>{copyFailed ? "Could not copy. Please select and copy the text above." : copied === "message" ? "Intro message copied. Paste it into an email or text and personalize it before sending." : copied === "link" ? "Referral link copied. Paste it wherever you want to share it." : ""}</p>
            {isRegistered && <a href={referralLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-semibold text-emerald-800 underline underline-offset-4">See where your clients start ↗</a>}
            <div className="mt-7 rounded-2xl border border-[#b9cebd] bg-[#eef6ee] p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">How your referrals are tracked</p>
              <ol className="mt-4 space-y-4 text-sm leading-6 text-[#17392c]">
                <li><strong>1. Register your code here.</strong> Sign in, enter your code above, and select <strong>Register my code</strong>. We attach it to your account immediately. There is no registration email to send.</li>
                <li><strong>2. Share your link.</strong> Once you see <strong>Ready to share</strong>, copy your link or intro message. When a tenant opens the link, we save your code in their browser for 30 days and carry it through checkout.</li>
                <li><strong>3. We record a paid referral.</strong> Our private report counts referred leases that reach analysis and paid reports by code and month. A paid report with your code attached earns a 20% commission; a free preview alone does not.</li>
                <li><strong>4. Get a monthly summary if you opt in.</strong> After each month ends, we email analyzed lease counts, paid reports, and commissions earned for your code. You can change this preference above. Our team coordinates payouts separately; the email is a report, not a payment confirmation.</li>
              </ol>
              <p className="mt-5 text-sm leading-6 text-[#456654]">Have a code with earlier activity or a payment question? <a href="mailto:audits@saveonlease.com?subject=SaveOnLease%20referral%20question" className="font-semibold text-emerald-800 underline underline-offset-4">Email us ↗</a></p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">What clients receive</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A report with useful next questions.</h2><p className="mt-5 leading-8 text-slate-600">A free preview starts with the lease. If a client buys the full report and adds a readable annual statement, it can compare tenant share, visible arithmetic, and selected expense terms. The report points to source pages and records worth checking.</p><div className="mt-7 flex flex-wrap gap-5"><a href="/sample/lease-and-statement-review-sample.pdf" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-emerald-800 underline underline-offset-4">View the full sample report ↗</a><Link href="/marketing#statement-review" className="text-sm font-semibold text-emerald-800 underline underline-offset-4">See statement review details ↗</Link></div><div className="mt-10 rounded-3xl border border-[#dce5dc] bg-white p-7 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">A good moment to share</p><ul className="mt-5 space-y-4 text-sm leading-6 text-slate-700"><li className="flex gap-3"><span className="font-bold text-emerald-700">01</span> A tenant receives an annual CAM reconciliation.</li><li className="flex gap-3"><span className="font-bold text-emerald-700">02</span> A renewal is approaching and expense terms matter.</li><li className="flex gap-3"><span className="font-bold text-emerald-700">03</span> Someone needs a starting list of records to request.</li></ul><p className="mt-6 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-500">The report identifies questions for verification. It does not establish a refund or replace professional advice.</p></div></div>
        <a href="/sample/lease-and-statement-review-sample.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open the full sample report PDF" className="relative z-10 block rounded-3xl border border-[#dce5dc] bg-white p-5 shadow-xl transition-transform duration-300 ease-out hover:scale-[1.06] focus-visible:scale-[1.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 motion-reduce:transition-none motion-reduce:hover:scale-100"><div className="overflow-hidden rounded-xl border border-slate-200"><Image src="/sample/lease-and-statement-review-preview.png" alt="Preview of the sample lease and statement review report" width={992} height={1403} className="h-auto w-full" /></div><p className="mt-4 text-center text-sm font-semibold text-emerald-800">Explore the full sample report ↗</p><p className="mt-1 text-center text-xs text-slate-500">Fictional demonstration documents</p></a>
      </section>

      <section className="bg-[#102b25] px-6 py-16 text-white"><div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">Ready to make an introduction?</p><h2 className="mt-3 text-3xl font-semibold text-white">Share something useful. Get credit when it converts.</h2><p className="mt-4 text-slate-200">Questions about the referral program? <a href="mailto:audits@saveonlease.com?subject=SaveOnLease%20referral%20program%20question" className="font-semibold text-[#a8edbf] underline underline-offset-4 hover:text-white">Email us ↗</a></p></div><a href="#create-link" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a8edbf] px-6 py-3 text-sm font-bold text-[#102b25] hover:bg-white">Create your link ↗</a></div></section>
    </main>
  );
}
