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

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_WORKER_URL ??
          "https://lease-abstractor-worker.onrender.com";

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

  const totalLeases = leases.length;

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
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Portfolio Health</p>
          <p className="text-2xl font-bold">—</p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Locations</p>
          <p className="text-2xl font-bold">{totalLeases}</p>
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
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
