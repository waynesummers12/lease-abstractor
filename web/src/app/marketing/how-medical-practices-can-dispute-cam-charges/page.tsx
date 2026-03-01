

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Medical Practices Can Dispute CAM Charges",
  description:
    "Step-by-step guidance for medical tenants disputing CAM charges, admin fee violations, and improper capital expense pass-through in outpatient buildings.",
};

export default function DisputeMedicalCAMChargesPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          How Medical Practices Can Dispute CAM Charges
        </h1>
        <p className="text-lg text-gray-700">
          Medical office tenants have the right to review and dispute Common Area
          Maintenance (CAM) charges when costs exceed lease caps or include
          improperly classified capital expenses.
        </p>
      </section>

      {/* STEP 1 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Step 1: Review the Lease Language
        </h2>
        <p className="text-gray-700">
          Confirm whether your lease contains caps on CAM admin fees,
          exclusions for capital expenditures, audit rights, and formal
          reconciliation timelines.
        </p>
      </section>

      {/* STEP 2 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Step 2: Request Supporting Documentation
        </h2>
        <p className="text-gray-700">
          Landlords should provide invoices, allocation schedules, and detailed
          reconciliation statements supporting annual CAM charges.
        </p>
      </section>

      {/* STEP 3 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Step 3: Identify Overcharges
        </h2>
        <p className="text-gray-700">
          Look for admin fees exceeding caps, capital replacements passed
          through as operating expenses, disproportionate cost allocation,
          and expense categories that violate lease exclusions.
        </p>
      </section>

      {/* INTERNAL CLUSTER LINKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Related Medical Lease Resources</h2>
        <ul className="list-disc pl-6 space-y-2 text-emerald-700">
          <li>
            <Link href="/marketing/medical-office-cam-reconciliation">
              Medical Office CAM Reconciliation Guide
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-office-lease-audit-checklist">
              Medical Office Lease Audit Checklist
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-office-nnn-expenses">
              Medical Office NNN Expense Breakdown
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-practice-lease-overcharges">
              Identifying Medical Lease Overcharges
            </Link>
          </li>
        </ul>
      </section>

      {/* FAQ SECTION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

        <div>
          <h3 className="font-semibold">Can medical tenants legally dispute CAM charges?</h3>
          <p className="text-gray-700">
            Yes. Most medical office leases contain audit rights that allow tenants
            to review and challenge CAM reconciliations within a defined time period.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">What CAM charges are most commonly disputed?</h3>
          <p className="text-gray-700">
            Admin fees exceeding caps, capital improvements improperly passed through,
            reserve fund allocations, and miscalculated pro-rata shares.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">How long do medical practices have to dispute charges?</h3>
          <p className="text-gray-700">
            Many leases provide a 12-month audit window after reconciliation delivery,
            though terms vary by agreement.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-8">
        <Link
          href="/app"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-medium"
        >
          Audit My CAM Charges
        </Link>
      </section>

    </main>
  );
}