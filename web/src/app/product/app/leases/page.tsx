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
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Leases</h1>
          <p className="text-gray-600 mt-1">
            View and manage all portfolio leases across your locations.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/product/app/add-lease"
            className="border border-gray-300 px-5 py-3 rounded-md text-sm hover:bg-gray-100"
          >
            Add Lease
          </Link>
          <Link
            href="/app/step-1-upload"
            className="bg-black text-white px-5 py-3 rounded-md text-sm font-medium hover:bg-gray-800"
          >
            Run Audit (Free Preview)
          </Link>
        </div>
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
            <p className="mb-4">
              No leases added yet. Upload a lease to manage it or run an audit to uncover hidden costs.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/product/app/add-lease"
                className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100"
              >
                Add Lease
              </Link>
              <Link
                href="/app/step-1-upload"
                className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
              >
                Run Audit (Free Preview)
              </Link>
            </div>
          </div>
        ) : (
          leases.map((lease) => (
            <div
              key={lease.id}
              className="grid grid-cols-5 px-6 py-4 border-b text-sm hover:bg-gray-50 transition"
            >
              <div className="font-medium">{lease.propertyName}</div>
              <div>{lease.leaseType || "—"}</div>
              <div>
                {lease.squareFeet
                  ? lease.squareFeet.toLocaleString()
                  : "—"}
              </div>
              <div>
                {lease.renewalDate ? (() => {
                  const date = new Date(lease.renewalDate);
                  const now = new Date();
                  const diff = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                  const isUrgent = diff <= 90;

                  return (
                    <span className={isUrgent ? "text-red-600 font-medium" : ""}>
                      {date.toLocaleDateString()}
                      {isUrgent && " ⚠️"}
                    </span>
                  );
                })() : "—"}
              </div>
              <Link
                href={`/app/leases/${lease.id}`}
                className="text-black font-medium hover:underline"
              >
                View Lease →
              </Link>
            </div>
          ))
        )}
      </div>
    </main>
  );
}