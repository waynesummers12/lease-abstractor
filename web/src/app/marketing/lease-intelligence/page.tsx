

export default function LeaseIntelligencePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">
        AI Lease Intelligence Platform
      </h1>

      <p className="text-gray-600 mb-8">
        SaveOnLease analyzes commercial leases to detect CAM overcharges,
        escalation risks, and negotiation opportunities. Upload your lease to
        instantly uncover potential savings and benchmark your costs against
        market data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            CAM Overcharge Detection
          </h2>
          <p className="text-sm text-gray-600">
            Automatically identify suspicious common area maintenance
            charges and administrative fees hidden in reconciliations.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            Lease Escalation Analysis
          </h2>
          <p className="text-sm text-gray-600">
            Analyze rent escalation clauses and compare them against
            market benchmarks to detect excessive increases.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            Negotiation Opportunities
          </h2>
          <p className="text-sm text-gray-600">
            Highlight clauses and expenses that can potentially be
            renegotiated with landlords.
          </p>
        </div>

      </div>

      <div className="mt-12">
        <a
          href="/app/step-1-upload"
          className="bg-black text-white px-6 py-3 rounded-md inline-block"
        >
          Upload Lease
        </a>
      </div>
    </main>
  );
}