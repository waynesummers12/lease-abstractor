import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/nnn-reconciliation";

export const metadata: Metadata = {
  title: "NNN Reconciliation Explained",
  description: "Learn how an annual NNN true-up compares estimated payments with allocated actual costs, what to check, and which records to request.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "NNN Reconciliation Explained | SaveOnLease",
    description: "A practical guide to reading an annual triple net reconciliation statement.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const guides = [
  { href: "/marketing/nnn-audit-rights", label: "Audit rights" },
  { href: "/marketing/nnn-expenses-explained", label: "NNN expenses" },
  { href: pageUrl, label: "Reconciliation" },
  { href: "/marketing/non-allowable-cam-nnn-expenses", label: "Expenses to check" },
];

const steps = [
  { number: "01", title: "Estimate", detail: "The landlord sets a budget for taxes, insurance, and CAM under the lease." },
  { number: "02", title: "Pay", detail: "You make estimated payments during the year, often alongside base rent." },
  { number: "03", title: "Compare", detail: "The annual statement allocates actual costs and credits your payments." },
  { number: "04", title: "Resolve", detail: "The result may be an additional balance or a credit, subject to the lease." },
];

const checks = [
  { title: "Expense categories", detail: "Compare tax, insurance, CAM, and fee lines with the lease definitions, exclusions, and caps." },
  { title: "Your share", detail: "Check the premises area, denominator, cost pools, and any change in allocation method." },
  { title: "Payment credits", detail: "Match the estimated payments you made with the credits shown on the statement." },
  { title: "Supporting records", detail: "Request the ledger, invoices, tax bills, policies, and area schedules needed to test a question." },
];

const faqs = [
  { question: "What is an NNN reconciliation?", answer: "It is an annual comparison of estimated NNN payments with the tenant's calculated share of actual taxes, insurance, and CAM costs under the lease." },
  { question: "Does an additional balance mean there is an overcharge?", answer: "No. A balance shows a difference between estimated payments and the statement's calculation. Check the lease and underlying records before drawing a conclusion." },
  { question: "How long do I have to review a statement?", answer: "Review and notice periods vary by lease. Read the signed agreement's timing and procedure promptly after receiving the statement." },
];

const related = [
  { title: "NNN expenses explained", text: "Understand the three cost groups before reading your statement.", href: "/marketing/nnn-expenses-explained" },
  { title: "Expenses to check", text: "See why a category needs lease language and supporting detail.", href: "/marketing/non-allowable-cam-nnn-expenses" },
  { title: "Audit rights", text: "Find the records, notice, and timing provisions in your agreement.", href: "/marketing/nnn-audit-rights" },
];

export default function NnnReconciliationPage() {
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
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">The annual NNN true-up</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">Make sense of the <span className="text-[#a9e9be]">year-end bill.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">An NNN reconciliation compares what you paid in estimates with your calculated share of actual property taxes, insurance, and common area costs. The statement shows the math; your lease and supporting records show what should be included.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Follow the true-up ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">One annual comparison</p>
            <div className="mt-6 space-y-3">
              {[["Actual allocated NNN", "Lease-defined share of allowed costs"], ["− Estimated payments", "Amounts already paid during the year"], ["= Balance or credit", "The statement's true-up result"]].map(([title, detail]) => (
                <div key={title} className="rounded-xl border border-white/20 bg-white/10 p-4"><p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p></div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">The result does not, by itself, establish that a charge is correct or incorrect.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">From budget to balance</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Four steps behind the statement.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">A reconciliation is a calculation to inspect. Follow each stage to see where a question may arise.</p>
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
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Illustrative example</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">See exactly what a true-up changes.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">Suppose a tenant paid $60,000 in estimated NNN charges during the year. The statement calculates $63,000 as its share of actual costs. The difference is $3,000 before any lease-specific adjustments or review of the underlying charges.</p>
            <p className="mt-4 text-sm leading-7 text-[#516073]">These numbers demonstrate the calculation only. They are not a typical bill, an identified error, or a savings estimate.</p>
          </div>
          <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Example year-end statement</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4"><span>Actual allocated costs</span><span className="font-semibold text-[#102c25]">$63,000</span></div>
              <div className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4"><span>Estimated payments</span><span className="font-semibold text-[#102c25]">− $60,000</span></div>
              <div className="flex justify-between gap-4 rounded-xl bg-[#102c25] px-5 py-4 font-semibold text-white"><span>Statement balance</span><span>$3,000</span></div>
            </div>
            <p className="mt-5 text-xs leading-6 text-[#516073]">Next: verify the allowed expense pool, allocation, and payment credits before deciding what the balance means.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Your review checklist</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Four places to ask better questions.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">Read the statement alongside your signed lease. An unusual line item may be allowed, excluded, capped, or allocated differently depending on the agreement.</p>
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
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Keep the clock in view</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Find your lease&apos;s review procedure.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Records-access and objection rights vary. Check the notice method, required documents, and deadlines soon after the annual statement arrives.</p>
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
          <div className="mt-8 grid gap-4 md:grid-cols-3">
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
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Bring your lease and statement together.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement if you have one, then review the initial questions before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
