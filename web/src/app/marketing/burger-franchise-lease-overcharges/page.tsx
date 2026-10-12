import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Burger Franchise Lease Overcharges: What to Verify",
  description:
    "Review common CAM and NNN billing questions for burger franchise locations, the lease terms that matter, and the records needed before claiming an overcharge.",
  alternates: {
    canonical: "https://www.saveonlease.com/marketing/burger-franchise-lease-overcharges",
  },
};

const patterns = [
  {
    title: "A share that does not match the lease",
    signal: "The annual statement uses a percentage or square-footage denominator you do not recognize.",
    proof: "Compare the lease and amendments with the dated center area schedule and allocation worksheet.",
  },
  {
    title: "A cost category that may be excluded",
    signal: "Roof, paving, leasing, or other major charges appear under a broad CAM heading.",
    proof: "Read the lease definition and exceptions, then obtain the underlying invoice and any amortization schedule.",
  },
  {
    title: "A fee calculated on the wrong base",
    signal: "A management or administrative percentage appears larger than the clause seems to allow.",
    proof: "Request the fee worksheet and identify which expenses were included in its base.",
  },
  {
    title: "Estimated payments that may not be fully credited",
    signal: "The statement credit differs from the installments shown in your own payment ledger.",
    proof: "Reconcile both ledgers by month, including reversals, late payments, and credits.",
  },
  {
    title: "A shared service billed to the wrong group",
    signal: "Drive-through, parking, trash, grease, or utility costs appear to be spread across spaces that may not benefit equally.",
    proof: "Check the lease allocation rule and request service invoices, meter records, or cost-pool schedules.",
  },
];

export default function BurgerFranchiseLeaseOverchargesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-slate-800 sm:py-20">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">Burger franchise billing review</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Burger franchise lease overcharges: what can you verify?
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          An unexpected CAM or NNN charge is a reason to investigate, not yet an established overcharge. Compare the lease, annual statement, and backup for that location before assigning a tenant-level dollar amount.
        </p>
        <Link href="/app/step-1-upload" className="mt-7 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-slate-800">
          Start with a free lease preview
        </Link>
      </header>

      <section className="mt-14 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-950">Use three labels for every finding</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
          <li><strong>Question:</strong> The statement or lease suggests something to check.</li>
          <li><strong>Documented difference:</strong> The available figures or clauses do not match; the reason may still be unknown.</li>
          <li><strong>Verified amount:</strong> The applicable lease terms, source records, allocation, and payment credits support a tenant-level calculation.</li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">Five billing patterns to investigate</h2>
        <div className="mt-6 space-y-4">
          {patterns.map((pattern, index) => (
            <article key={pattern.title} className="rounded-2xl border border-slate-200 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-950">{index + 1}. {pattern.title}</h3>
              <p className="mt-2"><strong>What you may see:</strong> {pattern.signal}</p>
              <p className="mt-2"><strong>What to verify:</strong> {pattern.proof}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-950">A credit example</h2>
        <p className="mt-3 leading-relaxed">Suppose a store's own ledger shows twelve $500 estimated CAM payments ($6,000), while the annual statement credits $5,500. The visible difference is $500. Check both ledgers and any adjustments before treating it as an amount owed back to the tenant.</p>
        <p className="mt-3 text-sm text-slate-700">Illustrative arithmetic only; it does not describe a real SaveOnLease customer or a typical recovery.</p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">Across multiple stores</h2>
        <p className="mt-4 leading-relaxed text-slate-600">Keep separate rows for each lease, landlord, statement year, billed share, and finding status. Similar-looking charges can have different contract treatment. Add amounts across locations only after each location's calculation is supported.</p>
        <p className="mt-4 text-slate-600">For a broader process, use the <Link href="/marketing/burger-restaurant-lease-audit" className="font-medium text-emerald-800 underline">burger restaurant lease audit guide</Link> and the <Link href="/marketing/burger-restaurant-cam-reconciliation-checklist" className="font-medium text-emerald-800 underline">CAM reconciliation checklist</Link>.</p>
      </section>

      <section className="mt-16 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
        <h2 className="text-2xl font-semibold">Check your own lease and statement</h2>
        <p className="mt-3 leading-relaxed text-slate-200">Start with a free lease preview. Add the annual statement and up to four supporting PDFs before checkout if available. The $49.99 report identifies visible questions and labels what remains unverified.</p>
        <Link href="/app/step-1-upload" className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-slate-100">
          Upload a lease for a free preview
        </Link>
      </section>
    </main>
  );
}
