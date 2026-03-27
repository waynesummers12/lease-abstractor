"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

type LeaseWithRisk = Lease & {
  diffDays: number | null;
};

export default function PortfolioPage() {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLease, setSelectedLease] = useState<LeaseWithRisk | null>(null);
  const [companyName] = useState<string>("SaveOnLease Client");
  const [confidential] = useState<boolean>(true);

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

  const leasesWithRisk = useMemo<LeaseWithRisk[]>(() => {
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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="SaveOnLease"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
          <div>
            <h1 className="text-2xl font-semibold">SaveOnLease</h1>
            <p className="text-gray-500 text-sm">
              Institutional Lease Risk Intelligence Platform
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href="/app/add-lease"
            className="border border-gray-300 px-4 py-2 text-sm rounded hover:bg-gray-100"
          >
            Add Lease
          </Link>
          <Link
            href="/app/step-1-upload"
            className="bg-black text-white px-4 py-2 text-sm rounded font-medium hover:bg-gray-800"
          >
            Run Audit (Free Preview)
          </Link>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            const headers = ["Property", "Lease Type", "SF", "Renewal", "Exposure"];
            const rows = sortedLeases.map(l => [
              l.property_name,
              l.lease_type ?? "",
              l.square_feet ?? "",
              l.renewal_date ?? "",
              l.estimated_exposure ?? 0
            ]);

            const csvContent =
              "data:text/csv;charset=utf-8," +
              [headers, ...rows]
                .map(e => e.join(","))
                .join("\n");

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "portfolio_export.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="text-sm px-4 py-2 bg-black text-white rounded"
        >
          Export CSV
        </button>
        <button
          onClick={() => {
            const now = new Date();

            const narrative = `
    As of ${now.toLocaleDateString()}, the portfolio consists of ${sortedLeases.length} active leases. 
    ${riskBuckets.critical} leases require immediate attention within 90 days. 
    Total modeled exposure across the portfolio is $${totalExposure.toLocaleString()}. 
    Renewal concentration over the next 12 months indicates elevated capital planning requirements.
  `;

            const monthlyExposure = Array(12).fill(0);

            sortedLeases.forEach(l => {
              if (!l.renewal_date) return;
              const diffMonths =
                (new Date(l.renewal_date).getFullYear() - now.getFullYear()) * 12 +
                (new Date(l.renewal_date).getMonth() - now.getMonth());

              if (diffMonths >= 0 && diffMonths < 12) {
                monthlyExposure[diffMonths] += l.estimated_exposure || 0;
              }
            });

            const maxExposure = Math.max(...monthlyExposure, 1);

            const chartBars = monthlyExposure
              .map((value, i) => {
                const height = (value / maxExposure) * 100;
                const x = i * 28;
                const y = 120 - height;
                return `<rect x="${x}" y="${y}" width="20" height="${height}" fill="#60a5fa" />`;
              })
              .join("");

            const html = `
    <html>
      <head>
        <title>${companyName} Portfolio Summary</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; background:#0f172a; color:#f1f5f9; }
          h1,h2,h3 { color:#ffffff; }
          .kpi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin:30px 0; }
          .kpi { background:#1e293b; padding:20px; border-radius:10px; }
          .kpi-title { font-size:12px; color:#94a3b8; }
          .kpi-value { font-size:24px; font-weight:bold; margin-top:5px; }
          table { width:100%; border-collapse:collapse; margin-top:30px; }
          th,td { border-bottom:1px solid #334155; padding:10px; font-size:12px; }
          th { background:#1e293b; }
          .chart { margin:40px 0; }
          .watermark {
            position:fixed;
            top:40%;
            left:20%;
            font-size:80px;
            color:rgba(255,255,255,0.05);
            transform:rotate(-30deg);
          }
        </style>
      </head>
      <body>
        ${confidential ? `<div class="watermark">CONFIDENTIAL</div>` : ""}

        <div style="display:flex; align-items:center; gap:15px; margin-bottom:30px;">
          <img src="https://saveonlease.com/logo.png" height="40" />
          <div>
            <h1 style="margin:0;">${companyName}</h1>
            <div style="color:#94a3b8; font-size:14px;">Institutional Lease Risk Intelligence</div>
          </div>
        </div>

        <h2>Executive Portfolio Summary</h2>
        <p style="color:#cbd5e1; font-size:14px; line-height:1.6;">${narrative}</p>

        <div class="kpi-grid">
          <div class="kpi">
            <div class="kpi-title">Total Leases</div>
            <div class="kpi-value">${sortedLeases.length}</div>
          </div>
          <div class="kpi">
            <div class="kpi-title">Critical (&lt;90 days)</div>
            <div class="kpi-value">${riskBuckets.critical}</div>
          </div>
          <div class="kpi">
            <div class="kpi-title">Total Exposure</div>
            <div class="kpi-value">$${totalExposure.toLocaleString()}</div>
          </div>
        </div>

        <div class="chart">
          <h3>12-Month Exposure Forecast</h3>
          <svg width="350" height="140" viewBox="0 0 350 140">
            ${chartBars}
          </svg>
        </div>

        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Lease Type</th>
              <th>Renewal</th>
              <th>Days</th>
              <th>Exposure</th>
            </tr>
          </thead>
          <tbody>
            ${sortedLeases
              .map(l => `
                <tr>
                  <td>${l.property_name}</td>
                  <td>${l.lease_type ?? ""}</td>
                  <td>${l.renewal_date ?? ""}</td>
                  <td>${l.diffDays ?? ""}</td>
                  <td>$${(l.estimated_exposure ?? 0).toLocaleString()}</td>
                </tr>
              `)
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;

            const win = window.open("", "_blank");
            if (!win) return;
            win.document.write(html);
            win.document.close();
            win.focus();
            win.print();
          }}
          className="text-sm px-4 py-2 bg-blue-600 text-white rounded ml-3"
        >
          Export Board PDF
        </button>
        <button
          onClick={() => {
            const now = new Date();
            const html = `
              <html>
                <head>
                  <title>${companyName} Portfolio Preview</title>
                  <style>
                    body { font-family: Arial, sans-serif; padding:40px; }
                    h1 { font-size:24px; }
                  </style>
                </head>
                <body>
                  <h1>${companyName} Portfolio Snapshot</h1>
                  <p>Generated ${now.toLocaleDateString()}</p>
                  <p>Total Leases: ${sortedLeases.length}</p>
                  <p>Total Exposure: $${totalExposure.toLocaleString()}</p>
                </body>
              </html>
            `;

            const win = window.open("", "_blank");
            if (!win) return;
            win.document.write(html);
            win.document.close();
            win.focus();
            win.print();
          }}
          className="text-sm px-4 py-2 bg-gray-200 text-black rounded ml-3"
        >
          Quick Print Preview
        </button>
      </div>

      {/* 12-Month Renewal Forecast */}
      <div className="border rounded-lg p-4">
        <p className="text-sm font-medium mb-4">12-Month Renewal Forecast</p>
        <svg width="100%" height="120" viewBox="0 0 400 120">
          {(() => {
            const now = new Date();
            const monthlyCounts = Array(12).fill(0);

            sortedLeases.forEach(l => {
              if (!l.renewal_date) return;
              const diffMonths =
                (new Date(l.renewal_date).getFullYear() - now.getFullYear()) * 12 +
                (new Date(l.renewal_date).getMonth() - now.getMonth());
              if (diffMonths >= 0 && diffMonths < 12) {
                monthlyCounts[diffMonths]++;
              }
            });

            const max = Math.max(...monthlyCounts, 1);
            const points = monthlyCounts
              .map((count, i) => {
                const x = (i / 11) * 380 + 10;
                const y = 100 - (count / max) * 80;
                return `${x},${y}`;
              })
              .join(" ");

            return <polyline fill="none" stroke="#2563eb" strokeWidth="3" points={points} />;
          })()}
        </svg>
      </div>

      {/* Grouped by Lease Type */}
      <div className="border rounded-lg p-4">
        <p className="text-sm font-medium mb-2">Portfolio Grouping</p>
        {Object.entries(
          sortedLeases.reduce((acc, lease) => {
            const key = lease.lease_type || "Unspecified";
            if (!acc[key]) acc[key] = [];
            acc[key].push(lease);
            return acc;
          }, {} as Record<string, typeof sortedLeases>)
        ).map(([type, leases]) => (
          <div key={type} className="flex justify-between text-sm py-1">
            <span>{type}</span>
            <span>{leases.length} leases</span>
          </div>
        ))}
      </div>

      {/* Top KPI Row */}
      <div className="sticky top-0 z-10 bg-white grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Leases</p>
          <p className="text-2xl font-bold">{sortedLeases.length}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Critical (&lt;90 days)</p>
          <p className="text-2xl font-bold text-red-600">{riskBuckets.critical}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Estimated Exposure</p>
          <p className="text-2xl font-bold text-red-600">
            ${totalExposure.toLocaleString()}
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Immediate Action</p>
          <p className="text-2xl font-bold">{riskBuckets.critical}</p>
        </div>
      </div>

      {/* Portfolio Heat Bar */}
      <div className="border rounded-lg p-4 space-y-3">
        <p className="text-sm text-gray-500">Portfolio Risk Distribution</p>
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="bg-red-600"
            style={{ width: `${(riskBuckets.critical / (sortedLeases.length || 1)) * 100}%` }}
          />
          <div
            className="bg-yellow-400"
            style={{ width: `${(riskBuckets.watch / (sortedLeases.length || 1)) * 100}%` }}
          />
          <div
            className="bg-green-500"
            style={{ width: `${(riskBuckets.safe / (sortedLeases.length || 1)) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Critical: {riskBuckets.critical}</span>
          <span>Watch: {riskBuckets.watch}</span>
          <span>Safe: {riskBuckets.safe}</span>
        </div>
      </div>

      {sortedLeases.length === 0 && (
        <div className="border rounded-lg p-8 text-center bg-gray-50">
          <h3 className="font-medium text-gray-700">No leases in portfolio</h3>
          <p className="text-sm text-gray-500 mt-2 mb-4">
            Upload a lease to manage it or run an audit to uncover hidden costs.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/app/add-lease"
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
      )}

      {/* Lease List */}
      <div className="border rounded-lg divide-y">
        {sortedLeases.map((lease) => {
          const isCritical = lease.diffDays !== null && lease.diffDays < 90;

          return (
            <div
              key={lease.id}
              className="p-4 space-y-3 hover:bg-gray-50 transition border-l-4 cursor-pointer"
              style={{
                borderColor:
                  lease.diffDays !== null && lease.diffDays < 90
                    ? "#dc2626"
                    : lease.diffDays !== null && lease.diffDays <= 180
                    ? "#facc15"
                    : "#22c55e",
              }}
            >
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
                    className="text-sm text-black font-medium hover:underline"
                  >
                    View Details →
                  </button>

                  {isCritical && (
                    <Link
                      href="/app/step-1-upload"
                      className="text-sm px-3 py-1 bg-black text-white rounded"
                    >
                      Run Audit
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
          <div className="bg-white w-full max-w-xl rounded-xl p-8 space-y-6 shadow-2xl">
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
