import type { Metadata } from "next";
import Link from "next/link";

const pageUrl = "https://www.saveonlease.com/marketing/triple-net-lease-meaning";

export const metadata: Metadata = {
  title: "Triple Net Lease Meaning: NNN in Plain English",
  description:
    "A plain-English explanation of triple net (NNN) leases: taxes, insurance, CAM, tenant share, and the terms to check in your agreement.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Triple Net Lease Meaning | SaveOnLease",
    description: "Understand what NNN means and which expense terms your lease needs to define.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const nets = [
  { number: "01", title: "Property taxes", detail: "A defined share of taxes for the property or project described in the lease." },
  { number: "02", title: "Insurance", detail: "A defined share of insurance costs the lease allows the landlord to pass through." },
  { number: "03", title: "Common area maintenance", detail: "A defined share of permitted shared-area operating and maintenance costs." },
];

const leaseQuestions = [
  { title: "What is included?", detail: "Find the definitions and exclusions for taxes, insurance, and CAM. A category name is not permission for every cost inside it." },
  { title: "How is your share set?", detail: "Check the area, denominator, cost pool, and any allocation changes allowed by the lease." },
  { title: "What can change?", detail: "Look for estimated payments, annual reconciliations, caps, administrative fees, and escalation terms." },
  { title: "How can you check a bill?", detail: "Read the notice and records-access provisions, then request the detail behind charges you cannot verify." },
];

const related = [
  { title: "The full NNN guide", text: "Explore tenant share, annual true-ups, and a worked cost example.", href: "/marketing/triple-net-lease" },
  { title: "NNN vs. gross", text: "Compare how the two lease structures assign operating costs.", href: "/marketing/triple-net-lease-vs-gross" },
  { title: "CAM reconciliation", text: "See how estimates and actual costs are compared each year.", href: "/marketing/cam-reconciliation" },
];

export default function TripleNetLeaseMeaningPage() {
  return (
    <main className="bg-[#f5f7f3] text-[#17243a]">
      <section className="relative overflow-hidden bg-[#102c25] px-6 py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Lease terms, made clear</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              What does <span className="text-[#a9e9be]">triple net</span> mean?
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">
              A triple net (NNN) lease generally requires a tenant to pay base rent plus a share of three property expense groups: taxes, insurance, and common area maintenance. The signed lease tells you what those shares include and how they are calculated.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#three-nets" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">See the three nets ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">NNN, in one line</p>
            <div className="mt-6 rounded-xl border border-white/20 bg-white/10 p-5">
              <p className="text-xl font-semibold leading-9 text-white sm:text-2xl">Base rent <span className="text-[#a9e9be]">+</span> taxes <span className="text-[#a9e9be]">+</span> insurance <span className="text-[#a9e9be]">+</span> CAM</p>
            </div>
            <p className="mt-5 text-sm leading-7 text-[#d9e9df]">That formula explains the structure. It does not tell you which costs are allowable, what your share is, or when a bill can be challenged. Those answers are in the lease and supporting records.</p>
          </div>
        </div>
      </section>

      <section id="three-nets" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">The definition</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">The three “nets” are expense groups.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">These are common descriptions. Your agreement may narrow, expand, or allocate them differently, so read its exact language.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {nets.map((net) => (
            <article key={net.number} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{net.number}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{net.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{net.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-7 text-sm leading-7 text-[#516073]">CAM can include several shared-property costs, but inclusion depends on your lease. Read our <Link href="/marketing/common-area-maintenance" className="font-medium text-[#006d57] underline underline-offset-4">Common Area Maintenance guide</Link> for examples and review questions.</p>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">What the label leaves out</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">NNN explains who may pay. The lease explains how much.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">A tenant&apos;s total occupancy cost depends on base rent, the permitted expense categories, its share, and any changes over time. Many leases bill estimates during the year and compare them with actual costs in an annual reconciliation.</p>
            <Link href="/marketing/triple-net-lease" className="mt-6 inline-flex text-sm font-semibold text-[#006d57] underline underline-offset-4 hover:text-[#102c25]">Explore the full NNN guide ↗</Link>
          </div>
          <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">A simple illustration</p>
            <div className="mt-6 grid gap-3">
              <div className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4 text-sm text-[#425b50]"><span>Base rent</span><span className="font-semibold text-[#102c25]">$25 / sq ft</span></div>
              <div className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4 text-sm text-[#425b50]"><span>Taxes + insurance + CAM</span><span className="font-semibold text-[#102c25]">$11 / sq ft</span></div>
              <div className="flex justify-between gap-4 rounded-xl bg-[#102c25] px-5 py-4 text-sm font-semibold text-white"><span>Total</span><span>$36 / sq ft</span></div>
            </div>
            <p className="mt-5 text-xs leading-6 text-[#516073]">Arithmetic only. This is not a quote or forecast; your lease and property costs may differ.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Read before relying on the label</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Four questions for your own NNN lease.</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {leaseQuestions.map((item) => (
            <div key={item.title} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <h3 className="text-xl font-semibold tracking-tight text-[#102c25]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{item.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-7 text-sm leading-7 text-[#516073]">An unusual charge is a question to investigate, not proof of an overcharge. Check the signed terms and records before drawing a conclusion. The <Link href="/marketing/cam-audit-checklist" className="font-medium text-[#006d57] underline underline-offset-4">free CAM checklist</Link> can help organize that review.</p>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">NNN or gross?</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Compare the full cost structure.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">A gross lease may include some operating costs in rent, while an NNN lease generally bills them separately. Either structure can have adjustments. The written terms show what applies.</p>
          </div>
          <Link href="/marketing/triple-net-lease-vs-gross" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Compare NNN and gross ↗</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Keep learning</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Go one level deeper.</h2>
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
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">See the terms in your own lease.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement if you have one and review the initial checks before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>
    </main>
  );
}
