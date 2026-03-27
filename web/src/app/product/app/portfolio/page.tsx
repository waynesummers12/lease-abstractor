"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_WORKER_URL;

        if (!baseUrl) {
          console.error("❌ NEXT_PUBLIC_WORKER_URL is not defined");
          throw new Error("Worker URL not configured");
        }

        console.log("WORKER URL:", baseUrl);

        const res = await fetch(`${baseUrl}/portfolio-leases`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch portfolio leases");
        }

        const data: { leases: Lease[] } = await res.json();

        // 🔥 THIS WAS THE BUG
        setLeases(data.leases || []);
      } catch (err) {
        console.error("Portfolio fetch error:", err);
        setError("Unable to load portfolio. Please try again.");
        setLeases([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, []);

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

  const totalLeases = leases.length;

  const today = new Date();

  const leasesWithRenewal = leases.filter(
    (l) => l.renewal_date && !isNaN(new Date(l.renewal_date).getTime())
  );

  const upcomingRenewals = leasesWithRenewal.filter((lease) => {
    const renewal = new Date(lease.renewal_date!);
    const diffDays =
      (renewal.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 180 && diffDays >= 0;
  });

  const leaseTypeCounts = leases.reduce<Record<string, number>>(
    (acc, lease) => {
      const type = lease.lease_type || "Unknown";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {}
  );

  const healthScore =
    totalLeases === 0
      ? 0
      : Math.max(
          0,
          100 - Math.round((upcomingRenewals.length / totalLeases) * 100)
        );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Lease Portfolio</h1>
        <p className="text-gray-500">
          Monitor all uploaded leases across your locations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <p
            className={`text-2xl font-bold ${
              healthScore > 80
                ? "text-green-600"
                : healthScore > 50
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {healthScore}%
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Locations</p>
          <p className="text-2xl font-bold">{totalLeases}</p>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <p className="text-sm text-gray-500 mb-2">Lease Type Breakdown</p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(leaseTypeCounts).map(([type, count]) => (
            <div
              key={type}
              className="px-3 py-1 text-sm rounded-full bg-gray-100"
            >
              {type}: {count}
            </div>
          ))}
        </div>
      </div>

      {leases.length === 0 ? (
        <div className="border rounded-lg p-6 text-center text-gray-500">
          No leases added yet. Upload your first lease to begin building your
          portfolio dashboard.
        </div>
      ) : (
        <div className="border rounded-lg divide-y">
          {leases.map((lease) => (
            <div key={lease.id} className="p-4">
              <p className="font-medium">{lease.property_name}</p>
              <p className="text-sm text-gray-500">
                {lease.lease_type} • {lease.square_feet} sq ft • Renewal{" "}
                {lease.renewal_date}
                {lease.renewal_date && (() => {
                  const renewal = new Date(lease.renewal_date);
                  const diffDays = Math.round(
                    (renewal.getTime() - today.getTime()) /
                      (1000 * 60 * 60 * 24)
                  );

                  if (diffDays <= 180 && diffDays >= 0) {
                    return (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded">
                        {diffDays} days
                      </span>
                    );
                  }

                  return null;
                })()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
