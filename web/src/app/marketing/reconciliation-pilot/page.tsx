import Link from "next/link";

export const metadata = {
  title: "CAM Reconciliation Review Pilot | SaveOnLease",
  description: "Request access to a founder-reviewed pilot comparing your commercial lease with an annual CAM or NNN reconciliation statement.",
};

export default async function ReconciliationPilotPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  return (
    <main className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">Founder-reviewed pilot</p>
      <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
        Have your annual CAM statement? Let&apos;s review it against your lease.
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">
        We&apos;re inviting a small group of commercial tenants to help shape a deeper reconciliation review. We&apos;ll compare the lease terms with billed categories and calculations, identify questions worth checking, and show which supporting records are missing.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-emerald-800">1. Request access</p>
          <p className="mt-2 text-sm text-slate-600">Leave your email below. No documents are collected on this page.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-emerald-800">2. Confirm the scope</p>
          <p className="mt-2 text-sm text-slate-600">We&apos;ll confirm availability, the review scope, timing, and price before requesting your files.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-emerald-800">3. Review together</p>
          <p className="mt-2 text-sm text-slate-600">Pilot reviews are prepared with founder involvement while we learn which checks should become part of the product.</p>
        </div>
      </div>

      <section className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-9" aria-labelledby="pilot-form-title">
        <h2 id="pilot-form-title" className="text-2xl font-semibold text-emerald-950">Request a pilot invitation</h2>
        <p className="mt-2 max-w-2xl text-sm text-emerald-950">
          This is for tenants with a commercial lease and an annual CAM or NNN reconciliation. The existing $49.99 checkout covers the lease-only report; a paired review is a separate pilot.
        </p>

        {status === "received" ? (
          <p role="status" className="mt-6 rounded-xl border border-emerald-300 bg-white p-4 text-sm font-medium text-emerald-950">
            Thanks. We recorded your interest and will contact you about the pilot. Please don&apos;t send documents until we provide intake instructions.
          </p>
        ) : (
          <>
            {status === "invalid" && <p role="alert" className="mt-5 text-sm font-medium text-red-800">Enter a valid email address.</p>}
            {status === "unavailable" && <p role="alert" className="mt-5 text-sm font-medium text-red-800">We couldn&apos;t save your request. Please try again or email audits@saveonlease.com.</p>}
            <form action="/api/reconciliation-pilot" method="post" className="mt-6 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label htmlFor="pilot-email" className="mb-2 block text-sm font-semibold text-emerald-950">Work email</label>
                <input id="pilot-email" name="email" type="email" required autoComplete="email" maxLength={254} placeholder="you@company.com" className="min-h-12 w-full rounded-lg border border-emerald-300 bg-white px-4 text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" />
              </div>
              <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="pilot-website">Website</label><input id="pilot-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
              <button type="submit" className="min-h-12 rounded-lg bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">Request access</button>
            </form>
            <p className="mt-4 text-xs text-emerald-900">We&apos;ll use your email to follow up about this pilot. See our <Link href="/marketing/privacy" className="underline">Privacy Policy</Link>.</p>
          </>
        )}
      </section>

      <div className="mt-10 grid gap-8 border-t border-slate-200 pt-10 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">What the pilot is building toward</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">The pilot aims to produce a cited comparison of lease rules and billed charges. The current automated checkout does not produce that paired review.</p>
          <p className="mt-4 text-sm text-slate-600">A sample of the paired review will be shared when the pilot scope is confirmed.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Need a lease review now?</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Our current automated report reviews your lease language, flags terms to verify, and gives you an action plan. It does not analyze an annual CAM statement.</p>
          <Link href="/app/step-1-upload" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline underline-offset-4">Start the free lease preview →</Link>
        </div>
      </div>
    </main>
  );
}
