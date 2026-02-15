

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://saveonlease.com"),
  title: "CAM Charges Explained | What Commercial Tenants Actually Pay",
  description:
    "Understand CAM charges in commercial leases, what is included, how they are calculated, common overcharges, and how tenants can protect themselves before audit deadlines close.",
  alternates: {
    canonical: "https://saveonlease.com/marketing/cam-charges",
  },
};

export default function CamChargesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* HERO */}
      <section className="mb-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">
          CAM Charges Explained — What Commercial Tenants Actually Pay
        </h1>

        <p className="mb-4 text-lg text-gray-700 leading-relaxed">
          CAM charges (Common Area Maintenance charges) are recurring operating
          expenses passed through to tenants in many commercial leases.
          These charges often include maintenance, utilities, insurance,
          landscaping, management fees, and other shared property costs.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Many tenants accept CAM charges without reviewing whether they are
          calculated correctly or permitted by the lease — and small errors can
          compound year after year.
        </p>

        <Link
          href="/app/step-1-upload"
          className="mt-8 inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Upload Lease (Free Preview)
        </Link>
        <p className="mt-3 text-sm text-gray-600">
          Takes 2 minutes. No subscription. Secure & confidential.
        </p>
      </section>

      {/* WHAT ARE CAM CHARGES */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          What Are CAM Charges?
        </h2>
        <p>
          CAM charges cover the cost of maintaining shared areas of a commercial
          property. In retail centers and office buildings, this may include
          parking lot repairs, snow removal, landscaping, janitorial services,
          lighting, and security.
        </p>
        <p>
          In many leases — especially triple net (NNN) leases — CAM charges are
          billed separately from base rent and reconciled annually through
          <Link href="/marketing/cam-reconciliation" className="ml-1 underline hover:text-black">
            CAM reconciliation
          </Link>.
        </p>
      </section>

      {/* WHAT IS INCLUDED */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          What Is Typically Included in CAM Charges?
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Landscaping and grounds maintenance</li>
          <li>Parking lot repairs and striping</li>
          <li>Snow removal</li>
          <li>Exterior lighting and utilities</li>
          <li>Security services</li>
          <li>Property management or administrative fees</li>
        </ul>
        <p>
          However, not all expenses are automatically allowed. Whether a charge
          is valid depends on how the lease defines allowable CAM expenses and
          whether caps or exclusions apply.
        </p>
      </section>

      {/* HOW CAM IS CALCULATED */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          How CAM Charges Are Calculated
        </h2>
        <p>
          CAM charges are typically allocated based on a tenant’s pro-rata share
          of the building or center. If your lease states you occupy 10% of the
          total square footage, you may be responsible for 10% of CAM expenses.
        </p>
        <p>
          Errors can occur when square footage is miscalculated, vacant space is
          improperly allocated, or administrative fees exceed lease-defined
          limits.
        </p>
      </section>

      {/* COMMON OVERCHARGES */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Common CAM Overcharges
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Admin or management fees exceeding caps</li>
          <li>Capital improvements billed as operating expenses</li>
          <li>Improper allocation of vacant units</li>
          <li>Duplicate charges across CAM and NNN categories</li>
          <li>Non-allowable expenses passed through</li>
        </ul>
        <p>
          These types of errors are frequently discovered during
          <Link href="/marketing/cam-reconciliation-errors" className="ml-1 underline hover:text-black">
            CAM reconciliation reviews
          </Link>.
        </p>
      </section>

      {/* FINANCIAL IMPACT */}
      <section className="mb-16 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Why CAM Charges Matter Financially
        </h2>
        <p>
          Even small CAM allocation errors can cost tenants $5,000–$50,000+
          annually. Because CAM charges recur every year, unnoticed errors
          compound over time.
        </p>
        <p>
          Most leases also include strict
          <Link href="/marketing/audit-window-deadlines" className="ml-1 underline hover:text-black">
            audit window deadlines
          </Link>,
          which limit how long tenants have to dispute incorrect charges.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="rounded-2xl border bg-gray-50 p-8 text-center">
        <h2 className="text-2xl font-semibold">
          Review Your CAM Charges Before Audit Windows Close
        </h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Upload your commercial lease and receive a tenant-first CAM & NNN
          audit summary identifying potential overcharges and exposure.
        </p>
        <Link
          href="/app/step-1-upload"
          className="mt-6 inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Upload Lease (Free Preview)
        </Link>
      </section>

      {/* BREADCRUMB SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://saveonlease.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "CAM Charges",
                item: "https://saveonlease.com/marketing/cam-charges",
              },
            ],
          }),
        }}
      />
    </main>
  );
}