import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/cam-reconciliation-errors";

export const metadata: Metadata = {
  title: "CAM Reconciliation Errors to Check",
  description: "Review six CAM reconciliation questions about expense categories, tenant share, capital work, fees, duplicates, and payment credits.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "CAM Reconciliation Errors to Check | SaveOnLease",
    description: "A practical, document-based guide to checking an annual CAM statement.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const guides = [
  { href: "/marketing/cam-reconciliation", label: "Reconciliation" },
  { href: pageUrl, label: "Errors" },
  { href: "/marketing/cam-expense-caps", label: "Expense caps" },
  { href: "/marketing/cam-admin-page", label: "Admin fees" },
];

const questions = [
  { number: "01", title: "Is the tenant share right?", detail: "Compare premises area, the denominator, and any separate cost pool or vacancy rule with the signed lease.", evidence: "Lease formula · area schedule · statement share" },
  { number: "02", title: "Does each category belong?", detail: "Match billed categories to the CAM definition, exclusions, caps, and any special treatment of utilities or services.", evidence: "Lease definition · category ledger" },
  { number: "03", title: "How was capital work treated?", detail: "Ask whether a replacement or improvement is allowed, whether amortization applies, and what project records support it.", evidence: "Lease clause · invoice · amortization schedule" },
  { number: "04", title: "Were fees calculated as agreed?", detail: "Check the administrative or management rate, the fee base, and whether other charges cover similar services.", evidence: "Fee clause · calculation · ledger" },
  { number: "05", title: "Does a charge appear twice?", detail: "Trace similar descriptions across CAM, tax, insurance, and other lines before deciding whether the same cost was billed twice.", evidence: "Detail ledger · invoices · billing categories" },
  { number: "06", title: "Were all payments credited?", detail: "Compare monthly estimates and prior credits with the amounts deducted in the year-end true-up.", evidence: "Payment history · statement credits" },
];

const reviewSteps = [
  { title: "Mark the line", detail: "Write down the charge, page, amount, and why it needs an explanation." },
  { title: "Find the clause", detail: "Locate the signed lease language that defines the category or calculation." },
  { title: "Ask for support", detail: "Request the underlying detail through the lease's records-access procedure." },
];

const faqs = [
  { question: "Does an unusual CAM charge prove an error?", answer: "No. It identifies a question. The lease language, calculation, and supporting records determine whether the charge was handled correctly." },
  { question: "Can capital work ever appear in CAM?", answer: "Possibly. The answer depends on the signed lease, the nature of the work, and any conditions such as amortization or exclusions." },
  { question: "How can I check for duplicate billing?", answer: "Compare the general ledger and invoices with the categories on the reconciliation. Similar labels alone do not prove the same cost was charged twice." },
  { question: "When should I request records?", answer: "Read the lease's notice and records-access provisions promptly after receiving the statement. Timing and delivery requirements vary." },
];

const related = [
  { title: "CAM reconciliation", text: "Understand the full annual true-up before checking line items.", href: "/marketing/cam-reconciliation" },
  { title: "CAM admin fees", text: "Examine the fee rate, calculation base, and tenant share.", href: "/marketing/cam-admin-page" },
  { title: "CAM audit checklist", text: "Use a structured review of the lease, statement, and records.", href: "/marketing/cam-audit-checklist" },
];

export default function CamReconciliationErrorsPage() {
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
          <div className="lg:self-start lg:pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">A sharper CAM review</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">Six questions hiding in a <span className="text-[#a9e9be]">year-end statement.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">A CAM reconciliation can leave important details behind a single total. Use your signed lease, the statement, and supporting records to test the allocation and each category before calling something an error.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#six-checks" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Explore the six checks ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">The evidence chain</p>
            <div className="mt-6 space-y-3">
              {[["01 / The lease", "What is permitted, excluded, or limited?"], ["02 / The statement", "What was charged and how was it allocated?"], ["03 / The records", "What supports the amount and calculation?"]].map(([title, detail]) => (
                <div key={title} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">A question is a reason to verify a charge, not proof of an overpayment.</p>
          </div>
        </div>
      </section>

      <section id="six-checks" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Where to look</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Turn vague concerns into specific checks.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">These issues are worth examining, but the answer is lease-specific. Each card shows the records that can help resolve the question.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {questions.map((item) => (
            <article key={item.number} className="flex flex-col rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-9 w-9 items-center justify-center self-start rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{item.number}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-[#516073]">{item.detail}</p>
              <p className="mt-5 border-t border-[#e0e9e1] pt-4 text-xs font-semibold leading-6 text-[#006d57]">{item.evidence}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">From concern to answer</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Keep every question traceable.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">A precise question is easier to investigate than a general claim that CAM is too high. Keep the statement page, lease section, requested records, and response together.</p>
          </div>
          <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
            <div className="space-y-3">
              {reviewSteps.map((step) => (
                <div key={step.title} className="rounded-xl border border-[#cfe1d3] bg-white p-5">
                  <h3 className="font-semibold text-[#102c25]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#516073]">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Review the timing</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Check your lease&apos;s notice procedure.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Records-access and objection periods vary. Read the signed clause soon after the statement arrives, and keep proof of any request you send.</p>
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
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Read your lease beside the CAM statement.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement if you have one, then review the initial questions before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
