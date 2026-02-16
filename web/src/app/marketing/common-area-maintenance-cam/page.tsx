import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://saveonlease.com"),
  title: "Common Area Maintenance (CAM) Explained | Commercial Lease Guide",
  description:
    "Understand Common Area Maintenance (CAM) in commercial leases, how CAM charges are structured, common overcharges, reconciliation errors, and tenant audit rights.",
  alternates: {
    canonical:
      "https://saveonlease.com/marketing/common-area-maintenance-cam",
  },
};

export default function CommonAreaMaintenanceCamPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* HERO */}
      <section className="mb-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">
          Common Area Maintenance (CAM) Explained for Commercial Tenants
        </h1>

        <p className="mb-4 text-lg text-gray-700 leading-relaxed">
          Common Area Maintenance (CAM) refers to the shared operating expenses
          passed through to tenants in many commercial leases. These charges
          typically cover maintenance, landscaping, utilities, security,
          parking lots, and property management costs.
        </p>

        <p className="text-gray-700 leading-relaxed">
          CAM language in a lease determines what is included, how expenses are
          allocated, and whether caps or exclusions apply. In broader
          <Link
            href="/marketing/cam-real-estate"
            className="underline hover:text-black"
          >
            real estate CAM structures
          </Link>,
          small drafting or calculation errors can lead to recurring
          overcharges.
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

      {/* WHAT IS CAM */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          What Is Common Area Maintenance (CAM)?
        </h2>

        <p>
          Common Area Maintenance expenses include the costs required to
          operate and maintain shared areas of a property. In retail centers
          and office buildings, this may include snow removal, lighting,
          landscaping, exterior repairs, and janitorial services.
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

      {/* HOW CAM IS STRUCTURED */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          How CAM Is Structured in Commercial Leases
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Definition of allowable CAM expenses</li>
          <li>Exclusions (capital improvements, landlord overhead)</li>
          <li>Administrative fee caps</li>
          <li>Pro-rata allocation formula</li>
          <li>Annual reconciliation process</li>
        </ul>

        <p>
          Misinterpretation of{" "}
          <Link
            href="/marketing/cam-fee-meaning"
            className="underline hover:text-black"
          >
            CAM fee meaning
          </Link>{" "}
          and improper expense classification frequently lead to disputes and
          unnecessary payments.
        </p>
      </section>

      {/* COMMON CAM ISSUES */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Common CAM Errors & Overcharges
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Administrative fees exceeding lease-defined caps</li>
          <li>Improper allocation of vacant space</li>
          <li>Capital improvements billed as operating expenses</li>
          <li>Duplicate expense classifications</li>
        </ul>

        <p>
          These issues are often discovered when reviewing{" "}
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
          Why CAM Matters Financially
        </h2>

        <p>
          Even minor allocation errors can cost tenants $5,000–$50,000+
          annually. Because CAM expenses recur every year, unnoticed errors
          compound over time.
        </p>

        <p>
          Most leases include strict{" "}
          <Link
            href="/marketing/audit-window-deadlines"
            className="underline hover:text-black"
          >
            audit window deadlines
          </Link>
          , limiting how long tenants have to dispute overcharges.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="rounded-2xl border bg-gray-50 p-8 text-center">
        <h2 className="text-2xl font-semibold">
          Review Your CAM Provisions Before Deadlines Close
        </h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Upload your commercial lease to receive a tenant-first CAM & NNN
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
                name: "Common Area Maintenance (CAM)",
                item:
                  "https://saveonlease.com/marketing/common-area-maintenance-cam",
              },
            ],
          }),
        }}
      />
    </main>
  );
}