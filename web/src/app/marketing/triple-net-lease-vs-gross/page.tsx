import type { Metadata } from "next";
import Link from "next/link";

const pageUrl = "https://www.saveonlease.com/marketing/triple-net-lease-vs-gross";

export const metadata: Metadata = {
  title: "Triple Net vs. Gross Lease: What Tenants Should Compare",
  description:
    "Compare triple net and gross commercial leases, including who pays operating costs, how expenses can change, and which terms tenants should check.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Triple Net vs. Gross Lease | SaveOnLease",
    description: "A practical side-by-side guide to operating costs in NNN and gross leases.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const comparison = [
  { label: "Starting payment", nnn: "Base rent plus separately billed expense shares", gross: "Rent that typically includes some operating costs" },
  { label: "Taxes, insurance, CAM", nnn: "Often charged to the tenant under lease terms", gross: "Often included in rent, subject to lease adjustments" },
  { label: "Annual changes", nnn: "Expense estimates and actual costs may change", gross: "Rent or expense adjustments may still apply" },
  { label: "What to review", nnn: "Expense definitions, share, caps, and reconciliation", gross: "Base year, expense stops, escalation, and exclusions" },
];

const questions = [
  { number: "01", title: "Which costs are included?", detail: "Find the lease's exact definition of rent and operating expenses. A label like “gross” or “NNN” does not replace the written terms." },
  { number: "02", title: "How can charges change?", detail: "Check annual estimates, reconciliation, base-year provisions, expense stops, and rent increases." },
  { number: "03", title: "What limits apply?", detail: "Look for exclusions, caps, fee limits, gross-up rules, and treatment of capital costs." },
  { number: "04", title: "How do you verify a bill?", detail: "Read the notice window and records-access terms, then compare the statement with invoices and allocation schedules." },
];

const related = [
  { title: "Triple net leases", text: "Understand taxes, insurance, CAM, and how an NNN bill is built.", href: "/marketing/triple-net-lease" },
  { title: "CAM reconciliation", text: "See how estimates and actual expenses are compared each year.", href: "/marketing/cam-reconciliation" },
  { title: "Audit window deadlines", text: "Find the review and notice terms that apply to your lease.", href: "/marketing/audit-window-deadlines" },
];

export default function TripleNetLeaseVsGrossPage() {
  return (
    <main className="bg-[#f5f7f3] text-[#17243a]">
      <section className="relative overflow-hidden bg-[#102c25] px-6 py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-16">
          <div className="lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Commercial lease comparison</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Triple net or gross? <span className="text-[#a9e9be]">Follow the costs.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">
              The difference is how a lease assigns and adjusts property operating costs. Compare the total payment, the terms behind it, and what can change after signing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#comparison" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Compare the structures ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">The short version</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-white/20 bg-white/10 p-5">
                <h2 className="text-lg font-semibold text-white">Triple net (NNN)</h2>
                <p className="mt-2 text-sm leading-6 text-[#d9e9df]">Base rent, plus separately defined shares of taxes, insurance, and CAM.</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 p-5">
                <h2 className="text-lg font-semibold text-white">Gross</h2>
                <p className="mt-2 text-sm leading-6 text-[#d9e9df]">Rent typically includes some operating costs; adjustments may still be allowed.</p>
              </div>
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">The signed lease, not its label, defines the actual payment obligations.</p>
          </div>
        </div>
      </section>

      <section id="comparison" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Side by side</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">What changes between the two?</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">These are common patterns. Modified gross, base-year, and expense-stop clauses can make a gross lease look different from a fully inclusive rent arrangement.</p>
        </div>
        <div className="mt-9 overflow-hidden rounded-[26px] border border-[#dbe6dc] bg-white shadow-sm">
          <div className="hidden grid-cols-[.7fr_1fr_1fr] gap-6 bg-[#e9f4ec] px-6 py-5 text-sm font-bold text-[#102c25] md:grid">
            <span>Compare</span><span>Triple net (NNN)</span><span>Gross</span>
          </div>
          {comparison.map((row) => (
            <div key={row.label} className="grid gap-3 border-t border-[#e3ebe4] px-6 py-5 text-sm leading-6 md:grid-cols-[.7fr_1fr_1fr] md:gap-6">
              <h3 className="font-semibold text-[#102c25]">{row.label}</h3>
              <p className="text-[#516073]"><span className="font-semibold text-[#006d57] md:hidden">NNN: </span>{row.nnn}</p>
              <p className="text-[#516073]"><span className="font-semibold text-[#006d57] md:hidden">Gross: </span>{row.gross}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Look beyond base rent</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Compare the total occupancy cost.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">A lower base rent does not always mean a lower total payment. In an NNN lease, the tax, insurance, and CAM components can move with actual costs. In a gross lease, read the rent adjustment language before assuming the payment stays fixed.</p>
            <p className="mt-4 text-sm leading-7 text-[#516073]">The illustration shows how to add NNN components. It does not say a gross lease would cost the same amount.</p>
          </div>
          <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Illustrative NNN cost</p>
            <div className="mt-6 grid gap-3 text-sm text-[#425b50]">
              {[["Base rent", "$25 / sq ft"], ["Taxes", "$4 / sq ft"], ["Insurance", "$1 / sq ft"], ["CAM", "$6 / sq ft"]].map(([title, amount]) => (
                <div key={title} className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4"><span>{title}</span><span className="font-semibold text-[#102c25]">{amount}</span></div>
              ))}
              <div className="flex justify-between gap-4 rounded-xl bg-[#102c25] px-5 py-4 font-semibold text-white"><span>Total</span><span>$36 / sq ft</span></div>
            </div>
            <p className="mt-5 text-xs leading-6 text-[#516073]">For 5,000 sq ft, that is $180,000 per year in this arithmetic example. Actual terms and costs vary.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Read the actual terms</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Four questions for either lease.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">The lease&apos;s expense language matters more than the shorthand name on the cover page.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {questions.map((item) => (
            <div key={item.number} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{item.number}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Annual statements</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">If you receive a reconciliation, review it.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Compare the billed categories, allocation, credits, and any lease limits. A difference worth questioning needs supporting records before it becomes a verified error.</p>
          </div>
          <Link href="/marketing/cam-reconciliation-checklist" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Use the reconciliation checklist ↗</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Keep learning</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Explore related guides.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <div key={item.href} className="flex flex-col rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#102c25]">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-[#516073]">{item.text}</p>
              <Link href={item.href} className="mt-5 text-sm font-semibold text-[#006d57] underline underline-offset-4 hover:text-[#102c25]">Read the guide ↗</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#102c25] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your next step</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Find the expense terms in your lease.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview to see the extracted terms and initial checks. Add an annual statement if you have one, then decide whether the full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>
    </main>
  );
}
