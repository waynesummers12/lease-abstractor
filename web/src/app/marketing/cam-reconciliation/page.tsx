import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/cam-reconciliation";

export const metadata: Metadata = {
  title: "CAM Reconciliation Explained",
  description: "Understand how annual CAM reconciliation compares estimated payments with actual allocated costs, what to check, and which records to request.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "CAM Reconciliation Explained | SaveOnLease",
    description: "A practical guide to reading and checking an annual CAM true-up.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const guides = [
  { href: pageUrl, label: "Reconciliation" },
  { href: "/marketing/cam-reconciliation-errors", label: "Errors" },
  { href: "/marketing/cam-expense-caps", label: "Expense caps" },
  { href: "/marketing/cam-admin-page", label: "Admin fees" },
];

const steps = [
  { number: "01", title: "Estimate", detail: "A budget sets the CAM payments collected during the year." },
  { number: "02", title: "Total", detail: "The landlord gathers actual shared operating costs for the period." },
  { number: "03", title: "Allocate", detail: "Your lease-defined share and any special rules are applied." },
  { number: "04", title: "True up", detail: "Estimated payments are credited against your allocated amount." },
];

const checks = [
  { title: "What is in the pool?", detail: "Compare each category with the lease's CAM definition, exclusions, and treatment of capital work." },
  { title: "How is your share set?", detail: "Check premises area, the denominator, occupancy adjustments, and any separate cost pools." },
  { title: "Were limits applied?", detail: "Review caps, fee formulas, and exceptions against the calculation shown." },
  { title: "What did you already pay?", detail: "Match monthly estimates, credits, and prior adjustments with your records." },
];

const records = [
  { title: "The signed lease", detail: "CAM definition, exclusions, allocation method, fees, caps, and review terms." },
  { title: "The annual statement", detail: "Actual costs, tenant share, estimated payments, and final balance or credit." },
  { title: "The supporting detail", detail: "Category ledger, invoices, area schedule, and calculations behind questioned items." },
];

const related = [
  { title: "CAM checklist", text: "Use a step-by-step review of the statement and lease.", href: "/marketing/cam-reconciliation-checklist" },
  { title: "Admin fees", text: "See how the rate, fee base, and tenant share interact.", href: "/marketing/cam-admin-page" },
  { title: "Expense caps", text: "Understand how a lease limit may change the result.", href: "/marketing/cam-expense-caps" },
  { title: "NNN reconciliation", text: "Put CAM in the wider taxes, insurance, and maintenance picture.", href: "/marketing/nnn-reconciliation" },
];

const faqs = [
  { question: "What is CAM reconciliation?", answer: "It is the comparison of estimated CAM payments with the tenant's calculated share of actual shared operating costs for a period, under the lease." },
  { question: "Does a balance due prove an error?", answer: "No. It shows that the statement's allocated costs exceed credited estimates. Review the lease terms and supporting records to assess the calculation." },
  { question: "What if I disagree with a charge?", answer: "Check the signed lease for records-access, objection, and notice requirements. Request the detail needed to explain the charge and keep copies of communications." },
  { question: "How long do I have to review it?", answer: "The timing varies by agreement. Read the exact notice and audit provisions promptly after receiving the statement." },
];

export default function CamReconciliationPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="bg-[#f5f7f3] text-[#17243a]">
      <nav aria-label="CAM guides" className="border-b border-[#dbe6dc] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2">
          {guides.map((item) => (
            <Link key={item.href} href={item.href} aria-current={item.href === pageUrl ? "page" : undefined} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${item.href === pageUrl ? "border-[#102c25] bg-[#102c25] text-white" : "border-[#dbe6dc] bg-white text-[#36554a] hover:border-[#006d57] hover:text-[#006d57]"}`}>{item.label}</Link>
          ))}
        </div>
      </nav>

      <section className="relative overflow-hidden bg-[#102c25] px-6 py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your annual CAM true-up</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">Turn a complex statement into <span className="text-[#a9e9be]">clear questions.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">CAM reconciliation compares the estimated shared costs you paid during the year with your lease-defined share of actual costs. Read the statement alongside your lease to understand what changed and why.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">See how it works ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">The annual comparison</p>
            <div className="mt-6 space-y-3">
              {[["Actual allocated CAM", "Your calculated share of allowed costs"], ["− Estimated payments", "Amounts already paid during the year"], ["= Balance or credit", "The statement's true-up result"]].map(([title, detail]) => (
                <div key={title} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">A balance alone does not establish whether the underlying charges are permitted.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">From budget to balance</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Four steps behind the true-up.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">Follow the sequence before deciding what to question. The signed lease supplies the rules for each step.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-4">
          {steps.map((step) => (
            <article key={step.number} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{step.number}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Illustrative calculation</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Watch the calculation from start to finish.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">Suppose a property reports $500,000 of CAM costs. A tenant with a 10% share is allocated $50,000. If it paid $42,000 in estimates, the statement shows an $8,000 balance before lease-specific adjustments or review of the underlying charges.</p>
            <p className="mt-4 text-sm leading-7 text-[#516073]">This example demonstrates arithmetic. It does not represent a typical property, an identified error, or a recoverable amount.</p>
          </div>
          <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Example year-end statement</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4"><span>Property CAM × tenant share</span><span className="font-semibold text-[#102c25]">$500,000 × 10%</span></div>
              <div className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4"><span>Tenant allocated CAM</span><span className="font-semibold text-[#102c25]">$50,000</span></div>
              <div className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4"><span>Estimated payments</span><span className="font-semibold text-[#102c25]">− $42,000</span></div>
              <div className="flex justify-between gap-4 rounded-xl bg-[#102c25] px-5 py-4 font-semibold text-white"><span>Statement balance</span><span>$8,000</span></div>
            </div>
            <p className="mt-5 text-xs leading-6 text-[#516073]">Next: verify the cost pool, tenant share, caps, fees, and payment credits.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">What to inspect</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Four checks before you draw a conclusion.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">A surprising amount may be permitted, excluded, capped, or allocated differently under the agreement. Check the calculation in this order.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {checks.map((check) => (
            <article key={check.title} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <h3 className="text-xl font-semibold tracking-tight text-[#102c25]">{check.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{check.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Build the evidence trail</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Bring the right documents together.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">A statement is a summary. The lease and underlying records help explain how each category and allocation was calculated.</p>
          </div>
          <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
            <div className="space-y-3">
              {records.map((record) => (
                <div key={record.title} className="rounded-xl border border-[#cfe1d3] bg-white p-5">
                  <h3 className="font-semibold text-[#102c25]">{record.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#516073]">{record.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Keep the timeline in view</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Check your lease&apos;s review terms.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Notice periods and records-access procedures vary. Read them soon after receiving the reconciliation and keep copies of your requests.</p>
          </div>
          <Link href="/marketing/audit-window-deadlines" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Understand review deadlines ↗</Link>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Continue the review</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Related guides.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {related.map((item) => (
              <div key={item.href} className="flex flex-col rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6">
                <h3 className="text-lg font-semibold text-[#102c25]">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#516073]">{item.text}</p>
                <Link href={item.href} className="mt-5 text-sm font-semibold text-[#006d57] underline underline-offset-4 hover:text-[#102c25]">Read the guide ↗</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Common questions</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Before drawing a conclusion.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#102c25]">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#102c25] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your next step</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Review your lease and annual statement together.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement if you have one, then review the initial questions before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
