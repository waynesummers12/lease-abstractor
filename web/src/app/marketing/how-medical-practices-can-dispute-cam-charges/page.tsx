

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

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Step 1: Review the Lease Language
        </h2>
        <p className="text-gray-700">
          Confirm whether your lease contains caps on CAM admin fees,
          exclusions for capital expenditures, and audit window timelines.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Step 2: Request Supporting Documentation
        </h2>
        <p className="text-gray-700">
          Landlords should provide invoices, allocation schedules, and detailed
          reconciliation statements supporting annual CAM charges.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Step 3: Identify Overcharges
        </h2>
        <p className="text-gray-700">
          Look for admin fees exceeding caps, capital replacements passed
          through as operating expenses, and disproportionate cost allocation.
        </p>
      </section>

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