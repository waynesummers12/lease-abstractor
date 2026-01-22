import FaqSchema from "@/app/components/FaqSchema";

export const metadata = {
  title: "CAM & NNN Overcharge Examples | What Lease Audits Find",
  description:
    "Learn the most common CAM and NNN overcharges in commercial leases, including admin fees, capital expenses, insurance, and reconciliation errors.",
};

export default function WhatWeFindPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-6 py-12">
      {/* HERO */}
      <section>
        <h1 className="text-4xl font-bold">
          What We Find in CAM & NNN Audits
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Most commercial tenants overpay on CAM and NNN charges — not because
          landlords are malicious, but because the billing is complex,
          inconsistent, and rarely challenged.
        </p>
        <p className="mt-2 text-gray-700">
          Our lease audits focus on the most common (and expensive) areas where
          charges drift outside what your lease actually allows.
        </p>
      </section>

      {/* SECTION 1 */}
      <section>
        <h2 className="text-2xl font-semibold">
          CAM Reconciliation Errors
        </h2>
        <p className="mt-3 text-gray-700">
          CAM charges are usually estimated throughout the year, then “trued
          up” in a reconciliation statement. This process is one of the most
          error-prone parts of a commercial lease.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
          <li>Expenses charged outside the lease definition of CAM</li>
          <li>Duplicate line items year over year</li>
          <li>Costs shifted between properties or cost centers</li>
          <li>Reconciliations delivered late (after audit windows close)</li>
        </ul>
      </section>

      {/* SECTION 2 */}
      <section>
        <h2 className="text-2xl font-semibold">
          Administrative & Management Fee Abuse
        </h2>
        <p className="mt-3 text-gray-700">
          Many leases allow “reasonable” administrative or management fees —
          but do not clearly define what reasonable means.
        </p>
        <p className="mt-2 text-gray-700">
          We regularly see admin fees of 10–20% layered on top of CAM costs,
          sometimes applied to expenses that should never carry overhead.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
          <li>Management fees applied to capital projects</li>
          <li>Admin fees charged on insurance or taxes</li>
          <li>Fees exceeding lease caps (or with no cap at all)</li>
        </ul>
      </section>

      {/* SECTION 3 */}
      <section>
        <h2 className="text-2xl font-semibold">
          Improper Capital Expenditures
        </h2>
        <p className="mt-3 text-gray-700">
          CAM is intended to cover operating expenses — not long-term property
          improvements.
        </p>
        <p className="mt-2 text-gray-700">
          However, tenants are often charged for capital items that should be
          excluded, amortized, or capped.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
          <li>Roof replacements passed through as CAM</li>
          <li>HVAC upgrades billed in a single year</li>
          <li>Parking lot or structural work improperly allocated</li>
        </ul>
      </section>

      {/* SECTION 4 */}
      <section>
        <h2 className="text-2xl font-semibold">
          Insurance & Tax Pass-Through Issues
        </h2>
        <p className="mt-3 text-gray-700">
          Insurance and real estate taxes are often the fastest-growing NNN
          components, especially during periods of market volatility.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
          <li>Premium increases not limited by lease language</li>
          <li>Tenant charged for landlord-level coverage</li>
          <li>Taxes reassessed after purchase or refinance</li>
        </ul>
      </section>

      {/* SECTION 5 */}
      <section>
        <h2 className="text-2xl font-semibold">
          Pro-Rata Share & Allocation Errors
        </h2>
        <p className="mt-3 text-gray-700">
          Your share of CAM and NNN expenses should be calculated using a
          specific formula defined in your lease.
        </p>
        <p className="mt-2 text-gray-700">
          We frequently find allocation math that favors the landlord —
          intentionally or not.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
          <li>Incorrect rentable square footage</li>
          <li>Vacant space allocated to tenants</li>
          <li>Common areas misclassified</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="rounded bg-gray-50 p-6">
        <h3 className="text-xl font-semibold">
          What This Means for You
        </h3>
        <p className="mt-3 text-gray-700">
          These issues rarely appear as a single large mistake. Instead, they
          accumulate quietly — a few thousand dollars here, a few percent
          there — until tenants are overpaying year after year.
        </p>
        <p className="mt-2 text-gray-700">
          Our audit helps you understand what your lease actually allows,
          identify potential overcharges, and decide whether it’s worth
          pursuing corrections.
        </p>

        <a
          href="/"
          className="mt-4 inline-block rounded bg-black px-5 py-2 text-white"
        >
          Upload a Lease for Review
        </a>
      </section>

      {/* FAQ SCHEMA (SEO) */}
      <FaqSchema
        faqs={[
          {
            question: "What are common CAM overcharges?",
            answer:
              "Common CAM overcharges include excessive administrative fees, capital expenses passed through improperly, insurance markups, and reconciliation errors.",
          },
          {
            question: "Can landlords overcharge NNN expenses?",
            answer:
              "Yes. NNN overcharges often occur due to misapplied taxes, insurance premiums, management fees, or incorrect pro-rata calculations.",
          },
          {
            question: "How often do CAM reconciliation errors occur?",
            answer:
              "CAM reconciliation errors are common because expenses are estimated throughout the year and later adjusted, often without tenant review.",
          },
        ]}
      />
    </div>
  );
}
