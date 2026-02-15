

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Triple Net Lease vs Gross Lease: Key Differences for Tenants",
  description:
    "Triple net lease vs gross lease explained. Learn how NNN and gross leases differ, who pays operating expenses, and where commercial tenants face overcharge risk.",
  alternates: {
    canonical: "https://saveonlease.com/marketing/triple-net-lease-vs-gross",
  },
};

export default function TripleNetLeaseVsGrossPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 space-y-12">
      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-light tracking-tight">
          Triple Net Lease vs Gross Lease: What’s the Difference?
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          When comparing a <strong>triple net lease vs gross lease</strong>,
          the key difference is who pays operating expenses.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          In a gross lease, most property expenses are included in the rent.
          In a triple net (NNN) lease, tenants pay base rent plus property
          taxes, insurance, and common area maintenance (CAM).
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Upload Your Lease (Free Preview)
        </Link>
      </section>

      {/* SIDE-BY-SIDE COMPARISON */}
      <section className="space-y-8 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Side‑by‑Side Comparison
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Triple Net (NNN) Lease</h3>
            <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
              <li>Tenant pays base rent</li>
              <li>Tenant pays property taxes</li>
              <li>Tenant pays insurance</li>
              <li>Tenant pays CAM expenses</li>
              <li>Costs fluctuate annually</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Gross Lease</h3>
            <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
              <li>Tenant pays one all‑inclusive rent</li>
              <li>Landlord covers most operating expenses</li>
              <li>Costs are more predictable</li>
              <li>Less direct expense transparency</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FINANCIAL IMPACT */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Financial Impact for Tenants
        </h2>

        <p>
          In a triple net lease, operating expenses can increase 15–35% above
          base rent depending on taxes, insurance rates, and CAM budgets.
        </p>

        <p>
          Without proper caps or audit rights, tenants may face rising costs
          that were not fully anticipated at signing.
        </p>

        <p>
          Many disputes arise during{" "}
          <Link
            href="/marketing/cam-reconciliation"
            className="underline hover:text-black"
          >
            CAM reconciliation
          </Link>{" "}
          when annual expenses are finalized.
        </p>
      </section>

      {/* WHERE RISK OCCURS */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Where Overcharge Risk Appears
        </h2>

        <ul className="list-disc pl-6 space-y-2 marker:text-green-600">
          <li>Improper allocation of shared expenses</li>
          <li>Capital improvements billed as operating costs</li>
          <li>Administrative markups on CAM</li>
          <li>Charges exceeding lease‑defined caps</li>
        </ul>

        <p>
          Understanding the difference between a triple net lease and gross
          lease helps tenants evaluate risk — but reviewing the actual lease
          language is what protects you.
        </p>
      </section>

      {/* INTERNAL LINKS */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Related Guides
        </h2>

        <ul className="space-y-3">
          <li>
            <Link
              href="/marketing/triple-net-lease"
              className="underline hover:text-black"
            >
              What Is a Triple Net Lease?
            </Link>
          </li>
          <li>
            <Link
              href="/marketing/triple-net-lease-meaning"
              className="underline hover:text-black"
            >
              Triple Net Lease Meaning Explained
            </Link>
          </li>
          <li>
            <Link
              href="/marketing/audit-window-deadlines"
              className="underline hover:text-black"
            >
              Audit Window Deadlines
            </Link>
          </li>
        </ul>
      </section>

      {/* FINAL CTA */}
      <section className="border-t pt-10 space-y-6">
        <h2 className="text-3xl font-light tracking-tight">
          Unsure Which Lease Structure You Signed?
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          Many tenants do not realize how expense pass‑through language affects
          their total occupancy costs. A quick lease review can identify risk
          before reconciliation deadlines close.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Review My Lease
        </Link>
      </section>
    </main>
  );
}