export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-3">
            Simple, ROI-Driven Pricing
          </h1>
          <p className="text-gray-600 text-sm">
            Most tenants uncover $5K–$20K in hidden lease costs
          </p>
        </div>

        {/* PRICING GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* FREE */}
          <div className="border rounded-xl p-8 text-center">
            <div className="text-sm text-gray-500 mb-1">Free</div>
            <div className="text-3xl font-medium mb-2">$0</div>
            <div className="text-xs text-gray-500 mb-6">Preview only</div>

            <div className="space-y-2 text-sm text-gray-700 mb-6">
              <div>✔ Lease scan (basic)</div>
              <div>✔ Risk flag preview</div>
              <div>✔ Estimated savings range</div>
              <div className="text-gray-400">✖ Full audit report</div>
              <div className="text-gray-400">✖ PDF download</div>
            </div>

            <a
              href="/app/step-1-upload"
              className="block w-full text-center border py-3 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Start Free
            </a>
          </div>

          {/* PRO */}
          <div className="border-2 border-black bg-gray-50 rounded-xl p-8 text-center shadow-sm relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
              Most Popular
            </div>

           <div className="text-sm text-gray-500 mb-1">Pro</div>
           <div className="text-3xl font-medium mb-2">$49.99</div>
            <div className="text-xs text-gray-500 mb-6">per lease</div>

            <div className="space-y-2 text-sm text-gray-700 mb-6">
              <div>✔ Full CAM / NNN audit</div>
              <div>✔ Overcharge detection</div>
              <div>✔ Admin fee analysis</div>
              <div>✔ Negotiation insights</div>
              <div>✔ Downloadable PDF</div>
            </div>

            <a
              href="/app/step-1-upload"
              className="block w-full text-center bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800"
            >
              Run Audit
            </a>
          </div>

          {/* ENTERPRISE */}
          <div className="border rounded-xl p-8 text-center">
            <div className="text-sm text-gray-500 mb-1">Enterprise</div>
            <div className="text-3xl font-medium mb-2">$99.99</div>
            <div className="text-xs text-gray-500 mb-6">per lease</div>

            <div className="space-y-2 text-sm text-gray-700 mb-6">
              <div>✔ Everything in Pro</div>
              <div>✔ Custom integrations</div>
              <div>✔ Portfolio-level insights</div>
              <div>✔ 3-audit leases included</div>
              <div>✔ Renewal timeline tracking</div>
              <div>✔ Risk scoring across leases</div>
              <div>✔ Priority support</div>
            </div>

            <a
              href="/app/step-1-upload"
              className="block w-full text-center border py-3 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Upgrade
            </a>
          </div>

        </div>

        {/* TRUST */}
        <div className="text-center text-xs text-gray-500 mt-12 space-y-1">
          <div>✔ 2,100+ leases analyzed</div>
          <div>✔ No long-term contracts</div>
          <div>✔ Secure checkout</div>
        </div>

      </div>
    </div>
  );
}