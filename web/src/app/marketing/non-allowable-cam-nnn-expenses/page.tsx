import type { Metadata } from "next";
import Link from "next/link";
import styles from "../NnnGuide.module.css";
import NnnGuideNav from "../NnnGuideNav";

export const metadata: Metadata = {
  title: "CAM & NNN Expenses to Check Against Your Lease",
  description:
    "See which CAM and NNN expense categories deserve a closer look, what lease language matters, and which billing records can confirm a charge.",
  alternates: {
    canonical: "https://www.saveonlease.com/marketing/non-allowable-cam-nnn-expenses",
  },
};

const categories = [
  {
    name: "Capital work and major repairs",
    question: "Does the lease exclude the work, allow it only in defined circumstances, or require amortization?",
    records: "Invoice, scope of work, date placed in service, and any amortization schedule.",
  },
  {
    name: "Leasing and marketing costs",
    question: "Are costs of attracting or preparing space for another tenant excluded from operating expenses?",
    records: "CAM ledger detail and the invoices behind the listed charge.",
  },
  {
    name: "Management and administrative fees",
    question: "Is there a percentage cap, a defined fee base, or a rule against charging the same service twice?",
    records: "Fee calculation, expense base, and any separate management charges.",
  },
  {
    name: "Legal and professional fees",
    question: "Does the lease distinguish property operations from leasing, financing, or disputes with individual tenants?",
    records: "Description of services, invoice dates, and the category used on the statement.",
  },
  {
    name: "Allocation and vacant space",
    question: "What area and allocation method does the lease require, and were they used for this year?",
    records: "Building and tenant area schedules, allocation worksheet, and prior-year comparison.",
  },
];

export default function NonAllowableExpensesPage() {
  return (
    <main className={styles.guide}>
      <NnnGuideNav current="/marketing/non-allowable-cam-nnn-expenses" />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">CAM and NNN billing guide</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Which CAM and NNN expenses does your lease allow?
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          A charge is not automatically improper because it appears on a list of common exclusions. The answer depends on your lease language, the work performed, and how the landlord calculated your share. Use this guide to identify questions worth checking against your annual statement.
        </p>
        <Link href="/app/step-1-upload" className="mt-7 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-slate-800">
          Review my lease for free
        </Link>
      </header>

      <section className="mt-14 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-950">The three-document check</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
          <li><strong>Lease:</strong> Find the expense definition, exclusions, caps, allocation method, and notice deadline.</li>
          <li><strong>Annual statement:</strong> Find the billed category, amount, credits, and your stated share.</li>
          <li><strong>Supporting records:</strong> Request invoices and calculation schedules to confirm what the statement summarizes.</li>
        </ol>
        <p className="mt-4 text-sm text-slate-700">A lease by itself can flag a term to verify. It cannot prove that a particular amount was overcharged.</p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">Expense categories worth checking</h2>
        <p className="mt-3 text-slate-600">These are review prompts, not universal exclusions. Your signed lease and the underlying records control the answer.</p>
        <div className="mt-6 space-y-4">
          {categories.map((category) => (
            <article key={category.name} className="rounded-2xl border border-slate-200 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-950">{category.name}</h3>
              <p className="mt-2"><strong>Check the lease:</strong> {category.question}</p>
              <p className="mt-2"><strong>Ask for:</strong> {category.records}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">How to review a questionable line item</h2>
        <ol className="mt-5 list-decimal space-y-4 pl-5 leading-relaxed">
          <li>Copy the exact statement description and amount. Do not infer what a broad label such as “repairs” contains.</li>
          <li>Locate the lease clause governing that category, including amendments and exceptions.</li>
          <li>Check whether the amount is a property-wide cost or your allocated share. A property-wide invoice is not automatically your potential credit.</li>
          <li>Compare the invoice and allocation worksheet with the statement. Mark what is confirmed and what remains unknown.</li>
          <li>Check the lease notice and record-review terms before sending a written question to the landlord.</li>
        </ol>
        <p className="mt-5 text-slate-600">For the calculation side, see our <Link href="/marketing/cam-reconciliation" className="font-medium text-emerald-800 underline">CAM reconciliation guide</Link>. For timing, see <Link href="/marketing/audit-window-deadlines" className="font-medium text-emerald-800 underline">audit-window deadlines</Link>.</p>
      </section>

      <section className="mt-16 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
        <h2 className="text-2xl font-semibold">Start with the documents you have</h2>
        <p className="mt-3 leading-relaxed text-slate-200">Upload your lease for a free preview of its CAM and NNN terms. You can add an annual statement and supporting PDFs before checkout. The $49.99 report identifies terms and visible billing questions, while labeling any amount that still needs records to verify.</p>
        <Link href="/app/step-1-upload" className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-slate-100">
          Upload a lease for a free preview
        </Link>
      </section>
    </main>
  );
}
