import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Burger Restaurant Lease Audit | CAM & NNN Review",
  description:
    "Review CAM and NNN terms in a burger restaurant lease, compare an annual statement, and organize the records needed to verify a billing question.",
  alternates: {
    canonical: "https://www.saveonlease.com/marketing/burger-restaurant-lease-audit",
  },
};

const reviewAreas = [
  {
    title: "The expense rules",
    detail: "Identify the lease's CAM and NNN definitions, exclusions, caps, fee bases, and amendments.",
  },
  {
    title: "The store's share",
    detail: "Check the premises area, center area, allocation formula, and any separate pools for anchors or shared services.",
  },
  {
    title: "Restaurant-specific services",
    detail: "Ask how parking, drive-through areas, trash, grease service, utilities, and exclusive-use facilities were allocated when they appear on the statement.",
  },
  {
    title: "The annual true-up",
    detail: "Compare billed categories and visible arithmetic with estimated payments and credits already recorded.",
  },
  {
    title: "The next action",
    detail: "Locate the records-request procedure and notice language before deciding whether to ask a billing question or challenge a charge.",
  },
];

export default function BurgerRestaurantLeaseAuditPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-slate-800 sm:py-20">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">For burger franchise and multi-unit tenants</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Burger restaurant lease audit: where to start
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          A lease review identifies the rules for CAM and NNN expenses. An annual statement shows what was billed. Supporting records help establish whether a questioned charge was calculated and allocated as the lease requires.
        </p>
        <Link href="/app/step-1-upload" className="mt-7 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-slate-800">
          See a free lease preview
        </Link>
      </header>

      <section className="mt-14 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-950">Start with one location</h2>
        <p className="mt-3 leading-relaxed">Gather the signed lease and amendments, the latest CAM or NNN reconciliation, and any invoices or allocation schedules already available. Review each store against its own documents before comparing locations. A term that applies at one restaurant may not appear in another lease.</p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">What the review examines</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {reviewAreas.map((area) => (
            <article key={area.title} className="rounded-2xl border border-slate-200 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-950">{area.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{area.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-slate-600">Work through the <Link href="/marketing/burger-restaurant-cam-reconciliation-checklist" className="font-medium text-emerald-800 underline">restaurant CAM checklist</Link> for document-by-document questions.</p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">How multi-unit operators can compare stores</h2>
        <ol className="mt-5 list-decimal space-y-4 pl-5 leading-relaxed">
          <li>Use one row per location with the statement year, premises area, billed share, CAM, taxes, insurance, estimated payments, and true-up.</li>
          <li>Record the lease clause behind each cap, exclusion, or allocation rule. Do not assume a clause from another store applies.</li>
          <li>Flag unusual differences for review, then request the underlying schedules or invoices. A difference between stores is a prompt to investigate, not a verified overcharge.</li>
          <li>Track each lease's notice and records-review terms separately.</li>
        </ol>
        <p className="mt-5 text-slate-600">If you are comparing total occupancy cost with sales, use our <Link href="/marketing/how-much-rent-should-a-burger-restaurant-pay" className="font-medium text-emerald-800 underline">restaurant rent calculation guide</Link>. That business metric does not establish whether CAM was billed correctly.</p>
      </section>

      <section className="mt-16 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-950">What a finding means</h2>
        <p className="mt-3 leading-relaxed">A lease-only finding identifies language to check. A lease and statement may reveal a visible calculation difference. Confirming the reason and any tenant-level dollar effect may require invoices, area schedules, payment records, or other backup. The report should label those limits rather than present a question as a recovered amount.</p>
      </section>

      <section className="mt-16 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
        <h2 className="text-2xl font-semibold">Review your own lease and statement</h2>
        <p className="mt-3 leading-relaxed text-slate-200">Start with a free lease preview. Add an annual statement and up to four supporting PDFs before checkout if available. The $49.99 report summarizes relevant terms, visible billing questions, records to request, and what remains unverified.</p>
        <Link href="/app/step-1-upload" className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-slate-100">
          Upload a lease for a free preview
        </Link>
      </section>
    </main>
  );
}
