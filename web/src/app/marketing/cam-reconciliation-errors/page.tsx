

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CAM Reconciliation Errors | Common Area Maintenance Audit Guide",
  description:
    "Learn the most common CAM reconciliation errors in commercial leases and how tenants can identify overcharges before audit windows close.",
  alternates: {
    canonical: "https://saveonlease.com/marketing/cam-reconciliation-errors",
  },
};

export default function CamReconciliationErrorsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-light tracking-tight">
          CAM Reconciliation Errors Tenants Should Watch For
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          CAM reconciliation errors are one of the most common sources of
          overcharges in commercial leases. If you lease space under a triple
          net (NNN) structure, annual Common Area Maintenance (CAM)
          reconciliations can materially impact your total occupancy cost.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Understanding how CAM reconciliation works — and where landlords
          frequently make mistakes — is critical before your{" "}
          <Link
            href="/marketing/audit-window-deadlines"
            className="underline hover:text-black"
          >
            audit window closes
          </Link>.
        </p>
      </section>

      {/* WHAT IS CAM RECONCILIATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-light tracking-tight">
          What Is CAM Reconciliation?
        </h2>

        <p className="text-gray-700 leading-relaxed">
          CAM reconciliation is the annual true‑up process where landlords
          compare estimated CAM charges billed throughout the year against
          actual expenses incurred. If estimates were too low, tenants may owe
          additional payments. If too high, tenants may receive a credit.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Errors in this process — whether accidental or structural — often
          lead to inflated charges.
        </p>
      </section>

      {/* COMMON ERRORS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-light tracking-tight">
          Most Common CAM Reconciliation Errors
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed marker:text-green-600">
          <li>
            Incorrect pro‑rata share calculations (see{" "}
            <Link
              href="/marketing/pro-rata-share-explained"
              className="underline hover:text-black"
            >
              pro‑rata share explained
            </Link>
            )
          </li>
          <li>Capital expenditures improperly included as operating expenses</li>
          <li>Management or administrative fees exceeding lease caps</li>
          <li>Vacant space costs allocated to active tenants</li>
          <li>Duplicate charges across CAM and NNN categories</li>
          <li>Insurance or property tax misallocations</li>
          <li>Charges outside lease-defined allowable expense categories</li>
        </ul>
      </section>

      {/* WHY IT MATTERS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-light tracking-tight">
          Why CAM Reconciliation Errors Matter
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Even small percentage errors can translate into thousands of dollars
          annually for multi‑year leases. Many commercial tenants never review
          reconciliations closely — or miss the audit deadline entirely.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Reviewing CAM reconciliations before the deadline is often the only
          opportunity to dispute questionable charges.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 p-8 rounded-xl space-y-4">
        <h2 className="text-2xl font-light tracking-tight">
          Review Your CAM Reconciliation Before It’s Too Late
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Upload your lease and reconciliation documents to identify potential
          CAM and NNN overcharges through a formal{" "}
          <Link
            href="/marketing/commercial-lease-audit"
            className="underline hover:text-black"
          >
            commercial lease audit
          </Link>
          , including cap violations and structural billing errors.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition"
        >
          Upload Your Lease
        </Link>
      </section>
    </main>
  );
}