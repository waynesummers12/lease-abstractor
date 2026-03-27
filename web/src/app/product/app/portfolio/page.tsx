"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Lease = {
  id: string;
  property_name: string;
  landlord?: string;
  square_feet?: number;
  lease_type?: string;
  renewal_date?: string;
  created_at?: string;
};

export default function PortfolioPage() {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_WORKER_URL;
        if (!baseUrl) throw new Error("Worker URL not configured");

        const res = await fetch(`${baseUrl}/portfolio-leases`);
        if (!res.ok) throw new Error("Failed to fetch portfolio leases");

        const data: { leases: Lease[] } = await res.json();
        setLeases(data.leases || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load portfolio. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, []);

  const today = new Date();

  const filteredLeases = useMemo(() => {
    if (filterType === "All") return leases;
    return leases.filter((l) => l.lease_type === filterType);
  }, [leases, filterType]);

  const sortedLeases = useMemo(() => {
    return [...filteredLeases].sort((a, b) => {
      const aDate = a.renewal_date ? new Date(a.renewal_date).getTime() : Infinity;
      const bDate = b.renewal_date ? new Date(b.renewal_date).getTime() : Infinity;
      return aDate - bDate;
    });
  }, [filteredLeases]);

  const totalLeases = sortedLeases.length;

  const upcomingRenewals = sortedLeases.filter((lease) => {
    if (!lease.renewal_date) return false;
    const diff =
      (new Date(lease.renewal_date).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24);
    return diff <= 180 && diff >= 0;
  });

  const healthScore =
    totalLeases === 0
      ? 0
      : Math.max(0, 100 - Math.round((upcomingRenewals.length / totalLeases) * 100));

  const leasesByMonth = useMemo(() => {
    const grouped: Record<string, Lease[]> = {};
    sortedLeases.forEach((lease) => {
      if (!lease.renewal_date) return;
      const monthKey = new Date(lease.renewal_date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!grouped[monthKey]) grouped[monthKey] = [];
      grouped[monthKey].push(lease);
    });
    return grouped;
  }, [sortedLeases]);

  if (loading) {
  return <div className="p-6">Loading portfolio...</div>;
}

if (error) {
  return (
    <div className="p-6">
      <div className="border border-red-300 bg-red-50 text-red-700 rounded-lg p-4">
        {error}
      </div>
    </div>
  );
}
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Lease Portfolio</h1>
          <p className="text-gray-500">Monitor all leases and renewal risk.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 rounded ${viewMode === "list" ? "bg-black text-white" : "bg-gray-100"}`}
          >
            List
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-3 py-1 rounded ${viewMode === "calendar" ? "bg-black text-white" : "bg-gray-100"}`}
          >
            Calendar
          </button>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        {["All", "NNN", "Gross", "Modified"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1 rounded-full text-sm ${
              filterType === type ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Leases</p>
          <p className="text-2xl font-bold">{totalLeases}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Upcoming Renewals (≤180 days)</p>
          <p className="text-2xl font-bold">{upcomingRenewals.length}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Portfolio Health</p>
          <p className="text-2xl font-bold">{healthScore}%</p>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="border rounded-lg divide-y">
          {sortedLeases.map((lease) => {
            const diffDays = lease.renewal_date
              ? Math.round(
                  (new Date(lease.renewal_date).getTime() - today.getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              : null;

            const riskPercent = diffDays !== null && diffDays >= 0
              ? Math.min(100, Math.max(0, 100 - diffDays))
              : 0;

            return (
              <div key={lease.id} className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{lease.property_name}</p>
                  <Link
                    href={`/product/app/leases/${lease.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Lease
                  </Link>
                </div>

                <p className="text-sm text-gray-500">
                  {lease.lease_type} • {lease.square_feet} sq ft • Renewal {lease.renewal_date}
                </p>

                {diffDays !== null && diffDays >= 0 && (
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">{diffDays} days remaining</div>
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 rounded bg-red-500"
                        style={{ width: `${riskPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(leasesByMonth).map(([month, monthLeases]) => (
            <div key={month} className="border rounded-lg p-4">
              <p className="font-semibold mb-2">{month}</p>
              <ul className="space-y-1 text-sm">
                {monthLeases.map((lease) => (
                  <li key={lease.id}>
                    {lease.property_name} — {lease.renewal_date}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
