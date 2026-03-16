

export default function PortfolioMonitoringPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">
        Lease Portfolio Monitoring
      </h1>

      <p className="text-gray-600 mb-8">
        SaveOnLease continuously monitors your commercial lease portfolio
        to detect cost increases, CAM reconciliation anomalies, and
        lease escalation risks across multiple locations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            Cost Increase Alerts
          </h2>
          <p className="text-sm text-gray-600">
            Receive alerts when CAM, NNN, or other operating expenses
            increase beyond expected thresholds.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            Portfolio-Level Insights
          </h2>
          <p className="text-sm text-gray-600">
            Compare lease costs and escalation trends across all
            locations in your portfolio.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            Automated Lease Analysis
          </h2>
          <p className="text-sm text-gray-600">
            Upload leases and let AI identify negotiation opportunities,
            hidden fees, and high-risk clauses.
          </p>
        </div>

      </div>

      <div className="mt-12">
        <a
          href="/app/step-1-upload"
          className="bg-black text-white px-6 py-3 rounded-md inline-block"
        >
          Upload Lease to Monitor
        </a>
      </div>
    </main>
  );
}