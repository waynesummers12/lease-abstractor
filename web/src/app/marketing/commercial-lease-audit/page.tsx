import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commercial Lease Audit for Tenants | CAM & NNN Review",
  description:
    "Learn what a commercial lease audit can check, how an annual CAM statement changes the review, and which records are needed to verify a billing discrepancy.",
  alternates: {
    canonical: "https://www.saveonlease.com/marketing/commercial-lease-audit",
  },
};

const reviewAreas = [
  {
    title: "Expense definitions and exclusions",
    detail: "Which operating costs does the lease include, exclude, or allow only under stated conditions?",
  },
  {
    title: "Caps and fee calculations",
    detail: "Does the lease limit increases or management fees, and what amount is the limit applied to?",
  },
  {
    title: "Allocation method",
    detail: "What tenant area, building area, and sharing formula does the lease specify?",
  },
  {
    title: "Statement arithmetic",
    detail: "When an annual statement is provided, do visible totals, credits, and tenant shares reconcile?",
  },
  {
    title: "Review and notice terms",
    detail: "What records may be requested, and when does the lease require notice or action?",
  },
];

export default function CommercialLeaseAuditPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-slate-800 sm:py-20">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">Commercial tenant guide</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          What does a commercial lease audit actually check?
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          A useful review starts with the lease rules, then compares them with the annual CAM or NNN statement and supporting records. A lease alone can identify terms to check; it cannot establish that a particular charge was billed incorrectly.
        </p>
        <Link href="/app/step-1-upload" className="mt-7 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-slate-800">
          Start with a free lease preview
        </Link>
      </header>

      <section className="mt-14 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="text-sm font-semibold text-emerald-800">1 · Read the lease</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-950">Find the rules</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Identify expense definitions, exclusions, caps, allocation terms, and review rights.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="text-sm font-semibold text-emerald-800">2 · Compare the statement</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-950">Check what was billed</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Match visible categories, arithmetic, credits, and tenant share to the lease.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="text-sm font-semibold text-emerald-800">3 · Verify the records</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-950">Confirm the details</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Use invoices, ledgers, area schedules, and fee worksheets before asserting an overcharge.</p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">Five areas to examine</h2>
        <div className="mt-6 space-y-3">
          {reviewAreas.map((area) => (
            <div key={area.title} className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-950">{area.title}</h3>
              <p className="mt-1 text-slate-600">{area.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-slate-600">
          Learn more about <Link href="/marketing/non-allowable-cam-nnn-expenses" className="font-medium text-emerald-800 underline">expense categories to check</Link> and <Link href="/marketing/cam-reconciliation" className="font-medium text-emerald-800 underline">CAM reconciliation</Link>.
        </p>
      </section>

      <section className="mt-16 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-950">What can be concluded from each document?</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed">
          <li><strong>Lease only:</strong> Identify contract language and questions for the landlord. No billed amount has been verified.</li>
          <li><strong>Lease plus annual statement:</strong> Compare visible amounts and flag potential differences. A statement category may still need invoice detail.</li>
          <li><strong>Lease, statement, and backup:</strong> Test the underlying expense and allocation more directly. Any conclusion remains subject to the complete documents and applicable terms.</li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">Before you start</h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          Gather the signed lease and amendments. Add the annual CAM or NNN reconciliation statement if you have it, plus any invoices or schedules already provided. Check the exact notice and records-request provisions in your lease; deadlines vary and can affect your next step.
        </p>
        <p className="mt-4 text-slate-600">
          See the <Link href="/marketing/audit-window-deadlines" className="font-medium text-emerald-800 underline">audit-window guide</Link> for a checklist of timing questions.
        </p>
      </section>

      <section className="mt-16 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
        <h2 className="text-2xl font-semibold">See your lease terms before paying</h2>
        <p className="mt-3 leading-relaxed text-slate-200">
          SaveOnLease starts with a free lease preview. You can add an annual statement and up to four supporting PDFs before checkout. The $49.99 report summarizes the lease language, visible billing questions, records to request, and any limits on what can be verified.
        </p>
        <Link href="/app/step-1-upload" className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-slate-100">
          Upload a lease for a free preview
        </Link>
      </section>
    </main>
  );
}
