import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://saveonlease.com"),
  title: "Lease CAM Explained | Common Area Maintenance in Commercial Leases",
  description:
    "Understand Lease CAM (Common Area Maintenance), how CAM charges work in commercial leases, common overcharges, reconciliation errors, and how tenants can protect themselves before audit deadlines close.",
  alternates: {
    canonical: "https://saveonlease.com/marketing/lease-cam",
  },
};

export default function LeaseCamPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* HERO */}
      <section className="mb-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">
          Lease CAM Explained — What Common Area Maintenance Means for Tenants
        </h1>

        <p className="mb-4 text-lg text-gray-700 leading-relaxed">
          Lease CAM refers to Common Area Maintenance charges included in many
          commercial leases. These are recurring operating expenses passed
          through to tenants for maintaining shared areas of a property.
        </p>

        <p className="text-gray-700 leading-relaxed">
          CAM provisions in a lease determine what expenses are allowed, how
          they are allocated, and whether caps or exclusions apply. In broader
          <Link
            href="/marketing/cam-commercial-real-estate"
            className="underline hover:text-black"
          >
            commercial real estate CAM structures
          </Link>,
          small drafting or allocation errors can lead to significant recurring
          overcharges.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Lease CAM terms often interact with{" "}
          <Link href="/marketing/cam-vs-nnn" className="underline hover:text-black">
            CAM vs NNN structures
          </Link>{" "}
          and broader{" "}
          <Link href="/marketing/nnn-lease" className="underline hover:text-black">
            NNN lease obligations
          </Link>
          , which determine how operating expenses are ultimately allocated.
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

      {/* WHAT IS LEASE CAM */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          What Is Lease CAM?
        </h2>
        <p>
          In commercial real estate, lease CAM defines how tenants contribute
          to shared property expenses such as landscaping, parking lot
          maintenance, snow removal, lighting, security, and management fees.
        </p>
        <p>
          These charges are often referred to as {" "}
          <Link href="/marketing/cam-charges" className="underline hover:text-black">
            CAM charges
          </Link>{" "}
          and are typically reconciled annually through {" "}
          <Link href="/marketing/cam-reconciliation" className="underline hover:text-black">
            CAM reconciliation
          </Link>
          .
        </p>
        <p>
          For a broader definition of shared property expenses, see our guide to{" "}
          <Link href="/marketing/common-area-maintenance" className="underline hover:text-black">
            Common Area Maintenance (CAM)
          </Link>{" "}
          in commercial real estate.
        </p>
      </section>

      {/* HOW LEASE CAM IS STRUCTURED */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          How Lease CAM Is Structured in a Commercial Lease
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Definition of allowable CAM expenses</li>
          <li>Exclusions (capital improvements, landlord overhead, marketing)</li>
          <li>Administrative fee caps</li>
          <li>Pro-rata allocation formula</li>
          <li>Annual reconciliation procedures</li>
        </ul>
        <p>
          Whether a CAM charge is valid depends entirely on the lease language.
          Misinterpretation of {" "}
          <Link href="/marketing/cam-fee-meaning" className="underline hover:text-black">
            CAM fee meaning
          </Link>{" "}
          often leads to disputes and unnecessary payments.
        </p>
      </section>

      {/* COMMON LEASE CAM ISSUES */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Common Lease CAM Issues
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Admin fees exceeding lease-defined caps</li>
          <li>Improper allocation of vacant space</li>
          <li>Capital improvements treated as operating expenses</li>
          <li>Duplicate or misclassified expenses</li>
        </ul>
        <p>
          These issues frequently surface when reviewing {" "}
          <Link href="/marketing/cam-reconciliation-errors" className="underline hover:text-black">
            CAM reconciliation errors
          </Link>
          .
        </p>
      </section>

      {/* FINANCIAL CONSEQUENCES */}
      <section className="mb-16 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Why Lease CAM Matters Financially
        </h2>
        <p>
          Even small lease CAM allocation errors can cost tenants
          $5,000–$50,000+ annually. Because these charges recur every year,
          unnoticed errors compound over time.
        </p>
        <p>
          Most leases include strict {" "}
          <Link href="/marketing/audit-window-deadlines" className="underline hover:text-black">
            audit window deadlines
          </Link>
          , limiting how long tenants have to dispute CAM overcharges.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="rounded-2xl border bg-gray-50 p-8 text-center">
        <h2 className="text-2xl font-semibold">
          Review Your Lease CAM Before Audit Windows Close
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
                name: "Lease CAM",
                item: "https://saveonlease.com/marketing/lease-cam",
              },
            ],
          }),
        }}
      />
    </main>
  );
}