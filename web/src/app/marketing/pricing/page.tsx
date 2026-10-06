import Link from "next/link";

export const metadata = {
  title: "Pricing | SaveOnLease",
  description: "A $49.99 lease expense review after a free preview. Request a separate founder-reviewed lease and CAM statement pilot.",
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">Clear options</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">Start with the lease. Go deeper with a statement.</h1>
      <p className="mt-6 max-w-3xl text-lg text-slate-600">Choose the automated lease review available today or request an invitation to our founder-reviewed lease and annual statement pilot.</p>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Available now</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Lease Expense Review</h2>
          <p className="mt-4 text-4xl font-bold text-slate-950">$49.99 <span className="text-base font-normal text-slate-500">one-time</span></p>
          <p className="mt-5 text-slate-600">Upload one commercial lease PDF for a free preview. If you choose to pay, get a downloadable report on its CAM and NNN terms.</p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Expense categories, exclusions, caps, and allocation language</li>
            <li>Page-linked findings and items to verify</li>
            <li>Records checklist and billing worksheet</li>
            <li>PDF download; email link when a checkout email is available</li>
          </ul>
          <p className="mt-5 text-sm text-slate-600">A lease alone cannot establish whether a charge on your bill is wrong. This checkout does not analyze an annual statement.</p>
          <Link href="/app/step-1-upload" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">Start free lease preview →</Link>
          <p><a href="/sample/lease-review-sample.pdf" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline underline-offset-4">View a sample lease report (PDF) ↗</a></p>
        </section>
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Founder-reviewed pilot</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Lease + Annual Statement Review</h2>
          <p className="mt-4 text-lg font-semibold text-slate-950">Scope and price confirmed before you commit</p>
          <p className="mt-5 text-slate-700">For tenants with a lease and an annual CAM or NNN reconciliation. We&apos;ll compare lease rules with billed categories and calculations, then identify questions and records needed to verify them.</p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Limited invitations while the review process is developed</li>
            <li>Founder involvement in each pilot review</li>
            <li>No statement upload or payment in the request form</li>
          </ul>
          <Link href="/marketing/reconciliation-pilot" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-900 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800">Request pilot access →</Link>
        </section>
      </div>
      <section className="mt-16 max-w-3xl border-t border-slate-200 pt-10">
        <h2 className="text-2xl font-semibold text-slate-950">Questions</h2>
        <dl className="mt-6 space-y-6 text-slate-700">
          <div><dt className="font-semibold">Is the $49.99 product a subscription?</dt><dd className="mt-1">No. It is a one-time purchase for a lease report.</dd></div>
          <div><dt className="font-semibold">Can I upload my CAM statement at checkout?</dt><dd className="mt-1">No. The automated checkout accepts one lease PDF. Request pilot access for a paired review.</dd></div>
          <div><dt className="font-semibold">Will either review prove an overcharge?</dt><dd className="mt-1">A potential discrepancy needs supporting records and verification before it can be treated as an overcharge.</dd></div>
        </dl>
      </section>
    </main>
  );
}
