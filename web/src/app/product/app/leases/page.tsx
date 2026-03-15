

"use client";

import Link from "next/link";

type LeaseRow = {
  id: string;
  location: string;
  rent: string;
  cam: string;
  escalation: string;
  risk: string;
};

const mockLeases: LeaseRow[] = [];

export default function LeasesPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Leases</h1>
          <p className="text-gray-600 mt-1">
            View and manage all analyzed leases across your locations.
          </p>
        </div>

        <Link
          href="/app/step-1-upload"
          className="bg-black text-white px-5 py-3 rounded-md"
        >
          Upload Lease
        </Link>
      </div>

      {/* Lease Table */}
      <div className="border rounded-lg overflow-hidden">

        <div className="grid grid-cols-6 px-6 py-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
          <div>Location</div>
          <div>Base Rent</div>
          <div>CAM / NNN</div>
          <div>Escalation</div>
          <div>Risk Score</div>
          <div></div>
        </div>

        {mockLeases.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No leases uploaded yet. Upload your first lease to start analyzing
            risks and costs.
          </div>
        ) : (
          mockLeases.map((lease) => (
            <div
              key={lease.id}
              className="grid grid-cols-6 px-6 py-4 border-b text-sm"
            >
              <div>{lease.location}</div>
              <div>{lease.rent}</div>
              <div>{lease.cam}</div>
              <div>{lease.escalation}</div>
              <div>{lease.risk}</div>

              <Link
                href={`/app/step-3-review?id=${lease.id}`}
                className="text-blue-600"
              >
                View
              </Link>
            </div>
          ))
        )}

      </div>

    </main>
  );
}