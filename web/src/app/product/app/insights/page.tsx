export default function LeaseIntelligencePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">
        Lease Intelligence & Cost Insights
      </h1>

      <p className="text-gray-600 mb-8">
        SaveOnLease analyzes commercial leases to identify CAM overcharges, escalation risks, and hidden cost drivers. Upload a lease to uncover savings opportunities and gain clear, actionable insights across your portfolio.
      </p>

      <div className="mt-8 flex gap-3">
        <a
          href="/product/app/add-lease"
          className="border border-gray-300 px-6 py-3 rounded-md text-sm hover:bg-gray-100"
        >
          Add Lease to Portfolio
        </a>
        <a
          href="/app/step-1-upload"
          className="bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800"
        >
          Run Audit (Free Preview)
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-2">CAM Overcharge Detection</h3>
          <p className="text-sm text-gray-600">
            Identify inflated common area maintenance costs and administrative fees.
          </p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-2">Escalation Risk Analysis</h3>
          <p className="text-sm text-gray-600">
            Understand how rent increases impact long-term lease costs.
          </p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-2">Negotiation Insights</h3>
          <p className="text-sm text-gray-600">
            Surface opportunities to reduce costs before renewal or renegotiation.
          </p>
        </div>
      </div>
    </main>
  );
}