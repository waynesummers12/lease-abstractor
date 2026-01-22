export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 text-center">
      {/* HERO */}
      <h1 className="mb-4 text-4xl font-bold">
        CAM & NNN Lease Audit — Built for Tenants
      </h1>

      <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
        Upload your commercial lease and uncover hidden CAM / NNN overcharges,
        uncapped expenses, and missed audit rights — before it’s too late.
      </p>

      <a
        href="/product/app"
        className="inline-flex items-center rounded-lg bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
      >
        Start CAM Audit
      </a>

      {/* TRUST STRIP */}
      <div className="mt-6 text-sm text-gray-500">
        No sales calls • Secure upload • Results in minutes
      </div>

      {/* VALUE GRID */}
      <section className="mt-20 grid gap-10 text-left md:grid-cols-3">
        <div>
          <h3 className="mb-2 text-lg font-semibold">
            Find Overcharges
          </h3>
          <p className="text-gray-600">
            Identify CAM and NNN expenses that exceed caps, include non-allowable
            costs, or are improperly allocated to tenants.
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">
            Protect Your Audit Rights
          </h3>
          <p className="text-gray-600">
            Many leases require disputes within 30–120 days of reconciliation.
            Miss the window and overcharges become permanent.
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">
            See Dollar Impact Fast
          </h3>
          <p className="text-gray-600">
            Get a clear estimate of avoidable exposure and a lease health score
            so you know whether action is worth taking.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-24 rounded-xl bg-gray-50 p-10 text-left">
        <h2 className="mb-6 text-2xl font-semibold text-center">
          How It Works
        </h2>

        <ol className="grid gap-6 md:grid-cols-3">
          <li>
            <div className="mb-2 font-semibold">1. Upload Your Lease</div>
            <p className="text-gray-600">
              Securely upload your commercial lease PDF — no formatting or prep
              required.
            </p>
          </li>

          <li>
            <div className="mb-2 font-semibold">2. Automated Analysis</div>
            <p className="text-gray-600">
              We scan CAM, NNN, expense definitions, caps, exclusions, and audit
              clauses using tenant-first logic.
            </p>
          </li>

          <li>
            <div className="mb-2 font-semibold">3. Get Actionable Results</div>
            <p className="text-gray-600">
              Receive a clear summary, risk flags, estimated savings, and a
              downloadable audit report.
            </p>
          </li>
        </ol>
      </section>

      {/* URGENCY / CTA */}
      <section className="mt-20 text-center">
        <p className="mx-auto mb-6 max-w-xl text-gray-600">
          CAM and NNN overcharges often go unnoticed for years — but once audit
          deadlines pass, recovery becomes difficult or impossible.
        </p>

        <a
          href="/product/app"
          className="inline-flex items-center rounded-lg bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Start Your CAM Audit
        </a>
      </section>
    </main>
  );
}



