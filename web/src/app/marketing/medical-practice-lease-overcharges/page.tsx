import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Practice Lease Overcharges | CAM & NNN Audit Risks",
  description:
    "Common medical office lease overcharges including admin fee stacking, capital expenses disguised as operating costs, double-billed maintenance, and management fees exceeding lease caps.",
};

export default function MedicalOvercharges() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* Hero */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          Common Lease Overcharges in Medical Properties
        </h1>
        <p className="text-lg text-gray-700">
          Medical office tenants frequently face layered and compounding CAM
          and NNN overcharges. Specialized infrastructure and percentage-based
          admin fees create exposure that many practices never detect.
        </p>
      </section>

      {/* Overcharge Types */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          1. Admin Fee Stacking Above Lease Caps
        </h2>
        <p className="text-gray-700">
          Many medical leases cap CAM admin fees at 8–12%. Overcharges occur when
          management fees are layered separately, or when percentage caps are
          applied incorrectly to expanded expense categories.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          2. Double-Charged Maintenance Contracts
        </h2>
        <p className="text-gray-700">
          Elevator servicing, HVAC maintenance, generator testing, and parking
          structure upkeep may be embedded in both base building contracts and
          line-item CAM allocations, resulting in duplicate billing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          3. Capital Expenses Disguised as Operating Costs
        </h2>
        <p className="text-gray-700">
          Roof replacements, structural repairs, major system upgrades, and
          modernization projects are sometimes amortized through CAM despite
          lease exclusions. Medical buildings see this frequently following
          compliance-driven upgrades.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          4. Management Fees Exceeding Allowed Percentages
        </h2>
        <p className="text-gray-700">
          Some leases restrict management compensation to a defined percentage
          of operating expenses. When expenses spike, improper percentage
          calculations can materially increase tenant exposure.
        </p>
      </section>

      {/* Risk Framing */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Why Medical Tenants Are Vulnerable
        </h2>
        <p className="text-gray-700">
          Imaging centers, urgent care clinics, dental groups, and
          multi-specialty practices often prioritize patient operations over
          lease math. Once reconciliation windows close, contractual recovery
          options may be limited.
        </p>
      </section>

      {/* Internal Linking */}
      <section>
        <div className="space-y-2">
          <p>
            Start with the <Link href="/marketing/medical-office-lease-audit" className="underline text-blue-600">medical lease audit hub</Link>.
          </p>
          <p>
            Review <Link href="/marketing/medical-office-cam-reconciliation" className="underline text-blue-600">medical CAM reconciliations</Link>.
          </p>
          <p>
            Understand <Link href="/marketing/medical-office-nnn-expenses" className="underline text-blue-600">medical NNN expenses</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-8">
        <Link
          href="/app"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Audit My Medical Lease
        </Link>
      </section>

    </main>
  );
}