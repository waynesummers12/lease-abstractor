// web/src/app/marketing/nnn-reconciliation/page.tsx

import Link from "next/link";

export const metadata = {
  title: "NNN Reconciliation Explained — How Tenants Spot Errors & Overcharges",
  description:
    "NNN reconciliation determines what tenants truly owe for taxes, insurance, and maintenance. Learn how errors happen, what to check, and how to challenge overcharges.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      {/* HERO */}
      <header className="mb-14 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          NNN Reconciliation Explained — How Tenants Spot Errors & Overcharges
        </h1>

        <p className="mb-6 text-gray-600">
          Most commercial tenants overpay NNN charges — not because they agreed
          to them, but because reconciliation statements are confusing, opaque,
          and rarely reviewed line by line.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to check NNN overcharges
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          Secure & private · No obligation · Takes 2–3 minutes
        </p>
      </header>

      {/* WHAT IS NNN RECONCILIATION */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          What Is NNN Reconciliation?
        </h2>

        <p className="text-gray-700">
          NNN reconciliation is the annual process landlords use to “true up”
          what tenants paid in estimated NNN charges versus what the landlord
          claims was actually spent.
        </p>

        <ol className="mt-4 list-decimal space-y-2 pl-5 text-gray-700">
          <li>Landlord estimates NNN costs for the year</li>
          <li>Tenant pays estimated NNN monthly</li>
          <li>Actual expenses are totaled at year-end</li>
          <li>A reconciliation statement is issued</li>
          <li>Tenant is billed for any difference</li>
        </ol>

        <p className="mt-4 text-gray-700">
          This reconciliation is often where errors — and overcharges — appear.
        </p>
      </section>

      {/* WHY ERRORS HAPPEN */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Why NNN Reconciliation Errors Are So Common
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Manual spreadsheets and inconsistent calculations</li>
          <li>Incorrect pro-rata share or square footage</li>
          <li>Expenses included that are excluded by the lease</li>
          <li>Insurance or tax increases passed through improperly</li>
          <li>Admin or management fees layered into NNN</li>
        </ul>

        <p className="mt-4 text-gray-700">
          Because NNN charges recur every year, even small errors can compound
          into significant overpayments over time.
        </p>
      </section>

      {/* WHAT TENANTS SHOULD CHECK */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          What Tenants Should Review in an NNN Reconciliation
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Pro-rata share calculation</li>
          <li>Square footage assumptions</li>
          <li>Included vs excluded expense categories</li>
          <li>Insurance and tax increases</li>
          <li>Consistency with lease language</li>
        </ul>

        <p className="mt-4 text-gray-700">
          Many tenants assume reconciliation statements are non-negotiable —
          but that’s rarely true.
        </p>
      </section>

      {/* AUDIT RIGHTS */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Do Tenants Have the Right to Audit NNN Charges?
        </h2>

        <p className="text-gray-700">
          Most commercial leases grant tenants audit rights, typically within a
          limited window (often 30–90 days) after receiving a reconciliation.
        </p>

        <p className="mt-3 text-gray-700">
          If that window closes, overcharges may become final — even if they are
          incorrect.
        </p>

        <Link
          href="/marketing/nnn-audit-rights"
          className="mt-4 inline-block text-sm font-semibold text-black underline"
        >
          Learn about NNN audit rights →
        </Link>
      </section>

      {/* CTA BOX */}
      <section className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
        <h3 className="mb-3 text-xl font-semibold">
          Check Your NNN Reconciliation Before It’s Too Late
        </h3>

        <p className="mb-6 text-gray-600">
          A quick lease review can uncover NNN overcharges, reconciliation
          errors, and audit deadlines you may be approaching.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to review NNN charges
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          Secure · Private · No obligation
        </p>
      </section>
    </main>
  );
}
