

import Link from "next/link";

export const metadata = {
  title: "Burger Restaurant CAM Reconciliation Checklist (2026) | SaveOnLease",
  description:
    "A practical CAM reconciliation checklist for burger franchisees and multi-unit QSR operators. Identify hidden NNN and common area overcharges before your audit window closes.",
};

export default function BurgerRestaurantCamChecklistPage() {
  return (
    <main className="bg-white">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Burger Restaurant CAM Reconciliation Checklist
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          A step-by-step review framework for franchisees and multi-unit operators in strip centers and inline retail.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">
              1. Verify Your Pro Rata Share
            </h2>
            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700">
              <li>Confirm total leasable square footage of the center</li>
              <li>Validate your store’s square footage</li>
              <li>Ensure vacancy is not improperly shifted to tenants</li>
              <li>Check for reallocation of anchor tenant space</li>
            </ul>
          </div>

          <div className="p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">
              2. Review Administrative Fees
            </h2>
            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700">
              <li>Identify percentage-based CAM admin charges</li>
              <li>Confirm whether caps exist in your lease</li>
              <li>Check for admin applied to non-CAM items</li>
            </ul>
          </div>

          <div className="p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">
              3. Capital Expense Pass-Throughs
            </h2>
            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700">
              <li>HVAC replacements</li>
              <li>Roof repairs or structural improvements</li>
              <li>Parking lot resurfacing</li>
              <li>Major system upgrades</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              Many leases restrict or amortize these items — verify compliance.
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">
              4. Insurance & Tax Allocations
            </h2>
            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700">
              <li>Confirm policy types align with lease language</li>
              <li>Review year-over-year tax increases</li>
              <li>Identify double billing between base rent & CAM</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-8 bg-indigo-50 border border-indigo-200 rounded-xl">
          <h2 className="text-xl font-semibold text-indigo-900">
            Multi-Unit Risk Compounds Quickly
          </h2>
          <p className="mt-3 text-indigo-800">
            A $7,500 discrepancy per location becomes $75,000 across ten burger franchise stores.
            Reconciliation errors often go unnoticed without structured review.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900">
            Don’t Miss the Audit Window
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Most commercial leases limit your ability to challenge CAM charges to a defined
            30–120 day window after reconciliation delivery. Once that period expires,
            overcharges may become permanently unchallengeable.
          </p>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/app/step-1-upload"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Upload Your Lease — Results in ~10 Seconds
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Secure. No subscription required.
          </p>
        </div>

        <div className="mt-20 border-t pt-12">
          <h3 className="text-xl font-semibold text-gray-900">
            FAQ
          </h3>

          <div className="mt-6 space-y-6">
            <div>
              <p className="font-medium text-gray-900">
                How often should burger restaurants review CAM reconciliations?
              </p>
              <p className="mt-2 text-gray-600">
                Annually at minimum, and immediately upon receipt of reconciliation statements.
                Multi-unit operators should standardize review across all locations.
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">
                What percentage errors are commonly found?
              </p>
              <p className="mt-2 text-gray-600">
                3–7% discrepancies are frequently identified in retail CAM allocations,
                particularly where admin fees or capital pass-throughs are involved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}