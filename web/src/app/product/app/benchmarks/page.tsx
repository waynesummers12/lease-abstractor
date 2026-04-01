"use client";

import Link from "next/link";

export default function BenchmarksPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Lease Benchmarks</h1>
          <p className="text-gray-600 text-sm mt-1">
            Compare your lease against real market data and uncover hidden overcharges instantly.
          </p>
        </div>

        <Link
          href="/app/step-1-upload"
          className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
        >
          Run Lease Audit →
        </Link>
      </div>

      {/* HERO / VALUE BLOCK */}
      <div className="border rounded-lg p-6 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-sm font-semibold mb-1">
            Identify Overcharges in Minutes
          </div>
          <div className="text-sm text-gray-600 max-w-md">
            Most tenants overpay 5–20% on CAM, admin fees, or escalations. Upload your lease to see how it compares.
          </div>
        </div>

        <Link
          href="/app/step-1-upload"
          className="bg-black text-white px-5 py-3 rounded-md text-sm font-medium hover:bg-gray-800"
        >
          Upload Lease (Free)
        </Link>
      </div>

      {/* INLINE COMPARISON PREVIEW (HIGH-CONVERSION) */}
      <div className="border rounded-lg p-6 bg-white">
        <div className="text-sm font-semibold mb-3">
          Example Benchmark Comparison
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

          <div className="border rounded p-4">
            <div className="text-xs text-gray-500">Your Lease (Example)</div>
            <div className="text-lg font-semibold text-red-600">
              $8.90 / sq ft
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            vs
          </div>

          <div className="border rounded p-4">
            <div className="text-xs text-gray-500">Market Benchmark</div>
            <div className="text-lg font-semibold text-green-600">
              $6.30 / sq ft
            </div>
          </div>

        </div>

        <div className="mt-4 text-sm font-medium text-red-700">
          Potential Overcharge: ~$12,000 / year
        </div>

        <div className="text-xs text-gray-500 mt-2">
          Your exact comparison will be calculated instantly after upload.
        </div>
      </div>

      {/* BENCHMARK CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="border rounded-lg p-5">
          <div className="text-xs text-gray-500 mb-1">Retail CAM Benchmark</div>
          <div className="text-2xl font-semibold">$6.30 / sq ft</div>
          <div className="text-xs text-gray-400 mt-2">
            Based on anonymized lease data
          </div>
        </div>

        <div className="border rounded-lg p-5">
          <div className="text-xs text-gray-500 mb-1">Typical Escalation Range</div>
          <div className="text-2xl font-semibold">3.1%</div>
          <div className="text-xs text-gray-400 mt-2">
            Annual rent increases
          </div>
        </div>

        <div className="border rounded-lg p-5">
          <div className="text-xs text-gray-500 mb-1">Typical CAM Admin Fee</div>
          <div className="text-2xl font-semibold">15%</div>
          <div className="text-xs text-gray-400 mt-2">
            Property management markup
          </div>
        </div>

      </div>

      {/* INSIGHTS (CONVERSION-FOCUSED) */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-lg font-semibold mb-4">What This Means for You</h2>

        <ul className="space-y-3 text-sm text-gray-700">
          <li>• Paying above benchmark CAM? You may be overcharged annually.</li>
          <li>• High escalation rates compound costs over time.</li>
          <li>• Admin fees above 15% are often negotiable.</li>
        </ul>
      </div>

      {/* PAYWALL TEASER */}
      <div className="border rounded-lg p-6 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="text-sm font-semibold mb-1">
              Unlock Your Benchmark Analysis
            </div>
            <div className="text-sm text-gray-600 max-w-md">
              See exactly where your lease falls above market rates and quantify potential savings instantly.
            </div>
          </div>

          <Link
            href="/app/step-1-upload"
            className="bg-black text-white px-5 py-3 rounded-md text-sm font-medium hover:bg-gray-800"
          >
            Run Benchmark Audit (Free)
          </Link>
        </div>
      </div>

      {/* TRUST SIGNAL */}
      <div className="text-xs text-gray-500 text-center">
        Based on anonymized data from 2,000+ commercial leases across retail, medical, and office portfolios.
      </div>

    </main>
  );
}