// src/app/marketing/nnn-lease/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NNN Lease Explained | Triple Net Lease Meaning for Commercial Tenants",
  description:
    "Understand what an NNN lease is, how triple net leases work, and how CAM, tax, and insurance charges impact commercial tenants.",
  alternates: {
    canonical: "https://saveonlease.com/marketing/nnn-lease",
  },
};

export default function NnnLeasePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* HERO */}
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          NNN Lease (Triple Net Lease) Explained for Commercial Tenants
        </h1>

        <p className="mb-6 text-lg text-gray-700">
          An NNN lease — also known as a triple net lease — is a commercial
          lease structure where tenants pay base rent plus three categories of
          property expenses: taxes, insurance, and common area maintenance.
        </p>

        <p className="mb-8 text-gray-700">
          While NNN leases are common in commercial real estate, many tenants
          underestimate how CAM, tax, and insurance charges are calculated — and
          where overcharges can occur.
        </p>

        <p className="mb-8 text-gray-700">
          For a broader breakdown of structure and terminology, see our{" "}
          <Link
            href="/marketing/nnn"
            className="underline hover:text-black"
          >
            NNN lease overview
          </Link>
          .
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Upload Lease to Review NNN Charges (Free Preview)
        </Link>

        <p className="mt-3 text-xs text-gray-600">
          🔒 Secure & confidential • Takes 2 minutes • No subscription required
        </p>
      </section>

      {/* WHAT IS NNN */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          What Does NNN Mean?
        </h2>

        <p>
          NNN stands for “triple net.” In a triple net lease, tenants pay three
          categories of costs in addition to base rent:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Property Taxes</li>
          <li>Property Insurance</li>
          <li>
            <Link
              href="/marketing/common-area-maintenance"
              className="underline hover:text-black"
            >
              Common Area Maintenance (CAM)
            </Link>
          </li>
        </ul>

        <p>
          These expenses are typically estimated monthly and reconciled annually
          through a
          <Link
            href="/marketing/cam-reconciliation"
            className="underline hover:text-black ml-1"
          >
            CAM reconciliation
          </Link>
          process.
        </p>
      </section>

      {/* HOW NNN LEASES IMPACT TENANTS */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          How NNN Leases Impact Commercial Tenants
        </h2>

        <p>
          In NNN leases, operating cost risk shifts to the tenant. If expenses
          increase, tenants absorb the increase.
        </p>

        <p>
          Common issues include allocation errors, administrative markups,
          inclusion of non-allowable expenses, and vague lease language.
        </p>

        <p>
          Many of these problems are discovered during reviews of
          <Link
            href="/marketing/cam-reconciliation-errors"
            className="underline hover:text-black ml-1"
          >
            CAM reconciliation errors
          </Link>
          .
        </p>
      </section>

      {/* FINANCIAL CONSEQUENCES */}
      <section className="mb-14 space-y-4 text-gray-700 leading-relaxed">
        <h2 className="text-3xl font-light tracking-tight">
          Why Reviewing Your NNN Lease Matters
        </h2>

        <p>
          Even small allocation errors in an NNN lease can cost tenants
          thousands annually.
        </p>

        <p>
          Because CAM and other operating costs recur every year, unnoticed
          errors compound over time. Most leases also include
          <Link
            href="/marketing/audit-window-deadlines"
            className="underline hover:text-black ml-1"
          >
            audit window deadlines
          </Link>
          that limit how long tenants have to dispute incorrect charges.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="rounded-xl border bg-gray-50 p-8 text-center">
        <h2 className="mb-3 text-2xl font-semibold">
          Review Your NNN Lease Before Charges Compound
        </h2>

        <p className="mb-6 text-gray-700">
          A tenant-focused lease review can identify CAM allocation issues,
          expense caps, and reconciliation errors before audit windows close.
        </p>

        <Link
          href="/app/step-1-upload"
          className="inline-flex items-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Start Free NNN Lease Review
        </Link>
      </section>
    </main>
  );
}