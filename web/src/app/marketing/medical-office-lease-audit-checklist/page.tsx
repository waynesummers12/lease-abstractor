import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Medical Office Lease Audit Checklist (CAM & NNN Review for Healthcare Tenants)",
  description:
    "Comprehensive medical office lease audit checklist for imaging centers, urgent care, dental and multi-specialty practices. Review CAM charges, NNN exposure, admin fee caps, capital pass-through risk, HVAC allocation and generator costs.",
};

export default function MedicalChecklist() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How often should medical practices audit CAM charges?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Medical practices should review CAM reconciliations annually and always before the lease audit window expires."
        }
      },
      {
        "@type": "Question",
        "name": "Are imaging centers at higher risk of CAM misallocation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Imaging centers often face complex HVAC, generator, and electrical infrastructure allocations that increase misallocation risk."
        }
      },
      {
        "@type": "Question",
        "name": "Can tenants recover past medical lease overcharges?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recovery depends on lease language and whether dispute deadlines remain open under the audit provisions."
        }
      }
    ]
  };
    return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold leading-tight">
          Medical Office Lease Audit Checklist — Healthcare Tenant Edition
        </h1>
        <p className="text-lg text-gray-700">
          Medical office buildings carry infrastructure-heavy operating expense
          categories that rarely exist in traditional office properties. This
          checklist helps imaging centers, urgent care operators, dental groups,
          and multi-specialty practices systematically evaluate CAM reconciliation,
          triple net (NNN) expense exposure, admin fee caps, and capital pass-through risk.
        </p>
        <p className="text-gray-600">
          Small allocation errors can compound into six-figure exposure across a
          multi-year lease term.
        </p>
      </section>

      {/* FINANCIAL URGENCY */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Why This Checklist Matters Financially</h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-2 text-gray-700">
          <p>12,000 SF imaging center × $2.75 PSF improper allocation = $33,000/year</p>
          <p>15,000 SF clinic × $1.50 PSF miscalculation = $22,500/year</p>
          <p className="font-semibold">
            Over a 10-year lease term, that can exceed $200,000 in preventable exposure.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-gray-700">
          For a deeper breakdown of allocation math, see our <Link href="/marketing/medical-office-cam-reconciliation" className="text-emerald-600 hover:underline">Medical Office CAM Reconciliation Process</Link>
          and <Link href="/marketing/medical-office-nnn-expenses" className="text-emerald-600 hover:underline">Medical Office NNN Expense Breakdown</Link>.
        </p>
      </section>

      {/* SECTION 1 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          1. CAM & Operating Expense Controls
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Confirm CAM admin fee cap percentage and calculation base</li>
          <li>Verify no stacking of management, admin, or supervision fees</li>
          <li>Review capital expense exclusions and amortization rules</li>
          <li>Confirm controllable expense caps (if applicable)</li>
          <li>Check reserve fund authorization language</li>
          <li>Inspect parking structure and elevator cost allocation</li>
          <li>Confirm security, compliance, and monitoring costs are permitted</li>
        </ul>
      </section>

      {/* SECTION 2 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          2. Healthcare-Specific Infrastructure Risk
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Verify HVAC allocation methodology for imaging equipment load</li>
          <li>Inspect generator testing, fuel, and replacement charges</li>
          <li>Review electrical balancing and high-load system costs</li>
          <li>Confirm medical waste and compliance expenses are not misallocated</li>
          <li>Evaluate shared lobby staffing and concierge allocations</li>
          <li>Check post-COVID ventilation upgrade amortization</li>
        </ul>
      </section>

      {/* SECTION 3 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          3. NNN Expense Validation
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Validate property tax allocation formula and pro-rata share</li>
          <li>Confirm insurance premium breakdown and pass-through rights</li>
          <li>Check for year-over-year spike anomalies</li>
          <li>Confirm reconciliation delivery timing</li>
          <li>Review formal audit window deadlines</li>
        </ul>
      </section>

      {/* AUDIT WINDOW URGENCY */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Do Not Miss the Audit Window</h2>
        <p className="text-gray-700">
          Most medical office leases allow only 6–12 months after reconciliation
          delivery to formally dispute charges. Missing this window can permanently
          waive recovery rights for that reconciliation year.
        </p>
      </section>

      {/* EXPOSURE EXAMPLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Example: 15,000 SF Multi-Specialty Clinic
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-1">
          <p>$28 Base Rent = $420,000 Annual Base</p>
          <p>$9 NNN = $135,000 Annual NNN</p>
          <p className="font-bold mt-2">Total Annual Occupancy: $555,000</p>
        </div>
        <p className="text-gray-700 mt-4">
          A $1.50 PSF allocation error equals $22,500 annually. Over a 10-year term,
          that equals $225,000 in cumulative exposure.
        </p>
      </section>

      {/* INTERNAL LINKS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Related Medical Lease Resources
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-emerald-700">
          <li>
            <Link href="/marketing/medical-office-lease-audit">
              Medical Office Lease Audit (CAM & NNN Review)
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-office-cam-reconciliation">
              Medical Office CAM Reconciliation Process
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-office-nnn-expenses">
              Medical Office NNN Expense Breakdown
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-practice-lease-overcharges">
              Medical Lease Overcharges & Admin Fee Violations
            </Link>
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <p className="text-gray-700">
          Healthcare real estate expense structures are materially more complex
          than standard office assets due to imaging loads, generator redundancy,
          infection-control HVAC systems, and regulatory compliance upgrades.
          A structured medical lease audit helps preserve dispute rights while
          minimizing long-term occupancy cost exposure.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center pt-10">
        <Link
          href="/app/step-1-upload"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Analyze My Medical Lease Before the Audit Window Closes
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}