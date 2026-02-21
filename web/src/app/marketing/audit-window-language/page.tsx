import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Window Rights in Commercial Leases | CAM & NNN Deadlines",
  description:
    "Learn what audit window rights mean in commercial leases, how CAM and NNN dispute deadlines work, and what happens if tenants miss the window to challenge overcharges.",
  alternates: {
    canonical: "https://saveonlease.com/marketing/audit-window-language",
  },
};

export default function AuditWindowRightsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">

      {/* HERO */}
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Audit Window Rights in Commercial Leases — What Tenants Must Know
        </h1>

        <p className="mb-6 text-lg text-gray-700">
          Most commercial leases give tenants a limited period of time — often
          30 to 90 days — to dispute CAM and NNN charges after receiving a
          reconciliation statement.
        </p>

        <p className="mb-8 text-gray-700">
          These audit window rights determine whether tenants can challenge
          overcharges, incorrect allocations, or lease violations. Once the
          window closes, charges may become final — even if they were wrong.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload your lease to check your audit window (Free Preview)
        </Link>

        <p className="mt-3 text-xs text-gray-600">
          🔒 Secure & confidential • No subscription • Takes 2 minutes
        </p>
      </section>

      {/* WHAT IS AN AUDIT WINDOW */}
      <section className="mb-14">
        <h2 className="mb-4 text-3xl font-light tracking-tight">
          What Is an Audit Window?
        </h2>

        <p className="text-gray-700 leading-relaxed">
          An audit window is the time period defined in a commercial lease
          during which a tenant may review and dispute CAM reconciliation,
          operating expense allocations, tax pass-throughs, or insurance
          charges.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Audit windows typically begin when the landlord delivers the annual
          reconciliation statement. The clock starts then — not when the tenant
          notices a mistake.
        </p>
      </section>

      {/* TYPICAL DEADLINES */}
      <section className="mb-14">
        <h2 className="mb-4 text-3xl font-light tracking-tight">
          Typical CAM & NNN Audit Deadlines
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
          <li>30 days after reconciliation delivery</li>
          <li>60 days after statement receipt</li>
          <li>90 days in more tenant-friendly leases</li>
          <li>Occasionally 120 days in negotiated agreements</li>
        </ul>

        <p className="mt-4 text-gray-700 leading-relaxed">
          If no written dispute is delivered within the stated timeframe,
          landlords often argue that charges are deemed accepted.
        </p>
      </section>

      {/* WHAT HAPPENS IF MISSED */}
      <section className="mb-14">
        <h2 className="mb-4 text-3xl font-light tracking-tight">
          What Happens If the Audit Window Closes?
        </h2>

        <p className="text-gray-700 leading-relaxed">
          When the audit window expires, tenants may lose leverage to dispute
          CAM overcharges, allocation errors, or improper expense categories.
          Even clear mistakes can become difficult to reverse.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Because CAM and NNN charges recur annually, missed disputes compound
          over time — turning small errors into long-term financial exposure.
        </p>
      </section>

      {/* INTERNAL LINKS SECTION */}
      <section className="mb-16 space-y-4">
        <h2 className="text-3xl font-light tracking-tight">
          How Audit Windows Connect to CAM & NNN Reviews
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Audit rights are closely tied to{" "}
          <Link
            href="/marketing/cam-reconciliation"
            className="underline hover:text-black"
          >
            CAM reconciliation
          </Link>{" "}
          and broader{" "}
          <Link
            href="/marketing/commercial-lease-audit"
            className="underline hover:text-black"
          >
            commercial lease audits
          </Link>
          . Understanding both the deadline and the underlying lease language
          is critical before taking action.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="rounded-xl border bg-gray-50 p-8 text-center">
        <h2 className="mb-3 text-2xl font-semibold">
          Don’t Miss Your Audit Window
        </h2>

        <p className="mb-6 text-gray-700">
          A quick lease review can identify your audit deadline, highlight
          overcharge risks, and clarify what your lease allows you to dispute.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Check Your Audit Window Now
        </Link>
      </section>
    </main>
  );
}