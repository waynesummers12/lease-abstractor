import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Lease Expense Review | SaveOnLease",
  description: "Review CAM and NNN terms in your lease, then add an annual statement and supporting records for an automated review.",
  alternates: { canonical: "https://www.saveonlease.com/marketing" },
};

export default function MarketingHomePage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-20 text-center sm:px-8 sm:pt-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">Commercial lease expense clarity</p>
        <h1 className="mx-auto mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
          Know what your lease says about CAM and NNN charges.
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
          Start with a free lease preview. Add an annual statement and supporting PDFs before checkout to compare the documents and check visible billing arithmetic.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-7 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            Upload a lease for a free preview
          </Link>
          <Link href="/marketing/pricing" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-50">
            Have a CAM statement? See what is included
          </Link>
        </div>
        <p className="mt-5 text-sm text-slate-500">$49.99 one-time for the paid report, with or without a statement. A potential discrepancy still needs supporting records and verification.</p>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Available today</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Lease Expense Review</h2>
            <p className="mt-2 text-sm font-semibold text-slate-700">$49.99 one-time after the free preview</p>
            <p className="mt-4 text-slate-600">Understand the CAM and NNN language in your lease and leave with a practical plan for checking your landlord&apos;s charges.</p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-slate-700">
              <li>Key expense terms, caps, exclusions, and tenant-share language</li>
              <li>Page-referenced topics and review deadlines to verify</li>
              <li>A records checklist and billing worksheet</li>
              <li>A downloadable PDF you can share with an adviser</li>
            </ul>
            <Link href="/marketing/pricing" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline underline-offset-4">See the current offer →</Link>
          </article>
          <article id="statement-review" className="scroll-mt-24 rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Included at the same price</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Lease + Annual Statement Review</h2>
            <p className="mt-2 text-sm font-semibold text-slate-700">$49.99 one-time · Optional statement and records</p>
            <p className="mt-4 text-slate-700">After the free lease preview, upload an annual CAM or NNN statement and up to four supporting PDFs. The report checks readable shares, visible arithmetic, payment credits, listed expenses, and relevant lease terms.</p>
            <p className="mt-4 text-sm text-slate-700">You also get prioritized questions, conditional dollar comparisons when the inputs support them, source pages, a billing worksheet, and a records request draft. Findings are leads to verify, not confirmed refunds.</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3"><Link href="/app/step-1-upload" className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-900 underline underline-offset-4">Start with your lease →</Link><a href="/marketing/how-it-works" className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-900 underline underline-offset-4">See the full workflow →</a></div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">A useful answer starts with the right documents</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-6"><p className="text-sm font-semibold text-emerald-800">01 · Lease</p><p className="mt-2 text-sm text-slate-600">Find the rules for expense categories, increases, allocations, and review rights.</p></div>
          <div className="rounded-2xl border border-slate-200 p-6"><p className="text-sm font-semibold text-emerald-800">02 · Annual statement</p><p className="mt-2 text-sm text-slate-600">See what the landlord actually billed, credited, and allocated to your space.</p></div>
          <div className="rounded-2xl border border-slate-200 p-6"><p className="text-sm font-semibold text-emerald-800">03 · Supporting records</p><p className="mt-2 text-sm text-slate-600">Add available invoices, area schedules, fee calculations, and amortization records. The report identifies what still needs verification.</p></div>
        </div>
        <p className="mt-7 max-w-3xl text-sm text-slate-600">Upload the lease first. On the free preview, add a statement and available supporting PDFs before the one-time checkout.</p>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-2xl font-semibold text-white">See the full report before deciding</h2><p className="mt-2 max-w-2xl text-sm text-slate-300">Explore an 11-page lease and statement review generated from fictional documents. It shows the calculations, questions, worksheet, and next steps a fuller report can provide.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="/sample/lease-and-statement-review-sample.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/40 px-5 py-2 text-sm font-semibold hover:bg-white/10">Full sample PDF ↗</a>
            <Link href="/app/step-1-upload" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100">Start your review</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
