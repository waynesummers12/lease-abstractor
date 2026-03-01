import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Office Lease Audit | CAM & NNN Review for Healthcare Tenants",
  description:
    "Audit your medical office lease for CAM overcharges, NNN pass-through errors, admin fee violations, and capital expense misallocations. Built for imaging centers, urgent care, dental and multi-specialty practices.",
};

export default function MedicalOfficeLeaseAudit() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">

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
          healthcare tenants never formally audit.
        </p>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Built For Healthcare Operators</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Independent imaging centers</li>
          <li>Urgent care operators</li>
          <li>Dental and specialty practices</li>
          <li>Multi-specialty clinics</li>
          <li>Growing multi-location healthcare platforms</li>
        </ul>
      </section>

      {/* FINANCIAL MATH */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">What Small Errors Actually Cost</h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-2 text-gray-700">
          <p>10,000 SF practice × $3 PSF improper allocation = $30,000/year</p>
          <p>15,000 SF medical tenant × $2.50 PSF overcharge = $37,500/year</p>
          <p className="font-semibold">
            Over a 7-year lease term, that can exceed $200,000 in preventable exposure.
          </p>
        </div>
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

      {/* BEFORE AFTER */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Before vs. After a Lease Audit</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg space-y-2 text-gray-700">
            <p className="font-semibold">Before Audit</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Trust reconciliation summary totals</li>
              <li>Assume landlord allocations are correct</li>
              <li>Absorb unexplained increases</li>
              <li>Miss admin cap violations</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg space-y-2 text-gray-700">
            <p className="font-semibold">After Audit</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Identify capital misclassification</li>
              <li>Verify admin fee cap compliance</li>
              <li>Correct tax allocation errors</li>
              <li>Preserve audit rights before deadlines</li>
            </ul>
          </div>
        </div>
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

      {/* URGENCY */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Why Audit Timing Is Critical</h2>
        <p className="text-gray-700">
          Most medical office leases allow only 6–12 months after reconciliation
          delivery to formally dispute charges. Missing this window can permanently
          waive recovery rights for that reconciliation year.
        </p>
      </section>

      {/* INTERNAL LINKS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Related Medical Lease Resources</h2>
        <ul className="list-disc pl-6 space-y-2 text-emerald-700">
          <li>
            <Link href="/marketing/medical-office-cam-reconciliation">
              Medical CAM Reconciliation Guide
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-office-nnn-expenses">
              Medical NNN Expense Breakdown
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-practice-lease-overcharges">
              Medical Lease Overcharge Patterns
            </Link>
          </li>
          <li>
            <Link href="/marketing/multi-location-medical-lease-risk">
              Multi-Location Medical Lease Risk
            </Link>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold">How often should medical tenants audit their lease?</h3>
            <p>Ideally every reconciliation cycle and always before audit windows expire.</p>
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
          Analyze My Medical Lease Before the Audit Window Closes
        </Link>
      </section>

    </main>
  );
}