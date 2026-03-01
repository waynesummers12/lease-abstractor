

import Link from "next/link";

export default function MedicalHubPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-24">

      {/* HERO */}
      <section className="space-y-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Medical Office Lease Audit & CAM Recovery Hub
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          A complete guide for healthcare tenants navigating CAM reconciliation,
          NNN expenses, audit rights, overcharges, and multi-location lease risk.
          Built specifically for medical office buildings.
        </p>
        <Link
          href="/app/step-1-upload"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Start Free Medical Lease Audit
        </Link>
      </section>

      {/* WHY MEDICAL IS DIFFERENT */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Why Medical Office Leases Carry Higher Financial Risk
        </h2>
        <p className="text-gray-700">
          Medical office tenants often face elevated property taxes, higher
          insurance premiums, specialized HVAC requirements, and compliance-driven
          building operations. These cost structures create more opportunity for
          misallocation and overcharges compared to standard office leases.
        </p>
      </section>

      {/* CORE GUIDES GRID */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">
          Core Medical Lease Guides
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <Link href="/marketing/medical-office-lease-audit" className="border rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Medical Lease Audit Guide</h3>
            <p className="text-gray-600">
              How healthcare tenants identify CAM and NNN overcharges before
              audit deadlines expire.
            </p>
          </Link>

          <Link href="/marketing/medical-office-cam-reconciliation" className="border rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Medical CAM Reconciliation</h3>
            <p className="text-gray-600">
              Understanding annual reconciliations and common allocation errors
              in medical buildings.
            </p>
          </Link>

          <Link href="/marketing/medical-office-nnn-expenses" className="border rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Medical NNN Expenses</h3>
            <p className="text-gray-600">
              Breakdown of property taxes, insurance, CAM fees, and capital
              expense pass-through risk.
            </p>
          </Link>

          <Link href="/marketing/medical-practice-lease-overcharges" className="border rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Medical Lease Overcharges</h3>
            <p className="text-gray-600">
              Real-world examples of admin fee violations, capital pass-throughs,
              and inflated operating costs.
            </p>
          </Link>

          <Link href="/marketing/medical-office-cam-spikes" className="border rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Medical CAM Spikes</h3>
            <p className="text-gray-600">
              How reassessments and insurance increases create sudden financial
              exposure for healthcare tenants.
            </p>
          </Link>

          <Link href="/marketing/multi-location-medical-lease-risk" className="border rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Multi-Location Medical Risk</h3>
            <p className="text-gray-600">
              Portfolio-level risk for growing medical groups and imaging
              networks.
            </p>
          </Link>

        </div>
      </section>

      {/* AUDIT RIGHTS SECTION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Audit Rights & Deadlines for Medical Tenants
        </h2>
        <p className="text-gray-700">
          Most medical leases allow only 6–12 months after reconciliation
          delivery to dispute improper charges. Missing the audit window can
          permanently waive recovery rights.
        </p>

        <div className="flex flex-wrap gap-6">
          <Link href="/marketing/medical-office-lease-audit-checklist" className="text-emerald-600 hover:underline">
            Medical Audit Checklist
          </Link>
          <Link href="/marketing/how-medical-practices-can-dispute-cam-charges" className="text-emerald-600 hover:underline">
            Dispute Medical CAM Charges
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center pt-8">
        <Link
          href="/app/step-1-upload"
          className="inline-block bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Review My Medical Lease Before Deadlines Expire
        </Link>
      </section>

    </main>
  );
}