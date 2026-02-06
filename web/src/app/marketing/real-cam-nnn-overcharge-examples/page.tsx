import Link from "next/link";

export const metadata = {
  title:
    "Real CAM & NNN Overcharge Examples | What Commercial Tenants Commonly Miss",
  description:
    "Real-world examples of CAM and NNN overcharges tenants encounter in commercial leases, including admin fees, tax spikes, insurance pass-throughs, and reconciliation surprises.",
};

export default function RealCamNnnExamplesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 space-y-12">
      {/* HERO */}
      <section>
        <h1 className="text-5xl sm:text-6xl font-light tracking-tight leading-tight">
          Real CAM & NNN Overcharge Examples Tenants Encounter
        </h1>
        <p className="mt-6 text-xl text-gray-700 leading-relaxed">
          Many tenants don’t realize there’s a problem until CAM or NNN charges
          jump unexpectedly. The examples below reflect common situations
          tenants report — situations that often feel confusing, frustrating,
          or simply unfair.
        </p>
      </section>

      {/* SECTION 1 */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Example 1: “My CAM Went Up, But Nothing Changed”
        </h2>

        <p>
          A retail tenant reviewed their annual reconciliation and saw CAM
          charges increase more than 15% year over year. Landscaping, snow
          removal, and cleaning services appeared unchanged, yet costs rose
          significantly.
        </p>

        <p>
          The issue wasn’t obvious at first. Only after reviewing the details
          did the tenant notice a growing administrative fee layered on top of
          standard expenses — something their lease limited, but never enforced.
        </p>
      </section>

      {/* SECTION 2 */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Example 2: Sudden NNN Tax Spikes After Reassessment
        </h2>

        <p>
          An office tenant received a large, unexpected tax bill as part of
          their NNN charges following a property reassessment. The increase
          added thousands of dollars annually with little advance warning.
        </p>

        <p>
          While property taxes are often a legitimate NNN expense, many tenants
          don’t realize reassessments can dramatically increase obligations —
          especially when leases lack caps or base-year protections.
        </p>
      </section>

      {/* SECTION 3 */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Example 3: Insurance Costs Passed Through Without Explanation
        </h2>

        <p>
          A tenant noticed insurance costs increasing sharply year over year,
          even though no claims were made related to their space. The lease
          allowed insurance pass-throughs, but didn’t clearly explain how
          premiums were allocated.
        </p>

        <p>
          In some cases, tenants end up subsidizing risks unrelated to their
          operations — something that often goes unnoticed without a careful
          review.
        </p>
      </section>

      {/* SECTION 4 */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Example 4: Capital Improvements Treated as Operating Expenses
        </h2>

        <p>
          One tenant discovered they were paying for major property upgrades
          through CAM charges — costs that should have been amortized or
          excluded entirely under the lease.
        </p>

        <p>
          Because reconciliation statements often combine many expense
          categories, these charges can blend in unless tenants know exactly
          what to look for.
        </p>
      </section>

      {/* WHEN THIS CROSSES THE LINE */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          When These Charges Cross the Line
        </h2>

        <p>
          Not every increase is improper. However, problems arise when charges
          exceed lease definitions, ignore negotiated caps, include landlord
          overhead, or shift long-term ownership costs onto tenants.
        </p>

        <p>
          If CAM or NNN charges feel inconsistent, unusually high, or difficult
          to reconcile with the lease language, it’s often a sign they deserve
          closer scrutiny.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-gray-50 p-8 text-center">
        <h3 className="text-2xl font-semibold">
          Think your situation sounds familiar?
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-gray-700">
          Upload your lease to identify CAM and NNN risks, flag potential
          overcharges, and understand what your lease actually allows.
        </p>
        <Link
          href="/app/step-1-upload"
          className="mt-6 inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Upload Your Lease & Check Now (Free Preview)
        </Link>
      </section>
    </main>
  );
}
