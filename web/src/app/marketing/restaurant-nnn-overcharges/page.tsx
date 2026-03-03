import Link from "next/link";

export default function RestaurantNNNOverchargesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Restaurant NNN Lease Overcharges: Hidden CAM Costs That Hurt Margins
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-3xl">
            Restaurant operators are uniquely exposed to inflated CAM charges,
            admin fee stacking, and capital expense pass-throughs. Even small
            discrepancies can erode already tight operating margins.
          </p>
          <p className="mt-4 text-lg text-slate-300 max-w-3xl">
            If you are unfamiliar with how NNN structures allocate taxes, insurance, and CAM, review our foundational guide to the <Link href="/marketing/triple-net-lease" className="underline hover:text-white">triple net (NNN) lease structure</Link> before analyzing reconciliation discrepancies.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/app"
              className="rounded-lg bg-emerald-500 px-6 py-3 text-center font-semibold text-white hover:bg-emerald-600"
            >
              Upload Your Lease
            </Link>
            <Link
              href="/marketing/franchise-cam-audit"
              className="rounded-lg border border-slate-400 px-6 py-3 text-center font-semibold text-white hover:bg-slate-800"
            >
              Franchise CAM Audit Guide
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">
          Why Restaurants Are Vulnerable to NNN Overcharges
        </h2>

        <div className="mt-8 grid md:grid-cols-3 gap-8 text-slate-700">
          <div>
            <h3 className="font-semibold text-lg">High CAM Allocation</h3>
            <p className="mt-3">
              Restaurants typically occupy prime retail frontage, increasing
              exposure to shared maintenance, landscaping, security, and
              marketing fees.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Thin Profit Margins</h3>
            <p className="mt-3">
              A modest annual reconciliation spike can materially impact cash
              flow in food service operations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Frequent Build-Out Costs</h3>
            <p className="mt-3">
              Landlords may attempt to pass through capital improvements under
              CAM language that exceeds lease allowances.
            </p>
          </div>
        </div>
      </section>

      {/* COMMON ERRORS */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900">
            Common NNN Lease Errors Found in Restaurants
          </h2>
          <p className="mt-6 text-slate-700 max-w-3xl">
            Many of these issues stem from how expenses are defined within the broader <Link href="/marketing/triple-net-lease" className="underline hover:text-black">triple net lease framework</Link>, particularly in retail centers where allocations are shared across tenants.
          </p>
          <ul className="mt-8 space-y-4 text-slate-700 list-disc list-inside">
            <li>Administrative fee percentages exceeding lease caps</li>
            <li>Capital improvement expenses improperly allocated</li>
            <li>Incorrect pro-rata share calculations</li>
            <li>Insurance premium markups</li>
            <li>Marketing fund duplication or stacking</li>
          </ul>

          <p className="mt-8 text-slate-700 max-w-3xl">
            Multi-unit restaurant operators should treat lease review as a
            structured <Link href="/marketing/franchise-cam-audit" className="text-emerald-600 underline">portfolio CAM audit strategy</Link>,
            comparing expense structures across locations to detect systemic
            leakage.
          </p>
        </div>
      </section>

      {/* ROI EXAMPLE */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">
          Margin Impact Example
        </h2>

        <div className="mt-8 rounded-xl border border-slate-200 p-8">
          <p className="text-lg font-semibold text-slate-900">
            Example Scenario:
          </p>
          <p className="mt-4 text-slate-700">
            6 locations × $7,500 average CAM discrepancy = <span className="font-bold text-emerald-600">$45,000 annual margin erosion</span>
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900">
            Restaurant NNN Lease FAQ
          </h2>

          <div className="mt-8 space-y-8 text-slate-700">
            <div>
              <h3 className="font-semibold text-lg">
                What are NNN charges in restaurant leases?
              </h3>
              <p className="mt-2">
                NNN (triple net) charges typically include property taxes,
                insurance, and Common Area Maintenance expenses passed through
                by the landlord.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Can restaurants dispute CAM reconciliation charges?
              </h3>
              <p className="mt-2">
                Yes — most leases provide a defined audit window during which
                tenants can review and dispute improper expense allocations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                How much can NNN overcharges impact a restaurant?
              </h3>
              <p className="mt-2">
                Even a few thousand dollars per year can materially impact
                profitability due to tight operating margins in food service.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                How much does a restaurant NNN audit cost — and is it worth it?
              </h3>
              <p className="mt-2">
                Most restaurant lease reviews are modest compared to the potential recovery. Even one identified CAM discrepancy can offset the review cost. For multi-location operators, small errors multiplied across sites often make a structured audit financially compelling.
              </p>
            </div>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What are NNN charges in restaurant leases?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "NNN (triple net) charges typically include property taxes, insurance, and Common Area Maintenance expenses passed through by the landlord."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can restaurants dispute CAM reconciliation charges?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes — most leases provide a defined audit window during which tenants can review and dispute improper expense allocations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much can NNN overcharges impact a restaurant?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Even a few thousand dollars per year can materially impact profitability due to tight operating margins in food service."
                  }
                }
                ,
                {
                  "@type": "Question",
                  "name": "How much does a restaurant NNN audit cost — and is it worth it?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most restaurant lease reviews are modest compared to the potential recovery. Even one identified CAM discrepancy can offset the review cost. For multi-location operators, small errors multiplied across sites often make a structured audit financially compelling."
                  }
                }
              ]
            })
          }}
        />
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold">
            Protect Your Restaurant Margins
          </h2>
          <p className="mt-6 text-slate-300">
            Upload one lease to identify hidden NNN and CAM risks before your
            next reconciliation cycle.
          </p>
          <Link
            href="/app"
            className="mt-8 inline-block rounded-lg bg-emerald-500 px-8 py-4 font-semibold text-white hover:bg-emerald-600"
          >
            Start Lease Review
          </Link>
        </div>
      </section>
    </main>
  );
}