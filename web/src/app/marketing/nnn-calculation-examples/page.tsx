// web/src/app/marketing/nnn-calculation-examples/page.tsx

import Link from "next/link";

export const metadata = {
  title: "NNN Calculation Examples — How Triple Net Charges Are Actually Calculated",
  description:
    "Real-world NNN calculation examples showing how landlords calculate taxes, insurance, and CAM — and where tenants often overpay.",
};

export default function NNNCalculationExamplesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      {/* ---------- HERO ---------- */}
      <h1 className="text-4xl font-bold mb-4">
        NNN Calculation Examples (Plain English)
      </h1>

      <p className="text-gray-600 mb-8">
        Triple Net (NNN) charges look simple — until you see how they’re actually
        calculated. Below are real-world examples showing how NNN costs are
        passed to tenants, and where mistakes and overcharges commonly occur.
      </p>

      <Link
        href="/product/app/step-1-upload/upload"
        className="inline-block rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
      >
        Upload your lease to calculate your NNN charges
      </Link>

      <p className="mt-3 text-xs text-gray-500">
        🔒 Secure & private • No obligation • Takes 2–3 minutes
      </p>

      {/* ---------- SECTION ---------- */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          What Are NNN Charges?
        </h2>

        <p className="text-gray-700 mb-4">
          NNN (Triple Net) charges typically include:
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Property taxes</li>
          <li>Property insurance</li>
          <li>Common Area Maintenance (CAM)</li>
        </ul>

        <p className="text-gray-700 mt-4">
          Tenants usually pay their <strong>pro-rata share</strong> of these
          expenses based on leased square footage.
        </p>
      </section>

      {/* ---------- EXAMPLE 1 ---------- */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          Example 1: Simple NNN Calculation
        </h2>

        <div className="rounded-lg border p-5 bg-gray-50">
          <p className="font-semibold mb-2">Assumptions</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Total building size: 20,000 sq ft</li>
            <li>Your leased space: 2,000 sq ft</li>
            <li>Your pro-rata share: 10%</li>
            <li>Annual NNN expenses: $120,000</li>
          </ul>

          <p className="mt-4 font-semibold">Calculation</p>
          <p className="text-gray-700">
            $120,000 × 10% = <strong>$12,000 per year</strong>
          </p>

          <p className="text-gray-700">
            Monthly NNN charge: <strong>$1,000</strong>
          </p>
        </div>

        <p className="mt-4 text-gray-700">
          This is the clean version most tenants expect — but it’s rarely what
          actually happens.
        </p>
      </section>

      {/* ---------- EXAMPLE 2 ---------- */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          Example 2: NNN With CAM Admin Fees
        </h2>

        <div className="rounded-lg border p-5 bg-gray-50">
          <p className="font-semibold mb-2">Added detail</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>CAM portion: $60,000</li>
            <li>Admin fee: 15% of CAM</li>
          </ul>

          <p className="mt-4 text-gray-700">
            Admin fee added:
          </p>

          <p className="text-gray-700">
            $60,000 × 15% = <strong>$9,000</strong>
          </p>

          <p className="text-gray-700">
            New total expenses: <strong>$129,000</strong>
          </p>

          <p className="text-gray-700">
            Tenant share (10%): <strong>$12,900 per year</strong>
          </p>
        </div>

        <p className="mt-4 text-gray-700">
          Many leases cap or exclude admin fees — but they’re often added anyway.
        </p>
      </section>

      {/* ---------- EXAMPLE 3 ---------- */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          Example 3: NNN Errors That Inflate Costs
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Incorrect square footage used</li>
          <li>Double-counted expenses</li>
          <li>Non-allowable costs included</li>
          <li>Insurance or tax spikes passed through improperly</li>
          <li>Reconciliation math errors</li>
        </ul>

        <p className="mt-4 text-gray-700">
          Even small errors can add up to <strong>thousands per year</strong>,
          especially because NNN charges recur annually.
        </p>
      </section>

      {/* ---------- WHY TENANTS MISS THIS ---------- */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          Why Most Tenants Never Catch NNN Errors
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>NNN calculations are buried in spreadsheets</li>
          <li>Lease language is vague or outdated</li>
          <li>Audit windows are short (often 30–90 days)</li>
          <li>Landlords rarely volunteer corrections</li>
        </ul>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mt-20 rounded-xl border p-8 text-center bg-gray-50">
        <h3 className="text-2xl font-semibold mb-3">
          Want to See Your Actual NNN Calculation?
        </h3>

        <p className="text-gray-600 mb-6">
          Upload your lease and we’ll automatically analyze your NNN structure,
          calculations, and potential overcharges.
        </p>

        <Link
          href="/product/app/step-1-upload/upload"
          className="inline-block rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Check my NNN charges
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          🔒 Secure & private • No obligation • Takes 2–3 minutes
        </p>
      </section>
    </main>
  );
}
