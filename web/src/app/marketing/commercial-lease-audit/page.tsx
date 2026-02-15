

import Link from "next/link";

export const metadata = {
  title: "Commercial Lease Audit for Tenants | Identify CAM & NNN Overcharges",
  description:
    "Commercial lease audit for tenants. Identify CAM, NNN, and reconciliation overcharges before audit windows close. See how much exposure may be avoidable.",
};

export default function CommercialLeaseAuditPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      {/* ---------------- HERO ---------------- */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">
          Commercial Lease Audit for Tenants
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          A <strong>commercial lease audit</strong> reviews your lease language
          and annual CAM / NNN charges to determine whether costs were billed
          correctly — and whether avoidable overcharges exist.
        </p>

        <p className="text-lg text-gray-700">
          For many small and mid-sized commercial tenants, lease audit reviews
          uncover $5,000–$50,000+ in annual exposure tied to administrative
          fees, allocation errors, and improperly passed-through expenses.
        </p>
      </section>

      {/* ---------------- WHAT IS A LEASE AUDIT ---------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          What Is a Commercial Lease Audit?
        </h2>

        <p className="text-gray-700 mb-4">
          A commercial lease audit compares:
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>The lease’s defined CAM / NNN language</li>
          <li>Expense caps and exclusions</li>
          <li>Pro-rata allocation methodology</li>
          <li>Annual CAM reconciliation statements</li>
          <li>Administrative and management fees</li>
        </ul>

        <p className="text-gray-700 mt-4">
          The goal is simple: confirm whether the charges match what the lease
          actually allows.
        </p>
      </section>

      {/* ---------------- WHY TENANTS NEED ONE ---------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Why Commercial Tenants Often Need a Lease Audit
        </h2>

        <p className="text-gray-700 mb-4">
          Commercial leases are complex. CAM (Common Area Maintenance) and NNN
          (triple net) structures frequently include:
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Broad expense definitions</li>
          <li>Vague capital expenditure language</li>
          <li>Management fee markups</li>
          <li>Allocation changes over time</li>
          <li>Limited audit windows (30–90 days)</li>
        </ul>

        <p className="text-gray-700 mt-4">
          Without reviewing the lease language against the reconciliation
          statement, overcharges can compound year after year.
        </p>
      </section>

      {/* ---------------- COMMON FINDINGS ---------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Common Findings in Commercial Lease Audits
        </h2>

        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Administrative Fees Above Lease Caps</strong> – Many leases
            cap admin fees at 10–15%, yet higher percentages are sometimes
            applied.
          </p>

          <p>
            <strong>Improper Capital Improvements</strong> – Structural or
            long-term upgrades passed through as operating expenses.
          </p>

          <p>
            <strong>Allocation Errors</strong> – Incorrect square footage or
            pro-rata share calculations.
          </p>

          <p>
            <strong>Duplicate Charges</strong> – Expenses appearing in both CAM
            and NNN categories.
          </p>
        </div>
      </section>

      {/* ---------------- FINANCIAL CONSEQUENCE ---------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Why Timing Matters
        </h2>

        <p className="text-gray-700 mb-4">
          Most leases include a limited{" "}
          <Link
            href="/marketing/audit-window-deadlines"
            className="underline hover:text-black"
          >
            audit window
          </Link>{" "}
          — often 30 to 90 days after receiving the reconciliation statement.
        </p>

        <p className="text-gray-700">
          If that window closes, leverage decreases. Reviewing your lease
          before the deadline preserves your ability to dispute improper
          charges.
        </p>
      </section>

      {/* ---------------- INTERNAL LINKS ---------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Related Guides
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <Link
              href="/marketing/cam-reconciliation"
              className="underline hover:text-black"
            >
              CAM Reconciliation Explained
            </Link>
          </li>
          <li>
            <Link
              href="/marketing/cam-reconciliation-errors"
              className="underline hover:text-black"
            >
              Common CAM Reconciliation Errors
            </Link>
          </li>
          <li>
            <Link
              href="/marketing/lease-overcharge"
              className="underline hover:text-black"
            >
              How Lease Overcharges Happen
            </Link>
          </li>
        </ul>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="bg-gray-50 border rounded-xl p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Not Sure If Your Lease Was Billed Correctly?
        </h2>

        <p className="text-gray-700 mb-6">
          Upload your commercial lease for a tenant-focused review of CAM /
          NNN language, caps, exclusions, and reconciliation exposure.
        </p>

        <Link
          href="/app"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Upload Your Lease
        </Link>

        <p className="mt-4 text-sm text-gray-600">
          Takes 2 minutes. No subscription. Secure & confidential.
        </p>
      </section>
    </main>
  );
}