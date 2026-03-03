import Link from "next/link";

export const metadata = {
  title: "Burger Restaurant Lease Audit Hub | SaveOnLease",
  description:
    "Central resource for burger franchisees and multi-unit operators reviewing CAM, NNN, and lease overcharges.",
};

export default function BurgerLeaseHubPage() {
  return (
    <main className="bg-white">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Burger Restaurant Lease Audit Hub
        </h1>

        <p className="mt-4 text-lg text-gray-600 max-w-3xl">
          A complete resource center for franchisees and multi-unit burger operators
          reviewing CAM, NNN, and total occupancy risk.
        </p>

        {/* Primary Pillar */}
        <div className="mt-12 p-8 border rounded-xl bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-900">
            Start Here: Full Lease Audit Overview
          </h2>
          <p className="mt-3 text-gray-700">
            Understand portfolio exposure, common overcharges, and audit deadlines.
          </p>
          <Link
            href="/marketing/burger-restaurant-lease-audit"
            className="inline-block mt-4 text-indigo-600 font-medium hover:underline"
          >
            Burger Restaurant Lease Audit →
          </Link>
        </div>

        {/* Knowledge Grid */}
        <div className="mt-14 grid md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              NNN Explained for Burgers
            </h3>
            <p className="mt-2 text-gray-600">
              How triple net leases impact taxes, insurance, and CAM.
            </p>
            <Link
              href="/marketing/nnn-for-burger-restaurants"
              className="inline-block mt-3 text-indigo-600 hover:underline"
            >
              View Guide →
            </Link>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              CAM Reconciliation Checklist
            </h3>
            <p className="mt-2 text-gray-600">
              Structured review steps before your audit window closes.
            </p>
            <Link
              href="/marketing/burger-restaurant-cam-reconciliation-checklist"
              className="inline-block mt-3 text-indigo-600 hover:underline"
            >
              View Checklist →
            </Link>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              Lease Audit Rights
            </h3>
            <p className="mt-2 text-gray-600">
              Understand dispute deadlines and audit clauses.
            </p>
            <Link
              href="/marketing/burger-restaurant-lease-audit-rights"
              className="inline-block mt-3 text-indigo-600 hover:underline"
            >
              View Rights Guide →
            </Link>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              Rent Benchmarks
            </h3>
            <p className="mt-2 text-gray-600">
              Target occupancy ratios (6–10%) and high-risk thresholds.
            </p>
            <Link
              href="/marketing/how-much-rent-should-a-burger-restaurant-pay"
              className="inline-block mt-3 text-indigo-600 hover:underline"
            >
              View Rent Guide →
            </Link>
          </div>
        </div>

        {/* Franchise Angle */}
        <div className="mt-16 p-8 bg-indigo-50 border border-indigo-200 rounded-xl">
          <h2 className="text-xl font-semibold text-indigo-900">
            Franchise & Multi-Unit Exposure
          </h2>
          <p className="mt-3 text-indigo-800">
            If you operate multiple locations, small discrepancies compound fast.
          </p>
          <Link
            href="/marketing/burger-franchise-lease-overcharges"
            className="inline-block mt-4 text-indigo-700 font-medium hover:underline"
          >
            Burger Franchise Overcharges →
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 space-y-6 text-gray-700">
            <div>
              <h3 className="font-semibold">
                What percentage of revenue should burger restaurants spend on rent?
              </h3>
              <p className="mt-2">
                Most operators target 6–10% of gross revenue for total occupancy
                cost. Higher ratios may indicate lease structure or CAM issues.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                How often do CAM overcharges occur in burger franchises?
              </h3>
              <p className="mt-2">
                3–7% discrepancies are commonly identified during structured
                reconciliation reviews, especially in multi-unit portfolios.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                How long do franchisees have to challenge CAM charges?
              </h3>
              <p className="mt-2">
                Most leases define audit windows between 30 and 120 days after
                reconciliation statements are issued.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What percentage of revenue should burger restaurants spend on rent?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Most operators target 6–10% of gross revenue for total occupancy cost. Higher ratios may indicate lease structure or CAM issues."
                  }
                },
                {
                  "@type": "Question",
                  name: "How often do CAM overcharges occur in burger franchises?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "3–7% discrepancies are commonly identified during structured reconciliation reviews, especially in multi-unit portfolios."
                  }
                },
                {
                  "@type": "Question",
                  name: "How long do franchisees have to challenge CAM charges?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Most leases define audit windows between 30 and 120 days after reconciliation statements are issued."
                  }
                }
              ]
            })
          }}
        />

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/app/step-1-upload"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Upload Your Lease — Results in ~10 Seconds
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Secure. No subscription required.
          </p>
        </div>
      </section>
    </main>
  );
}