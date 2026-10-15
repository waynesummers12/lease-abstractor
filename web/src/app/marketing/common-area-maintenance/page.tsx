import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/common-area-maintenance";

export const metadata: Metadata = {
  title: "Common Area Maintenance (CAM) Explained",
  description:
    "Understand CAM charges in commercial leases, how a tenant's share may be calculated, and which lease terms and records to check.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Common Area Maintenance (CAM) Explained | SaveOnLease",
    description: "A practical tenant guide to CAM charges, allocation, and annual reconciliations.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const examples = [
  { number: "01", title: "Shared upkeep", detail: "Landscaping, snow removal, lighting, and cleaning of shared areas." },
  { number: "02", title: "Parking and exterior", detail: "Routine parking lot maintenance, striping, and other shared exterior work." },
  { number: "03", title: "Services and management", detail: "Security, common-area repairs, and management costs where the lease permits them." },
];

const reviewItems = [
  { title: "What counts as CAM?", detail: "Compare each billed category with the lease's definitions, exclusions, and any amendments." },
  { title: "How is your share set?", detail: "Check the premises area, denominator, allocation method, and any changes between years." },
  { title: "Are there limits?", detail: "Look for caps, gross-up rules, fee limits, and treatment of capital work." },
  { title: "What can you verify?", detail: "Request invoices, ledgers, area schedules, and calculations for charges you cannot confirm." },
];

export default function CommonAreaMaintenancePage() {
  return (
    <main className="bg-[#f5f7f3] text-[#17243a]">
      <section className="relative overflow-hidden bg-[#102c25] px-6 py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Commercial lease guide</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Common Area Maintenance, <span className="text-[#a9e9be]">made clearer.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">
              CAM is a group of shared property costs that some commercial leases pass through to tenants. Learn what may be included, how charges are allocated, and what to check in your own lease and annual statement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
              <Link href="/marketing/cam-audit-checklist" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Get the free checklist ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">CAM at a glance</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Your share of shared costs.</h2>
            <p className="mt-4 text-sm leading-7 text-[#d9e9df]">The lease sets which costs can be charged and how they are divided. The statement shows what the landlord billed. You need both to ask useful questions.</p>
            <div className="mt-6 grid gap-3 border-t border-white/20 pt-6 text-sm text-[#d9e9df]">
              <p><span className="font-semibold text-white">Lease:</span> definitions, allocation, caps, exclusions</p>
              <p><span className="font-semibold text-white">Statement:</span> billed categories and your share</p>
              <p><span className="font-semibold text-white">Records:</span> detail needed to verify a charge</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">The basics</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">What is CAM in a commercial lease?</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">Common Area Maintenance usually refers to costs for operating and maintaining areas shared by tenants. It often appears in a triple net lease or a modified gross lease, but the exact definition varies by agreement.</p>
          <p className="mt-4 text-base leading-8 text-[#516073]">A tenant may pay a percentage of allowable expenses based on its <Link href="/marketing/pro-rata-share-explained" className="font-medium text-[#006d57] underline underline-offset-4">pro rata share</Link>. The lease may adjust that formula, define different pools of costs, or exclude certain expenses. For terminology, see our guides to <Link href="/marketing/cam-charges" className="font-medium text-[#006d57] underline underline-offset-4">CAM charges</Link> and <Link href="/marketing/cam-fee-meaning" className="font-medium text-[#006d57] underline underline-offset-4">CAM fees</Link>.</p>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Possible CAM categories</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">What might appear on the bill?</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#516073]">These are common examples, not a list of automatically permitted charges. Your lease controls what belongs in CAM.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {examples.map((item) => (
              <div key={item.number} className="rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{item.number}</span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#516073]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">The relationship</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">CAM and NNN are related, but not identical.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">In many <Link href="/marketing/nnn" className="font-medium text-[#006d57] underline underline-offset-4">NNN leases</Link>, tenants pay property taxes, insurance, and CAM in addition to base rent. CAM describes the maintenance component; NNN describes a broader lease structure. How each cost is billed still depends on your agreement.</p>
          <Link href="/marketing/cam-vs-nnn" className="mt-6 inline-flex text-sm font-semibold text-[#006d57] underline underline-offset-4 hover:text-[#102c25]">Compare CAM and NNN ↗</Link>
        </div>
        <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">A typical NNN breakdown</p>
          <div className="mt-6 grid gap-3">
            {[["Property taxes", "The tax component"], ["Insurance", "The insurance component"], ["CAM", "The shared maintenance component"]].map(([title, subtitle]) => (
              <div key={title} className="flex items-center justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4">
                <span className="font-semibold text-[#102c25]">{title}</span><span className="text-right text-sm text-[#516073]">{subtitle}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-[#516073]">The categories and obligations in your signed lease govern.</p>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Review your statement</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Four questions worth asking.</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#516073]">Potential issues often become visible when you compare the annual <Link href="/marketing/cam-reconciliation" className="font-medium text-[#006d57] underline underline-offset-4">CAM reconciliation</Link> with the lease and supporting records.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {reviewItems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6">
                <h3 className="text-lg font-semibold text-[#102c25]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#516073]">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 text-sm leading-7 text-[#516073]">For more examples, see <Link href="/marketing/cam-reconciliation-errors" className="font-medium text-[#006d57] underline underline-offset-4">CAM reconciliation errors</Link>. A question or unusual charge alone does not establish an overcharge; verify it against the lease and billing detail.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Free resource</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Put the questions to work.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Use the Tenant-First CAM Audit Checklist to review fees, capital costs, tenant share, and lease deadlines. It includes a worksheet and records request draft.</p>
          </div>
          <Link href="/marketing/cam-audit-checklist" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Explore the free checklist ↗</Link>
        </div>
      </section>

      <section className="bg-[#102c25] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your next step</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">See what your lease says about CAM.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement when you have one, then decide whether a full report is useful after seeing the initial results. Check your own <Link href="/marketing/audit-window-deadlines" className="font-medium underline underline-offset-4">audit and notice deadlines</Link> before taking action.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>
    </main>
  );
}
