import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Practice Lease Overcharges (CAM & NNN Admin Fee Violations Guide)",
  description:
    "Medical office lease overcharges explained. Identify CAM admin fee stacking, capital expense pass-through errors, duplicate maintenance billing, and NNN percentage violations in healthcare properties.",
};

export default function MedicalOvercharges() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can medical tenants recover past CAM overcharges?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recovery depends on the audit window and lease language. Many leases allow formal review within defined time limits after reconciliation issuance."
        }
      },
      {
        "@type": "Question",
        "name": "Are capital expenditures always prohibited in medical leases?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not always. Some leases allow amortized capital improvements under specific conditions, while others restrict them entirely based on lease definitions and caps."
        }
      },
      {
        "@type": "Question",
        "name": "How common are medical lease overcharges?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Medical office audits frequently uncover admin fee miscalculations, duplicate billing, capital pass-through issues, and allocation errors."
        }
      }
    ]
  };
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          Medical Practice Lease Overcharges: Where Healthcare Tenants Lose Thousands
        </h1>
        <p className="text-lg text-gray-700">
          Medical office tenants frequently face layered and compounding CAM
          and NNN overcharges. Specialized infrastructure, capital upgrades,
          and percentage-based administrative fees create exposure that many
          practices never detect until it is too late.
        </p>
      </section>

      <section className="space-y-6">
        <p className="text-gray-700">
          In outpatient medical office buildings, lease overcharges frequently
          stem from triple net (NNN) structures, percentage-based administrative
          fees, insurance repricing cycles, and capital improvement allocation
          language. Without structured CAM reconciliation review, healthcare
          tenants may absorb expenses that exceed lease-defined caps or
          permissible amortization provisions.
        </p>
      </section>

      {/* REAL MONEY CONTEXT */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          What Overcharges Actually Cost Medical Tenants
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-2 text-gray-700">
          <p>10,000 SF practice × $2 PSF improper charge = $20,000/year</p>
          <p>10,000 SF practice × $4 PSF error = $40,000/year</p>
          <p className="font-semibold">
            Over a 5-year term, that can exceed $200,000 in preventable exposure.
          </p>
        </div>
        <p className="text-gray-700">
          These overcharges often hide inside reconciliation statements that
          appear routine and technical.
        </p>
        For a full expense breakdown, see our <Link href="/marketing/medical-office-cam-reconciliation" className="text-emerald-600 underline">Medical Office CAM Reconciliation Process</Link>.
      </section>

      {/* OVERCHARGE TYPES */}
      <section className="space-y-10">
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            1. Admin Fee Stacking Above Lease Caps
          </h2>
          <p className="text-gray-700">
            Many medical leases cap CAM admin fees at 8–12%. Overcharges occur
            when management fees are layered separately, when caps are applied
            to expanded expense categories, or when percentage calculations are
            performed incorrectly.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            2. Double-Charged Maintenance Contracts
          </h2>
          <p className="text-gray-700">
            Elevator servicing, HVAC maintenance, generator testing, and
            parking structure upkeep may appear both in master building
            contracts and as individual CAM line items — resulting in
            duplicate billing.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            3. Capital Expenses Disguised as Operating Costs
          </h2>
          <p className="text-gray-700">
            Roof replacements, structural repairs, and major system upgrades
            are sometimes amortized through CAM despite lease exclusions.
            Medical properties frequently see this following compliance-driven
            improvements.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            Real Example: Imaging Tenant Admin Fee Violation
          </h2>
          <p className="text-gray-700">
            A 12,000 SF imaging center had CAM admin fees capped at 10%.
            The landlord applied 18% for three consecutive years.
          </p>
          <p className="text-gray-700 mt-2">
            Annual overcharge: approximately $28,800.<br />
            Three-year exposure: over $86,000.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            4. Management Fees Exceeding Allowed Percentages
          </h2>
          <p className="text-gray-700">
            Some leases restrict management compensation to a defined
            percentage of operating expenses. When operating expenses spike,
            improper percentage calculations can materially increase tenant
            exposure.
          </p>
        </div>
      </section>

      {/* WHY HEALTHCARE IS TARGETED */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Why Medical Practices Are Especially Vulnerable
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>High infrastructure requirements (HVAC, electrical, backup power)</li>
          <li>Regulatory-driven capital upgrades</li>
          <li>Complex pro-rata share allocations in MOBs</li>
          <li>Limited internal lease audit expertise</li>
          <li>Short audit windows buried in lease language</li>
        </ul>
      </section>

      {/* TIMING URGENCY */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Why Timing Matters: Audit Windows Close Quickly
        </h2>
        <p className="text-gray-700">
          Most medical office leases allow only 6–12 months after reconciliation
          delivery to formally dispute CAM and NNN overcharges. Missing this
          deadline can permanently waive recovery rights for that year.
        </p>
      </section>

      {/* INTERNAL CLUSTERING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Related Medical Lease Risk Guides
        </h2>
        <ul className="space-y-2 text-emerald-700">
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
            <Link href="/marketing/medical-office-lease-audit-checklist">
              Medical Office Lease Audit Checklist
            </Link>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <p className="text-gray-700">
          A structured medical lease audit helps preserve dispute rights,
          validate CAM percentage calculations, and challenge improper
          capital pass-through allocations before audit windows expire.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center pt-8">
        <Link
          href="/app/step-1-upload"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Identify Medical Lease Overcharges Before the Audit Window Closes
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}