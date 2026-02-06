import Link from "next/link";

export const metadata = {
  title: "Lease Score Explained | SaveOnLease",
  description:
    "Understand how Lease Score evaluates CAM / NNN risk, escalation limits, and audit rights to show how tenant-favorable a commercial lease really is.",
};

export default function LeaseScorePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      {/* ---------- HERO ---------- */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Lease Score Explained
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Lease Score summarizes how tenant-favorable your commercial lease is
          for CAM / NNN charges, escalation limits, and audit rights — the terms
          that most often drive overcharges.
        </p>
      </section>

      {/* ---------- WHAT IT IS ---------- */}
      <section className="mt-20 rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">What Is Lease Score?</h2>
        <p className="mt-4 text-gray-700">
          Lease Score is a tenant-first assessment that evaluates the lease
          provisions most likely to affect your total occupancy cost — not just
          rent, but how CAM and NNN expenses are defined, limited, and enforced.
        </p>
        <p className="mt-4 text-gray-700">
          It reflects how commercial leases are typically interpreted during
          audits and disputes, based on real-world reconciliation outcomes.
        </p>
      </section>

      {/* ---------- SCORE BREAKDOWN ---------- */}
      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {/* LOW */}
        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h3 className="font-semibold text-green-900">Low Risk Lease</h3>
          <p className="mt-2 text-sm text-green-900">
            Strong tenant protections with defined CAM limits, excluded capital
            expenses, and enforceable audit rights. These leases typically limit
            unexpected cost increases.
          </p>
        </div>

        {/* MEDIUM */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="font-semibold text-amber-900">Medium Risk Lease</h3>
          <p className="mt-2 text-sm text-amber-900">
            Some tenant protections exist, but key terms are ambiguous or
            partially uncapped. These leases often require proactive monitoring
            to prevent overcharges.
          </p>
        </div>

        {/* HIGH */}
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h3 className="font-semibold text-red-900">High Risk Lease</h3>
          <p className="mt-2 text-sm text-red-900">
            Limited tenant protections with broadly defined or uncapped CAM /
            NNN charges. These leases are most likely to produce recoverable
            overcharges if audited promptly.
          </p>
        </div>
      </section>

      {/* ---------- WHY IT MATTERS ---------- */}
      <section className="mt-20 rounded-xl border bg-gray-50 p-8">
        <h2 className="text-2xl font-semibold">Why Lease Score Matters</h2>
        <p className="mt-4 text-gray-700">
          Most CAM / NNN disputes are governed by strict audit windows —
          typically <strong>30–120 days</strong> after reconciliation. Lease
          Score helps tenants quickly understand their exposure so they can act
          before recovery rights expire.
        </p>
        <p className="mt-4 text-gray-700">
          A higher-risk score doesn’t mean a lease is “bad” — it means timing,
          documentation, and audit strategy matter more.
        </p>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mt-20 rounded-2xl bg-black px-8 py-12 text-center text-white">
        <h2 className="text-2xl font-semibold">
          Want to know your Lease Score?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-300">
          Upload your commercial lease and receive a tenant-first CAM & NNN audit
          with clear findings, risk indicators, and estimated exposure.
        </p>

        <Link
          href="/app/step-1-upload"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-gray-200"
        >
          Start CAM & NNN Audit (Free Preview)
        </Link>
      </section>
    </main>
  );
}
