import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Medical Office CAM Spikes | Why Healthcare Tenants See Sudden Cost Surges",
  description:
    "Why CAM costs spike in medical office buildings. Insurance volatility, tax reassessments, capital pass-through abuse, admin fee stacking, and healthcare compliance upgrades explained with real exposure math.",
};

export default function CAMSpikesMedical() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why do CAM charges spike in medical office buildings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Medical office buildings often face insurance volatility, property tax reassessments, compliance upgrades, HVAC infrastructure costs, and capital improvements that are sometimes pushed through CAM allocations."
        }
      },
      {
        "@type": "Question",
        "name": "Can capital improvements be included in CAM charges?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on the lease language. Some leases allow amortized capital improvements if they reduce operating expenses, while others restrict them entirely."
        }
      },
      {
        "@type": "Question",
        "name": "How can medical tenants reduce exposure from CAM spikes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Medical tenants should review annual reconciliations, confirm admin fee caps, verify allocation percentages, and challenge improper capital pass-throughs within audit windows."
        }
      }
    ]
  };
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold leading-tight">
          CAM Spikes in Medical Office Buildings — What Actually Causes Them
        </h1>
        <p className="text-lg text-gray-700">
          Medical office CAM expenses often rise faster than standard office
          properties due to infrastructure-heavy systems, insurance volatility,
          property tax reassessments, and capital projects pushed through as
          operating expenses.
        </p>
        <p className="text-gray-600">
          For imaging centers and outpatient practices, even a $2–$5 PSF increase
          can materially alter profitability and long-term lease economics.
        </p>
      </section>

      {/* WHY SPIKES HAPPEN */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Why Medical CAM Costs Rise Faster Than Traditional Office
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Insurance premium increases specific to healthcare assets</li>
          <li>Property tax reassessments driven by medical tenant demand</li>
          <li>Post‑COVID ventilation and filtration system upgrades</li>
          <li>Clinical-grade HVAC load balancing and electrical upgrades</li>
          <li>Security, monitoring, and regulatory compliance expansions</li>
          <li>Capital improvements reclassified as operating expenses</li>
        </ul>
      </section>

      {/* EXPOSURE MATH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Real Exposure Example — 10,000 SF Imaging Center
        </h2>
        <table className="w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Year</th>
              <th className="p-3">CAM PSF</th>
              <th className="p-3">Annual CAM</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3">Year 1</td>
              <td className="p-3">$7.00</td>
              <td className="p-3">$70,000</td>
            </tr>
            <tr>
              <td className="p-3">Year 3</td>
              <td className="p-3">$12.00</td>
              <td className="p-3">$120,000</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-700 mt-4">
          A $5 PSF increase equals $50,000 in additional annual expense. Over a
          7-year lease term, that spike represents $350,000 in cumulative exposure.
        </p>
      </section>

      {/* ADMIN FEE STACKING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Hidden Multiplier: Admin Fee Stacking
        </h2>
        <p className="text-gray-700">
          Many medical leases cap CAM admin fees at 8–12%. When base CAM rises,
          percentage-based admin fees automatically rise as well.
        </p>
        <p className="text-gray-700">
          If caps are ignored, layered incorrectly, or calculated on inflated
          expense categories, tenants experience compounded overcharges.
        </p>
      </section>

      {/* CAPITAL PASS-THROUGH RISK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Capital Improvements Disguised as CAM
        </h2>
        <p className="text-gray-700">
          Elevator modernization, structural parking repairs, roof replacements,
          and generator upgrades are frequently amortized and billed through CAM.
        </p>
        <p className="text-gray-700">
          Lease language determines whether those costs are contractually
          permitted. Review examples of
          {" "}
          <Link
            href="/marketing/medical-practice-lease-overcharges"
            className="text-emerald-600 underline"
          >
            medical lease overcharge patterns
          </Link>.
        </p>
      </section>

      {/* INTERNAL CLUSTERING */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Related Medical Lease Resources
        </h2>
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
            <Link href="/marketing/medical-office-lease-audit-checklist">
              Medical Lease Audit Checklist
            </Link>
          </li>
          <li>
            <Link href="/marketing/how-medical-practices-can-dispute-cam-charges">
              How to Dispute CAM Charges
            </Link>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">
          CAM Spike FAQ for Medical Tenants
        </h2>

        <div>
          <h3 className="font-semibold">
            Why are insurance premiums rising so fast for medical buildings?
          </h3>
          <p className="text-gray-700">
            Healthcare properties carry higher liability exposure and equipment
            risk profiles, which can drive insurance volatility.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            Can landlords increase CAM without limits?
          </h3>
          <p className="text-gray-700">
            Only if the lease permits it. Some leases contain caps on controllable
            expenses but exclude taxes and insurance.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            How do I protect my practice from sudden CAM spikes?
          </h3>
          <p className="text-gray-700">
            Review reconciliation statements annually and verify capital
            expenditures, admin fee calculations, and allocation percentages.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-10">
        <Link
          href="/app/step-1-upload"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Analyze My CAM Spike Risk
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}