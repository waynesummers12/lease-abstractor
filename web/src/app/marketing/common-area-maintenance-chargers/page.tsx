

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://saveonlease.com"),
  title: "Common Area Maintenance Charges Explained | CAM in Commercial Leases",
  description:
    "Understand common area maintenance charges (CAM charges) in commercial leases, how they are calculated, common overcharges, reconciliation errors, and how tenants can protect themselves before audit deadlines close.",
  alternates: {
    canonical:
      "https://saveonlease.com/marketing/common-area-maintenance-charges",
  },
};

export default function CommonAreaMaintenanceChargesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* HERO */}
      <section className="mb-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">
          Common Area Maintenance Charges (CAM Charges) Explained
        </h1>

        <p className="mb-4 text-lg text-gray-700 leading-relaxed">
          Common area maintenance charges — often referred to as CAM charges —
          are recurring expenses passed through to tenants in many commercial
          leases. These charges cover the cost of operating and maintaining
          shared areas of a property.
        </p>

        <p className="text-gray-700 leading-relaxed">
          While CAM charges are standard in retail, office, and industrial
          leases, how they are defined and calculated can significantly impact
          a tenant’s total occupancy cost.
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
          What Are Common Area Maintenance Charges?
        </h2>

        <p>
          Common area maintenance charges include expenses related to shared
          spaces such as parking lots, landscaping, snow removal, lighting,
          security, utilities, and property management.
        </p>

        <p>
          These expenses are typically billed as{" "}
          <Link
            href="/marketing/cam-charges"
            className="underline hover:text-black"
          >
            CAM charges
          </Link>{" "}
          and reconciled annually through{" "}
          <Link
            href="/marketing/cam-reconciliation"
            className="underline hover:text-black"
          >
            CAM reconciliation
          </Link>
          .
        </p>
      </section>

      {/* HOW CAM CHARGES ARE CALCULATED */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          How CAM Charges Are Calculated
        </h2>

        <p>
          CAM charges are generally allocated based on a tenant’s pro-rata
          share of the building or center. If a tenant occupies 10% of the total
          rentable square footage, they may be responsible for 10% of common
          area maintenance costs.
        </p>

        <p>
          Errors can occur when square footage is miscalculated, vacant units
          are improperly included in allocations, or administrative fees exceed
          lease-defined caps.
        </p>
      </section>

      {/* COMMON OVERCHARGES */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Common CAM Overcharges & Errors
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Administrative or management fees exceeding lease caps</li>
          <li>Capital improvements billed as operating expenses</li>
          <li>Improper allocation of vacant space</li>
          <li>Duplicate or misclassified expenses</li>
        </ul>

        <p>
          These issues are frequently uncovered when reviewing{" "}
          <Link
            href="/marketing/cam-reconciliation-errors"
            className="underline hover:text-black"
          >
            CAM reconciliation errors
          </Link>
          .
        </p>
      </section>

      {/* FINANCIAL IMPACT */}
      <section className="mb-16 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Why Common Area Maintenance Charges Matter
        </h2>

        <p>
          Even small common area maintenance charge errors can cost tenants
          $5,000–$50,000+ annually. Because CAM charges recur every year,
          unnoticed errors compound over time.
        </p>

        <p>
          Most leases include strict{" "}
          <Link
            href="/marketing/audit-window-deadlines"
            className="underline hover:text-black"
          >
            audit window deadlines
          </Link>
          , limiting how long tenants have to dispute incorrect charges.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="rounded-2xl border bg-gray-50 p-8 text-center">
        <h2 className="text-2xl font-semibold">
          Review Your CAM Charges Before Deadlines Close
        </h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Upload your commercial lease to receive a tenant-first CAM & NNN
          audit summary identifying potential exposure and overcharges.
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
                name: "Common Area Maintenance Charges",
                item:
                  "https://saveonlease.com/marketing/common-area-maintenance-charges",
              },
            ],
          }),
        }}
      />
    </main>
  );
}