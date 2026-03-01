import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Office Lease Audit | CAM & NNN Review for Healthcare Tenants",
  description:
    "Audit your medical office lease for CAM overcharges, NNN pass-through errors, admin fee violations, and capital expense misallocations. Built for imaging centers, urgent care, dental and multi-specialty practices.",
};

export default function MedicalOfficeLeaseAudit() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* Hero */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          CAM & NNN Lease Audit for Independent Medical Practices
        </h1>
        <p className="text-lg text-gray-700">
          Independent medical practices frequently overpay $20,000–$100,000 per year
          in CAM and NNN charges due to improper admin fees, capital expense
          pass-throughs, tax allocation errors, and compliance-driven cost shifts.
        </p>
        <p className="text-gray-600">
          Imaging centers, urgent care operators, dental groups, and
          multi-specialty clinics face unique operating cost exposure that most
          healthcare tenants never audit.
        </p>
      </section>

      {/* Unique Risk */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Why Medical Office Leases Are Uniquely Risky
        </h2>
        <p className="text-gray-700">
          Outpatient buildings operate differently than retail or standard office.
          High electrical loads for imaging equipment, generator redundancy,
          infection-control HVAC, parking structures, and extended-hour staffing
          materially increase operating expenses. Without clear caps and
          exclusions, tenants absorb unpredictable pass-through risk.
        </p>
      </section>

      {/* CAM Overcharges */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Common CAM Overcharges in Outpatient Buildings
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Lobby concierge and shared staffing reallocated disproportionately</li>
          <li>Parking garage structural repairs classified as operating costs</li>
          <li>Elevator modernization pushed through CAM</li>
          <li>Generator replacement amortized improperly</li>
          <li>HVAC upgrades tied to high-load imaging equipment</li>
          <li>Admin fees exceeding lease caps</li>
        </ul>
        <p className="mt-4 text-gray-600">
          Learn more about{" "}
          <Link
            href="/marketing/medical-office-cam-reconciliation"
            className="underline text-blue-600"
          >
            medical office CAM reconciliations
          </Link>.
        </p>
      </section>

      {/* NNN Risk */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          NNN Pass-Through Risk in Healthcare Properties
        </h2>
        <p className="text-gray-700">
          Insurance premiums and property tax reassessments in medical buildings
          frequently outpace general office. Add layered CAM admin fees and
          reserve funds, and practices often face 20–35% cost load above base rent.
        </p>
        <p className="mt-4 text-gray-600">
          See a breakdown of{" "}
          <Link
            href="/marketing/medical-office-nnn-expenses"
            className="underline text-blue-600"
          >
            medical office NNN expenses
          </Link>.
        </p>
      </section>

      {/* Case Studies */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Case Scenario: Imaging Center CAM Spike
        </h2>
        <p className="text-gray-700">
          A 12,000 SF imaging tenant saw CAM increase from $7.50 PSF to $11.90 PSF
          after a generator replacement and security overhaul were classified as
          operating costs. Estimated annual increase: $52,800.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Case Scenario: Multi-Specialty Clinic Admin Fee Overcharge
        </h2>
        <p className="text-gray-700">
          Lease capped CAM admin fees at 10%. Landlord billed 18% for two years.
          Recoverable exposure exceeded $38,000 after reconciliation review.
        </p>
        <p className="mt-4 text-gray-600">
          Explore common{" "}
          <Link
            href="/marketing/medical-practice-lease-overcharges"
            className="underline text-blue-600"
          >
            medical lease overcharges
          </Link>.
        </p>
      </section>

      {/* What We Find */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          What We Find in Medical Leases
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Admin fee cap violations</li>
          <li>Improper capital expense pass-through</li>
          <li>Double-charged maintenance contracts</li>
          <li>Tax allocation errors</li>
          <li>Reserve fund misuse</li>
        </ul>
        <p className="mt-4 text-gray-600">
          Download the{" "}
          <Link
            href="/marketing/medical-office-lease-audit-checklist"
            className="underline text-blue-600"
          >
            medical lease audit checklist
          </Link>.
        </p>
      </section>

      {/* Savings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Estimated Savings Range
        </h2>
        <p className="text-gray-700">
          Independent practices between 5,000–20,000 SF commonly uncover
          $15,000–$85,000 in annual exposure depending on lease structure,
          building age, and expense allocation methodology.
        </p>
      </section>

      {/* Urgency */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Most Practices Never Audit Their Lease
        </h2>
        <p className="text-gray-700">
          Medical operators focus on patient care and compliance — not CAM
          allocation math. By the time a cost spike appears, audit windows may
          already be closed under the lease.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center pt-10">
        <Link
          href="/app"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Upload Your Medical Lease
        </Link>
      </section>

    </main>
  );
}