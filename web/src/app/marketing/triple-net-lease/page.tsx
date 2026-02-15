

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Triple Net Lease (NNN Lease) Explained for Commercial Tenants | SaveOnLease",
  description:
    "What is a triple net lease (NNN lease)? Learn how property taxes, insurance, and CAM charges work — and how tenants can identify overcharges in commercial leases.",
  alternates: {
    canonical: "https://saveonlease.com/marketing/triple-net-lease",
  },
};

export default function TripleNetLeasePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-light tracking-tight">
          What Is a Triple Net Lease (NNN Lease)?
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          A <strong>triple net lease (NNN lease)</strong> is a commercial lease
          where the tenant pays base rent <em>plus</em> three additional
          categories of expenses: property taxes, insurance, and common area
          maintenance (CAM).
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          While NNN leases are common in retail, office, and industrial
          properties, many tenants underestimate how much these additional
          charges can increase total occupancy costs.
        </p>
      </section>

      {/* WHAT TENANTS PAY */}
      <section className="space-y-6">
        <h2 className="text-3xl font-light tracking-tight">
          What Do Tenants Pay in a Triple Net Lease?
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed marker:text-green-600">
          <li>
            <strong>Property Taxes</strong> – The tenant pays their pro-rata
            share of real estate taxes for the building.
          </li>
          <li>
            <strong>Insurance</strong> – The tenant pays their portion of the
            landlord’s building insurance premiums.
          </li>
          <li>
            <strong>Common Area Maintenance (CAM)</strong> – Expenses for
            maintaining shared spaces like parking lots, landscaping, security,
            lighting, and management.
          </li>
        </ul>

        <p className="text-lg text-gray-700 leading-relaxed">
          These three components are why it’s called a “triple net” lease.
        </p>
      </section>

      {/* WHY COSTS INCREASE */}
      <section className="space-y-6">
        <h2 className="text-3xl font-light tracking-tight">
          Why Triple Net Lease Costs Often Increase
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          In many NNN leases, operating expenses fluctuate each year.
          Insurance premiums rise, property taxes are reassessed, and CAM
          budgets expand.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Without proper caps, exclusions, or audit rights, tenants may face:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed marker:text-green-600">
          <li>Administrative fees added to CAM</li>
          <li>Capital improvements passed through as operating expenses</li>
          <li>Charges for vacant space</li>
          <li>Reconciliation errors</li>
        </ul>
      </section>

      {/* INTERNAL LINKS */}
      <section className="space-y-6">
        <h2 className="text-3xl font-light tracking-tight">
          Related Triple Net Lease Topics
        </h2>

        <ul className="space-y-3 text-gray-700 leading-relaxed">
          <li>
            <Link
              href="/marketing/cam-vs-nnn"
              className="underline hover:text-black"
            >
              CAM vs NNN: What’s the Difference?
            </Link>
          </li>
          <li>
            <Link
              href="/marketing/cam-reconciliation"
              className="underline hover:text-black"
            >
              CAM Reconciliation Explained
            </Link>
          </li>
          <li>
            <Link
              href="/marketing/non-allowable-cam-nnn-expenses"
              className="underline hover:text-black"
            >
              Non-Allowable CAM & NNN Expenses
            </Link>
          </li>
          <li>
            <Link
              href="/marketing/audit-rights"
              className="underline hover:text-black"
            >
              Tenant Audit Rights in Commercial Leases
            </Link>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="pt-8 border-t">
        <h2 className="text-2xl font-light tracking-tight">
          Think Your NNN Charges May Be Incorrect?
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          Many tenants never review how CAM, taxes, and insurance are
          calculated. Our lease audit identifies potential overcharges and
          compliance risks.
        </p>

        <div className="mt-6">
          <Link
            href="/app"
            className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Upload Your Lease
          </Link>
        </div>
      </section>
    </main>
  );
}