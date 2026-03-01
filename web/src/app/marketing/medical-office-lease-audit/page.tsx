import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Office NNN Expenses | Healthcare Lease Breakdown",
  description:
    "Understand medical office NNN expenses including taxes, insurance, CAM admin fees, and reserve funds.",
};

export default function MedicalOfficeNNNExpenses() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Medical Office NNN Expenses Explained</h1>
        <p className="text-lg text-gray-700">
          Insurance allocation, property taxes, and CAM admin fees can significantly
          increase occupancy cost in healthcare buildings.
        </p>
      </section>

      <section className="text-center pt-6">
        <Link
          href="/app"
          className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-lg"
        >
          Audit My Lease
        </Link>
      </section>
    </main>
  );
}