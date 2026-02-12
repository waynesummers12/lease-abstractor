// src/app/marketing/page.tsx
import Link from "next/link";
import { DemoVideo } from "./components/DemoVideo";

export const metadata = {
  title: "CAM & NNN Lease Audit for Tenants | SaveOnLease",
  description:
    "Identify CAM and NNN overcharges in commercial leases. Upload your lease and receive a clear, tenant-first audit with estimated savings—no subscriptions.",
};

export default function MarketingHomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-20 text-center">
        <h1 className="mx-auto max-w-5xl text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05]">
          CAM & NNN Lease Audit
          <span className="block">Built for Tenants</span>
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-xl sm:text-2xl tracking-wide leading-relaxed text-gray-600">
          Upload your commercial lease and uncover hidden CAM / NNN overcharges,
          uncapped expenses, and missed audit rights
          <span className="block mt-1">— before deadlines expire.</span>
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/app/step-1-upload"
            className="rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
          >
            Start Free CAM Audit
          </Link>
          <Link
            href="/marketing/what-we-find"
            className="rounded-xl border px-8 py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
          >
            See What We Check
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Used by SMB tenants nationwide to surface CAM / NNN issues before audit
          rights expire.
        </p>
      </section>
      
      <p className="mb-6 text-center text-sm uppercase tracking-widest text-gray-500">
  2-minute walkthrough
