import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Check a Commercial Lease Overcharge | SaveOnLease",
  description:
    "Compare your lease, annual CAM or NNN statement, and payment records to investigate a possible commercial lease overcharge.",
  alternates: {
    canonical: "https://www.saveonlease.com/marketing/lease-overcharge",
  },
};

export default function LeaseOverchargePage() {
  return (
    <main className="mx-auto max-w-4xl space-y-12 px-6 py-16 text-slate-900">
      <section className="space-y-5">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          How to check a possible commercial lease overcharge
        </h1>
        <p className="text-lg text-slate-700">
          A higher CAM or NNN bill is a reason to investigate, but the amount
          alone does not prove an overcharge. Compare the lease and amendments,
          the annual statement, and the payments already credited. That
          comparison shows which figures can be checked now and which need
          supporting records.
        </p>
        <Link
          href="/app/step-1-upload"
          className="inline-block rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          Upload your lease for a free preview
        </Link>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Start with three documents</h2>
        <ol className="list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Lease and amendments:</strong> Find the expense definitions,
            exclusions, caps, allocation formula, review procedure, and any
            notice deadline.
          </li>
          <li>
            <strong>Annual statement:</strong> Record each expense category,
            your stated share, adjustments, and the balance requested.
          </li>
          <li>
            <strong>Payment records:</strong> Add the monthly estimates and
            other credits you actually paid, then compare them with the
            statement.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Where a mismatch may appear</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-700">
          <li>The statement uses a different tenant share or area than the lease specifies.</li>
          <li>A billed category may conflict with an exclusion or cap.</li>
          <li>An administrative fee may use the wrong base or rate.</li>
          <li>A capital project may be treated differently than the lease requires.</li>
          <li>Monthly estimates or other payments may be missing from the credits.</li>
          <li>A category may appear twice under different labels.</li>
        </ul>
        <p className="text-slate-700">
          Each item is a question to verify, not a conclusion. For example,
          if your records show $61,200 in estimates paid but the statement
          credits $56,100, the $5,100 difference deserves a records check.
          It may reflect a missing credit, a different billing period, or
          another adjustment.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Calculate only what the records support</h2>
        <p className="text-slate-700">
          Recheck visible arithmetic first: expense total, your share, any
          caps or exclusions that can be applied from the lease, and credits
          for payments made. Keep uncertain charges separate from confirmed
          calculation differences. Invoices, ledgers, area schedules, or
          amortization details may be needed before assigning a dollar impact.
        </p>
        <p className="text-slate-700">
          Our{" "}
          <Link href="/marketing/cam-reconciliation" className="text-emerald-800 underline">
            CAM reconciliation guide
          </Link>{" "}
          explains the annual statement, and the{" "}
          <Link href="/marketing/cam-audit-checklist" className="text-emerald-800 underline">
            review checklist
          </Link>{" "}
          helps organize the figures and records.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Check the lease&apos;s next-step procedure</h2>
        <p className="text-slate-700">
          If you need backup or want to raise a billing question, follow the
          lease&apos;s instructions for the recipient, delivery method, and
          timing. The right to inspect records and the deadline for an
          objection vary by agreement. If the deadline is close or the
          potential amount is material, consider a qualified attorney or
          accountant. Reading a report does not send a notice or preserve
          rights for you.
        </p>
        <Link href="/marketing/audit-window-deadlines" className="text-emerald-800 underline">
          Learn how to locate review and notice deadlines
        </Link>
      </section>

      <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-2xl font-semibold">Review your own documents</h2>
        <p className="mt-3 text-slate-700">
          SaveOnLease offers a free lease preview. You can add an annual CAM
          statement and supporting PDFs before checkout. The $49.99 report
          compares visible billing information with extracted lease terms
          and labels what still needs verification.
        </p>
        <Link
          href="/app/step-1-upload"
          className="mt-5 inline-block rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          Start with a free lease preview
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Related guides</h2>
        <ul className="list-disc space-y-2 pl-6 text-emerald-800">
          <li>
            <Link href="/marketing/cam-reconciliation-errors">
              CAM reconciliation questions to check
            </Link>
          </li>
          <li>
            <Link href="/marketing/non-allowable-cam-nnn-expenses">
              Compare billed expenses with lease exclusions
            </Link>
          </li>
          <li>
            <Link href="/marketing/triple-net-lease">
              Understand a triple net lease
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
