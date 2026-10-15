import Link from "next/link";
import type { Metadata } from "next";
import AnnualStatementEntry from "@/components/AnnualStatementEntry";

const pageUrl = "https://www.saveonlease.com/marketing/cam-reconciliation-checklist";

export const metadata: Metadata = {
  title: "CAM Reconciliation Checklist for Commercial Tenants",
  description:
    "Use this practical CAM reconciliation checklist to review tenant share, expense categories, fees, caps, records, and lease deadlines.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "CAM Reconciliation Checklist | SaveOnLease",
    description: "Eight focused checks to help commercial tenants review an annual CAM statement against their lease.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const checks = [
  { number: "01", title: "Start with the right documents", detail: "Put the signed lease, amendments, annual reconciliation, and any prior-year statements together before reviewing amounts." },
  { number: "02", title: "Check your tenant share", detail: "Compare the stated pro rata percentage, your premises area, and the building or pool denominator with the lease and area schedules." },
  { number: "03", title: "Review allowed categories", detail: "Match each billed expense group to the CAM definition and exclusions in your agreement." },
  { number: "04", title: "Inspect fees and markups", detail: "Look at administrative and management fees, their calculation base, and any negotiated limits." },
  { number: "05", title: "Question capital work", detail: "Identify large replacements or improvements and check how your lease treats capital costs and amortization." },
  { number: "06", title: "Test caps and gross-ups", detail: "Compare controllable-expense caps, vacancy adjustments, and other calculation rules with the statement." },
  { number: "07", title: "Compare years and estimates", detail: "Review year-over-year changes, prior estimates, credits, and the final amount due or refundable." },
  { number: "08", title: "Find the review deadline", detail: "Read your lease's notice, records-access, and audit provisions, then note the dates that apply to this statement." },
];

export default function CamReconciliationChecklistPage() {
  return (
    <main className="bg-[#f5f7f3] text-[#17243a]">
      <section className="relative overflow-hidden bg-[#102c25] px-6 py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Tenant-side review guide</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Review the CAM bill <span className="text-[#a9e9be]">with a plan.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">
              An annual reconciliation can be hard to read on its own. Use this eight-point checklist to compare it with your lease, identify questions, and gather the records needed to verify charges.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#checklist" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Explore the checklist ↓</a>
              <Link href="/marketing/cam-audit-checklist" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Get the full free PDF ↗</Link>
            </div>
            <p className="mt-4 text-xs text-[#b9d1c2]">A question to check is not a verified overcharge. Your lease and supporting records control.</p>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">The review in three moves</p>
            <div className="mt-6 space-y-5">
              {[
                ["01", "Compare", "Read the statement beside the signed lease."],
                ["02", "Clarify", "Mark calculations and categories you cannot confirm."],
                ["03", "Request", "Ask for the billing detail and check your notice deadline."],
              ].map(([number, title, detail]) => (
                <div key={number} className="flex gap-4 border-t border-white/20 pt-5">
                  <span className="text-sm font-bold text-[#a9e9be]">{number}</span>
                  <div><p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnnualStatementEntry />

      <section id="checklist" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Eight points to review</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Your CAM reconciliation checklist.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">Work through these in order. You may need the landlord&apos;s invoices, ledgers, or area schedules to answer some of them. Read more about how a <Link href="/marketing/cam-reconciliation" className="font-medium text-[#006d57] underline underline-offset-4">CAM reconciliation</Link> works if the statement is unfamiliar.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {checks.map((check) => (
            <article key={check.number} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{check.number}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{check.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{check.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Turn questions into next steps</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">What if something does not add up?</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">A changed tenant share, a large capital item, or a new fee is a reason to ask for detail. It is not proof of an error by itself. Compare the charge with your lease and request the records behind the calculation.</p>
            <Link href="/marketing/cam-reconciliation-errors" className="mt-6 inline-flex text-sm font-semibold text-[#006d57] underline underline-offset-4 hover:text-[#102c25]">See common reconciliation questions ↗</Link>
          </div>
          <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Records worth requesting</p>
            <ul className="mt-6 grid list-none gap-3 text-sm text-[#425b50]">
              {[
                "Category ledger and supporting invoices",
                "Rentable-area and tenant-share schedules",
                "Fee calculations and any cap or gross-up worksheet",
                "Prior-year statement and estimate history",
              ].map((item) => (
                <li key={item} className="rounded-xl border border-[#cfe1d3] bg-white px-5 py-4">✓ {item}</li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-6 text-[#516073]">Ask for the records your lease entitles you to inspect and keep a copy of your request.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">A deadline worth finding</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Check your lease&apos;s review window.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Your agreement may set notice, records-access, or audit deadlines tied to receiving the reconciliation. Find the actual dates in your lease rather than assuming a standard window applies.</p>
          </div>
          <Link href="/marketing/audit-window-deadlines" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Understand review deadlines ↗</Link>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-7 rounded-[28px] border border-[#dbe6dc] bg-[#f9fbf8] p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Free tenant field guide</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Want a worksheet you can keep?</h2>
            <p className="mt-4 text-sm leading-7 text-[#516073] sm:text-base">The eight-page Tenant-First CAM Audit Checklist has 25 practical checks, a working worksheet, and a records request draft.</p>
          </div>
          <Link href="/marketing/cam-audit-checklist" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#102c25] px-6 text-center text-sm font-semibold text-[#102c25] transition hover:bg-[#e9f4ec]">Explore the free PDF ↗</Link>
        </div>
      </section>

      <section className="bg-[#102c25] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your next step</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">See the terms in your own lease.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement if you have one and review the initial checks before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>
    </main>
  );
}
