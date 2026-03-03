import Link from "next/link";

export default function RetailLeaseReconciliationHelpPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Retail Lease Reconciliation Help: Review CAM & NNN Charges Before You Overpay
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-3xl">
            Annual CAM reconciliations can contain administrative stacking,
            allocation errors, and capital expense pass-throughs. Retail
            tenants often discover discrepancies only after margins are
            impacted.
          </p>
          <p className="mt-4 text-slate-300 max-w-3xl">
            For a complete overview of retail lease risk, visit our <Link href="/marketing/retail-lease-hub" className="text-emerald-400 underline">Retail Lease Audit Hub</Link>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/app/step-1-upload"
              className="rounded-lg bg-emerald-500 px-6 py-3 text-center font-semibold text-white hover:bg-emerald-600"
            >
              Upload Your Lease
            </Link>
            <Link
              href="/marketing/cam-audit-checklist"
              className="rounded-lg border border-slate-400 px-6 py-3 text-center font-semibold text-white hover:bg-slate-800"
            >
              CAM Audit Checklist
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT IS RECONCILIATION */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">
          What Is a Retail Lease Reconciliation?
        </h2>
        <p className="mt-6 text-slate-700 max-w-3xl">
          A lease reconciliation is the annual comparison between estimated
          Common Area Maintenance (CAM), taxes, and insurance charges and the
          landlord’s actual incurred costs. If estimates were lower than actual
          expenses, tenants receive a true-up invoice.
        </p>
        <p className="mt-4 text-slate-700 max-w-3xl">
          Reviewing this statement carefully is critical — especially under a
          <Link href="/marketing/triple-net-lease" className="text-emerald-600 underline">triple net (NNN) lease structure</Link> — where tenants bear most property-related expenses.
        </p>
        <p className="mt-4 text-slate-700 max-w-3xl">
          You can explore broader retail exposure signals in our <Link href="/marketing/retail-lease-hub" className="text-emerald-600 underline">Retail Lease Audit Hub</Link>.
        </p>
      </section>

      {/* COMMON ISSUES */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900">
            Common Errors in Retail CAM Reconciliations
          </h2>

          <ul className="mt-8 space-y-4 text-slate-700 list-disc list-inside">
            <li>
              <Link href="/marketing/cam-admin-page" className="text-emerald-600 underline">
                Administrative fees exceeding lease caps
              </Link>
            </li>
            <li>Capital improvements improperly passed through</li>
            <li>Incorrect pro-rata share calculations</li>
            <li>Insurance cost markups</li>
            <li>Expense categories not permitted under lease language</li>
          </ul>

          <p className="mt-8 text-slate-700 max-w-3xl">
            Multi-location operators should evaluate reconciliations using a
            structured <Link href="/marketing/franchise-cam-audit" className="text-emerald-600 underline">portfolio CAM audit strategy</Link> to detect systemic overcharges across properties.
          </p>
        </div>
      </section>

      {/* ROI EXAMPLE */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">
          Reconciliation Risk Example
        </h2>

        <div className="mt-8 rounded-xl border border-slate-200 p-8">
          <p className="text-lg font-semibold text-slate-900">
            Example Scenario:
          </p>
          <p className="mt-4 text-slate-700">
            4 locations × $6,000 CAM discrepancy = <span className="font-bold text-emerald-600">$24,000 annual exposure</span>
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900">
            Retail Lease Reconciliation FAQ
          </h2>

          <div className="mt-8 space-y-8 text-slate-700">
            <div>
              <h3 className="font-semibold text-lg">
                Can tenants dispute CAM reconciliation charges?
              </h3>
              <p className="mt-2">
                Yes — most commercial leases define an <Link href="/marketing/nnn-audit-rights" className="text-emerald-600 underline">audit window</Link> (often 12–24 months) during which tenants may review and dispute improper allocations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                How quickly should a reconciliation be reviewed?
              </h3>
              <p className="mt-2">
                As soon as it is received. Delays may reduce leverage and risk
                missing audit deadlines.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Is a retail lease reconciliation review worth it?
              </h3>
              <p className="mt-2">
                Even modest discrepancies can justify a review. For multi-unit
                operators, small errors multiplied across sites often create
                meaningful financial impact. You may also review our <Link href="/marketing/commercial-lease-audit" className="text-emerald-600 underline">Commercial Lease Audit guide</Link> for a full risk assessment framework.
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
                  "name": "Can tenants dispute CAM reconciliation charges?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes — most commercial leases define an audit window during which tenants may review and dispute improper allocations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How quickly should a reconciliation be reviewed?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Reconciliations should be reviewed promptly to preserve leverage and avoid missing audit deadlines."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is a retail lease reconciliation review worth it?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Even modest discrepancies can justify a review, especially for multi-unit operators where small errors compound across sites."
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
            Review Your Retail Lease Before the Audit Window Closes
          </h2>
          <p className="mt-6 text-slate-300">
            Identify CAM and NNN discrepancies before your next reconciliation
            cycle.
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