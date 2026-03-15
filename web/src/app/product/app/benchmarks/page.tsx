

"use client";

import Link from "next/link";

export default function BenchmarksPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Lease Benchmarks</h1>
        <p className="text-gray-600">
          Compare your lease costs to industry averages and identify abnormal CAM or NNN expenses.
        </p>
      </div>

      {/* Benchmark Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        <div className="border rounded-lg p-6">
          <div className="text-sm text-gray-500 mb-1">Average CAM (Retail)</div>
          <div className="text-2xl font-semibold">$6.30 / sq ft</div>
          <div className="text-xs text-gray-400 mt-2">
            Based on anonymized lease data
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="text-sm text-gray-500 mb-1">Average Escalation</div>
          <div className="text-2xl font-semibold">3.1%</div>
          <div className="text-xs text-gray-400 mt-2">
            Annual base rent increases
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="text-sm text-gray-500 mb-1">Common CAM Admin Fee</div>
          <div className="text-2xl font-semibold">15%</div>
          <div className="text-xs text-gray-400 mt-2">
            Typical property management charge
          </div>
        </div>

      </div>

      {/* Insights Section */}
      <div className="border rounded-lg p-6 mb-12">
        <h2 className="text-lg font-semibold mb-4">Insights</h2>

        <ul className="space-y-3 text-gray-700 text-sm">
          <li>• CAM costs above $8 / sq ft are considered high for most retail properties.</li>
          <li>• Escalation clauses above 4% may significantly increase long‑term lease costs.</li>
          <li>• CAM admin fees commonly range between 10–15%.</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-10">
        <Link
          href="/app/step-1-upload"
          className="inline-block bg-black text-white px-6 py-3 rounded-md"
        >
          Upload Lease to Compare
        </Link>
      </div>

    </main>
  );
}