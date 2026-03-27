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
  estimated_exposure?: number;
};

export default function PortfolioPage() {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLease, setSelectedLease] = useState<Lease | null>(null);

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
      return (a.diffDays ?? Infinity) - (b.diffDays ?? Infinity);
    });
  }, [leasesWithRisk]);

  const totalExposure = useMemo(() => {
    return sortedLeases.reduce((sum, l) => sum + (l.estimated_exposure || 0), 0);
  }, [sortedLeases]);

  const riskBuckets = useMemo(() => {
    let critical = 0;
    let watch = 0;
    let safe = 0;

    sortedLeases.forEach((lease) => {
      if (lease.diffDays === null || lease.diffDays < 0) safe++;
      else if (lease.diffDays < 90) critical++;
      else if (lease.diffDays <= 180) watch++;
      else safe++;
    });

    return { critical, watch, safe };
  }, [sortedLeases]);

  if (loading) return <div className="p-6">Loading portfolio...</div>;
  if (error)
    return (
      <div className="p-6">
        <div className="border border-red-300 bg-red-50 text-red-700 rounded-lg p-4">
          {error}
        </div>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* Top KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Leases</p>
          <p className="text-2xl font-bold">{sortedLeases.length}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Critical (&lt;90 days)</p>
          <p className="text-2xl font-bold text-red-600">{riskBuckets.critical}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Portfolio Exposure</p>
          <p className="text-2xl font-bold text-red-600">
            ${totalExposure.toLocaleString()}
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Action Required</p>
          <p className="text-2xl font-bold">{riskBuckets.critical}</p>
        </div>
      </div>

      {/* Lease List */}
      <div className="border rounded-lg divide-y">
        {sortedLeases.map((lease) => {
          const isCritical = lease.diffDays !== null && lease.diffDays < 90;

          return (
            <div key={lease.id} className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <p className="font-medium">{lease.property_name}</p>
                  {isCritical && (
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                      ACTION REQUIRED
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedLease(lease)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Risk
                  </button>

                  {isCritical && (
                    <Link
                      href={`/product/app/leases/${lease.id}`}
                      className="text-sm px-3 py-1 bg-black text-white rounded"
                    >
                      Start Audit
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  {lease.lease_type} • {lease.square_feet} sq ft • Renewal {lease.renewal_date}
                </span>
                <span>
                  ${lease.estimated_exposure?.toLocaleString() ?? "—"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Drill-down Modal */}
      {selectedLease && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 space-y-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">
                {selectedLease.property_name} Risk Analysis
              </h2>
              <button onClick={() => setSelectedLease(null)}>✕</button>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <p>
                Renewal Date: {selectedLease.renewal_date}
              </p>
              <p>
                Estimated Exposure: ${selectedLease.estimated_exposure?.toLocaleString() ?? "—"}
              </p>
              <p>
                Days Remaining: {selectedLease.diffDays}
              </p>
            </div>

            <div className="border rounded p-3 text-sm">
              Renewal Timeline & Cost Impact modeling coming next phase.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
