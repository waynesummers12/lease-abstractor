import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Office CAM Reconciliation | Healthcare Building Expense Review",
  description:
    "Understand CAM reconciliations in medical office buildings including lobby staffing, HVAC load, parking structures, generator maintenance, and elevator servicing. Built for imaging centers and outpatient tenants.",
};

export default function MedicalOfficeCAM() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* Hero */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          Medical Office CAM Reconciliation Explained
        </h1>
        <p className="text-lg text-gray-700">
          CAM reconciliations in outpatient buildings are materially more complex
          than standard office properties. Shared infrastructure, clinical-grade
          systems, and compliance-driven upgrades create recurring cost volatility.
        </p>
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          How CAM Reconciliations Work in Medical Buildings
        </h2>
        <p className="text-gray-700">
          Each year, landlords estimate operating expenses and bill tenants
          monthly. After year-end, actual costs are reconciled against estimates.
          In medical properties, line items often include systems rarely seen in
          general office buildings.
        </p>
      </section>

      {/* High-Risk Line Items */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          High-Risk CAM Line Items for Healthcare Tenants
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Shared lobby staffing allocations</li>
          <li>Parking structure maintenance and structural repairs</li>
          <li>Elevator servicing and modernization contracts</li>
          <li>HVAC load balancing for imaging equipment</li>
          <li>Generator testing, fuel reserves, and replacement costs</li>
          <li>Security and compliance monitoring systems</li>
        </ul>
      </section>

      {/* Imaging Load Detail */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Imaging Equipment and HVAC Allocation
        </h2>
        <p className="text-gray-700">
          MRI, CT, and PET systems create elevated electrical and cooling loads.
          Some leases allow proportional allocation, while others prohibit
          disproportionate expense shifts. Without review, tenants may absorb
          infrastructure upgrades beyond their contractual responsibility.
        </p>
      </section>

      {/* Risk Framing */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Where Overcharges Commonly Occur
        </h2>
        <p className="text-gray-700">
          Medical CAM reconciliations frequently include capital improvements
          classified as operating expenses, admin fee stacking above caps, and
          reserve contributions not clearly authorized by the lease.
        </p>
        <p className="mt-4 text-gray-600">
          See related examples of <Link href="/marketing/medical-practice-lease-overcharges" className="underline text-blue-600">medical lease overcharges</Link>.
        </p>
      </section>

      {/* Internal Links */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Next Steps for Medical Tenants
        </h2>
        <div className="space-y-2">
          <p>
            Review the full <Link href="/marketing/medical-office-lease-audit" className="underline text-blue-600">medical office lease audit hub</Link>.
          </p>
          <p>
            Compare with our broader <Link href="/cam-reconciliation" className="underline text-blue-600">CAM reconciliation guide</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-8">
        <Link
          href="/app"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Audit My Medical CAM Charges
        </Link>
      </section>

    </main>
  );
}