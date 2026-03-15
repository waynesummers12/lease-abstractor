

export default function InsightsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">
        Lease Insights
      </h1>

      <p className="text-gray-600 mb-8">
        AI-generated insights about your commercial leases will appear here.
        SaveOnLease analyzes escalation clauses, CAM charges, and other lease
        terms to identify cost risks and negotiation opportunities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            Escalation Risk
          </h2>
          <p className="text-sm text-gray-600">
            Detect abnormal annual rent increases compared to market averages.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            CAM Cost Analysis
          </h2>
          <p className="text-sm text-gray-600">
            Identify unusual common area maintenance charges and potential
            overbilling.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            Lease Health Score
          </h2>
          <p className="text-sm text-gray-600">
            A summarized risk score for each lease based on financial exposure
            and unfavorable clauses.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="font-semibold mb-2">
            Negotiation Opportunities
          </h2>
          <p className="text-sm text-gray-600">
            Recommended negotiation points based on lease language and
            benchmarking data.
          </p>
        </div>

      </div>
    </main>
  );
}