</p>
       {/* DEMO VIDEO */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <DemoVideo />
      </section>

      {/* TRUST STRIP */}
      <section className="border-y bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-10 grid gap-6 md:grid-cols-3 text-center">
          <div>
            <p className="text-3xl font-semibold">$5k–$25k+</p>
            <p className="mt-1 text-gray-600">Common savings identified</p>
          </div>
          <div>
            <p className="text-3xl font-semibold">30–120 days</p>
            <p className="mt-1 text-gray-600">Typical audit windows</p>
          </div>
          <div>
            <p className="text-3xl font-semibold">One-time</p>
            <p className="mt-1 text-gray-600">No subscriptions or retainers</p>
          </div>
        </div>
      </section>

      {/* WHAT WE FIND */}
<section className="mx-auto max-w-7xl px-6 py-20">
  <div className="grid gap-12 md:grid-cols-2 items-start">

    {/* LEFT: WHAT WE FIND */}
    <div>
      <h2 className="text-4xl font-light tracking-tight">
        What We Find in CAM & NNN Audits
      </h2>

      <p className="mt-6 text-lg text-gray-700 leading-relaxed">
        We analyze your lease language and billed expenses to identify errors
        landlords often miss—or hope tenants won’t notice.
      </p>

      <ul className="mt-6 list-disc pl-6 space-y-2 text-gray-700 marker:text-green-600">
        <li>Administrative & management fees above lease limits</li>
        <li>Insurance and tax pass-throughs applied incorrectly</li>
        <li>Capital expenses shifted to tenants improperly</li>
        <li>Pro-rata share and square-footage errors</li>
        <li>Charges billed outside allowable audit periods</li>
      </ul>
    </div>

    {/* RIGHT: FREE PREVIEW CARD (UNCHANGED CONTENT) */}
    <div className="rounded-3xl border bg-white p-8 shadow-sm">
  <p className="text-lg font-bold uppercase tracking-[0.3em] text-green-600">
  FREE PREVIEW
</p>

  <p className="mt-3 text-4xl font-semibold text-gray-900">
    CAM / NNN Risk Scan
  </p>

      <p className="mt-4 text-gray-700">
        Upload your lease to receive a free CAM / NNN risk preview.
        See whether your lease contains provisions that commonly lead to
        overcharges — before deciding whether to unlock the full audit PDF.
      </p>

      <ul className="mt-6 space-y-3 text-gray-700 list-none">
        <li className="flex items-start gap-2">
          <span className="text-green-600">✔</span>
          <span>Lease language review (CAM & NNN clauses)</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-600">✔</span>
          <span>Identification of common overcharge risk patterns</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-600">✔</span>
          <span>Administrative & management fee risk flags</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-600">✔</span>
          <span>Capital expense & pro-rata responsibility checks</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-600">✔</span>
          <span>Preview results instantly — upgrade only if issues are found</span>
        </li>
      </ul>

      <Link
        href="/app/step-1-upload"
        className="mt-8 inline-flex w-full justify-center rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 transition"
      >
        Upload Lease (Free Preview)
      </Link>
    </div>
  </div>
</section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-4xl font-light tracking-tight text-center">
            How SaveOnLease Works
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            <div className="rounded-2xl border bg-white p-6">
              <h3 className="text-lg font-semibold">Upload</h3>
              <p className="mt-3 text-gray-700">
                Upload your commercial lease PDF—no formatting required.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6">
              <h3 className="text-lg font-semibold">Analyze</h3>
              <p className="mt-3 text-gray-700">
                We review CAM / NNN language, caps, exclusions, and allocations.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6">
              <h3 className="text-lg font-semibold">Review</h3>
              <p className="mt-3 text-gray-700">
                Receive a plain-English summary with risk flags and estimates.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6">
              <h3 className="text-lg font-semibold">Decide</h3>
              <p className="mt-3 text-gray-700">
                Use the audit to negotiate, dispute, or simply gain clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

{/* OUTCOME PREVIEW */}
<section className="mx-auto max-w-5xl px-6 py-24">
  <div className="text-center">
    <h2 className="text-4xl font-light tracking-tight">
      What Your Audit Reveals
    </h2>
    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
      Every lease is different. Your report highlights exposure ranges, lease
      language risks, and specific provisions that may be costing you money.
    </p>
  </div>

  <div className="mt-16 space-y-20">

    {/* Step 1 */}
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">
        1. Upload Your Lease
      </h3>
      <p className="text-gray-700 max-w-3xl">
        Submit your commercial lease agreement, including amendments. 
        No formatting is required — we securely analyze your lease as submitted.
      </p>
      <div className="rounded-2xl border shadow-sm overflow-hidden">
        <img
          src="/demo/lease-example.png"
          alt="Commercial lease document example"
          className="w-full h-auto"
        />
      </div>
    </div>

    {/* Step 2 */}
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">
        2. Instant Exposure Estimate (Free Analysis)
      </h3>
      <p className="text-gray-700 max-w-3xl">
        Immediately see an estimated avoidable exposure range based on 
        common CAM / NNN risk patterns in your lease — before any payment.
      </p>
      <div className="rounded-2xl border shadow-sm overflow-hidden">
        <img
          src="/demo/free-preview.png"
          alt="Free CAM NNN exposure preview example"
          className="w-full h-auto"
        />
      </div>
    </div>

    {/* Step 3 */}
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">
        3. Full CAM / NNN Audit Summary
      </h3>
      <p className="text-gray-700 max-w-3xl">
        Unlock a professional CAM / NNN Audit Summary detailing flagged risks,
        lease references, and exposure calculations specific to your lease.
      </p>
      <p className="text-gray-700 font-medium">
        Delivered as a professional PDF (typically 8–15 pages).
      </p>
      <div className="rounded-2xl border shadow-sm overflow-hidden">
        <img
          src="/demo/final-report.png"
          alt="Full CAM NNN audit PDF example"
          className="w-full h-auto"
        />
      </div>
    </div>

  </div>
</section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h2 className="text-5xl font-light tracking-tight">
          Don’t Leave CAM & NNN Errors Unchecked
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-700 leading-relaxed">
          Audit windows are short. Upload your lease today and see what your
          charges really allow.
        </p>
        <Link
          href="/app/step-1-upload"
          className="mt-10 inline-flex items-center rounded-xl bg-black px-10 py-5 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Start Your Free CAM Audit
        </Link>
      </section>
    </main>
  );
}
