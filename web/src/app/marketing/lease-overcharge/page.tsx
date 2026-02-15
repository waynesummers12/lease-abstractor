

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commercial Lease Overcharge | What Tenants Can Do About CAM & NNN Billing Errors",
  description:
    "Think your landlord overcharged you? Learn how CAM and NNN lease overcharges happen, what tenants can challenge, and how to review your lease before audit windows close.",
  alternates: {
    canonical: "https://saveonlease.com/marketing/lease-overcharge",
  },
};

export default function LeaseOverchargePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 space-y-12">
      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-light tracking-tight">
          Commercial Lease Overcharge: What Tenants Can Do
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          A <strong>commercial lease overcharge</strong> often happens during
          CAM or NNN reconciliation — when landlords finalize annual operating
          expenses and bill tenants for the difference.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Many tenants assume these charges are correct. In reality, billing
          errors, cap violations, and improper expense allocations are more
          common than most realize.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Upload Your Lease (Free Preview)
        </Link>
      </section>

      {/* HOW OVERCHARGES HAPPEN */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          How Lease Overcharges Happen
        </h2>

        <ul className="list-disc pl-6 space-y-3 marker:text-green-600">
          <li>Incorrect pro-rata share calculations</li>
          <li>Administrative fees exceeding lease-defined caps</li>
          <li>Capital improvements billed as operating expenses</li>
          <li>Vacant unit costs allocated to active tenants</li>
          <li>Duplicate CAM and NNN charges</li>
          <li>Charges outside lease-defined allowable categories</li>
        </ul>

        <p>
          These issues are typically uncovered during{" "}
          <Link
            href="/marketing/cam-reconciliation"
            className="underline hover:text-black"
          >
            CAM reconciliation
          </Link>{" "}
          review or a formal{" "}
          <Link
            href="/marketing/commercial-lease-audit"
            className="underline hover:text-black"
          >
            commercial lease audit
          </Link>
          .
        </p>
      </section>

      {/* WHAT TENANTS CAN CHALLENGE */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          What Tenants Can Challenge
        </h2>

        <p>
          Most commercial leases include audit rights that allow tenants to
          dispute questionable charges — but only within a limited timeframe.
        </p>

        <p>
          Review your lease language carefully to understand:
        </p>

        <ul className="list-disc pl-6 space-y-3 marker:text-green-600">
          <li>Expense caps</li>
          <li>Exclusions</li>
          <li>Allocation methods</li>
          <li>Audit window deadlines</li>
        </ul>

        <p>
          Learn more about{" "}
          <Link
            href="/marketing/audit-window-deadlines"
            className="underline hover:text-black"
          >
            audit window deadlines
          </Link>{" "}
          before taking action.
        </p>
      </section>

      {/* FINANCIAL CONSEQUENCES */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Why Lease Overcharges Matter Financially
        </h2>

        <p>
          Even small percentage errors can cost $5,000–$50,000+ annually,
          depending on square footage and expense levels.
        </p>

        <p>
          Because CAM and NNN charges recur each year, unnoticed overcharges
          compound over time — especially in multi-year leases.
        </p>
      </section>

      {/* INTERNAL LINKS */}
      <section className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Related Guides
        </h2>

        <ul className="space-y-3">
          <li>
            <Link
              href="/marketing/cam-reconciliation-errors"
              className="underline hover:text-black"
            >
              CAM Reconciliation Errors Explained
            </Link>
          </li>
          <li>
            <Link
              href="/marketing/non-allowable-cam-nnn-expenses"
              className="underline hover:text-black"
            >
              Non-Allowable CAM & NNN Expenses
            </Link>
          </li>
          <li>
            <Link
              href="/marketing/triple-net-lease"
              className="underline hover:text-black"
            >
              What Is a Triple Net Lease?
            </Link>
          </li>
        </ul>
      </section>

      {/* FINAL CTA */}
      <section className="border-t pt-10 space-y-6">
        <h2 className="text-3xl font-light tracking-tight">
          Think You’ve Been Overcharged?
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          Upload your lease and reconciliation statement to identify potential
          CAM and NNN billing issues before your leverage disappears.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Review My Lease
        </Link>
      </section>
    </main>
  );
}