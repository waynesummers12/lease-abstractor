

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Triple Net Lease Meaning (NNN Explained for Commercial Tenants)",
  description:
    "Triple net lease meaning explained in plain English. Learn what NNN really includes, how CAM works, and where tenants get overcharged.",
  alternates: {
    canonical: "/marketing/triple-net-lease-meaning",
  },
};

export default function TripleNetLeaseMeaningPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 space-y-12">
      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-light tracking-tight">
          Triple Net Lease Meaning (NNN Explained for Tenants)
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          The <strong>triple net lease meaning</strong> is simple in theory but
          expensive in practice. In a triple net (NNN) lease, tenants pay base
          rent <em>plus</em> property taxes, insurance, and common area
          maintenance (CAM) expenses.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          What most tenants do not realize is that these additional charges can
          increase total occupancy costs by 15–35% — and sometimes more if
          lease language allows broad expense pass-through.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Upload Your Lease (Free Preview)
        </Link>
      </section>

      {/* WHAT IS INCLUDED */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          What Is Included in a Triple Net Lease?
        </h2>

        <ul className="list-disc pl-6 space-y-3 marker:text-green-600">
          <li>
            <strong>Property Taxes</strong> – Your share of real estate taxes
            for the building or shopping center.
          </li>
          <li>
            <strong>Insurance</strong> – Landlord’s insurance premiums passed
            through to tenants.
          </li>
          <li>
            <strong>Common Area Maintenance (CAM)</strong> – Maintenance,
            landscaping, parking lot repairs, snow removal, and management
            costs.
          </li>
        </ul>

        <p>
          Many tenants search for the <strong>triple net lease meaning</strong>{" "}
          expecting a simple definition. But the real financial impact depends
          on how these categories are defined inside your lease.
        </p>
      </section>

      {/* HOW IT COMPARES */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Triple Net vs Gross Lease
        </h2>

        <p>
          In a gross lease, most operating costs are included in rent. In a
          triple net lease, those costs are separated and billed to tenants.
        </p>

        <p>
          That structure shifts risk to the tenant — especially when expenses
          increase unexpectedly.
        </p>

        <p>
          For a full breakdown, see our{" "}
          <Link
            href="/marketing/cam-vs-nnn"
            className="underline hover:text-black"
          >
            CAM vs NNN guide
          </Link>.
        </p>
      </section>

      {/* WHERE TENANTS GET OVERCHARGED */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Where Tenants Get Overcharged
        </h2>

        <ul className="list-disc pl-6 space-y-3 marker:text-green-600">
          <li>Capital improvements billed as operating expenses</li>
          <li>Administrative fees layered on top of CAM</li>
          <li>Improper pro-rata share calculations</li>
          <li>Charges exceeding lease-defined caps</li>
          <li>Expenses for vacant units allocated to active tenants</li>
        </ul>

        <p>
          These issues are typically uncovered during{" "}
          <Link
            href="/marketing/cam-reconciliation"
            className="underline hover:text-black"
          >
            CAM reconciliation
          </Link>{" "}
          review or a formal lease audit.
        </p>
      </section>

      {/* CTA */}
      <section className="space-y-6 border-t pt-10">
        <h2 className="text-3xl font-light tracking-tight">
          Understand Your Lease Before You Pay
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          Knowing the <strong>triple net lease meaning</strong> is the first
          step. The second step is verifying whether your landlord is billing
          according to the lease terms.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Start Lease Review
        </Link>
      </section>
    </main>
  );
}