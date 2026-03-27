"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface PortfolioLease {
  id: string;
  propertyName: string;
  landlord?: string;
  squareFeet?: number;
  leaseType?: string;
  renewalDate?: string;
}

export default function LeasesPage() {
  const [leases, setLeases] = useState<PortfolioLease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeases() {
      try {
        const res = await fetch("/api/portfolio-leases");
        const data = await res.json();

        if (res.ok && Array.isArray(data.leases)) {
          const normalized = data.leases.map((lease: {
            id: string;
            property_name: string;
            landlord?: string | null;
            square_feet?: number | null;
            lease_type?: string | null;
            renewal_date?: string | null;
          }) => ({
            id: lease.id,
            propertyName: lease.property_name,
            landlord: lease.landlord,
            squareFeet: lease.square_feet,
            leaseType: lease.lease_type,
            renewalDate: lease.renewal_date,
          }));

          setLeases(normalized);
        }
      } catch (err) {
        console.error("Failed to load leases:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeases();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Leases</h1>
          <p className="text-gray-600 mt-1">
            View and manage all portfolio leases across your locations.
          </p>
        </div>

        <Link
          href="/app/add-lease"
          className="bg-black text-white px-5 py-3 rounded-md"
        >
          Add Lease
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-5 px-6 py-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
          <div>Property</div>
          <div>Lease Type</div>
          <div>Square Footage</div>
          <div>Renewal Date</div>
          <div></div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-500">Loading...</div>
        ) : leases.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No leases added yet. Add your first lease to begin building your portfolio.
          </div>
        ) : (
          leases.map((lease) => (
            <div
              key={lease.id}
              className="grid grid-cols-5 px-6 py-4 border-b text-sm"
            >
              <div className="font-medium">{lease.propertyName}</div>
              <div>{lease.leaseType || "—"}</div>
              <div>
                {lease.squareFeet
                  ? lease.squareFeet.toLocaleString()
                  : "—"}
              </div>
              <div>
                {lease.renewalDate
                  ? new Date(lease.renewalDate).toLocaleDateString()
                  : "—"}
              </div>

              <Link
                href={`/app/leases/${lease.id}`}
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