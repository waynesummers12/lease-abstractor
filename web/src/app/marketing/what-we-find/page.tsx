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

{/* DOLLAR IMPACT */}
<div className="mt-20 border-t pt-16">
  <h2 className="text-4xl font-light tracking-tight">
    What CAM Errors Can Actually Cost
  </h2>

  <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-4xl">
    Even small miscalculations in CAM reconciliations can compound quickly.
    For example, a 7,500 sq ft retail tenant paying $6.50 per sq ft in CAM
    charges could see $3,000–$12,000 in avoidable exposure annually if
    administrative fees, capital expenses, or pro-rata allocations are
    applied incorrectly.
  </p>

  <p className="mt-4 text-gray-700 leading-relaxed max-w-4xl">
    Larger tenants may face significantly higher exposure — especially
    when audit windows close and overcharges continue year after year.
  </p>
</div>

{/* CASE EXAMPLE */}
<div className="mt-20 border-t pt-16">
  <h2 className="text-4xl font-light tracking-tight">
    Example: Retail Tenant CAM Overcharge Review
  </h2>

  <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-4xl">
    An 8,200 sq ft retail tenant in a multi-tenant shopping center was
    paying approximately $7.10 per sq ft in CAM charges. After reviewing
    the lease language and reconciliation statements, we identified:
  </p>

  <ul className="mt-6 list-disc pl-6 space-y-2 text-gray-700 marker:text-green-600 max-w-4xl">
    <li>15% administrative fees applied to insurance and tax categories not permitted by the lease</li>
    <li>Capital roof repairs billed in a single year instead of amortized</li>
    <li>Incorrect pro-rata allocation including vacant space</li>
  </ul>

  <p className="mt-6 text-gray-900 font-medium max-w-4xl">
    Estimated avoidable exposure: $11,400 in a single reconciliation year.
  </p>

  <p className="mt-4 text-gray-700 leading-relaxed max-w-4xl">
    The tenant was still within the 90-day audit window and was able to
    raise the discrepancies before the charges rolled into future years.
  </p>
</div>

{/* INTERNAL SEO LINKS */}
<div className="mt-20 border-t pt-16">
  <h2 className="text-4xl font-light tracking-tight">
    Learn More About CAM & NNN Lease Issues
  </h2>

  <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-4xl">
    Dive deeper into specific topics affecting commercial tenants:
  </p>

  <ul className="mt-6 space-y-3 text-gray-700 max-w-4xl">
    <li>
      <Link href="/marketing/cam-reconciliation" className="underline hover:text-black">
        CAM reconciliation errors and true-up statements
      </Link>
    </li>
    <li>
      <Link href="/marketing/nnn" className="underline hover:text-black">
        Understanding triple net (NNN) lease structures
      </Link>
    </li>
    <li>
      <Link href="/marketing/audit-window-deadlines" className="underline hover:text-black">
        Commercial lease audit window deadlines and dispute rights
      </Link>
    </li>
  </ul>
</div>

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
