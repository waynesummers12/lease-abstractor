"use client";

import Link from "next/link";

type AlertItem = {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
};

const mockAlerts: AlertItem[] = [
  {
    id: "1",
    title: "CAM Increase Detected",
    description: "Your CAM charges appear higher than the typical range for similar retail properties.",
    severity: "high",
  },
  {
    id: "2",
    title: "Escalation Clause Above Market",
    description: "This lease contains a 5% annual escalation which may exceed typical market averages.",
    severity: "medium",
  },
  {
    id: "3",
    title: "Audit Window Approaching",
    description: "Your CAM audit window may expire within the next 6 months.",
    severity: "low",
  },
];

function severityColor(severity: AlertItem["severity"]) {
  if (severity === "high") return "text-red-600";
  if (severity === "medium") return "text-yellow-600";
  return "text-gray-600";
}

export default function AlertsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Alerts</h1>
        <p className="text-gray-600">
          Monitor risks, cost increases, and upcoming deadlines across your lease portfolio.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border rounded-lg p-4">
          <div className="text-xs text-gray-500">High Risk</div>
          <div className="text-xl font-semibold text-red-600">
            {mockAlerts.filter(a => a.severity === "high").length}
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-xs text-gray-500">Medium Risk</div>
          <div className="text-xl font-semibold text-yellow-600">
            {mockAlerts.filter(a => a.severity === "medium").length}
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-xs text-gray-500">Low Risk</div>
          <div className="text-xl font-semibold text-gray-600">
            {mockAlerts.filter(a => a.severity === "low").length}
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {mockAlerts.map((alert) => (
          <div
            key={alert.id}
            className="border rounded-lg p-6 flex flex-col gap-3 hover:shadow-sm transition"
          >
            <div className="flex items-center justify-between">
              <div className={`font-semibold ${severityColor(alert.severity)}`}>
                {alert.title}
              </div>
              <span className={`text-xs uppercase ${severityColor(alert.severity)}`}>
                {alert.severity}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {alert.description}
            </div>
            <Link
              href="/app/step-1-upload"
              className="text-sm font-medium text-black hover:underline mt-2"
            >
              Investigate →
            </Link>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12">
        <Link
          href="/app/step-1-upload"
          className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800"
        >
          Run Audit (Free Preview)
        </Link>
      </div>

    </main>
  );
}
