import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Location Medical Lease Risk | Scaling Healthcare Tenant Exposure",
  description:
    "How lease mistakes compound across multiple medical office locations. Built for dental chains, imaging networks, urgent care groups, and multi-site healthcare operators reviewing CAM and NNN risk.",
};

export default function MultiLocationMedical() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* Hero */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          Multi-Location Medical Lease Risk
        </h1>
        <p className="text-lg text-gray-700">
          When medical operators expand to multiple locations, small lease
          allocation errors compound into six-figure exposure. Admin fee caps,
          capital pass-through rules, and CAM reconciliation language vary
          widely between buildings.
        </p>
      </section>

      {/* Compounding Risk */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          How Lease Mistakes Multiply Across Locations
        </h2>
        <p className="text-gray-700">
          A $15,000 annual overcharge at one urgent care location becomes
          $75,000 across five sites. At ten locations, that same structural
          issue becomes a recurring six-figure cash flow drain.
        </p>
      </section>

      {/* Target Operators */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          High-Growth Medical Operators Most at Risk
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Multi-location dental chains</li>
          <li>Physical therapy groups expanding regionally</li>
          <li>Urgent care networks</li>
          <li>Imaging center operators</li>
          <li>Specialty clinic platforms backed by private equity</li>
        </ul>
      </section>

      {/* Operational Blind Spot */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          The Operational Blind Spot
        </h2>
        <p className="text-gray-700">
          Growing healthcare platforms focus on provider recruitment,
          reimbursement optimization, and patient acquisition. Lease
          administration often becomes decentralized, leaving CAM and NNN
          allocation inconsistencies undiscovered for years.
        </p>
      </section>

      {/* Strategic Positioning */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Portfolio-Level Lease Review Strategy
        </h2>
        <p className="text-gray-700">
          Reviewing leases individually misses systemic patterns. A
          portfolio-level audit identifies recurring admin fee structures,
          inconsistent capital exclusions, and disproportionate tax allocation
          across buildings.
        </p>
      </section>

      {/* Internal Linking */}
      <section>
        <div className="space-y-2">
          <p>
            Start with the <Link href="/marketing/medical-office-lease-audit" className="underline text-blue-600">medical lease audit hub</Link>.
          </p>
          <p>
            Review <Link href="/marketing/medical-practice-lease-overcharges" className="underline text-blue-600">common medical overcharges</Link>.
          </p>
          <p>
            Understand <Link href="/marketing/medical-office-nnn-expenses" className="underline text-blue-600">medical NNN exposure</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-8">
        <Link
          href="/app"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Audit My Medical Lease Portfolio
        </Link>
      </section>

    </main>
  );
}