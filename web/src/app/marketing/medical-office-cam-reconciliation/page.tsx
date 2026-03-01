import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Medical Office CAM Reconciliation (Audit Guide for Healthcare Tenants)",
  description:
    "Deep-dive guide to CAM reconciliations in medical office buildings. Learn how imaging centers and outpatient practices identify overcharges, capital expense violations, admin fee stacking, and NNN allocation errors.",
};

export default function MedicalOfficeCAM() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a CAM reconciliation in a medical office building?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A CAM reconciliation is the annual true-up of operating expenses where medical tenants are billed for their pro-rata share of building costs such as maintenance, insurance, taxes, and shared services."
        }
      },
      {
        "@type": "Question",
        "name": "Can imaging centers be overcharged in CAM allocations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Imaging centers often face higher electrical load allocations, generator expenses, HVAC adjustments, and admin fee stacking that may exceed lease-defined caps."
        }
      },
      {
        "@type": "Question",
        "name": "How long do medical tenants have to dispute CAM charges?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most medical leases provide a 6 to 12 month audit window after reconciliation delivery to dispute improper allocations."
        }
      }
    ]
  };
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold leading-tight">
          Medical Office CAM Reconciliation — What Healthcare Tenants Must Review
        </h1>
        <p className="text-lg text-gray-700">
          CAM reconciliations in medical office buildings are materially more
          complex than traditional office properties. Imaging infrastructure,
          generator systems, parking structures, elevator modernization, and
          compliance-driven upgrades create recurring volatility that can add
          15–35% to total occupancy costs.
        </p>
        <p className="text-gray-600">
          Without structured review, medical tenants often absorb capital
          improvements, inflated admin allocations, and miscalculated
          pro-rata shares that exceed lease limits. For a full framework, see our <Link href="/marketing/medical-office-lease-audit" className="text-emerald-600 hover:underline">Medical Office Lease Audit (CAM & NNN Review)</Link>.
        </p>
      </section>

      {/* FINANCIAL CONTEXT */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Example: 12,000 SF Imaging Center Exposure
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-1 text-gray-700">
          <p>$32 Base Rent = $384,000 Annual Base Rent</p>
          <p>$10 CAM/NNN = $120,000 Annual NNN</p>
          <p className="font-bold mt-2">Total Annual Occupancy Cost: $504,000</p>
        </div>
        <p className="text-gray-700">
          A $2 PSF misallocation increases annual exposure by $24,000.
          Over a 7-year term, that equals $168,000 in cumulative impact.
        </p>
      </section>

      {/* ADMIN FEE MATH */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Admin Fee Cap Violations — The Hidden Multiplier
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-2 text-gray-700">
          <p>$300,000 Annual CAM × 15% Admin Fee = $45,000</p>
          <p>Lease Cap = 10%</p>
          <p className="font-semibold">Annual Overcharge = $15,000</p>
        </div>
        <p className="text-gray-700">
          When CAM increases due to capital-heavy infrastructure, percentage-based
          admin fees magnify exposure.
        </p>
      </section>

      {/* CAPITAL VS OPERATING TEST */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          How to Evaluate Capital vs Operating Classification
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Does the project extend useful life of the system?</li>
          <li>Is it a full replacement rather than routine repair?</li>
          <li>Is amortization permitted under the lease?</li>
          <li>Is the expense legally mandated or elective?</li>
          <li>Does the lease explicitly exclude structural improvements?</li>
        </ul>
        <p className="text-gray-700">
          Many medical tenants unknowingly pay for capital improvements
          improperly categorized as operating expenses.
        </p>
      </section>

      {/* MEDICAL-SPECIFIC ALLOCATION RISK */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Allocation Risks Unique to Medical Buildings
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>High electrical load imaging suites increasing shared costs</li>
          <li>Parking structure reinforcement allocated equally instead of proportionally</li>
          <li>Generator testing costs distributed without usage modeling</li>
          <li>After-hours HVAC usage assumptions misapplied</li>
          <li>Pro-rata share miscalculations tied to rentable vs usable square footage</li>
        </ul>
      </section>

      {/* HIGH RISK ITEMS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          High-Risk CAM Line Items in Medical Buildings
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Lobby concierge and shared clinical staffing allocations</li>
          <li>Parking structure structural repairs and resurfacing</li>
          <li>Elevator modernization programs</li>
          <li>HVAC upgrades tied to imaging load increases</li>
          <li>Generator replacement and fuel reserve allocations</li>
          <li>Security system upgrades and compliance monitoring</li>
          <li>Capital projects classified as “operating expenses”</li>
        </ul>
      </section>

      <section className="space-y-6">
        <p className="text-gray-700">
          In outpatient medical office buildings, CAM reconciliations often
          intersect with triple net (NNN) lease structures, insurance volatility,
          and property tax reassessments. Understanding how operating expense
          allocations interact with lease-defined caps and exclusions is critical
          for preserving audit rights and minimizing cumulative exposure.
        </p>
      </section>

      {/* URGENCY */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Why Timing Is Critical in Medical CAM Reviews
        </h2>
        <p className="text-gray-700">
          Most medical office leases provide only 6–12 months after reconciliation
          delivery to dispute charges. Missing this window may permanently waive
          recovery rights for that year.
        </p>
      </section>

      {/* INTERNAL CLUSTER LINKS */}
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
            <Link href="/marketing/medical-office-nnn-expenses">
              Medical Office NNN Expense Breakdown
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-practice-lease-overcharges">
              Medical Lease Overcharges & Admin Fee Violations
            </Link>
          </li>
          <li>
            <Link href="/marketing/how-medical-practices-can-dispute-cam-charges">
              How Medical Practices Can Dispute CAM Charges
            </Link>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center pt-10">
        <Link
          href="/app/step-1-upload"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Review My Medical CAM Reconciliation Before the Audit Window Closes
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

    </main>
  );
}