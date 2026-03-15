export default function LeaseIntelligencePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">
        AI Lease Intelligence Platform
      </h1>

      <p className="text-gray-600 mb-8">
        SaveOnLease analyzes commercial leases to identify CAM overcharges,
        escalation risks, and negotiation opportunities. Upload your lease to
        instantly uncover potential savings and operational insights.
      </p>

      <div className="mt-8">
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