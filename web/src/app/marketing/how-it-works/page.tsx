import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How SaveOnLease Works | From Lease to Statement Review",
  description: "See how a free lease preview becomes a page-referenced CAM and NNN report with statement checks, conditional comparisons, a billing worksheet, and next steps.",
  alternates: { canonical: "https://www.saveonlease.com/marketing/how-it-works" },
};

const reportSections = [
  { n: "01", title: "The first actions to take", body: "A front-page summary of the most pressing statement questions, the review deadline to verify, and records to request first." },
  { n: "02", title: "Annual statement review", body: "Checks readable tenant-share calculations, billed amounts, payment credits, possible duplicate lines, fees, exclusions, and capital-cost treatment against the lease." },
  { n: "03", title: "Conditional dollar comparisons", body: "When the documents support it, shows share-only and combined bill screens. Assumptions and overlapping amounts are spelled out; no refund is presumed." },
  { n: "04", title: "Lease snapshot", body: "Pulls out readable details such as premises area, tenant share, CAM caps, administrative fees, and record-review windows, with source pages." },
  { n: "05", title: "Clause-linked questions", body: "Pairs review topics with lease excerpts and explains which language to check in the signed lease and amendments." },
  { n: "06", title: "A practical follow-through kit", body: "Includes a records checklist, a prefilled billing worksheet where amounts are extractable, and a draft request to the landlord." },
];

const documentTiers = [
  { label: "Lease", heading: "Understand the rules", body: "Start with a text-readable signed lease and amendments. The free preview highlights extracted terms before you decide to buy." },
  { label: "+ Annual statement", heading: "Compare the bill", body: "Add the reconciliation before checkout to screen visible share, arithmetic, credits, and listed expenses against those terms." },
  { label: "+ Supporting PDFs", heading: "Bring more context", body: "Add up to four available records, such as an area schedule or invoices. The report inventories them and identifies what still needs verification." },
];

