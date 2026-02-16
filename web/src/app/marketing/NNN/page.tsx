

// src/app/marketing/NNN/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://saveonlease.com"),
  title: "NNN Explained | What NNN Means in Commercial Real Estate",
  description:
    "NNN stands for triple net lease. Learn what NNN means in commercial real estate, how CAM, tax, and insurance charges work, and how tenants can prevent overcharges.",
  alternates: {
    canonical: "https://saveonlease.com/marketing/nnn",
  },
};

export default function NNNPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* HERO */}
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          NNN Explained — What NNN Means in Commercial Real Estate
        </h1>

        <p className="mb-6 text-lg text-gray-700 leading-relaxed">
          NNN stands for <strong>“triple net”</strong>. In commercial real estate,
          an NNN lease requires tenants to pay base rent plus property taxes,
          insurance, and <Link href="/marketing/common-area-maintenance" className="underline hover:text-black">Common Area Maintenance (CAM)</Link> charges.
        </p>

        <p className="mb-8 text-gray-700 leading-relaxed">
          While NNN leases are common in retail, office, and industrial properties,
          many tenants underestimate how these operating costs are calculated —
          and where errors or overcharges can occur.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Upload Lease to Review NNN Charges (Free Preview)
        </Link>
        <p className="mt-3 text-sm text-gray-600">
          Takes 2 minutes. No subscription. Secure & confidential.
        </p>
      </section>

      {/* WHAT DOES NNN MEAN */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          What Does NNN Mean?
        </h2>

        <p>
          In an NNN lease, tenants are responsible for three primary expense
          categories in addition to base rent:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>N</strong> — Property Taxes</li>
          <li><strong>N</strong> — Property Insurance</li>
          <li><strong>N</strong> — Common Area Maintenance (CAM)</li>
        </ul>

        <p>
          These costs are typically estimated monthly and reconciled annually
          through a <Link href="/marketing/cam-reconciliation" className="underline hover:text-black">CAM reconciliation</Link> process.
        </p>
      </section>

      {/* HOW NNN WORKS */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          How NNN Leases Work
        </h2>

        <p>
          Landlords estimate operating costs at the beginning of the year.
          Tenants pay monthly estimates. At year-end, actual expenses are
          calculated and compared against payments made.
        </p>

        <p>
          If expenses exceed estimates, tenants receive a reconciliation
          statement and may owe additional payment.
        </p>

        <p>
          Many disputes arise from <Link href="/marketing/cam-reconciliation-errors" className="underline hover:text-black">CAM reconciliation errors</Link>, improper allocations,
          or expenses exceeding lease-defined caps.
        </p>
      </section>

      {/* NNN VS GROSS */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          NNN vs Gross Lease
        </h2>

        <p>
          In a gross lease, operating expenses are typically bundled into rent.
          In an NNN lease, operating costs are separated and passed through
          directly to the tenant.
        </p>

        <p>
          This structure shifts operating cost risk from landlord to tenant.
          Learn more in our
          <Link href="/marketing/triple-net-lease-vs-gross" className="underline hover:text-black ml-1">
            NNN vs Gross Lease comparison
          </Link>.
        </p>
      </section>

      {/* FINANCIAL IMPACT */}
      <section className="mb-16 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Why Reviewing Your NNN Lease Matters
        </h2>

        <p>
          Even small allocation errors in an NNN lease can cost tenants
          $5,000–$50,000+ annually.
        </p>

        <p>
          Because NNN charges recur every year, unnoticed errors compound over
          time. Most leases also include
          <Link href="/marketing/audit-window-deadlines" className="underline hover:text-black ml-1">
            audit window deadlines
          </Link>
          that limit how long tenants have to dispute incorrect charges.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="rounded-2xl border bg-gray-50 p-8 text-center">
        <h2 className="text-2xl font-semibold">
          Review Your NNN Lease Before Costs Compound
        </h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          A tenant-focused lease review can identify CAM allocation issues,
          expense caps, and reconciliation errors before audit windows close.
        </p>
        <Link
          href="/app/step-1-upload"
          className="mt-6 inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Start Free NNN Lease Review
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
                name: "NNN",
                item: "https://saveonlease.com/marketing/nnn",
              },
            ],
          }),
        }}
      />
    </main>
  );
}