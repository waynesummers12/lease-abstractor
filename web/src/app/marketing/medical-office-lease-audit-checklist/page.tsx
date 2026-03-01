import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Office Lease Audit Checklist | CAM & NNN Review for Healthcare Tenants",
  description:
    "Download and use this medical office lease audit checklist to review CAM charges, NNN expenses, admin fee caps, HVAC allocation, generator costs, and capital expense pass-through risks.",
};

export default function MedicalChecklist() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* Hero */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          Medical Office Lease Audit Checklist
        </h1>
        <p className="text-lg text-gray-700">
          Use this checklist to review CAM and NNN exposure in outpatient
          buildings, imaging centers, urgent care clinics, dental practices,
          and multi-tenant medical complexes.
        </p>
      </section>

      {/* Checklist Sections */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          CAM & Operating Expense Review
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Confirm CAM admin fee cap percentage and calculation method</li>
          <li>Verify no stacking of management and admin fees</li>
          <li>Review capital expense exclusions and amortization rules</li>
          <li>Check reserve fund authorization language</li>
          <li>Inspect parking structure and elevator allocations</li>
          <li>Confirm compliance and security costs are contractually permitted</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Healthcare-Specific Risk Items
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Verify HVAC allocation methodology for imaging equipment</li>
          <li>Inspect generator testing, fuel, and replacement charges</li>
          <li>Review electrical load cost allocation</li>
          <li>Confirm medical waste and compliance costs are not misallocated</li>
          <li>Evaluate shared lobby staffing and concierge allocations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          NNN Expense Review
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Validate property tax allocation formula</li>
          <li>Confirm insurance premium breakdown and pass-through rights</li>
          <li>Check for disproportionate increases year-over-year</li>
          <li>Review reconciliation timing and audit window deadlines</li>
        </ul>
      </section>

      {/* Urgency */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Why This Checklist Matters
        </h2>
        <p className="text-gray-700">
          Many medical tenants focus on operations and patient care, not lease
          allocation math. Once reconciliation deadlines pass, recovery options
          may be limited under the lease.
        </p>
      </section>

      {/* Internal Links */}
      <section>
        <div className="space-y-2">
          <p>
            Start with the <Link href="/marketing/medical-office-lease-audit" className="underline text-blue-600">medical lease audit hub</Link>.
          </p>
          <p>
            Understand <Link href="/marketing/medical-office-cam-reconciliation" className="underline text-blue-600">medical CAM reconciliations</Link>.
          </p>
          <p>
            Review <Link href="/marketing/medical-office-nnn-expenses" className="underline text-blue-600">medical NNN expenses</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-8">
        <Link
          href="/app"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Upload My Medical Lease
        </Link>
      </section>

    </main>
  );
}