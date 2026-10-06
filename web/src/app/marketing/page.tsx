import Link from "next/link";

export const metadata = {
  title: "Commercial Lease Expense Review | SaveOnLease",
  description: "Review CAM and NNN terms in your commercial lease. Start with a free preview, or request the founder-reviewed lease and annual statement pilot.",
  alternates: { canonical: "/marketing" },
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
          Start with a free lease preview. The paid lease review gives you page-linked terms, deadlines to verify, and the records to request before checking an annual bill.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-7 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            Upload a lease for a free preview
          </Link>
          <Link href="/marketing/reconciliation-pilot" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-50">
            Have a CAM statement? Explore the pilot
          </Link>
        </div>
        <p className="mt-5 text-sm text-slate-500">The automated checkout currently reviews a lease only. The statement review is a separate founder-reviewed pilot.</p>
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
          <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Founder-reviewed pilot</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Lease + Annual Statement Review</h2>
            <p className="mt-2 text-sm font-semibold text-slate-700">Limited invitations · Scope and price confirmed first</p>
            <p className="mt-4 text-slate-700">Bring your lease and annual CAM or NNN reconciliation. We&apos;ll explore billed categories, allocation math, missing support, and questions to raise.</p>
            <p className="mt-4 text-sm text-slate-700">This pilot involves founder review. The site does not collect statements or charge for this service yet.</p>
            <Link href="/marketing/reconciliation-pilot" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-emerald-900 underline underline-offset-4">Request pilot access →</Link>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">A useful answer starts with the right documents</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-6"><p className="text-sm font-semibold text-emerald-800">01 · Lease</p><p className="mt-2 text-sm text-slate-600">Find the rules for expense categories, increases, allocations, and review rights.</p></div>
          <div className="rounded-2xl border border-slate-200 p-6"><p className="text-sm font-semibold text-emerald-800">02 · Annual statement</p><p className="mt-2 text-sm text-slate-600">See what the landlord actually billed, credited, and allocated to your space.</p></div>
          <div className="rounded-2xl border border-slate-200 p-6"><p className="text-sm font-semibold text-emerald-800">03 · Supporting records</p><p className="mt-2 text-sm text-slate-600">Confirm invoices, area schedules, fee bases, and amortization before asserting an overcharge.</p></div>
        </div>
        <p className="mt-7 max-w-3xl text-sm text-slate-600">The current automated product handles step one. The paired review is being developed with a small founder-reviewed group.</p>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-2xl font-semibold">See the report before deciding</h2><p className="mt-2 max-w-2xl text-sm text-slate-300">Open a real generated lease report from a demonstration document. The separate statement-review example is a manually prepared concept.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="/sample/lease-review-sample.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/40 px-5 py-2 text-sm font-semibold hover:bg-white/10">Lease report PDF ↗</a>
            <Link href="/marketing/reconciliation-pilot" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100">Explore the pilot</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
