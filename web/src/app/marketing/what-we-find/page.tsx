import FaqSchema from "@/app/components/FaqSchema";
import Link from "next/link";

export default function WhatWeFindPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-16">
      
      {/* HERO */}
      <section className="max-w-3xl">
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

      {/* FINDINGS GRID */}
      <section className="grid gap-8 md:grid-cols-2">
        
        {/* CARD */}
        <div className="rounded-xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold">CAM Reconciliation Errors</h2>
          <p className="mt-3 text-gray-700">
            CAM charges are usually estimated throughout the year, then “trued up”
            in a reconciliation statement — one of the most error-prone parts of a lease.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
            <li>Expenses charged outside CAM definitions</li>
            <li>Duplicate line items year over year</li>
            <li>Costs shifted between properties</li>
            <li>Late reconciliations after audit windows close</li>
          </ul>
        </div>

        <div className="rounded-xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Administrative & Management Fee Abuse
          </h2>
          <p className="mt-3 text-gray-700">
            Many leases allow “reasonable” admin fees — without defining what
            reasonable actually means.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
            <li>10–20% admin fees layered onto CAM</li>
            <li>Fees applied to insurance or taxes</li>
            <li>Charges exceeding lease caps</li>
          </ul>
        </div>

        <div className="rounded-xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Improper Capital Expenditures
          </h2>
          <p className="mt-3 text-gray-700">
            CAM is intended for operating expenses — not long-term improvements.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
            <li>Roof replacements passed through as CAM</li>
            <li>HVAC upgrades billed in a single year</li>
            <li>Structural work improperly allocated</li>
          </ul>
        </div>

        <div className="rounded-xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Insurance & Tax Pass-Through Issues
          </h2>
          <p className="mt-3 text-gray-700">
            Insurance and taxes are often the fastest-growing NNN components.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
            <li>Premium increases not limited by lease language</li>
            <li>Tenant charged for landlord-level coverage</li>
            <li>Taxes reassessed after purchase or refinance</li>
          </ul>
        </div>

        <div className="rounded-xl border p-6 shadow-sm md:col-span-2">
          <h2 className="text-xl font-semibold">
            Pro-Rata Share & Allocation Errors
          </h2>
          <p className="mt-3 text-gray-700">
            Your CAM and NNN share must follow a specific formula defined in your lease.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
            <li>Incorrect rentable square footage</li>
            <li>Vacant space allocated to tenants</li>
            <li>Common areas misclassified</li>
          </ul>
        </div>

      </section>

      {/* CTA STRIP */}
      <section className="rounded-xl bg-black p-8 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h3 className="text-2xl font-semibold text-white">
  These issues add up quietly —
  <span className="block text-gray-300">
    until they’re expensive
  </span>
</h3>
          <p className="mt-2 text-gray-300 max-w-xl">
            A few thousand dollars here, a few percent there — year after year.
            Our audit shows what your lease actually allows.
          </p>
        </div>
        <Link
          href="/app/step-1-upload"
          className="inline-block rounded bg-white px-6 py-3 text-black font-medium hover:bg-gray-100 transition"
        >
          Upload Lease (Free Preview)
        </Link>
      </section>

      {/* WHAT THIS MEANS */}
      <section className="rounded-xl bg-gray-50 p-8 max-w-3xl">
        <h3 className="text-xl font-semibold">
          What This Means for You
        </h3>
        <p className="mt-3 text-gray-700">
          These issues rarely appear as a single large mistake. Instead, they
          accumulate quietly — until tenants are overpaying year after year.
        </p>
        <p className="mt-2 text-gray-700">
          Our audit helps you decide whether it’s worth pursuing corrections
          before audit windows close.
        </p>
      </section>

      {/* FAQ SCHEMA */}
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
