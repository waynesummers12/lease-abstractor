"use client";

import Link from "next/link";

export default function PortfolioPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Lease Portfolio</h1>
        <p className="text-gray-600">
          Monitor all uploaded leases across your locations. This dashboard
          will evolve into the full SaveOnLease portfolio intelligence view.
        </p>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Total Leases</p>
          <p className="text-2xl font-semibold mt-1">—</p>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Annual Rent Exposure</p>
          <p className="text-2xl font-semibold mt-1">—</p>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">CAM / NNN Exposure</p>
          <p className="text-2xl font-semibold mt-1">—</p>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Upcoming Renewals</p>
          <p className="text-2xl font-semibold mt-1">—</p>
        </div>
      </div>

      {/* Lease Table Placeholder */}
      <div className="border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="font-semibold">Locations</h2>
        </div>

        <div className="p-6 text-gray-600">
          No leases added yet. Upload your first lease to begin building your
          portfolio dashboard.
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10">
        <Link
          href="/app/step-1-upload"
          className="inline-block bg-black text-white px-5 py-3 rounded-md"
        >
          Upload Lease
        </Link>
      </div>
    </main>
  );
}