export default function HowItWorksPage() {
  return (
    <main className="bg-[#f7f8f5] text-[#172820]">
      <section className="overflow-hidden bg-[#102b25] text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a8edbf]">How SaveOnLease works</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.07] tracking-tight text-white sm:text-6xl">From a lease and a bill to <span className="text-[#a8edbf]">clearer next steps.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-200">Begin with a free lease preview. Add an annual CAM or NNN statement and supporting PDFs if you have them. The $49.99 report brings the terms, calculations, questions, and source pages together.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a8edbf] px-6 py-3 text-sm font-bold text-[#102b25] hover:bg-white">Start free preview <span aria-hidden className="ml-3">↗</span></Link>
              <a href="/sample/lease-and-statement-review-sample.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">Open full sample PDF ↗</a>
            </div>
            <p className="mt-5 text-sm text-slate-300">One-time purchase. The statement and supporting files are optional.</p>
          </div>
          <a href="/sample/lease-and-statement-review-sample.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open the full sample report PDF" className="relative z-10 mx-auto block w-full max-w-[470px] rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/25 transition-transform duration-300 ease-out hover:scale-[1.06] focus-visible:scale-[1.06] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#a8edbf] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:p-6">
            <div className="absolute -right-3 top-10 z-10 rounded-xl border border-emerald-200 bg-[#e3f6e8] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-emerald-950 shadow-lg sm:-right-6">Real report format</div>
            <div className="overflow-hidden rounded-xl bg-white shadow-xl"><Image src="/sample/lease-and-statement-review-preview.png" alt="First page of an illustrative SaveOnLease lease and statement review report" width={992} height={1403} priority className="h-auto w-full" /></div>
            <p className="mt-4 text-center text-xs text-slate-300">Fictional demonstration documents · outcomes vary by lease and statement</p>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">The workflow</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">The report gets more specific as you add evidence.</h2><p className="mt-4 text-lg leading-8 text-slate-600">Upload the lease first. You choose how much billing context to add before the one-time checkout.</p></div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">{documentTiers.map((tier, index) => <article key={tier.label} className="rounded-3xl border border-[#dce5dc] bg-white p-7 shadow-sm"><div className="flex items-center justify-between"><span className="rounded-full bg-[#e3f6e8] px-3 py-1 text-xs font-bold text-emerald-900">{tier.label}</span><span className="text-sm font-semibold text-emerald-800">0{index + 1}</span></div><h3 className="mt-8 text-xl font-semibold text-slate-950">{tier.heading}</h3><p className="mt-3 leading-7 text-slate-600">{tier.body}</p></article>)}</div>
        <div className="mt-7 rounded-2xl border border-emerald-200 bg-[#eaf7ed] p-5 text-sm leading-7 text-emerald-950"><strong>Before payment:</strong> see a free lease preview. <strong>After payment:</strong> download a full report based on the readable documents you supplied.</div>
      </section>

      <section className="border-y border-[#dce5dc] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Inside the paid PDF</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">More than a list of flagged clauses.</h2><p className="mt-4 text-lg leading-8 text-slate-600">The report is organized to help a tenant decide what to check, what to request, and which numbers need a second look.</p></div><a href="/sample/lease-and-statement-review-sample.pdf" target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-semibold text-emerald-800 underline underline-offset-4">Inspect all pages ↗</a></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{reportSections.map((section) => <article key={section.n} className="rounded-2xl border border-slate-200 bg-[#fbfcfa] p-6"><p className="text-sm font-bold text-emerald-800">{section.n} / 06</p><h3 className="mt-5 text-lg font-semibold text-slate-950">{section.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{section.body}</p></article>)}</div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-24 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">See the difference</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">A calculation with its assumptions visible.</h2><p className="mt-5 leading-8 text-slate-600">Where the documents provide enough detail, the report can compare the billed tenant share with the lease share, screen a controllable CAM cap, and show a conditional alternate balance. It keeps overlapping questions separate and tells you which records could confirm or change the result.</p><p className="mt-5 text-sm leading-7 text-slate-500">For the fictional example shown, the report calculates a $9,500 center-wide cap question and an alternate bill scenario. Those are review leads, not verified recoveries.</p></div>
        <div className="rounded-3xl border border-[#dce5dc] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.17em] text-emerald-800">Illustrative statement screen</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between gap-5 border-b border-slate-100 pb-4"><span className="text-sm text-slate-600">Statement says</span><strong className="text-right text-slate-950">13.8889% tenant share</strong></div>
            <div className="flex items-center justify-between gap-5 border-b border-slate-100 pb-4"><span className="text-sm text-slate-600">Signed amendment says</span><strong className="text-right text-slate-950">12% tenant share</strong></div>
            <div className="flex items-center justify-between gap-5 border-b border-slate-100 pb-4"><span className="text-sm text-slate-600">Prior-year covered CAM</span><strong className="text-right text-slate-950">$190,000</strong></div>
            <div className="flex items-center justify-between gap-5"><span className="text-sm text-slate-600">105% cap screen</span><strong className="text-right text-emerald-800">$199,500</strong></div>
          </div>
          <div className="mt-7 rounded-2xl bg-[#eaf7ed] p-5"><p className="text-sm font-semibold text-emerald-950">What the report asks next</p><p className="mt-2 text-sm leading-6 text-emerald-950">Were the area schedule, eligible categories, fee base, and monthly payments applied correctly?</p></div>
          <p className="mt-4 text-xs leading-5 text-slate-500">Figures come from fictional test documents. A real report depends on the text and records uploaded.</p>
        </div>
      </section>

      <section className="bg-[#102b25] px-6 py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_.85fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a8edbf]">Know the limits</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">A strong starting point, with room for verification.</h2><p className="mt-5 leading-8 text-slate-200">The report checks readable document text and visible arithmetic. It cannot authenticate invoices, prove every cost is allowable, confirm a payment cleared, or decide whether a claim is legally recoverable. Those open items are named so you know what to verify next.</p></div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-7"><p className="text-sm font-semibold text-[#a8edbf]">Your $49.99 one-time report</p><ul className="mt-5 list-none space-y-3 pl-0 text-sm leading-6 text-slate-100"><li>✓ Downloadable PDF</li><li>✓ Lease language and page references</li><li>✓ Statement checks when a statement is supplied</li><li>✓ Conditional calculations when inputs support them</li><li>✓ Worksheet, records checklist, and request draft</li></ul><Link href="/app/step-1-upload" className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#a8edbf] px-6 py-3 text-sm font-bold text-[#102b25] hover:bg-white">Start with a free preview ↗</Link></div>
        </div>
      </section>
    </main>
  );
}
