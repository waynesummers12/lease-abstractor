export default function MedicalNNNExpenses() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <h1 className="text-4xl font-bold">
        What Independent Medical Practices Actually Pay in NNN
      </h1>

      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="font-semibold">Example: 10,000 SF Imaging Center</p>
        <p>$30 Base Rent</p>
        <p>$9 NNN</p>
        <p className="font-bold mt-2">= $90,000+ Annual NNN Exposure</p>
      </div>
    </main>
  );
}
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Office NNN Expenses | What Healthcare Tenants Actually Pay",
  description:
    "Breakdown of NNN expenses for medical office tenants including property taxes, insurance allocation, CAM admin fees, reserve funds, and real-world exposure examples for imaging centers and outpatient practices.",
};

export default function MedicalNNNExpenses() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* Hero */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          What Independent Medical Practices Actually Pay in NNN
        </h1>
        <p className="text-lg text-gray-700">
          NNN (Triple Net) expenses in medical office buildings often add
          20–35% on top of base rent. Property taxes, insurance premiums,
          CAM allocations, and admin fees compound quickly for healthcare tenants.
        </p>
      </section>

      {/* Real Example */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Example: 10,000 SF Imaging Center
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-1">
          <p>$30 Base Rent = $300,000 Annual Base Rent</p>
          <p>$9 NNN = $90,000 Annual NNN</p>
          <p className="font-bold mt-2">Total Annual Occupancy Cost: $390,000</p>
        </div>
        <p className="mt-4 text-gray-700">
          A $2 PSF increase in NNN equals $20,000 in additional annual exposure
          for a 10,000 SF medical tenant.
        </p>
      </section>

      {/* NNN Breakdown */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          What Makes Up Medical NNN Expenses
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Property taxes (often reassessed upward in healthcare corridors)</li>
          <li>Insurance premiums for clinical and liability coverage</li>
          <li>Common Area Maintenance (CAM) charges</li>
          <li>CAM admin and management fees</li>
          <li>Reserve funds and capital amortization allocations</li>
        </ul>
      </section>

      {/* Risk Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Where Medical Tenants Get Overexposed
        </h2>
        <p className="text-gray-700">
          Medical properties frequently see above-average tax increases and
          insurance volatility. When combined with percentage-based admin fees,
          even modest operating cost increases can materially impact annual cash flow.
        </p>
        <p className="mt-4 text-gray-600">
          Review common <Link href="/marketing/medical-practice-lease-overcharges" className="underline text-blue-600">medical lease overcharge patterns</Link>.
        </p>
      </section>

      {/* Internal Linking */}
      <section>
        <div className="space-y-2">
          <p>
            Start with the <Link href="/marketing/medical-office-lease-audit" className="underline text-blue-600">medical lease audit hub</Link>.
          </p>
          <p>
            Understand <Link href="/marketing/medical-office-cam-reconciliation" className="underline text-blue-600">medical CAM reconciliations</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-8">
        <Link
          href="/app"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Review My Medical NNN Charges
        </Link>
      </section>

    </main>
  );
}