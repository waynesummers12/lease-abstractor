import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/non-allowable-cam-nnn-expenses";

export const metadata: Metadata = {
  title: "CAM & NNN Expenses to Check",
  description: "See which CAM and NNN expense categories deserve a closer look, what lease language matters, and which billing records can confirm a charge.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "CAM & NNN Expenses to Check | SaveOnLease",
    description: "A document-based guide to reviewing expense categories, fees, capital work, and allocation.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const guides = [
  { href: "/marketing/nnn-audit-rights", label: "Audit rights" },
  { href: "/marketing/nnn-expenses-explained", label: "NNN expenses" },
  { href: "/marketing/nnn-reconciliation", label: "Reconciliation" },
  { href: pageUrl, label: "Expenses to check" },
];

const categories = [
  { number: "01", name: "Capital work and major repairs", question: "Does the lease exclude the work, allow it only in defined circumstances, or require amortization?", records: "Invoice · scope of work · in-service date · amortization schedule" },
  { number: "02", name: "Leasing and marketing costs", question: "Are costs of attracting or preparing space for another tenant excluded from operating expenses?", records: "CAM ledger · invoices · work description" },
  { number: "03", name: "Management and administrative fees", question: "Is there a percentage cap, a defined fee base, or a rule about overlapping services?", records: "Fee calculation · expense base · separate management charges" },
  { number: "04", name: "Legal and professional fees", question: "Does the lease distinguish property operations from leasing, financing, or tenant-specific disputes?", records: "Service description · invoices · statement category" },
  { number: "05", name: "Allocation and vacant space", question: "What area and allocation method does the lease require, and were they used this year?", records: "Property area schedule · allocation worksheet · prior-year comparison" },
];

const steps = [
  { title: "Capture the exact line", detail: "Record the statement description, amount, category, and page. A broad label does not reveal the underlying work." },
  { title: "Find the governing clause", detail: "Read the signed lease and amendments for definitions, exclusions, exceptions, caps, and allocation rules." },
  { title: "Identify whose amount it is", detail: "Distinguish a property-wide invoice from your calculated share and from a potential correction." },
  { title: "Request the supporting detail", detail: "Compare invoices, ledgers, and area schedules with the line item; mark what remains unknown." },
  { title: "Check the review procedure", detail: "Follow the agreement's records-access and notice terms when sending a written question." },
];

const faqs = [
  { question: "Are these expenses always excluded?", answer: "No. These are categories to investigate, not universal exclusions. The signed lease and facts behind a charge determine how it should be treated." },
  { question: "Can capital work ever be passed through?", answer: "Possibly. The answer depends on the project and any lease conditions, including exclusions, exceptions, or amortization requirements." },
  { question: "Is the landlord's full invoice my potential credit?", answer: "No. A property-wide amount must be traced through the lease-defined allocation and any other applicable terms before assessing a tenant-specific amount." },
  { question: "What if the statement provides only a summary?", answer: "Check the lease's records-access process and request the detail needed to understand the category and calculation." },
];

const related = [
  { title: "CAM reconciliation", text: "Follow the annual true-up from costs to tenant balance.", href: "/marketing/cam-reconciliation" },
  { title: "NNN expenses", text: "Understand the three cost groups before checking line items.", href: "/marketing/nnn-expenses-explained" },
  { title: "CAM admin fees", text: "Examine the rate, calculation base, and tenant share.", href: "/marketing/cam-admin-page" },
];

export default function ExpensesToCheckPage() {
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
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Look past the line item</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">Which costs belong in <span className="text-[#a9e9be]">your bill?</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">Some CAM and NNN categories deserve a closer look. A charge is not automatically improper because it appears on a common-exclusions list. The signed lease, work performed, and allocation decide the answer.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#categories" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Explore the five checks ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">The three-document check</p>
            <div className="mt-6 space-y-3">
              {[["The lease", "What is permitted, excluded, capped, or allocated?"], ["The annual statement", "What category, amount, credit, and share were billed?"], ["The records", "What work and calculation support the line?"]].map(([title, detail]) => (
                <div key={title} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">A lease preview can flag a term to verify; it cannot prove a specific amount was overcharged.</p>
          </div>
        </div>
      </section>

      <section id="categories" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Five categories to investigate</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Ask the lease, then ask the records.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">These are prompts for review, not universal exclusions. Keep the question and supporting documents together.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => (
            <article key={item.number} className="flex flex-col rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-9 w-9 items-center justify-center self-start rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{item.number}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{item.name}</h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-[#516073]"><span className="font-semibold text-[#102c25]">Check the lease: </span>{item.question}</p>
              <p className="mt-5 border-t border-[#e0e9e1] pt-4 text-xs font-semibold leading-6 text-[#006d57]">{item.records}</p>
            </article>
          ))}
          <div className="flex flex-col justify-center rounded-2xl border border-[#a5c9ae] bg-[#e9f4ec] p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Keep the distinction clear</p>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-[#102c25]">Question first. Conclusion after the records.</h3>
            <p className="mt-3 text-sm leading-7 text-[#425b50]">A category name can hide several different types of work. Get enough detail to compare the actual cost with the signed terms.</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">A repeatable review</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Take one line item from vague to verifiable.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">Use the same sequence for each questioned amount. It helps separate what the statement says from what the records can confirm.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((item, index) => (
              <article key={item.title} className="rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6 sm:p-7">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#516073]">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Watch the timing</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Find your lease&apos;s review procedure.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Notice and records-access periods vary by agreement. Read those terms soon after the annual statement arrives, and keep copies of requests and responses.</p>
          </div>
          <Link href="/marketing/nnn-audit-rights" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Understand audit rights ↗</Link>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Continue the review</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Related guides.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <div key={item.href} className="flex flex-col rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6">
                <h3 className="text-xl font-semibold text-[#102c25]">{item.title}</h3>
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
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Start with the documents you have.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Begin with a free lease preview. Add an annual statement and supporting PDFs if you have them, then review the initial questions before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
