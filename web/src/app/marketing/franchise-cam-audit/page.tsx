import Link from "next/link";

export default function FranchiseCamAuditPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            CAM & NNN Lease Audits for Franchise & Multi-Location Operators
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-3xl">
            If you operate 3–50 locations, small lease errors multiply fast. SaveOnLease uses AI to identify CAM overcharges, admin fee inflation, and hidden pass-through costs across your portfolio. Operators in food & beverage sectors can review our <Link href="/marketing/burger-restaurant-lease-audit" className="text-emerald-400 underline">Burger Restaurant Lease Audit guide</Link> for vertical-specific risk insights.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/app/step-1-upload"
              className="rounded-lg bg-emerald-500 px-6 py-3 text-center font-semibold text-white hover:bg-emerald-600"
            >
              Upload a Lease
            </Link>
            <Link
              href="/marketing/cam-audit-checklist"
              className="rounded-lg border border-slate-400 px-6 py-3 text-center font-semibold text-white hover:bg-slate-800"
            >
              Download Audit Checklist
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">
          Why Franchise Tenants Are Most Exposed
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8 text-slate-700">
          <div>
            <h3 className="font-semibold text-lg">CAM Errors Multiply</h3>
            <p className="mt-3">
              A $12,000 annual CAM error across 8 locations becomes a $96,000 portfolio leak.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Inconsistent Lease Language</h3>
            <p className="mt-3">
              Different landlords. Different expense caps. Different admin fees. No standardized review.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Annual Reconciliation Surprises</h3>
            <p className="mt-3">
              True-ups spike unexpectedly due to insurance, tax, and capital expense pass-through adjustments.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900">
            How SaveOnLease Helps Franchise Operators
          </h2>
          <p className="mt-4 text-slate-700 max-w-3xl">
            Healthcare and urgent care operators managing multiple sites face similar exposure patterns. See our guidance on <Link href="/marketing/multi-location-medical-lease-risk" className="text-emerald-600 underline">multi-location healthcare lease risk</Link> to understand how expense leakage scales across outpatient portfolios.
          </p>
          <ul className="mt-8 space-y-4 text-slate-700 list-disc list-inside">
            <li>Identifies CAM caps and expense exclusions</li>
            <li>Flags administrative fee stacking</li>
            <li>Highlights capital improvement pass-through risks</li>
            <li>Calculates portfolio-wide exposure</li>
            <li>Generates audit-ready summary report</li>
          </ul>
          <p className="mt-6 text-slate-700">
            For structured reconciliation review steps, see our <Link href="/marketing/burger-restaurant-cam-reconciliation-checklist" className="text-emerald-600 underline">Burger Restaurant CAM Reconciliation Checklist</Link>. Understanding audit deadlines is also critical — review our <Link href="/marketing/burger-restaurant-lease-audit-rights" className="text-emerald-600 underline">Lease Audit Rights guide</Link>.
          </p>
        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">
          Portfolio Risk Multiplier
        </h2>
        <p className="mt-4 text-slate-700 max-w-3xl">
          Even modest lease errors compound quickly across multi-unit operators. Reviewing just one location is not enough — risk scales with every new site.
        </p>

        <div className="mt-10 rounded-xl border border-slate-200 p-8">
          <p className="text-lg font-semibold text-slate-900">
            Example:
          </p>
          <p className="mt-4 text-slate-700">
            10 locations × $8,500 average CAM discrepancy = <span className="font-bold text-emerald-600">$85,000 annual exposure</span>
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900">
            Franchise CAM Audit FAQs
          </h2>

          <div className="mt-8 space-y-8 text-slate-700">
            <div>
              <h3 className="font-semibold text-lg">
                What is a franchise CAM audit?
              </h3>
              <p className="mt-2">
                A franchise CAM audit reviews Common Area Maintenance (CAM), tax, insurance, and administrative charges across multiple leased locations to identify overcharges, cap violations, and improper expense allocations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Why are multi-location operators at higher risk?
              </h3>
              <p className="mt-2">
                Small discrepancies compound across sites. A modest annual error at one property can scale into significant portfolio-wide exposure when multiplied across 5, 10, or 20 locations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                How often should franchise tenants review CAM reconciliations?
              </h3>
              <p className="mt-2">
                CAM reconciliations should be reviewed annually, ideally within the audit window defined in the lease. Early review preserves leverage and maximizes recovery potential.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                What common errors are found in franchise NNN leases?
              </h3>
              <p className="mt-2">
                Common issues include uncapped administrative fees, capital improvement pass-throughs, incorrect pro-rata allocations, insurance markups, and expense stacking across shared centers. See detailed industry examples in our <Link href="/marketing/how-much-rent-should-a-burger-restaurant-pay" className="text-emerald-600 underline">Burger Restaurant Rent Benchmark guide</Link>.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                How much does a CAM audit cost?
              </h3>
              <p className="mt-2">
                CAM audit pricing depends on lease complexity and portfolio size, but most tenant reviews are modest compared to potential recovery. Even a single identified discrepancy often offsets the review cost. SaveOnLease offers transparent, fixed pricing per lease with no contingency surprises.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Can tenants recover past CAM overcharges?
              </h3>
              <p className="mt-2">
                In many cases, yes — if the lease audit window remains open. Most commercial leases define a specific period (often 12–24 months) during which tenants can dispute reconciliation charges and seek recovery of improper allocations.
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
                  "name": "What is a franchise CAM audit?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A franchise CAM audit reviews Common Area Maintenance (CAM), tax, insurance, and administrative charges across multiple leased locations to identify overcharges, cap violations, and improper expense allocations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why are multi-location operators at higher risk?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Small discrepancies compound across sites. A modest annual error at one property can scale into significant portfolio-wide exposure when multiplied across multiple locations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How often should franchise tenants review CAM reconciliations?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "CAM reconciliations should be reviewed annually within the audit window defined in the lease to preserve leverage and maximize recovery potential."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What common errors are found in franchise NNN leases?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Common issues include uncapped administrative fees, capital improvement pass-throughs, incorrect pro-rata allocations, insurance markups, and expense stacking across shared centers."
                  }
                }
                ,
                {
                  "@type": "Question",
                  "name": "How much does a CAM audit cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "CAM audit pricing depends on lease complexity and portfolio size, but most tenant reviews are modest compared to potential recovery. Even a single identified discrepancy often offsets the review cost. SaveOnLease offers transparent, fixed pricing per lease."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can tenants recover past CAM overcharges?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In many cases, yes — if the lease audit window remains open. Most commercial leases define a specific period during which tenants can dispute reconciliation charges and seek recovery of improper allocations."
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
            Protect Your Portfolio Before Your Next CAM Reconciliation
          </h2>
          <p className="mt-6 text-slate-300">
            Upload one lease today. Identify systemic risk across your entire franchise footprint.
          </p>
          <Link
            href="/app/step-1-upload"
            className="mt-8 inline-block rounded-lg bg-emerald-500 px-8 py-4 font-semibold text-white hover:bg-emerald-600"
          >
            Start Lease Review
          </Link>
        </div>
      </section>
    </main>
  );
}
