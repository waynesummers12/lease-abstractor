

import Link from "next/link";

export const metadata = {
  title: "Burger Restaurant Lease Audit | CAM & NNN Review for Franchise Operators",
  description:
    "Lease audit services built for burger franchisees and multi-unit QSR operators. Identify hidden CAM and NNN overcharges before audit deadlines expire.",
};

export default function BurgerRestaurantLeaseAuditPage() {
  return (
    <main className="bg-white">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Burger Restaurant Lease Audit
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          CAM & NNN risk review built specifically for franchisees and multi-unit
          burger operators in strip centers and inline retail.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-6 text-sm">
          <div className="p-4 bg-gray-50 border rounded-lg">
            <p className="font-semibold text-gray-900">Thin margins (4–6%)</p>
            <p className="mt-1 text-gray-600">
              A small allocation error can eliminate store-level profit.
            </p>
          </div>
          <div className="p-4 bg-gray-50 border rounded-lg">
            <p className="font-semibold text-gray-900">Triple Net leases common</p>
            <p className="mt-1 text-gray-600">
              Taxes, insurance, maintenance and admin fees often pass through unchecked.
            </p>
          </div>
          <div className="p-4 bg-gray-50 border rounded-lg">
            <p className="font-semibold text-gray-900">Audit windows limited</p>
            <p className="mt-1 text-gray-600">
              Most leases allow only 30–120 days to challenge discrepancies.
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">
            Why Burger Restaurants Face Elevated Lease Risk
          </h2>

          <p>
            Burger restaurants frequently operate in high-traffic retail centers
            where common area maintenance (CAM) and NNN expenses fluctuate
            year over year. Inflation, insurance increases, and capital upgrades
            can significantly impact reconciliation statements.
          </p>

          <p>
            Without structured review, franchisees may unknowingly absorb:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Improper CAM allocation percentages</li>
            <li>Uncapped administrative fees</li>
            <li>Capital expense pass-throughs</li>
            <li>Insurance markups</li>
            <li>Charges outside lease-defined categories</li>
          </ul>
        </div>

        <div className="mt-12 p-8 bg-indigo-50 border border-indigo-200 rounded-xl">
          <h2 className="text-xl font-semibold text-indigo-900">
            Portfolio-Level Impact for Multi-Unit Operators
          </h2>
          <p className="mt-3 text-indigo-800">
            A $6,000 annual discrepancy at one location becomes $60,000 across
            ten stores. Lease exposure scales with footprint.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900">
            What a Burger Lease Audit Includes
          </h2>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li>✔ Review of CAM reconciliation statements</li>
            <li>✔ Lease cap verification</li>
            <li>✔ Capital expenditure compliance analysis</li>
            <li>✔ Administrative fee review</li>
            <li>✔ Audit window deadline identification</li>
          </ul>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/app/step-1-upload"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Upload Your Lease — Results in ~10 Seconds
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Secure. No subscription required.
          </p>
        </div>

        <div className="mt-20 border-t pt-12">
          <h3 className="text-xl font-semibold text-gray-900">
            FAQ
          </h3>

          <div className="mt-6 space-y-6">
            <div>
              <p className="font-medium text-gray-900">
                How much exposure can a burger restaurant lease contain?
              </p>
              <p className="mt-2 text-gray-600">
                Exposure varies by square footage and center type, but
                discrepancies of $5,000–$20,000 per location annually are not uncommon.
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">
                Do franchisees have audit rights?
              </p>
              <p className="mt-2 text-gray-600">
                Most commercial leases provide defined audit rights with
                specific time limits. Reviewing reconciliation statements promptly
                is critical to preserve these rights.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}