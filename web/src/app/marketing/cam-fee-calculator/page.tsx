import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CAM Fee Calculator (How to Estimate Common Area Maintenance Costs)",
  description:
    "Estimate potential CAM fee exposure in your commercial lease. Learn how CAM fees are calculated, common allocation errors, and how tenants can identify overcharges.",
  alternates: {
    canonical: "https://saveonlease.com/marketing/cam-fee-calculator",
  },
};

export default function CamFeeCalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">

      {/* HERO */}
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          CAM Fee Calculator — How to Estimate Your Common Area Maintenance Costs
        </h1>

        <p className="mb-6 text-lg text-gray-700">
          A CAM fee calculator helps commercial tenants estimate how much
          they may be paying in Common Area Maintenance (CAM) charges each year —
          and whether those charges align with the lease.
        </p>

        <p className="mb-8 text-gray-700">
          While landlords provide annual reconciliation statements, most tenants
          never see how CAM allocations are calculated or whether expense
          categories, administrative fees, and capital costs match the actual
          lease language.
        </p>

        <Link
          href="/marketing/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload Your Lease for a CAM Fee Review (Free Preview)
        </Link>

        <p className="mt-3 text-xs text-gray-600">
          🔒 Secure & confidential • No subscription • Takes 2 minutes
        </p>
      </section>

      {/* HOW CAM FEES ARE CALCULATED */}
      <section className="mb-14">
        <h2 className="mb-4 text-3xl font-light tracking-tight">
          How CAM Fees Are Typically Calculated
        </h2>

        <ol className="ml-6 list-decimal space-y-3 text-gray-700 leading-relaxed">
          <li>Total projected CAM expenses are estimated by the landlord</li>
          <li>Each tenant’s pro-rata share is determined by square footage</li>
          <li>Monthly estimated CAM payments are collected</li>
          <li>At year-end, actual expenses are reconciled</li>
          <li>Tenants pay the difference (or receive a credit)</li>
        </ol>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Even small allocation errors — such as incorrect square footage or
          misclassified expenses — can materially increase total occupancy costs.
        </p>
      </section>

      {/* ESTIMATE FORMULA */}
      <section className="mb-14">
        <h2 className="mb-4 text-3xl font-light tracking-tight">
          Simple CAM Fee Estimation Formula
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          A simplified CAM fee estimate often follows this structure:
        </p>

        <div className="rounded-lg border bg-gray-50 p-6 text-gray-800">
          <p className="font-mono text-sm">
            (Total CAM Expenses × Your Pro‑Rata Share) ÷ 12 = Monthly CAM Fee
          </p>
        </div>

        <p className="mt-4 text-gray-700 leading-relaxed">
          However, the real impact depends on how expenses are defined,
          capped, excluded, or allocated in your lease.
        </p>
      </section>

      {/* COMMON ERRORS */}
      <section className="mb-14">
        <h2 className="mb-4 text-3xl font-light tracking-tight">
          Why CAM Fee Calculations Are Often Incorrect
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
          <li>Incorrect pro-rata share percentages</li>
          <li>Improper inclusion of capital improvements</li>
          <li>Administrative markups above lease caps</li>
          <li>Charges allocated to vacant or non-tenant spaces</li>
          <li>Double counting across CAM and NNN categories</li>
        </ul>

        <p className="mt-4 text-gray-700 leading-relaxed">
          These issues are typically uncovered during a{" "}
          <Link
            href="/marketing/cam-reconciliation"
            className="underline hover:text-black"
          >
            CAM reconciliation review
          </Link>{" "}
          or broader{" "}
          <Link
            href="/marketing/commercial-lease-audit"
            className="underline hover:text-black"
          >
            commercial lease audit
          </Link>
          .
        </p>
      </section>

      {/* FINANCIAL IMPACT */}
      <section className="mb-16">
        <h2 className="mb-4 text-3xl font-light tracking-tight">
          What Small CAM Errors Can Cost
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Even a $0.50–$2.00 per square foot allocation error can translate
          into $5,000–$50,000+ in annual exposure depending on property size.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Because CAM fees recur every year under most commercial leases,
          unnoticed errors compound over time and reduce leverage during
          reconciliation disputes.
        </p>

        <p className="text-gray-700 leading-relaxed">
          These issues are often identified during a{" "}
          <Link
            href="/marketing/commercial-lease-audit"
            className="underline hover:text-black"
          >
            commercial lease audit
          </Link>
          , where the lease language is reviewed against actual CAM allocations.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="rounded-xl border bg-gray-50 p-8 text-center">
        <h2 className="mb-3 text-2xl font-semibold">
          Want a Lease-Based CAM Fee Review Instead of a Rough Estimate?
        </h2>

        <p className="mb-6 text-gray-700">
          Our review analyzes your actual lease language to identify CAM
          allocation risks, admin fee caps, exclusions, and audit deadlines.
        </p>

        <Link
          href="/marketing/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload Your Lease
        </Link>
      </section>

    </main>
  );
}