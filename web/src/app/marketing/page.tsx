// web/src/app/marketing/page.tsx

import Link from "next/link";

export default function MarketingIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* HERO */}
      <div className="text-center mb-20">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Understand Your Lease Before It Costs You
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          SaveOnLease analyzes your commercial lease in three clear steps to
          identify CAM & NNN overcharges, uncapped expenses, and audit risk.
        </p>
      </div>

      {/* STEPS */}
      <div className="grid gap-10 md:grid-cols-3">
        {/* STEP 1 */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <div className="mb-4 text-sm font-semibold text-gray-500">
            Step 1
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Upload Your Lease
          </h3>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li>• Commercial lease PDF</li>
            <li>• Amendments & exhibits supported</li>
            <li>• No formatting required</li>
          </ul>
        </div>

        {/* STEP 2 */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <div className="mb-4 text-sm font-semibold text-gray-500">
            Step 2
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Automated Analysis
          </h3>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li>• CAM definitions & exclusions</li>
            <li>• Admin & management fee limits</li>
            <li>• Insurance & tax pass-throughs</li>
            <li>• Pro-rata share calculations</li>
          </ul>
        </div>

        {/* STEP 3 */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <div className="mb-4 text-sm font-semibold text-gray-500">
            Step 3
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Review Your Results
          </h3>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li>• Plain-English explanations</li>
            <li>• Risk flags & recommendations</li>
            <li>• Downloadable audit summary</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Ready to see what your lease really allows?
        </h2>

        <Link
          href="/product/app"
          className="mt-6 inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Start Lease Audit
        </Link>
      </div>
    </div>
  );
}

