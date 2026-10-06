import Link from "next/link";

export const metadata = {
  title: "How SaveOnLease Works | Lease Review and CAM Statement Pilot",
  description: "Start with an automated commercial lease review, or request a founder-reviewed comparison with an annual CAM statement.",
};

export default function HowItWorksPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">How it works</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">From lease terms to better questions.</h1>
      <p className="mt-6 max-w-3xl text-lg text-slate-600">The current product reviews lease language. Our separate founder-reviewed pilot pairs that lease with an annual CAM or NNN statement.</p>
      <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-7 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Available now · $49.99 after preview</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">Automated Lease Expense Review</h2>
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          <div><p className="text-sm font-semibold text-emerald-800">01 · Upload</p><p className="mt-2 text-sm text-slate-600">Submit one commercial lease PDF, including its relevant exhibits if they are in that file.</p></div>
          <div><p className="text-sm font-semibold text-emerald-800">02 · Preview</p><p className="mt-2 text-sm text-slate-600">See the free preview before deciding whether to purchase the report.</p></div>
          <div><p className="text-sm font-semibold text-emerald-800">03 · Review</p><p className="mt-2 text-sm text-slate-600">Download a report with page-linked expense terms, records to request, and a worksheet for checking bills.</p></div>
        </div>
        <p className="mt-7 text-sm text-slate-600">This process analyzes lease language. It does not verify charges against an annual statement or supporting invoices.</p>
        <div className="mt-6 flex flex-wrap gap-4"><Link href="/app/step-1-upload" className="inline-flex min-h-11 items-center rounded-lg bg-slate-950 px-5 py-2 text-sm font-semibold text-white">Start free preview →</Link><a href="/sample/lease-review-sample.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline underline-offset-4">View sample report ↗</a></div>
      </section>
      <section className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Founder-reviewed pilot</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">Lease + Annual Statement Review</h2>
        <p className="mt-4 max-w-3xl text-slate-700">If you have both documents, request an invitation. We&apos;ll confirm scope, timing, and price before asking for files. A founder-reviewed comparison can examine billed categories, allocation math, and gaps in supporting records. Findings remain questions until verified.</p>
        <Link href="/marketing/reconciliation-pilot" className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-emerald-900 px-5 py-2 text-sm font-semibold text-white">Request pilot access →</Link>
      </section>
    </main>
  );
}
