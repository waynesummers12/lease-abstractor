import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/nnn-audit-rights";

export const metadata: Metadata = {
  title: "NNN Audit Rights Explained",
  description: "Learn which lease provisions to read when reviewing NNN charges: records access, notice, timing, calculation detail, and possible corrections.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "NNN Audit Rights Explained | SaveOnLease",
    description: "A practical guide to the documents, steps, and lease-specific timing behind an NNN charge review.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const guides = [
  { href: pageUrl, label: "Audit rights" },
  { href: "/marketing/nnn-expenses-explained", label: "NNN expenses" },
  { href: "/marketing/nnn-reconciliation", label: "Reconciliation" },
  { href: "/marketing/non-allowable-cam-nnn-expenses", label: "Expenses to check" },
];

const leaseTerms = [
  { number: "01", title: "What can you see?", detail: "Find the records-access clause: categories, ledgers, invoices, tax bills, policies, and area schedules." },
  { number: "02", title: "When must you act?", detail: "Identify the event that starts the clock and any separate dates for requesting records, objecting, or completing a review." },
  { number: "03", title: "How must you notify?", detail: "Check the required recipient, delivery method, content, and address for written notices." },
  { number: "04", title: "What happens next?", detail: "Read the provisions for corrections, credits, audit costs, dispute resolution, and continued payment." },
];

const reviewQuestions = [
  { title: "Expense pool", detail: "Does the charge fit the lease definition of taxes, insurance, or CAM? Is it excluded, capped, or treated differently?" },
  { title: "Allocation", detail: "Do the premises area, denominator, cost pool, and any occupancy adjustment match the agreement and records?" },
  { title: "Fees and capital work", detail: "How are administrative fees, management costs, replacements, and amortization addressed?" },
  { title: "Credits and arithmetic", detail: "Were estimated payments, prior credits, and the tenant's share applied correctly?" },
];

const faqs = [
  { question: "Does every NNN lease give a tenant audit rights?", answer: "Do not assume so. Read the signed lease and amendments for records-access and review provisions, including any limits on their scope." },
  { question: "Is there a standard audit deadline?", answer: "No single period applies to every lease. The trigger, notice period, and audit procedure can differ, so check the exact agreement and the date the statement was received." },
  { question: "Does questioning a charge mean it is an overcharge?", answer: "No. A question calls for the lease clause, calculation, and supporting records. A recoverable amount cannot be established from a statement line alone." },
  { question: "What should I keep after sending a request?", answer: "Keep the statement, signed lease, the request and delivery proof, responses, and the records used for your calculation." },
];

const related = [
  { title: "NNN reconciliation", text: "Trace estimated payments, allocated actual costs, and the final balance.", href: "/marketing/nnn-reconciliation" },
  { title: "CAM reconciliation", text: "See how a shared-cost true-up is calculated and reviewed.", href: "/marketing/cam-reconciliation" },
  { title: "Audit window deadlines", text: "Find the timing and notice language in your agreement.", href: "/marketing/audit-window-deadlines" },
];

export default function NnnAuditRightsPage() {
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
          <div className="lg:self-start lg:pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your lease sets the process</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">Know what to request. <span className="text-[#a9e9be]">Know when to act.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">NNN audit and records-access provisions can help you examine taxes, insurance, and CAM charges. The signed lease tells you which records you may review, how to give notice, and which dates matter.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#lease-terms" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Read the four key terms ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">A practical review path</p>
            <div className="mt-6 space-y-3">
              {[["01 / Read the clause", "Find scope, timing, and notice requirements."], ["02 / Gather the statement", "Mark the categories and calculations to explain."], ["03 / Request detail", "Follow the lease procedure and retain proof."]].map(([title, detail]) => (
                <div key={title} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">The right to inspect records and any result of that review depend on the agreement and facts.</p>
          </div>
        </div>
      </section>

      <section id="lease-terms" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Start with the contract</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Four terms to find in your lease.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">There is no universal notice period or records list. Read the signed lease and amendments before relying on a generic timeline.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {leaseTerms.map((term) => (
            <article key={term.number} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{term.number}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{term.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{term.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">The date that matters</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Build a timeline from your own documents.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">Record when the annual statement was delivered or received, then apply the exact trigger and notice period in your lease. The date used for an audit election may differ from the time allowed to inspect records or submit an objection.</p>
            <p className="mt-4 text-sm leading-7 text-[#516073]">If a deadline or its consequences are unclear, seek advice from a qualified professional before it passes.</p>
          </div>
          <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Make a date record</p>
            <div className="mt-6 space-y-3">
              {[["Statement date", "What date appears on the reconciliation?"], ["Receipt date", "When and how did it reach you?"], ["Notice requirement", "What must be sent, to whom, and how?"], ["Next deadline", "What date follows from the signed clause?"]].map(([title, detail]) => (
                <div key={title} className="rounded-xl border border-[#cfe1d3] bg-white p-5">
                  <p className="font-semibold text-[#102c25]">{title}</p><p className="mt-2 text-sm leading-6 text-[#516073]">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Questions to support with records</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">What should you investigate?</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">A question is a starting point, not proof of an overcharge. Pair each item with the lease clause, statement calculation, and underlying detail.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {reviewQuestions.map((item) => (
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
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Keep your review organized</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Document the question and the response.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Keep the statement, lease, written requests, delivery proof, replies, and any calculations together. This makes a follow-up conversation more precise.</p>
          </div>
          <Link href="/marketing/cam-audit-checklist" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Use the CAM audit checklist ↗</Link>
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
          <p className="mt-8 text-xs leading-6 text-[#64748b]">For background on negotiating operating expense review provisions, see the <a href="https://www.americanbar.org/groups/real_property_trust_estate/resources/probate-property/2024-january-february/an-introduction-operating-expenses-commercial-leases/" target="_blank" rel="noopener noreferrer" className="text-[#006d57] underline underline-offset-4">American Bar Association&apos;s overview</a>. Your signed lease controls the process described on this page.</p>
        </div>
      </section>

      <section className="bg-[#102c25] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your next step</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Find the review terms in your lease.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement if you have one, then review the initial questions before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
