import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/nnn-expenses-explained";

export const metadata: Metadata = {
  title: "NNN Expenses Explained",
  description: "Understand the three NNN expense groups—property taxes, insurance, and CAM—and what to compare with your commercial lease and annual statement.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "NNN Expenses Explained | SaveOnLease",
    description: "A practical guide to triple net charges and lease-specific review questions.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const guides = [
  { href: "/marketing/nnn-audit-rights", label: "Audit rights" },
  { href: pageUrl, label: "NNN expenses" },
  { href: "/marketing/nnn-reconciliation", label: "Reconciliation" },
  { href: "/marketing/non-allowable-cam-nnn-expenses", label: "Expenses to check" },
];

const categories = [
  { number: "01", title: "Property taxes", description: "Real estate taxes and assessments allocated under the lease.", question: "Which parcels, assessments, adjustments, and credits are included?", record: "Tax bill · assessment detail · allocation schedule" },
  { number: "02", title: "Insurance", description: "Building-related premiums the agreement permits the landlord to pass through.", question: "Which policies, limits, deductibles, and allocation method apply?", record: "Policy summary · premium invoice · allocation schedule" },
  { number: "03", title: "CAM", description: "Common area maintenance and shared operating costs defined by the lease.", question: "Which services, fees, projects, and exclusions are in the pool?", record: "Category ledger · invoices · CAM definition" },
];

const reviewPoints = [
  { title: "The definition", detail: "Find how the signed lease describes each NNN category and any specific exclusions or caps." },
  { title: "The allocation", detail: "Compare your premises area and the property denominator with the share used on the bill." },
  { title: "The statement", detail: "Trace actual costs, estimated payments, credits, and the resulting balance or refund." },
  { title: "The records", detail: "Request the source detail needed to explain a charge or a year-over-year change." },
];

const faqs = [
  { question: "What does NNN include?", answer: "Triple net generally refers to property taxes, insurance, and common area maintenance paid in addition to base rent. The signed lease defines which charges are actually passed through." },
  { question: "Do NNN costs always increase?", answer: "No. Actual costs can rise or fall. A tenant's billed amount also depends on estimates, credits, allocation, and any lease limits." },
  { question: "Is every cost in those categories allowed?", answer: "No. A category label alone does not establish that every charge in it complies with the lease. Check definitions, exclusions, calculations, and records." },
  { question: "How do I review a change in my NNN bill?", answer: "Compare the current and prior statements by category, confirm your share and credited payments, then use the lease and supporting records to explain the difference." },
];

const related = [
  { title: "Triple net lease", text: "Start with the structure of base rent and pass-through costs.", href: "/marketing/triple-net-lease" },
  { title: "NNN reconciliation", text: "See how estimates and actual allocated expenses become a true-up.", href: "/marketing/nnn-reconciliation" },
  { title: "Expenses to check", text: "Examine exclusions, fees, capital work, and allocation questions.", href: "/marketing/non-allowable-cam-nnn-expenses" },
];

export default function NnnExpensesExplainedPage() {
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
      <nav aria-label="NNN guides" className="border-b border-[#dbe6dc] bg-white px-6 py-4">
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
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">The cost beyond base rent</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">Three cost groups. <span className="text-[#a9e9be]">One lease to check.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">In a triple net lease, tenants generally pay a share of property taxes, insurance, and common area maintenance in addition to base rent. Your signed agreement defines the scope, allocation, limits, and billing process for each group.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#three-nets" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Explore the three nets ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">The payment picture</p>
            <div className="mt-6 space-y-3">
              {[["Base rent", "Set by the rent schedule"], ["+ Property taxes", "Your lease-defined share"], ["+ Insurance", "Your lease-defined share"], ["+ CAM", "Your lease-defined share"]].map(([title, detail]) => (
                <div key={title} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <span className="font-semibold text-white">{title}</span><span className="text-sm text-[#d9e9df]">{detail}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">A label on the bill does not prove that every amount charged under it is permitted.</p>
          </div>
        </div>
      </section>

      <section id="three-nets" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">What each net can contain</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Read beyond the category name.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">These are the usual groups, but the actual scope comes from the signed lease. Each deserves its own calculation and source records.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {categories.map((item) => (
            <article key={item.number} className="flex flex-col rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-9 w-9 items-center justify-center self-start rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{item.number}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{item.description}</p>
              <p className="mt-4 flex-1 border-t border-[#e0e9e1] pt-4 text-sm leading-7 text-[#425b50]"><span className="font-semibold text-[#102c25]">Ask: </span>{item.question}</p>
              <p className="mt-4 text-xs font-semibold leading-6 text-[#006d57]">{item.record}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Why the number changes</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">A higher bill is a question to explain.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">Taxes, premiums, and operating costs can change. So can the tenant-share calculation and the credits for estimates already paid. A change is not itself an error; compare the current and prior statements with the lease and source detail.</p>
            <Link href="/marketing/nnn-reconciliation" className="mt-6 inline-flex text-sm font-semibold text-[#006d57] underline underline-offset-4 hover:text-[#102c25]">See how the annual true-up works ↗</Link>
          </div>
          <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Compare like with like</p>
            <div className="mt-6 space-y-3">
              {[["Same category", "Did taxes, insurance, or CAM drive the change?"], ["Same allocation", "Did your share or the property cost pool change?"], ["Same credits", "Were your estimated payments fully applied?"], ["Same lease rules", "Were exclusions, caps, and fees handled correctly?"]].map(([title, detail]) => (
                <div key={title} className="rounded-xl border border-[#cfe1d3] bg-white p-5">
                  <h3 className="font-semibold text-[#102c25]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#516073]">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">A practical review</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Use four sources to understand the bill.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">The goal is to turn an unexplained amount into a precise question supported by the agreement and records.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {reviewPoints.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <h3 className="text-xl font-semibold tracking-tight text-[#102c25]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Keep the timeline in view</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Check records-access and notice terms.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">The lease may set a procedure and deadline for reviewing charges. Read it soon after the annual statement arrives and keep copies of any request.</p>
          </div>
          <Link href="/marketing/nnn-audit-rights" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Understand NNN audit rights ↗</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Continue the review</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Related guides.</h2>
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

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Common questions</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Before drawing a conclusion.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6">
                <h3 className="text-lg font-semibold text-[#102c25]">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-[#516073]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#102c25] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your next step</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">See your NNN terms together.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement if you have one, then review the initial questions before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
