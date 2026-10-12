import Link from "next/link";

export const metadata = {
  title: "How SaveOnLease Works | Lease and Statement Review",
  description: "Upload a lease for a free preview, optionally add an annual CAM statement and supporting records, then purchase one report.",
};

export default function HowItWorksPage() {
  return <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">How it works</p>
    <h1 className="mt-4 text-4xl font-semibold text-slate-950 sm:text-6xl">From lease terms to better questions.</h1>
    <p className="mt-6 max-w-3xl text-lg text-slate-600">One automated workflow. Start with the signed lease, add available billing documents, and review the evidence before deciding what to investigate.</p>
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      <section className="rounded-2xl border border-slate-200 p-6"><p className="text-sm font-semibold text-emerald-800">01 · Lease</p><h2 className="mt-2 text-xl font-semibold text-slate-950">Upload and preview</h2><p className="mt-3 text-sm text-slate-600">Upload a text-readable commercial lease PDF. See the extracted details in a free preview.</p></section>
      <section className="rounded-2xl border border-slate-200 p-6"><p className="text-sm font-semibold text-emerald-800">02 · Annual statement</p><h2 className="mt-2 text-xl font-semibold text-slate-950">Compare the bill</h2><p className="mt-3 text-sm text-slate-600">On the preview, add a CAM or NNN statement. We check readable tenant-share values and visible arithmetic against the lease.</p></section>
      <section className="rounded-2xl border border-slate-200 p-6"><p className="text-sm font-semibold text-emerald-800">03 · Supporting records</p><h2 className="mt-2 text-xl font-semibold text-slate-950">See what is missing</h2><p className="mt-3 text-sm text-slate-600">Add up to four supporting PDFs. The report inventories the files and labels claims that still need invoice, area, or fee verification.</p></section>
    </div>
    <p className="mt-8 max-w-3xl text-sm text-slate-700">The $49.99 one-time report includes whichever documents you add before checkout. An automated question is not a verified overcharge or legal conclusion.</p>
    <div className="mt-8 flex flex-wrap gap-4"><Link href="/app/step-1-upload" className="inline-flex min-h-11 items-center rounded-lg bg-slate-950 px-5 py-2 text-sm font-semibold text-white">Start free preview →</Link><a href="/sample/lease-review-sample.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline">View sample lease report ↗</a></div>
  </main>;
}
