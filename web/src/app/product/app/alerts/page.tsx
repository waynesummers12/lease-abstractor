"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { portfolioFetch } from "@/lib/portfolioFetch";
import { getPortfolioAlerts, type PortfolioAlert, type PortfolioLeaseForAlerts } from "@/lib/portfolioAlerts";

function severityColor(severity: PortfolioAlert["severity"]) {
  if (severity === "high") return "text-red-700";
  if (severity === "medium") return "text-amber-700";
  return "text-gray-700";
}

export default function AlertsPage() {
  const { session, loading: authLoading } = useAuth();
  const userId = session?.user.id;
  const router = useRouter();
  const [leases, setLeases] = useState<PortfolioLeaseForAlerts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!userId) {
      router.replace("/login");
      return;
    }

    let cancelled = false;
    setLeases([]);
    setError(null);
    setLoading(true);
    async function loadLeases() {
      try {
        const response = await portfolioFetch();
        if (!response.ok) throw new Error("Unable to load your portfolio alerts.");
        const data = await response.json();
        if (!Array.isArray(data.leases)) throw new Error("Unable to load your portfolio alerts.");
        if (!cancelled) setLeases(data.leases);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load your portfolio alerts.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadLeases();
    return () => { cancelled = true; };
  }, [authLoading, userId, router]);

  if (authLoading || !session || loading) {
    return <main className="max-w-6xl mx-auto px-6 py-16 text-gray-600">Loading saved lease dates...</main>;
  }

  const alerts = getPortfolioAlerts(leases);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Renewal Date Alerts</h1>
        <p className="text-gray-600">
          These reminders use renewal dates saved in your portfolio. They do not determine notice deadlines or analyze CAM charges.
        </p>
      </div>

      {error ? (
        <p className="border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {([
              ["Passed or within 30 days", "high", "text-red-700"],
              ["31–90 days", "medium", "text-amber-700"],
              ["91–180 days", "low", "text-gray-700"],
            ] as const).map(([label, severity, color]) => (
              <div key={severity} className="border rounded-lg p-4">
                <div className="text-xs text-gray-500">{label}</div>
                <div className={`text-xl font-semibold ${color}`}>
                  {alerts.filter((alert) => alert.severity === severity).length}
                </div>
              </div>
            ))}
          </div>

          {alerts.length === 0 ? (
            <div className="border rounded-lg p-6 text-gray-600">
              No saved renewal dates fall within the next 180 days. Leases without a saved renewal date cannot generate a reminder.
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-6 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className={`font-semibold ${severityColor(alert.severity)}`}>{alert.title}</h2>
                    <span className={`text-xs uppercase ${severityColor(alert.severity)}`}>{alert.severity}</span>
                  </div>
                  <p className="text-sm text-gray-600">{alert.description}</p>
                  <Link
                    href={`/product/app/leases/${encodeURIComponent(alert.leaseId)}`}
                    className="inline-block text-sm font-medium text-black hover:underline"
                  >
                    View Saved Lease →
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 flex gap-4">
            <Link href="/product/app/leases" className="text-sm font-medium underline">View All Leases</Link>
            <Link href="/product/app/add-lease" className="text-sm font-medium underline">Add Lease</Link>
          </div>
        </>
      )}
    </main>
  );
}
