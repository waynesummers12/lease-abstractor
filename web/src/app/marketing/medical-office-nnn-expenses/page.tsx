import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Office NNN Expenses | What Healthcare Tenants Actually Pay",
  description:
    "Breakdown of NNN expenses for medical office tenants including property taxes, insurance allocation, CAM admin fees, reserve funds, and real-world exposure examples.",
};

export default function MedicalNNNExpenses() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          Medical Office NNN Expenses: What Healthcare Tenants Actually Pay
        </h1>
        <p className="text-lg text-gray-700">
          Triple Net (NNN) charges in medical office buildings typically add
          20–35% on top of base rent — and in high-tax markets, even more.
          For imaging centers, surgical suites, dialysis clinics, and specialty
          practices, these pass-through costs can quietly become six-figure exposures.
        </p>
      </section>

      {/* BREAKDOWN SECTION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          What Is Included in Medical NNN Charges?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div className="space-y-2">
            <h3 className="font-semibold">Property Taxes</h3>
            <p>
              Often the largest component. Medical build-outs increase assessed
              value, which increases tenant tax allocation.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Insurance Premiums</h3>
            <p>
              Healthcare occupancy increases building risk profiles, which may
              raise insurance premiums allocated to tenants.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Common Area Maintenance (CAM)</h3>
            <p>
              Includes HVAC service, janitorial, landscaping, snow removal,
              parking lot maintenance, and building systems upkeep.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">CAM Administrative Fees</h3>
            <p>
              Frequently 10–15% of total CAM spend — sometimes layered on top
              of capital expenditures and reserves.
            </p>
          </div>
        </div>
      </section>

      {/* REAL WORLD EXAMPLE */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Real Example: 10,000 SF Imaging Center
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-1">
          <p>$30 PSF Base Rent = $300,000 Annual Base Rent</p>
          <p>$9 PSF NNN = $90,000 Annual NNN</p>
          <p className="font-bold mt-2">
            Total Annual Occupancy Cost: $390,000
          </p>
        </div>
        <p className="text-gray-700">
          A $2 PSF increase in NNN equals $20,000 in additional annual exposure
          for a 10,000 SF medical tenant — without any change in base rent.
        </p>
      </section>

      {/* RISK SECTION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Where Medical Tenants Overpay
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Uncapped capital expenditure pass-throughs</li>
          <li>HVAC replacements allocated through CAM</li>
          <li>Reserve funds with no reconciliation transparency</li>
          <li>Admin fees applied to non-operating costs</li>
          <li>Incorrect pro-rata share calculations</li>
        </ul>
        <p className="text-gray-700">
          Many healthcare tenants assume these increases are unavoidable — but
          lease language and audit rights often allow review and challenge.
        </p>
      </section>

      {/* INTERNAL LINKS / CLUSTERING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Related Medical Lease Resources
        </h2>
        <ul className="space-y-2 text-emerald-700">
          <li>
            <Link href="/marketing/medical-office-lease-audit">
              Medical Office Lease Audit Guide
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-office-lease-audit-checklist">
              Medical Lease Audit Checklist
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-practice-lease-overcharges">
              How Medical Practices Get Overcharged
            </Link>
          </li>
        </ul>
      </section>

      {/* FAQ SECTION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Frequently Asked Questions About Medical NNN Expenses
        </h2>

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold">
              What percentage of rent do NNN charges usually add?
            </h3>
            <p>
              For medical office tenants, NNN commonly adds 20–35% above base
              rent. In high-tax or high-insurance markets, it can exceed 40%.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Can medical tenants audit NNN expenses?
            </h3>
            <p>
              Most leases contain audit rights with specific time windows.
              These rights allow tenants to request documentation and dispute
              improper allocations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Are capital improvements allowed in CAM?
            </h3>
            <p>
              It depends on the lease language. Some leases allow amortized
              capital improvements; others restrict them. Clear drafting and
              expense caps are critical.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-8">
        <Link
          href="/app"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Analyze My Medical NNN Charges
        </Link>
      </section>

    </main>
  );
}