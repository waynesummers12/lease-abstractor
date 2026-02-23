import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.saveonlease.com"),
  title:
    "Triple Net Lease (NNN Lease) Explained for Commercial Tenants | SaveOnLease",
  description:
    "What is a triple net lease (NNN lease)? Learn how property taxes, insurance, and CAM charges work — and how tenants can identify overcharges in commercial leases.",
  authors: [{ name: "SaveOnLease" }],
  alternates: {
    canonical: "https://www.saveonlease.com/marketing/triple-net-lease",
  },
  openGraph: {
    title:
      "Triple Net Lease (NNN Lease) Explained for Commercial Tenants",
    description:
      "Understand how NNN leases allocate taxes, insurance, and CAM expenses — and where tenants commonly overpay during reconciliation.",
    url: "https://www.saveonlease.com/marketing/triple-net-lease",
    siteName: "SaveOnLease",
    type: "article",
    images: [
      {
        url: "https://www.saveonlease.com/og-triple-net-lease.jpg",
        secureUrl:
          "https://www.saveonlease.com/og-triple-net-lease.jpg",
        width: 1200,
        height: 630,
        alt: "Triple Net Lease (NNN) explained for commercial tenants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Triple Net Lease (NNN Lease) Explained for Commercial Tenants",
    description:
      "Learn how NNN leases work and how to identify overcharges in CAM and operating expenses.",
    images: [
      "https://www.saveonlease.com/og-triple-net-lease.jpg",
    ],
  },
};

export default function TripleNetLeasePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does a triple net lease include?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A triple net lease includes property taxes, building insurance, and common area maintenance (CAM) expenses in addition to base rent."
        }
      },
      {
        "@type": "Question",
        "name": "Is a triple net lease good or bad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A triple net lease can offer lower base rent but higher cost variability since tenants are responsible for taxes, insurance, and maintenance expenses that may fluctuate annually."
        }
      },
      {
        "@type": "Question",
        "name": "How are NNN expenses reconciled?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NNN expenses are reconciled annually by comparing estimated operating expenses paid during the year to actual expenses incurred, with tenants either paying the difference or receiving a credit."
        }
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Triple Net Lease (NNN Lease) Explained for Commercial Tenants",
    "description": "Learn how triple net leases allocate property taxes, insurance, and CAM expenses — and how tenants can identify reconciliation errors and overcharges.",
    "author": {
      "@type": "Organization",
      "name": "SaveOnLease"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SaveOnLease",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.saveonlease.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.saveonlease.com/marketing/triple-net-lease"
    },
    "datePublished": "2026-02-22",
    "dateModified": "2026-02-22"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.saveonlease.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Marketing",
        "item": "https://www.saveonlease.com/marketing"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Triple Net Lease",
        "item": "https://www.saveonlease.com/marketing/triple-net-lease"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-light tracking-tight">
          What Is a Triple Net Lease (NNN Lease)?
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          A <strong>triple net lease (NNN lease)</strong> is a commercial lease structure
          in which the tenant pays base rent plus three additional categories of operating expenses:
          property taxes, building insurance, and{" "}
          <Link href="/marketing/common-area-maintenance" className="underline hover:text-black">
            common area maintenance (CAM)
          </Link>.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          NNN leases are common in retail, office, and industrial real estate. While they often
          appear straightforward, the actual cost structure can be significantly more complex.
          Tenants are responsible not only for fixed rent, but also for variable operating expenses
          that fluctuate annually and are reconciled against projected budgets.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Understanding how these expenses are calculated — and where allocation errors occur —
          is critical for commercial tenants seeking predictable occupancy costs.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Many tenant disputes do not originate from base rent, but from
          annual operating expense true‑ups. If you are reviewing year‑end
          statements, study common
          <Link
            href="/marketing/cam-reconciliation-errors"
            className="underline hover:text-black"
          >
            CAM reconciliation errors
          </Link>
          , including capital expense pass‑throughs, administrative fee markups,
          and pro‑rata allocation miscalculations.
        </p>
      </section>

      {/* ---------------- NNN CLUSTER CONTEXTUAL AUTHORITY ---------------- */}
      <section className="space-y-6 border-t pt-12 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Related Triple Net (NNN) Lease Risk Areas
        </h2>

        <p>
          While this page explains the structure of a triple net lease, most
          tenant disputes arise from how expenses are categorized, allocated,
          and reconciled over time.
        </p>

        <p>
          If you are reviewing operating expense increases, you should also
          understand how{" "}
          <Link
            href="/marketing/cam-reconciliation"
            className="underline hover:text-black"
          >
            CAM reconciliation
          </Link>{" "}
          works, what constitutes{" "}
          <Link
            href="/marketing/nnn-expenses-explained"
            className="underline hover:text-black"
          >
            allowable vs non‑allowable NNN expenses
          </Link>, and whether your lease includes enforceable{" "}
          <Link
            href="/marketing/cam-expense-caps"
            className="underline hover:text-black"
          >
            CAM expense caps
          </Link>.
        </p>

        <p>
          Tenants concerned about overbilling should review their{" "}
          <Link
            href="/marketing/nnn-audit-rights"
            className="underline hover:text-black"
          >
            NNN audit rights
          </Link>{" "}
          and follow a structured{" "}
          <Link
            href="/marketing/cam-audit-checklist"
            className="underline hover:text-black"
          >
            CAM audit checklist
          </Link>{" "}
          before the audit window closes.
        </p>
      </section>

      {/* CORE STRUCTURE */}
      <section className="space-y-6">
        <h2 className="text-3xl font-light tracking-tight">
          What Expenses Are Included in a Triple Net Lease?
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          The term “triple net” refers to the three primary expense categories passed through to tenants:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 pr-4">Expense Type</th>
                <th className="py-3 pr-4">What It Covers</th>
                <th className="py-3 pr-4">How It’s Calculated</th>
                <th className="py-3">Common Risk Area</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="py-3 pr-4 font-medium">Property Taxes</td>
                <td className="py-3 pr-4">Real estate taxes assessed on the building</td>
                <td className="py-3 pr-4">Tenant pays pro-rata share of total tax bill</td>
                <td className="py-3">Reassessments, vacancy allocation</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-4 font-medium">Insurance</td>
                <td className="py-3 pr-4">Landlord’s building insurance premiums</td>
                <td className="py-3 pr-4">Allocated by square footage percentage</td>
                <td className="py-3">Premium volatility, coverage changes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium">CAM (Maintenance)</td>
                <td className="py-3 pr-4">Shared area upkeep, utilities, landscaping, security, management</td>
                <td className="py-3 pr-4">Annual budget + year-end reconciliation</td>
                <td className="py-3">
                  <Link href="/marketing/cam-reconciliation-errors" className="underline hover:text-black">
                    Reconciliation errors
                  </Link>, capital pass-throughs
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* DETAILED BREAKDOWN */}
      <section className="space-y-6">
        <h2 className="text-3xl font-light tracking-tight">
          How Triple Net Charges Are Calculated
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          Most NNN leases allocate expenses based on the tenant’s <strong>pro-rata share</strong>
          of the total building square footage. If a tenant occupies 5,000 square feet
          in a 50,000 square foot building, their pro-rata share is 10%.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Each year, the landlord prepares a projected operating budget.
          Tenants pay estimated monthly installments based on that budget.
          At year-end, actual expenses are reconciled against projections.
          If expenses exceeded estimates, tenants pay the difference.
          If expenses were lower, tenants receive a credit.
        </p>
      </section>

      {/* EXAMPLE */}
      <section className="space-y-6">
        <h2 className="text-3xl font-light tracking-tight">
          Triple Net Lease Example: Total Occupancy Cost
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          Example for a 5,000 SF retail tenant:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed marker:text-green-600">
          <li>Base Rent: $25.00/SF = $125,000</li>
          <li>Property Taxes: $4.00/SF = $20,000</li>
          <li>Insurance: $1.00/SF = $5,000</li>
          <li>CAM: $6.00/SF = $30,000</li>
        </ul>

        <p className="text-lg text-gray-700 leading-relaxed">
          <strong>Total Occupancy Cost: $36.00/SF ($180,000 annually)</strong>
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          A 12% increase in CAM expenses would add $3,600 annually — without
          any change in base rent.
        </p>
      </section>

      {/* RISK SECTION */}
      <section className="space-y-6">
        <h2 className="text-3xl font-light tracking-tight">
          Where Tenants Commonly Overpay in NNN Leases
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed marker:text-green-600">
          <li>Capital improvements incorrectly passed through as operating expenses</li>
          <li>Administrative or management markups exceeding lease limits</li>
          <li>Vacant unit allocation increasing pro-rata burden</li>
          <li>Reconciliation timing outside audit windows</li>
          <li>Improper expense categorization</li>
        </ul>

        <p className="text-lg text-gray-700 leading-relaxed">
          These risks often become visible only during{" "}
          <Link href="/marketing/cam-reconciliation" className="underline hover:text-black">
            CAM reconciliation review
          </Link> or formal audit.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          For a detailed breakdown of billing mistakes landlords commonly make,
          review our dedicated guide on{" "}
          <Link
            href="/marketing/cam-reconciliation-errors"
            className="underline hover:text-black"
          >
            CAM reconciliation errors
          </Link>
          , including pro‑rata miscalculations, capital pass‑through violations,
          and administrative fee overages.
        </p>
      </section>

      {/* LEASE COMPARISON */}
      <section className="space-y-6">
        <h2 className="text-3xl font-light tracking-tight">
          Triple Net vs Gross vs Modified Gross Lease
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 pr-4">Lease Type</th>
                <th className="py-3 pr-4">Taxes</th>
                <th className="py-3 pr-4">Insurance</th>
                <th className="py-3 pr-4">CAM</th>
                <th className="py-3">Cost Volatility</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="py-3 pr-4 font-medium">Triple Net</td>
                <td className="py-3 pr-4">Tenant</td>
                <td className="py-3 pr-4">Tenant</td>
                <td className="py-3 pr-4">Tenant</td>
                <td className="py-3">High</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-4 font-medium">Modified Gross</td>
                <td className="py-3 pr-4">Shared</td>
                <td className="py-3 pr-4">Shared</td>
                <td className="py-3 pr-4">Shared</td>
                <td className="py-3">Moderate</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium">Gross Lease</td>
                <td className="py-3 pr-4">Landlord</td>
                <td className="py-3 pr-4">Landlord</td>
                <td className="py-3 pr-4">Landlord</td>
                <td className="py-3">Low</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* NEGOTIATION */}
      <section className="space-y-6">
        <h2 className="text-3xl font-light tracking-tight">
          Are Triple Net Lease Expenses Negotiable?
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          Many commercial tenants assume NNN terms are fixed.
          In practice, leases can often include:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed marker:text-green-600">
          <li>Annual expense caps</li>
          <li>Management fee limitations</li>
          <li>Exclusions for capital improvements</li>
          <li>Clear audit rights and review periods</li>
        </ul>
      </section>

      {/* NNN EXPENSE RECONCILIATION AUTHORITY SECTION */}
      <section className="space-y-6 border-t pt-12 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          How Triple Net Lease (NNN) Expense Reconciliation Works
        </h2>

        <p>
          A triple net lease (NNN) structure requires tenants to pay property taxes,
          insurance, and common area maintenance (CAM) expenses in addition to base rent.
          These expenses are estimated during the year and formally reconciled after year-end.
        </p>

        <p>
          During the reconciliation process, landlords compare projected operating expenses
          against actual costs. Tenants are billed for shortfalls — or occasionally credited
          for overpayments.
        </p>

        <p>
          Most overcharge disputes arise during{" "}
          <Link href="/marketing/cam-reconciliation" className="underline hover:text-black">
            CAM reconciliation
          </Link>{" "}
          when administrative fees, capital expenditures, or non-allowable expenses
          are incorrectly passed through under the NNN structure.
        </p>

        <p>
          If you are reviewing a reconciliation statement, you should also understand
          your{" "}
          <Link href="/marketing/nnn-audit-rights" className="underline hover:text-black">
            NNN audit rights
          </Link>{" "}
          and any applicable{" "}
          <Link href="/marketing/cam-expense-caps" className="underline hover:text-black">
            CAM expense caps
          </Link>{" "}
          defined in your lease.
        </p>

        <p>
          In practice, the financial risk of a triple net lease depends less on the
          base rent and more on how operating expenses are drafted, categorized,
          and reconciled over time.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-3xl font-light tracking-tight">
          Frequently Asked Questions About NNN Leases
        </h2>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <strong>What does a triple net lease include?</strong>
            <p>Property taxes, building insurance, and CAM expenses.</p>
          </div>

          <div>
            <strong>Is a triple net lease good or bad?</strong>
            <p>NNN leases can offer lower base rent but higher cost variability.</p>
          </div>

          <div>
            <strong>How are NNN expenses reconciled?</strong>
            <p>Through annual comparison of estimated vs actual operating expenses.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-8 border-t space-y-6">
        <h2 className="text-2xl font-light tracking-tight">
          Unsure How Your Triple Net Charges Are Calculated?
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          A structured lease review can identify allocation errors, non‑allowable expenses,
          and missed audit windows before they become financial disputes.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Upload Your Lease
        </Link>
      </section>

    </main>
    </>
  );
}