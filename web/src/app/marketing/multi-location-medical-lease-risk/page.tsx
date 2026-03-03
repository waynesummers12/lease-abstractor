import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Location Medical Lease Risk (Portfolio CAM & NNN Exposure Guide)",
  description:
    "How lease mistakes compound across multiple medical office locations. Portfolio-level CAM reconciliation, NNN allocation risk, admin fee caps, and capital pass-through exposure for healthcare platforms.",
};

export default function MultiLocationMedical() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is multi-location medical lease risk harder to detect?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each property may use different reconciliation formats, admin fee caps, capital allocation rules, and tax structures. Without centralized oversight, inconsistencies compound across the portfolio."
        }
      },
      {
        "@type": "Question",
        "name": "How much exposure can compound across multiple medical locations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Even $15,000–$20,000 in annual overcharges per site can exceed six figures per year when multiplied across five or more locations."
        }
      },
      {
        "@type": "Question",
        "name": "When should healthcare platforms perform a portfolio lease audit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Portfolio-level audits are most effective during expansion phases, refinancing events, recapitalizations, or before acquiring new locations."
        }
      }
    ]
  };
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          Multi-Location Medical Lease Risk: How Small Errors Become Six-Figure Exposure
        </h1>
        <p className="text-lg text-gray-700">
          Scaling from one clinic to five or fifteen locations multiplies
          lease complexity. Minor CAM allocation inconsistencies, admin fee
          stacking, and capital pass-through language variations can quietly
          compound into recurring six-figure portfolio risk.
        </p>
      </section>

      <section className="space-y-6">
        <p className="text-gray-700">
          In multi-site healthcare portfolios, triple net (NNN) lease structures,
          CAM reconciliation methodology, insurance repricing cycles, and
          property tax reassessments may vary by location. Without centralized
          oversight, these structural inconsistencies compound into systemic
          portfolio-level exposure.
        </p>
      </section>

      {/* COMPOUNDING MATH */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          How Small Errors Multiply Across Sites
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-2 text-gray-700">
          <p>$15,000 annual overcharge × 5 locations = $75,000/year</p>
          <p>$20,000 annual misallocation × 10 locations = $200,000/year</p>
          <p className="font-semibold">
            Over a 7-year portfolio horizon, systemic lease issues can exceed $1M.
          </p>
        </div>
        <p className="text-gray-700">
          What looks insignificant at a single property becomes a structural
          cash flow issue at scale.
        </p>
        <p className="text-gray-700">
          Growing healthcare platforms should treat lease oversight as a
          structured <Link href="/marketing/franchise-cam-audit" className="text-emerald-600 underline">multi-location CAM audit strategy</Link>,
          comparing admin caps, expense allocations, and capital exclusions
          side-by-side across every property in the portfolio.
        </p>
        <p>
          See how systemic expense patterns are uncovered in our <Link href="/marketing/medical-office-lease-audit" className="text-emerald-600 underline">Medical Office Lease Audit (CAM & NNN Review)</Link>.
        </p>
      </section>

      {/* HIGH RISK OPERATORS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Healthcare Operators Most Exposed
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Multi-location dental service organizations (DSOs)</li>
          <li>Private equity–backed specialty clinic platforms</li>
          <li>Regional urgent care networks</li>
          <li>Imaging and radiology groups expanding rapidly</li>
          <li>Physical therapy and rehabilitation chains</li>
        </ul>
        <p className="text-gray-700">
          Growth often outpaces centralized lease oversight.
        </p>
      </section>

      {/* OPERATIONAL BLIND SPOT */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          The Operational Blind Spot in Growing Healthcare Platforms
        </h2>
        <p className="text-gray-700">
          Expanding medical operators prioritize provider recruitment,
          reimbursement optimization, payer contracts, and patient acquisition.
          Lease administration frequently becomes decentralized, leaving CAM
          reconciliations and NNN allocation inconsistencies undetected.
        </p>
        <p className="text-gray-700">
          Different buildings use different admin caps, tax allocation
          structures, and capital improvement rules — creating inconsistent
          exposure across the portfolio.
        </p>
      </section>

      {/* PORTFOLIO STRATEGY */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Portfolio-Level Lease Review Strategy
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Standardize admin fee cap comparison across leases</li>
          <li>Compare capital expenditure exclusions side-by-side</li>
          <li>Identify recurring tax allocation disparities</li>
          <li>Track reconciliation timing and audit window deadlines</li>
          <li>Detect systemic overcharge patterns across properties</li>
        </ul>
        <p className="text-gray-700">
          Reviewing leases individually misses structural patterns. Portfolio
          analysis reveals repeatable allocation behavior.
        </p>
      </section>

      {/* INTERNAL CLUSTERING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Related Medical Lease Risk Resources
        </h2>
        <ul className="space-y-2 text-emerald-700">
          <li>
            <Link href="/marketing/medical-office-lease-audit">
              Medical Office Lease Audit (CAM & NNN Review)
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-practice-lease-overcharges">
              Medical Lease Overcharges & Admin Fee Violations
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-office-nnn-expenses">
              Medical Office NNN Expense Breakdown
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-office-lease-audit-checklist">
              Medical Office Lease Audit Checklist
            </Link>
          </li>
          <li>
            <Link href="/marketing/franchise-cam-audit">
              Franchise & Multi-Location CAM Audit Guide
            </Link>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Frequently Asked Questions About Multi-Site Medical Lease Risk
        </h2>

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold">
              Why is multi-location lease risk harder to detect?
            </h3>
            <p>
              Each property may use different reconciliation formats, admin
              percentages, and capital allocation structures. Without
              centralized review, inconsistencies remain hidden.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Should healthcare operators standardize lease language?
            </h3>
            <p>
              As platforms scale, negotiating consistent admin caps and
              capital exclusions reduces long-term exposure and simplifies
              portfolio oversight.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              When should a portfolio-level audit be performed?
            </h3>
            <p>
              Ideally during expansion phases, refinancing, recapitalization,
              or before adding new locations — when structural issues can be
              addressed early.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-gray-700">
          A structured portfolio-level medical lease audit helps standardize
          admin fee cap comparisons, validate NNN allocation methodology,
          and identify recurring capital pass-through patterns before they
          materially impact platform valuation.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center pt-8">
        <Link
          href="/app/step-1-upload"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Audit My Medical Lease Portfolio
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}