import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about a SaveOnLease report, billing, or the referral program? Reach the SaveOnLease team by email.",
  alternates: { canonical: "https://www.saveonlease.com/marketing/contact" },
};

const topics = [
  {
    number: "01",
    title: "A question about your review",
    description: "Need help finding your report, understanding a flagged item, or deciding which records to request?",
    subject: "Question about my SaveOnLease review",
    action: "Ask about a review",
  },
  {
    number: "02",
    title: "Billing or account help",
    description: "Tell us if a purchase, download, sign-in link, or account detail needs attention.",
    subject: "SaveOnLease billing or account help",
    action: "Get account help",
  },
  {
    number: "03",
    title: "Partnerships and feedback",
    description: "Have a referral question or an idea that would make SaveOnLease more useful?",
    subject: "SaveOnLease partnership or feedback",
    action: "Start a conversation",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-[#f6f8f4] text-[#142920]">
      <section className="relative isolate overflow-hidden bg-[#102b25] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-36 -top-44 h-[36rem] w-[36rem] rounded-full border border-white/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-[26rem] w-[26rem] rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#a8edbf]/35 bg-[#a8edbf]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#b8f0ca]"><span className="h-2 w-2 rounded-full bg-[#a8edbf]" /> Contact SaveOnLease</p>
            <h1 className="mt-7 max-w-2xl text-5xl font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl">A real question deserves <span className="text-[#a8edbf]">a clear answer.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-200">Whether you&apos;re reviewing a report, sorting out an account issue, or exploring a partnership, tell us what you need. We&apos;ll help you find the next step.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="mailto:audits@saveonlease.com?subject=Question%20for%20SaveOnLease" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a8edbf] px-6 py-3 text-sm font-bold text-[#102b25] transition hover:bg-white">Email our team <span aria-hidden="true" className="ml-3">↗</span></a>
              <a href="#choose-topic" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Choose a topic ↓</a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-6">
            <div className="rounded-[1.4rem] bg-white p-7 text-[#142920] sm:p-9">
              <div className="flex items-start justify-between gap-4 border-b border-[#e0e9e0] pb-6"><div><p className="text-xs font-bold uppercase tracking-[0.17em] text-emerald-800">Direct line</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Reach the SaveOnLease team.</h2></div><span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e5f6ed] text-2xl text-emerald-800">✉</span></div>
              <p className="mt-7 text-sm font-semibold text-slate-500">EMAIL</p>
              <a href="mailto:audits@saveonlease.com" className="mt-2 block break-all text-xl font-semibold text-[#102b25] underline decoration-emerald-300 underline-offset-4 hover:text-emerald-800 sm:text-2xl">audits@saveonlease.com</a>
              <p className="mt-5 text-sm leading-7 text-slate-600">Include a few details about what you&apos;re trying to do. If you have a report, its reference or purchase email helps us locate it.</p>
              <div className="mt-7 rounded-2xl bg-[#f2f7f1] p-5"><p className="text-sm font-semibold text-[#102b25]">Prefer to start on your own?</p><p className="mt-2 text-sm leading-6 text-slate-600">Preview your lease at no cost, or see what the full report includes.</p><div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold"><Link href="/app/step-1-upload" className="text-emerald-800 underline underline-offset-4">Start free preview ↗</Link><Link href="/marketing/how-it-works" className="text-emerald-800 underline underline-offset-4">How it works ↗</Link></div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="choose-topic" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 sm:py-24">
        <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">Tell us what&apos;s on your mind</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#102b25] sm:text-4xl">Get your message to the right conversation.</h2><p className="mt-4 text-lg leading-8 text-slate-600">Choose a starting point below. Each option opens an email with a subject line ready to go.</p></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {topics.map((topic) => (
            <article key={topic.number} className="flex flex-col rounded-3xl border border-[#dce5dc] bg-white p-7 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <p className="text-sm font-bold text-emerald-700">{topic.number} / 03</p>
              <h3 className="mt-8 text-xl font-semibold text-[#102b25]">{topic.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{topic.description}</p>
              <a href={`mailto:audits@saveonlease.com?subject=${encodeURIComponent(topic.subject)}`} className="mt-8 inline-flex min-h-11 items-center self-start font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950">{topic.action} ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#dce5dc] bg-white px-6 py-16"><div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">We&apos;re here to help</p><h2 className="mt-3 text-2xl font-semibold text-[#102b25] sm:text-3xl">Not sure which topic fits?</h2><p className="mt-3 text-slate-600">Send us a note in your own words and we&apos;ll take it from there.</p></div><a href="mailto:audits@saveonlease.com?subject=Question%20for%20SaveOnLease" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#102b25] px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-900">Email us ↗</a></div></section>
    </main>
  );
}
