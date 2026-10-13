"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const cleanCode = (value: string) => value.trim().toLowerCase()
  .replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 48);

const steps = [
  { n: "01", title: "Share your link", body: "Send it to a tenant who could use a clearer view of their CAM or NNN charges." },
  { n: "02", title: "They review their lease", body: "Your client starts with a free lease preview and can add an annual statement and supporting records." },
  { n: "03", title: "Earn when they buy", body: "If they purchase the $49.99 report through your referral, the purchase is recorded with your code." },
];

export default function ReferralPage() {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState<"link" | "message" | null>(null);
  const code = cleanCode(name);
  const referralLink = code ? `https://www.saveonlease.com/marketing?ref=${encodeURIComponent(code)}` : "";
  const message = `I thought this could be useful for your lease review. SaveOnLease offers a free lease preview, with an optional $49.99 report that compares readable CAM and NNN statement details with your lease. Here is the link: ${referralLink}`;

  async function copy(text: string, kind: "link" | "message") {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2500);
    } catch {
      setCopied(null);
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
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">Your next step</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Make a link you can actually use.</h2><p className="mt-5 leading-8 text-slate-600">Choose a short code that identifies you or your firm. The code follows a customer from your link to checkout. Then contact us to connect that code with your payout details.</p><p className="mt-5 text-sm text-slate-500">Use letters, numbers, hyphens, or underscores. Avoid private information in a public link.</p></div>
          <div className="rounded-3xl border border-[#dce5dc] bg-[#f8faf7] p-6 shadow-sm sm:p-8">
            <label htmlFor="partner-code" className="block text-sm font-semibold">Your referral code</label>
            <input id="partner-code" type="text" autoComplete="off" maxLength={48} value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. northstar-advisors" className="mt-3 w-full rounded-xl border border-[#cbd8cd] bg-white px-4 py-3 text-base outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200" />
            <p className="mt-3 text-xs text-slate-500">Your link will be ready when you enter a code.</p>
            <div className="mt-7 rounded-2xl border border-[#dce5dc] bg-white p-4"><p className="text-xs font-bold uppercase tracking-[0.13em] text-slate-500">Your shareable link</p><p className="mt-2 break-all font-mono text-sm text-[#17392c]">{referralLink || "www.saveonlease.com/marketing?ref=your-code"}</p></div>
            <div className="mt-5 flex flex-wrap gap-3"><button type="button" disabled={!referralLink} onClick={() => copy(referralLink, "link")} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#102b25] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-40">{copied === "link" ? "Link copied" : "Copy link"}</button><button type="button" disabled={!referralLink} onClick={() => copy(message, "message")} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#b9cebd] bg-white px-5 py-3 text-sm font-semibold text-[#17392c] transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40">{copied === "message" ? "Message copied" : "Copy intro message"}</button></div>
            {referralLink && <a href={referralLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-semibold text-emerald-800 underline underline-offset-4">Open and test your link ↗</a>}
            <div className="mt-7 border-t border-[#dce5dc] pt-5"><p className="text-sm font-semibold">Connect your code to a payout</p><p className="mt-2 text-sm leading-6 text-slate-600">Email us your code and contact details before you start sharing. We will confirm the referral arrangement and payment details with you.</p><a href={`mailto:audits@saveonlease.com?subject=${encodeURIComponent("SaveOnLease referral partner")}&body=${encodeURIComponent(`Hi SaveOnLease, I would like to register my referral code: ${code || "[my code]"}. Please send me the partner and payout details.`)}`} className="mt-3 inline-block text-sm font-semibold text-emerald-800 underline underline-offset-4">Email us about your code ↗</a></div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">What clients receive</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A report with useful next questions.</h2><p className="mt-5 leading-8 text-slate-600">A free preview starts with the lease. If a client buys the full report and adds a readable annual statement, it can compare tenant share, visible arithmetic, and selected expense terms. The report points to source pages and records worth checking.</p><div className="mt-7 flex flex-wrap gap-5"><a href="/sample/lease-and-statement-review-sample.pdf" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-emerald-800 underline underline-offset-4">View the full sample report ↗</a><Link href="/marketing#statement-review" className="text-sm font-semibold text-emerald-800 underline underline-offset-4">See statement review details ↗</Link></div><div className="mt-10 rounded-3xl border border-[#dce5dc] bg-white p-7 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">A good moment to share</p><ul className="mt-5 space-y-4 text-sm leading-6 text-slate-700"><li className="flex gap-3"><span className="font-bold text-emerald-700">01</span> A tenant receives an annual CAM reconciliation.</li><li className="flex gap-3"><span className="font-bold text-emerald-700">02</span> A renewal is approaching and expense terms matter.</li><li className="flex gap-3"><span className="font-bold text-emerald-700">03</span> Someone needs a starting list of records to request.</li></ul><p className="mt-6 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-500">The report identifies questions for verification. It does not establish a refund or replace professional advice.</p></div></div>
        <a href="/sample/lease-and-statement-review-sample.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open the full sample report PDF" className="relative z-10 block rounded-3xl border border-[#dce5dc] bg-white p-5 shadow-xl transition-transform duration-300 ease-out hover:scale-[1.06] focus-visible:scale-[1.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 motion-reduce:transition-none motion-reduce:hover:scale-100"><div className="overflow-hidden rounded-xl border border-slate-200"><Image src="/sample/lease-and-statement-review-preview.png" alt="Preview of the sample lease and statement review report" width={992} height={1403} className="h-auto w-full" /></div><p className="mt-4 text-center text-sm font-semibold text-emerald-800">Explore the full sample report ↗</p><p className="mt-1 text-center text-xs text-slate-500">Fictional demonstration documents</p></a>
      </section>

      <section className="bg-[#102b25] px-6 py-16 text-white"><div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">Ready to make an introduction?</p><h2 className="mt-3 text-3xl font-semibold text-white">Share something useful. Get credit when it converts.</h2></div><a href="#create-link" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a8edbf] px-6 py-3 text-sm font-bold text-[#102b25] hover:bg-white">Create your link ↗</a></div></section>
    </main>
  );
}
