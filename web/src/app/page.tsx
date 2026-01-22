export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24 text-center">
      {/* ================= HERO ================= */}
      <h1 className="mb-6 text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05]">
  CAM & NNN Lease Audit — Built for Tenants
</h1>

      <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
        Upload your commercial lease and uncover hidden CAM / NNN overcharges,
        uncapped expenses, and missed audit rights — before deadlines expire.
      </p>

      {/* PRIMARY + SECONDARY CTA */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href="/product/app"
          className="inline-flex items-center rounded-lg bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Start CAM Audit
        </a>

        <a
          href="/what-we-find"
          className="inline-flex items-center rounded-lg border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
        >
          See What We Check
        </a>
      </div>

      {/* TRUST STRIP */}
      <div className="mt-6 text-sm text-gray-500">
        Secure upload • No sales calls • Results in minutes
      </div>

      {/* ================= PROOF STATS ================= */}
      <section className="mt-16 grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border p-6">
          <div className="text-3xl font-bold">$5k–$25k</div>
          <div className="mt-1 text-sm text-gray-600">
            Typical avoidable CAM / NNN exposure identified
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <div className="text-3xl font-bold">30–120 days</div>
          <div className="mt-1 text-sm text-gray-600">
            Common audit and dispute deadlines in leases
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <div className="text-3xl font-bold">Tenant-first</div>
          <div className="mt-1 text-sm text-gray-600">
            No landlord tools. No broker bias.
          </div>
        </div>
      </section>

      {/* ================= VALUE GRID ================= */}
      <section className="mt-24 grid gap-12 text-left md:grid-cols-3">
        <div>
          <h3 className="mb-2 text-lg font-semibold">
            Identify Overcharges
          </h3>
          <p className="text-gray-600">
            Detect CAM and NNN costs that exceed caps, include non-allowable
            expenses, or shift landlord responsibilities to tenants.
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">
            Understand Your Risk
          </h3>
          <p className="text-gray-600">
            We flag audit windows, notice requirements, and reconciliation rules
            that determine whether recovery is still possible.
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">
            See the Dollar Impact
          </h3>
          <p className="text-gray-600">
            Get an estimated avoidable exposure amount and lease health score so
            you can decide if escalation is worth it.
          </p>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="mt-24 rounded-xl bg-gray-50 p-10 text-left">
        <h2 className="mb-6 text-2xl font-semibold text-center">
          How It Works
        </h2>

        <ol className="grid gap-6 md:grid-cols-3">
          <li>
            <div className="mb-2 font-semibold">1. Upload Your Lease</div>
            <p className="text-gray-600">
              Securely upload your commercial lease PDF — amendments and exhibits
              supported.
            </p>
          </li>

          <li>
            <div className="mb-2 font-semibold">2. Automated Review</div>
            <p className="text-gray-600">
              We analyze CAM definitions, NNN pass-throughs, admin fees,
              exclusions, caps, and audit clauses.
            </p>
          </li>

          <li>
            <div className="mb-2 font-semibold">3. Actionable Results</div>
            <p className="text-gray-600">
              Receive a plain-English summary, risk flags, estimated savings, and
              a downloadable audit report.
            </p>
          </li>
        </ol>
      </section>

      {/* ================= SCREENSHOT PLACEHOLDER ================= */}
      <section className="mt-24">
        <div className="mx-auto max-w-3xl rounded-xl border bg-white p-6 text-left">
          <div className="mb-2 text-sm font-semibold text-gray-500">
            Sample Audit Summary (Redacted)
          </div>

          <div className="flex h-48 items-center justify-center rounded bg-gray-100 text-sm text-gray-500">
            Screenshot placeholder — add redacted audit image later
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="mt-24 text-center">
        <p className="mx-auto mb-6 max-w-xl text-gray-600">
          Used by SMB tenants nationwide to surface CAM / NNN issues before audit
          rights expire.
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




