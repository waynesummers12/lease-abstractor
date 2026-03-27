"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ApiLease = {
  id: string;
  property: string;
  lease_type: string;
  square_footage: number;
  renewal_date: string;
};

type Lease = {
  id: string;
  property: string;
  leaseType: string;
  squareFootage: number;
  renewalDate: string;
};

export default function PortfolioPage() {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORKER_URL}/portfolio-leases`
        );
        const data: ApiLease[] = await res.json();

        const normalized: Lease[] = (data || []).map((l: ApiLease) => ({
          id: l.id,
          property: l.property,
          leaseType: l.lease_type,
          squareFootage: l.square_footage,
          renewalDate: l.renewal_date,
        }));

        setLeases(normalized);
      } catch (err) {
        console.error("Failed to load portfolio leases", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const totalLeases = leases.length;

  const upcomingRenewals = leases.filter((l) => {
    const renewal = new Date(l.renewalDate);
    const now = new Date();
    const diff =
      (renewal.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 180 && diff >= 0;
  }).length;

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Lease Portfolio</h1>
        <p className="text-gray-600">
          Monitor all uploaded leases across your locations.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Total Leases</p>
          <p className="text-2xl font-semibold mt-1">
            {loading ? "—" : totalLeases}
          </p>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Upcoming Renewals (≤180 days)</p>
          <p className="text-2xl font-semibold mt-1">
            {loading ? "—" : upcomingRenewals}
          </p>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Portfolio Health</p>
          <p className="text-2xl font-semibold mt-1">
            {totalLeases > 0 ? "Active" : "—"}
          </p>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">Locations</p>
          <p className="text-2xl font-semibold mt-1">
            {loading ? "—" : totalLeases}
          </p>
        </div>
      </div>

      {/* Lease Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="font-semibold">Locations</h2>
        </div>

        {loading ? (
          <div className="p-6 text-gray-600">Loading...</div>
        ) : leases.length === 0 ? (
          <div className="p-6 text-gray-600">
            No leases added yet. Upload your first lease to begin building your
            portfolio dashboard.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-white border-b">
              <tr>
                <th className="text-left px-6 py-3">Property</th>
                <th className="text-left px-6 py-3">Type</th>
                <th className="text-left px-6 py-3">Sq Ft</th>
                <th className="text-left px-6 py-3">Renewal</th>
              </tr>
            </thead>
            <tbody>
              {leases.map((lease) => (
                <tr key={lease.id} className="border-b">
                  <td className="px-6 py-4">{lease.property}</td>
                  <td className="px-6 py-4">{lease.leaseType}</td>
                  <td className="px-6 py-4">
                    {lease.squareFootage.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{lease.renewalDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

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
