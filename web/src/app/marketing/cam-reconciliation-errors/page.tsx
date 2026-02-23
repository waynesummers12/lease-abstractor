import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.saveonlease.com"),
  title:
    "CAM Reconciliation Errors | Common Area Maintenance Audit Guide for Tenants",
  description:
    "Learn the most common CAM reconciliation errors in commercial leases, how overcharges happen, and how tenants can identify billing violations before audit windows close.",
  alternates: {
    canonical:
      "https://www.saveonlease.com/marketing/cam-reconciliation-errors",
  },
  openGraph: {
    title:
      "CAM Reconciliation Errors | Common Area Maintenance Audit Guide",
    description:
      "Discover the most common CAM reconciliation errors in NNN leases and how tenants can dispute overcharges before deadlines expire.",
    url: "https://www.saveonlease.com/marketing/cam-reconciliation-errors",
    siteName: "SaveOnLease",
    type: "article",
  },
};

export default function CamReconciliationErrorsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-light tracking-tight">
          CAM Reconciliation Errors Tenants Should Watch For
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          CAM reconciliation errors are one of the most common sources of
          overcharges in commercial leases. Under a
          <Link
            href="/marketing/triple-net-lease"
            className="underline hover:text-black"
          >
            triple net (NNN) lease
          </Link>
          , annual Common Area Maintenance (CAM) true‑ups can materially impact
          your total occupancy cost.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          If you do not review your reconciliation carefully — and within your
          <Link
            href="/marketing/nnn-audit-rights"
            className="underline hover:text-black"
          >
            audit rights window
          </Link>
          — you may permanently lose the ability to challenge improper charges.
        </p>
      </section>

      {/* HOW ERRORS HAPPEN */}
      <section className="space-y-6">
        <h2 className="text-2xl font-light tracking-tight">
          How CAM Reconciliation Errors Happen
        </h2>

        <p className="text-gray-700 leading-relaxed">
          CAM reconciliation compares estimated monthly CAM payments against
          actual expenses incurred during the year. Errors typically occur
          because of allocation mistakes, lease interpretation issues, or
          structural billing practices that favor the landlord.
        </p>

        <p className="text-gray-700 leading-relaxed">
          In many cases, overcharges are not obvious — they are embedded within
          pro‑rata calculations, capital pass‑throughs, or administrative fee
          layering.
        </p>
      </section>

      {/* COMMON ERRORS */}
      <section className="space-y-8">
        <h2 className="text-2xl font-light tracking-tight">
          Most Common CAM Reconciliation Errors
        </h2>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h3 className="text-lg font-medium">
              1. Incorrect Pro‑Rata Share Calculations
            </h3>
            <p>
              Your pro‑rata share determines what percentage of total CAM you
              pay. Miscalculations often stem from incorrect building square
              footage assumptions or improper vacancy allocations.
              See
              <Link
                href="/marketing/pro-rata-share-explained"
                className="underline hover:text-black"
              >
                pro‑rata share explained
              </Link>
              .
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">
              2. Capital Expenditures Passed Through as Operating Expenses
            </h3>
            <p>
              Landlords may include capital improvements (roof replacements,
              structural upgrades, parking lot reconstruction) inside CAM.
              Many leases prohibit this unless amortized properly.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">
              3. Management & Administrative Fee Overages
            </h3>
            <p>
              Administrative fees are often capped or narrowly defined. CAM
              statements frequently exceed negotiated caps or apply fees to
              ineligible expense categories.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">
              4. Vacancy Allocation Errors
            </h3>
            <p>
              In multi‑tenant buildings, vacant space should not increase the
              financial burden on active tenants beyond lease allowances.
              Improper vacancy allocation can significantly inflate charges.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">
              5. Duplicate Charges Across CAM & NNN Categories
            </h3>
            <p>
              Expenses may be double‑counted under CAM and property tax or
              insurance line items. Careful reconciliation review is required
              to detect these overlaps.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">
              6. Charges Outside Lease‑Defined Allowable Categories
            </h3>
            <p>
              Some leases narrowly define allowable CAM expenses. Billing for
              non‑allowable categories violates the lease agreement.
            </p>
          </div>
        </div>
      </section>

      {/* FINANCIAL IMPACT */}
      <section className="space-y-6">
        <h2 className="text-2xl font-light tracking-tight">
          Financial Impact of CAM Reconciliation Errors
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Even small percentage misallocations can translate into thousands —
          or tens of thousands — of dollars over multi‑year lease terms.
          Tenants often focus on base rent negotiations while overlooking CAM
          structure risk.
        </p>

        <p className="text-gray-700 leading-relaxed">
          A formal
          <Link
            href="/marketing/commercial-lease-audit"
            className="underline hover:text-black"
          >
            commercial lease audit
          </Link>
          can identify cap violations, improper expense pass‑throughs, and
          allocation discrepancies before dispute windows expire.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 p-8 rounded-xl space-y-4">
        <h2 className="text-2xl font-light tracking-tight">
          Review Your CAM Reconciliation Before It’s Too Late
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Upload your lease and reconciliation documents to identify potential
          CAM and NNN overcharges before your audit window closes.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition"
        >
          Upload Your Lease
        </Link>
      </section>
      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a CAM reconciliation error?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A CAM reconciliation error occurs when a landlord miscalculates or improperly allocates Common Area Maintenance expenses in a commercial lease, resulting in overcharges to tenants."
                }
              },
              {
                "@type": "Question",
                name: "Can tenants dispute CAM reconciliation charges?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Most commercial leases include audit rights allowing tenants to review and dispute CAM reconciliation charges within a specific time window."
                }
              },
              {
                "@type": "Question",
                name: "What are common CAM overcharges?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Common CAM overcharges include capital improvements passed through as operating expenses, inflated administrative fees, incorrect pro-rata share calculations, and duplicate billing."
                }
              },
              {
                "@type": "Question",
                name: "How long do tenants have to audit CAM charges?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Audit windows vary by lease, but tenants typically have 6–12 months after receiving a reconciliation statement to initiate a dispute."
                }
              }
            ]
          })
        }}
      />
    </main>
  );
}