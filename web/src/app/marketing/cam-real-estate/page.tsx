

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://saveonlease.com"),
  title: "CAM in Real Estate Explained | Common Area Maintenance Charges for Tenants",
  description:
    "Understand CAM in real estate, how common area maintenance charges are calculated, and how commercial tenants can identify overcharges before audit windows close.",
  alternates: {
    canonical: "/marketing/cam-real-estate",
  },
};

export default function CamRealEstatePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* HERO */}
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          CAM in Real Estate — What Common Area Maintenance Really Means for Tenants
        </h1>

        <p className="mb-6 text-lg text-gray-700">
          In commercial real estate, CAM (Common Area Maintenance) refers to the
          operating expenses landlords pass through to tenants for maintaining
          shared areas of a property.
        </p>

        <p className="mb-8 text-gray-700">
          These costs can significantly increase total occupancy expense — and
          are often misunderstood or improperly allocated. Reviewing CAM in
          real estate leases is one of the most overlooked ways tenants lose
          money.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload Lease to Review CAM Exposure (Free Preview)
        </Link>
        <p className="mt-3 text-xs text-gray-600">
          Takes 2 minutes. No subscription. Secure & confidential.
        </p>
      </section>

      {/* WHAT IS CAM IN REAL ESTATE */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          What Is CAM in Real Estate?
        </h2>

        <p>
          In real estate, CAM covers expenses related to maintaining common
          areas of a property such as parking lots, landscaping, lighting,
          security, snow removal, and shared utilities.
        </p>

        <p>
          CAM is most common in <Link href="/marketing/triple-net-lease" className="underline hover:text-black">triple net (NNN) leases</Link>,
          where tenants pay base rent plus their proportionate share of
          operating costs.
        </p>

        <p>
          These charges are often labeled as <Link href="/marketing/common-area-maintenance-charges" className="underline hover:text-black">common area maintenance charges</Link> and
          are typically reconciled annually through a
          <Link href="/marketing/cam-reconciliation" className="underline hover:text-black"> CAM reconciliation</Link> process.
        </p>
      </section>

      {/* HOW CAM IS CALCULATED */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          How CAM Is Calculated in Commercial Real Estate
        </h2>

        <p>
          Landlords estimate CAM expenses at the beginning of the year.
          Tenants pay monthly estimates. At year-end, actual expenses are
          calculated and compared against what was collected.
        </p>

        <p>
          If actual expenses exceed estimates, tenants receive a reconciliation
          statement and may owe additional payment.
        </p>

        <p>
          Errors commonly arise in allocation percentages, admin fee markups,
          and inclusion of non-allowable expenses — often surfacing during
          reviews of <Link href="/marketing/cam-reconciliation-errors" className="underline hover:text-black">CAM reconciliation errors</Link>.
        </p>
      </section>

      {/* WHY IT MATTERS FINANCIALLY */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Why CAM in Real Estate Matters Financially
        </h2>

        <p>
          Even small allocation errors in CAM can cost tenants thousands of
          dollars annually.
        </p>

        <p>
          Because CAM charges recur every year, unnoticed overcharges compound
          over time. Audit windows — often 30 to 90 days — limit how long
          tenants have to dispute charges.
        </p>

        <p>
          Understanding <Link href="/marketing/audit-window-deadlines" className="underline hover:text-black">audit window deadlines</Link>
          before they expire preserves negotiation leverage.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="rounded-xl border bg-gray-50 p-8 text-center">
        <h2 className="mb-3 text-2xl font-semibold">
          Review Your CAM Exposure Before the Deadline
        </h2>

        <p className="mb-6 text-gray-700">
          A tenant-focused lease review can identify avoidable CAM exposure and
          clarify what your lease actually allows.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Start Free CAM Review
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
                name: "Learn",
                item: "https://saveonlease.com/marketing/learn",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "CAM in Real Estate",
                item: "https://saveonlease.com/marketing/cam-real-estate",
              },
            ],
          }),
        }}
      />
    </main>
  );
}