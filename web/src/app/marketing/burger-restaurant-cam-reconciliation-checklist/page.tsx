import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Restaurant CAM Reconciliation Checklist for Burger Operators",
  description:
    "A practical CAM statement checklist for burger restaurants: compare lease terms, area shares, shared costs, fees, credits, and the records behind each charge.",
  alternates: {
    canonical: "https://www.saveonlease.com/marketing/burger-restaurant-cam-reconciliation-checklist",
  },
};

const checks = [
  {
    title: "Confirm the statement period and credits",
    lease: "Which billing year and reconciliation method does your lease specify?",
    statement: "Record total expenses, your share, estimated payments already made, credits, and the balance due.",
    records: "Monthly payment ledger and prior-year statement.",
  },
  {
    title: "Recalculate your share",
    lease: "Find the stated premises area, denominator, and any rules for anchors, vacant space, or separate expense pools.",
    statement: "Divide the applicable tenant area by the applicable total area, then compare with the percentage billed.",
    records: "Dated area schedule and the landlord's allocation worksheet.",
  },
  {
    title: "Separate restaurant-specific and common costs",
    lease: "Check how the lease treats drive-through lanes, shared parking, trash, grease service, utilities, and exclusive-use areas.",
    statement: "Look for costs assigned to all tenants even when a service or area benefits only some spaces.",
    records: "Service contracts, meter or allocation schedules, and invoices.",
  },
  {
    title: "Test management and administrative fees",
    lease: "Find any fee cap, calculation base, and exclusions from that base.",
    statement: "Compare the fee charged with the stated expense base; check for a second fee on the same cost.",
    records: "Fee worksheet and category-level CAM ledger.",
  },
  {
    title: "Review repairs and capital work",
    lease: "Check exclusions, exceptions, and any amortization rule for major work.",
    statement: "Flag roof, paving, HVAC, or building-system charges for closer review, without assuming they are prohibited.",
    records: "Invoices, work description, and amortization schedule if applicable.",
  },
  {
    title: "Check taxes, insurance, and the notice deadline",
    lease: "Identify the recoverable tax and insurance categories and the exact notice and records-review terms.",
    statement: "Compare the billed categories and year-over-year changes; note the date you received the statement.",
    records: "Tax bills, insurance summary, and proof of statement delivery.",
  },
];

export default function BurgerRestaurantCamChecklistPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-slate-800 sm:py-20">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">Restaurant tenant checklist</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Burger restaurant CAM reconciliation checklist
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          Use your lease and annual CAM or NNN statement together. A line item is a question to investigate until the lease clause, calculation, and supporting records establish what belongs in your bill.
        </p>
        <Link href="/app/step-1-upload" className="mt-7 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-slate-800">
          Start a free lease preview
        </Link>
      </header>

      <section className="mt-14 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-950">Set up one row per location</h2>
        <p className="mt-3 leading-relaxed">For each restaurant, record the landlord, lease and amendment dates, statement year, date received, premises area, billed share, estimated payments, total annual charge, and balance or credit. Keep locations separate: their lease definitions and allocation formulas can differ.</p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">Six checks to run</h2>
        <div className="mt-6 space-y-4">
          {checks.map((check, index) => (
            <article key={check.title} className="rounded-2xl border border-slate-200 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-950">{index + 1}. {check.title}</h3>
              <dl className="mt-3 space-y-2 leading-relaxed">
                <div><dt className="inline font-semibold">Lease: </dt><dd className="inline">{check.lease}</dd></div>
                <div><dt className="inline font-semibold">Statement: </dt><dd className="inline">{check.statement}</dd></div>
                <div><dt className="inline font-semibold">Ask for: </dt><dd className="inline">{check.records}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-950">Keep amounts in the right units</h2>
        <p className="mt-3 leading-relaxed">If a statement shows a $20,000 property-wide cost and a 5% tenant share, the amount attributed to your location is $1,000 before considering exclusions, caps, credits, or other adjustments. Do not present the full property cost as your potential overcharge.</p>
        <p className="mt-3 text-sm text-slate-700">Illustrative arithmetic only; the lease and source records determine the actual result.</p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">What to do with a difference</h2>
        <ol className="mt-5 list-decimal space-y-3 pl-5 leading-relaxed">
          <li>Write down the exact statement line, the clause you compared, and the calculation.</li>
          <li>Mark whether the finding is confirmed by records or still a question.</li>
          <li>Request the missing backup using the procedure in your lease.</li>
          <li>Check the contract's notice deadline before sending a challenge or records request.</li>
        </ol>
        <p className="mt-5 text-slate-600">For background, see the <Link href="/marketing/burger-restaurant-lease-audit" className="font-medium text-emerald-800 underline">burger restaurant lease review guide</Link> and <Link href="/marketing/audit-window-deadlines" className="font-medium text-emerald-800 underline">audit-window checklist</Link>.</p>
      </section>

      <section className="mt-16 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
        <h2 className="text-2xl font-semibold">Review your own documents</h2>
        <p className="mt-3 leading-relaxed text-slate-200">Upload the lease for a free preview, then add the annual statement and any supporting PDFs before checkout. The $49.99 report checks visible terms and arithmetic and labels what still needs verification.</p>
        <Link href="/app/step-1-upload" className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-slate-100">
          Upload a lease for a free preview
        </Link>
      </section>
    </main>
  );
}
