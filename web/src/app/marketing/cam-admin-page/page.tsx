import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/cam-admin-page";

export const metadata: Metadata = {
  title: "CAM Administrative Fees Explained",
  description: "Understand how CAM administrative fees are calculated, which costs may be in the fee base, and what to compare with your lease and annual statement.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "CAM Administrative Fees | SaveOnLease",
    description: "A practical guide to the rate, calculation base, and records behind CAM administrative fees.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const guideNav = [
  { href: "/marketing/cam-reconciliation", label: "Reconciliation" },
  { href: "/marketing/cam-reconciliation-errors", label: "Errors" },
  { href: "/marketing/cam-expense-caps", label: "Expense caps" },
  { href: pageUrl, label: "Admin fees" },
];

const checks = [
  { number: "01", title: "The rate", detail: "Find the fee percentage or other formula in the signed lease and amendments. Compare it with the statement." },
  { number: "02", title: "The base", detail: "Identify the exact costs multiplied by the rate. Ask whether taxes, insurance, utilities, capital work, or other fees belong in that base." },
  { number: "03", title: "Other charges", detail: "Look for management, supervision, payroll, and overhead entries that may cover related services. Their treatment depends on the lease." },
  { number: "04", title: "The allocation", detail: "Check whether the fee is calculated at the property level before your share is applied, and whether the same cost appears more than once." },
];

const records = [
  { title: "Signed lease and amendments", detail: "Fee clause, CAM definition, exclusions, caps, and allocation method." },
  { title: "Annual reconciliation", detail: "The stated fee, expense categories, and the tenant's share." },
  { title: "General ledger detail", detail: "The costs in the calculation base and any separate management charges." },
];

const faqs = [
  { question: "What is a CAM administrative fee?", answer: "It is a charge for administration or management of shared operating costs. A lease may express it as a percentage of certain expenses, a fixed amount, or another formula." },
  { question: "Is a stated percentage automatically permitted?", answer: "No. The calculation also depends on which costs the lease allows in the fee base and whether any exclusions, caps, or other conditions apply." },
  { question: "Can a management fee and an admin fee both appear?", answer: "They can appear as separate line items. Compare their purposes and calculations with the lease and underlying records before deciding whether they overlap." },
  { question: "How do I check the amount billed?", answer: "Find the lease formula, identify the base used on the statement, recalculate the fee, and request supporting detail for any unexplained differences." },
];

const related = [
  { title: "CAM reconciliation", text: "Trace the annual true-up from shared costs to your final balance.", href: "/marketing/cam-reconciliation" },
  { title: "Expense caps", text: "See how a lease limit may affect an administrative charge.", href: "/marketing/cam-expense-caps" },
  { title: "CAM reconciliation checklist", text: "Work through the statement and records in a practical order.", href: "/marketing/cam-reconciliation-checklist" },
];

export default function CamAdminFeesPage() {
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
          {guideNav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={item.href === pageUrl ? "page" : undefined} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${item.href === pageUrl ? "border-[#102c25] bg-[#102c25] text-white" : "border-[#dbe6dc] bg-white text-[#36554a] hover:border-[#006d57] hover:text-[#006d57]"}`}>{item.label}</Link>
          ))}
        </div>
      </nav>

      <section className="relative overflow-hidden bg-[#102c25] px-6 py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16">
          <div className="lg:self-start lg:pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Inside your CAM statement</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">A small percentage needs a <span className="text-[#a9e9be]">closer look.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">A CAM administrative fee may look simple on your annual statement. The rate, the costs it is applied to, and your share all matter. Use the signed lease and billing detail to understand the full calculation.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#fee-math" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">See the fee math ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">The three-part question</p>
            <div className="mt-6 space-y-3">
              {[[ "Rate", "What percentage or formula does the lease allow?" ], [ "Base", "Which expenses are included before the fee is calculated?" ], [ "Share", "How is the resulting amount allocated to you?" ]].map(([title, detail]) => (
                <div key={title} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">A fee is not an overcharge merely because it appears on the statement.</p>
          </div>
        </div>
      </section>

      <section id="fee-math" className="scroll-mt-28 mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Illustrative calculation</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">The fee base changes the answer.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">Suppose a statement applies a 10% fee to $80,000 of expenses. That produces an $8,000 fee before tenant allocation. If the lease excludes $20,000 from the fee base, the same rate would produce $6,000.</p>
          <p className="mt-4 text-sm leading-7 text-[#516073]">This is arithmetic only, not a claim that either amount is correct for your lease or that the difference is recoverable.</p>
        </div>
        <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Same rate · different base</p>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4"><span>Statement base × 10%</span><span className="font-semibold text-[#102c25]">$80,000 → $8,000</span></div>
            <div className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4"><span>Illustrative adjusted base × 10%</span><span className="font-semibold text-[#102c25]">$60,000 → $6,000</span></div>
            <div className="rounded-xl bg-[#102c25] px-5 py-4 font-semibold text-white">Verify which costs the signed lease puts in the fee base.</div>
          </div>
          <p className="mt-5 text-xs leading-6 text-[#516073]">The lease may also specify caps, exclusions, and how your share is applied.</p>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">A focused review</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Check more than the percentage.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">Fee language differs across leases. These four checks help you find the exact question to ask about your statement.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {checks.map((check) => (
              <article key={check.number} className="rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6 sm:p-7">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{check.number}</span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{check.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#516073]">{check.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Build an evidence trail</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Three documents tell the story.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">A percentage on its own rarely settles the question. Pair the fee clause with the annual calculation and the records behind it.</p>
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

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Then check the timing</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Read your review and notice terms.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">The lease controls how and when you may request records or question a reconciliation. Keep the statement date and any written requests together.</p>
          </div>
          <Link href="/marketing/nnn-audit-rights" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Understand audit rights ↗</Link>
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
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Find the fee terms in your lease.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement if you have one, then review the initial questions before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
