

export default function LeasePortfolioSoftwarePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">
        Lease Portfolio Management Software
      </h1>

      <p className="text-gray-600 mb-8">
        SaveOnLease helps companies manage and analyze commercial leases across
        multiple locations. Detect CAM overcharges, track escalation clauses,
        and identify negotiation opportunities across your entire lease
        portfolio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            Portfolio Risk Detection
          </h2>
          <p className="text-sm text-gray-600">
            Automatically identify leases with high financial exposure,
            unfavorable clauses, or abnormal cost increases.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            CAM & NNN Cost Monitoring
          </h2>
          <p className="text-sm text-gray-600">
            Track common area maintenance and triple-net expenses across all
            properties to uncover unusual increases or hidden fees.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            AI Lease Analysis
          </h2>
          <p className="text-sm text-gray-600">
            Upload leases and receive automated insights about escalation
            clauses, cost exposures, and negotiation opportunities.
          </p>
        </div>

      </div>

      <div className="mt-12">
        <a
          href="/app/step-1-upload"
          className="bg-black text-white px-6 py-3 rounded-md inline-block"
        >
          Upload Lease to Analyze
        </a>
      </div>
    </main>
  );
}