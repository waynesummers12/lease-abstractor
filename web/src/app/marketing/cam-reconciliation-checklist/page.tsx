// web/src/app/marketing/cam-reconciliation-checklist/page.tsx

import Link from "next/link";

export const metadata = {
  title:
    "CAM Reconciliation Checklist — What Every Tenant Should Review (Before Paying)",
  description:
    "Use this CAM reconciliation checklist to identify overcharges, admin fee abuse, and calculation errors before audit deadlines expire.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      {/* HERO */}
      <header className="mb-14 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          CAM Reconciliation Checklist — What to Review Before You Pay
        </h1>

        <p className="mb-6 text-gray-600">
          Most CAM reconciliation statements contain errors — but tenants rarely
          know what to look for. This checklist walks through the most common
          overcharges and mistakes.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to check CAM charges automatically (Free Preview)
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          Secure · Private · No obligation · Takes 2–3 minutes
        </p>
      </header>

      {/* WHY A CHECKLIST */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Why CAM Reconciliation Needs a Checklist
        </h2>

        <p className="text-gray-700">
          CAM reconciliation statements are dense, rushed, and often delivered
          with short payment deadlines. Without a structured review, tenants
          unintentionally approve overcharges.
        </p>

        <p className="mt-4 text-gray-700">
          This checklist highlights the most common issues tenants miss.
        </p>
      </section>

      {/* CHECKLIST */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">
          CAM Reconciliation Checklist
        </h2>

        <div className="space-y-4 text-gray-700">
          <ChecklistItem text="Verify pro-rata share percentage" />
          <ChecklistItem text="Confirm total building square footage" />
          <ChecklistItem text="Check for non-allowable expenses" />
          <ChecklistItem text="Review CAM admin and management fees" />
          <ChecklistItem text="Look for capital expenditures passed through" />
          <ChecklistItem text="Validate expense caps and escalation limits" />
          <ChecklistItem text="Compare current year vs prior year totals" />
          <ChecklistItem text="Confirm reconciliation timing and audit window" />
        </div>

        <p className="mt-6 text-gray-700">
          If any item above is unclear, it’s worth reviewing your lease in
          detail — or automating the process.
        </p>
      </section>

      {/* COMMON ERRORS */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Common CAM Reconciliation Errors This Checklist Catches
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>Admin fees applied to excluded expenses</li>
          <li>Incorrect pro-rata calculations</li>
          <li>Capital repairs treated as CAM</li>
          <li>Expenses benefiting vacant space</li>
          <li>Charges outside the audit period</li>
        </ul>
      </section>

      {/* AUDIT WINDOW */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl font-semibold">
          Don’t Miss the CAM Audit Window
        </h2>

        <p className="text-gray-700">
          Most leases limit how long tenants have to dispute CAM charges —
          commonly 30 to 90 days after receiving a reconciliation.
        </p>

        <p className="mt-3 text-gray-700">
          Once that window closes, even incorrect charges may become final.
        </p>

        <Link
          href="/marketing/nnn-audit-rights"
          className="mt-4 inline-block text-sm font-semibold underline"
        >
          Learn about CAM & NNN audit rights →
        </Link>
      </section>

      {/* CTA */}
      <section className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
        <h3 className="mb-3 text-xl font-semibold">
          Skip the Manual Checklist — Automate It
        </h3>

        <p className="mb-6 text-gray-600">
          Our lease audit runs this entire checklist automatically, flags
          overcharges, and estimates what you could recover — before audit
          deadlines expire.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to run the checklist (Free Preview)
        </Link>

        <p className="mt-3 text-xs text-gray-500">
          Secure · Private · No obligation
        </p>
      </section>
    </main>
  );
}

/* ---------- CHECKLIST ITEM ---------- */

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded border border-gray-300 text-xs">
        ✓
      </span>
      <span>{text}</span>
    </div>
  );
}
