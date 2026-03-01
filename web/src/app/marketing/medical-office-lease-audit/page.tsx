import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Office Lease Audit | CAM & NNN Review for Healthcare Tenants",
  description:
    "Audit your medical office lease for CAM overcharges, NNN pass-through errors, admin fee violations, and capital expense misallocations. Built for imaging centers, urgent care, dental and multi-specialty practices.",
};

export default function MedicalOfficeLeaseAudit() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">

      {/* HERO */}
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

      {/* UNIQUE RISK */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
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

      {/* COMMON OVERCHARGES */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
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
        <p className="text-gray-600">
          See detailed breakdown of <Link href="/marketing/medical-office-cam-reconciliation" className="text-emerald-600 underline">medical CAM reconciliations</Link>.
        </p>
      </section>

      {/* NNN RISK */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          NNN Pass-Through Risk in Healthcare Properties
        </h2>
        <p className="text-gray-700">
          Insurance premiums and property tax reassessments in medical buildings
          frequently outpace general office. Add layered CAM admin fees and
          reserve funds, and practices often face 20–35% cost load above base rent.
        </p>
        <p className="text-gray-600">
          Review full <Link href="/marketing/medical-office-nnn-expenses" className="text-emerald-600 underline">medical NNN expense breakdown</Link>.
        </p>
      </section>

      {/* CASE STUDIES */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Case Scenario: Imaging Center CAM Spike
        </h2>
        <p className="text-gray-700">
          A 12,000 SF imaging tenant saw CAM increase from $7.50 PSF to $11.90 PSF
          after generator replacement and security upgrades were pushed into CAM.
          Estimated annual increase: $52,800.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Case Scenario: Multi-Specialty Clinic Admin Fee Overcharge
        </h2>
        <p className="text-gray-700">
          Lease capped CAM admin fees at 10%. Landlord billed 18% for two years.
          Recoverable exposure exceeded $38,000 after reconciliation review.
        </p>
        <p className="text-gray-600">
          Explore more <Link href="/marketing/medical-practice-lease-overcharges" className="text-emerald-600 underline">medical lease overcharge examples</Link>.
        </p>
      </section>

      {/* WHAT WE FIND */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          What We Identify in Medical Leases
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Admin fee cap violations</li>
          <li>Improper capital expense pass-through</li>
          <li>Double-charged maintenance contracts</li>
          <li>Tax allocation errors</li>
          <li>Reserve fund misuse</li>
        </ul>
        <p className="text-gray-600">
          Use our <Link href="/marketing/medical-office-lease-audit-checklist" className="text-emerald-600 underline">medical lease audit checklist</Link> before your reconciliation deadline.
        </p>
      </section>

      {/* SAVINGS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Estimated Savings Range
        </h2>
        <p className="text-gray-700">
          Independent practices between 5,000–20,000 SF commonly uncover
          $15,000–$85,000 in annual exposure depending on lease structure,
          building age, and allocation methodology.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold">How often should medical tenants audit their lease?</h3>
            <p>Ideally every reconciliation cycle, and always before audit windows expire.</p>
          </div>
          <div>
            <h3 className="font-semibold">Are capital expenses always excluded from CAM?</h3>
            <p>Not always. It depends on lease definitions and amortization language.</p>
          </div>
          <div>
            <h3 className="font-semibold">Can prior overcharges be recovered?</h3>
            <p>Recovery depends on lease audit rights and reconciliation timing.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-8">
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