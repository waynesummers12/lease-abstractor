import Link from "next/link";

export const metadata = {
  title: "Pricing | SaveOnLease",
  description: "One $49.99 report: lease review with optional annual CAM or NNN statement and supporting record checks.",
};

export default function PricingPage() {
  return <main className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">One clear price</p>
    <h1 className="mt-4 text-4xl font-semibold text-slate-950 sm:text-6xl">Lease and statement clarity for $49.99</h1>
    <p className="mt-6 max-w-3xl text-lg text-slate-600">Start with a free lease preview. Before payment, add a text-readable annual statement and up to four supporting PDFs if you have them.</p>
    <section className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-10">
      <p className="text-4xl font-bold text-slate-950">$49.99 <span className="text-base font-normal text-slate-600">one-time</span></p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-700">
        <li>Page-linked lease expense terms and deadlines to verify</li>
        <li>Optional statement share and arithmetic checks where values can be extracted</li>
        <li>Supporting PDF inventory and remaining verification questions</li>
        <li>Downloadable PDF report after payment</li>
      </ul>
      <p className="mt-6 text-sm text-slate-700">Automated document screening does not verify invoice authenticity or prove an overcharge. Missing or unreadable values are labeled as unverified.</p>
      <Link href="/app/step-1-upload" className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-emerald-900 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800">Start free lease preview →</Link>
      <p><a href="/sample/lease-review-sample.pdf" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-emerald-900 underline">View sample lease report (PDF) ↗</a></p>
    </section>
  </main>;
}
