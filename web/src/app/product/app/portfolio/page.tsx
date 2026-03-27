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
  estimated_exposure?: number; // future audit integration
};

export default function PortfolioPage() {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<"soonest" | "risk" | "sf">("soonest");

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

  const leasesWithRisk = useMemo(() => {
    const today = new Date();

    return leases.map((lease) => {
      const diffDays = lease.renewal_date
        ? Math.round(
            (new Date(lease.renewal_date).getTime() - today.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : null;

      return {
        ...lease,
        diffDays,
      };
    });
  }, [leases]);

  const sortedLeases = useMemo(() => {
    return [...leasesWithRisk].sort((a, b) => {
      if (sortMode === "sf") {
        return (b.square_feet || 0) - (a.square_feet || 0);
      }

      if (sortMode === "risk") {
        return (a.diffDays ?? Infinity) - (b.diffDays ?? Infinity);
      }

      // default soonest
      return (a.diffDays ?? Infinity) - (b.diffDays ?? Infinity);
    });
  }, [leasesWithRisk, sortMode]);

  const totalLeases = sortedLeases.length;

  const riskBuckets = useMemo(() => {
    let critical = 0;
    let watch = 0;
    let safe = 0;

    sortedLeases.forEach((lease) => {
      if (lease.diffDays === null || lease.diffDays < 0) {
        safe++;
      } else if (lease.diffDays < 90) {
        critical++;
      } else if (lease.diffDays <= 180) {
        watch++;
      } else {
        safe++;
      }
    });

    return { critical, watch, safe };
  }, [sortedLeases]);

  const healthScore =
    totalLeases === 0
      ? 0
      : Math.max(0, 100 - Math.round((riskBuckets.critical / totalLeases) * 100));

  if (loading) return <div className="p-6">Loading portfolio...</div>;
  if (error)
    return (
      <div className="p-6">
        <div className="border border-red-300 bg-red-50 text-red-700 rounded-lg p-4">
          {error}
        </div>
      </div>
    );

  const criticalPct = (riskBuckets.critical / totalLeases) * 100;
  const watchPct = (riskBuckets.watch / totalLeases) * 100;
  const safePct = (riskBuckets.safe / totalLeases) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Lease Portfolio</h1>
          <p className="text-gray-500">CFO-grade renewal risk intelligence.</p>
        </div>

        <div className="flex gap-2">
          {(["soonest", "risk", "sf"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setSortMode(mode)}
              className={`px-3 py-1 rounded text-sm ${
                sortMode === mode ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              {mode === "soonest" && "Soonest"}
              {mode === "risk" && "Most Risk"}
              {mode === "sf" && "Largest SF"}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Risk Heat Map */}
      <div className="border rounded-lg p-4">
        <p className="text-sm text-gray-500 mb-2">Portfolio Risk Distribution</p>
        <div className="w-full h-4 flex rounded overflow-hidden">
          <div style={{ width: `${criticalPct}%` }} className="bg-red-500" />
          <div style={{ width: `${watchPct}%` }} className="bg-yellow-400" />
          <div style={{ width: `${safePct}%` }} className="bg-green-500" />
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span>Critical: {riskBuckets.critical}</span>
          <span>Watch: {riskBuckets.watch}</span>
          <span>Safe: {riskBuckets.safe}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Leases</p>
          <p className="text-2xl font-bold">{totalLeases}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Critical (&lt;90 days)</p>
          <p className="text-2xl font-bold text-red-600">{riskBuckets.critical}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Portfolio Health</p>
          <p className="text-2xl font-bold">{healthScore}%</p>
        </div>
      </div>

      <div className="border rounded-lg divide-y">
        {sortedLeases.map((lease) => {
          let badgeColor = "bg-green-100 text-green-700";
          if (lease.diffDays !== null) {
            if (lease.diffDays < 90) badgeColor = "bg-red-100 text-red-700";
            else if (lease.diffDays <= 180) badgeColor = "bg-yellow-100 text-yellow-700";
          }

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

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {lease.lease_type} • {lease.square_feet} sq ft • Renewal {lease.renewal_date}
                </p>

                {lease.diffDays !== null && lease.diffDays >= 0 && (
                  <span className={`px-2 py-1 text-xs rounded ${badgeColor}`}>
                    {lease.diffDays} days
                  </span>
                )}
              </div>

              <div className="flex justify-between text-sm">
                <span>Estimated Exposure</span>
                <span className="font-semibold">
                  ${lease.estimated_exposure?.toLocaleString() ?? "—"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
