import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/retail-lease-hub";

export const metadata: Metadata = {
  title: "Retail Lease Learning Center",
  description: "Explore practical retail lease guides to CAM, NNN, annual reconciliations, fees, allocation, and lease-specific review deadlines.",
  alternates: { canonical: pageUrl },
  openGraph: { title: "Retail Lease Learning Center | SaveOnLease", description: "A practical starting point for retail tenants reviewing shared costs and annual statements.", url: pageUrl, siteName: "SaveOnLease", type: "website" },
};

const retailNav = [
  { href: pageUrl, label: "Retail hub" },
  { href: "/marketing/franchise-cam-audit", label: "Franchise CAM" },
  { href: "/marketing/restaurant-nnn-overcharges", label: "Restaurant NNN" },
];

const guideCards = [
  { number: "01", title: "Start with your lease", text: "Find the definitions, exclusions, allocation rules, fee limits, and notice terms that shape your bill.", href: "/marketing/commercial-lease-audit", action: "Explore lease review" },
  { number: "02", title: "Follow the CAM true-up", text: "Trace estimated payments, actual costs, credits, and the resulting tenant balance.", href: "/marketing/cam-reconciliation", action: "Understand reconciliation" },
  { number: "03", title: "Understand NNN charges", text: "See how taxes, insurance, and common-area costs may be passed through under a triple net lease.", href: "/marketing/triple-net-lease", action: "Explore NNN" },
  { number: "04", title: "Examine admin fees", text: "Check the rate, calculation base, and possible overlap with other management charges.", href: "/marketing/cam-admin-page", action: "Review fee questions" },
  { number: "05", title: "Check expense categories", text: "Use the signed lease and supporting records to investigate capital work, leasing costs, and allocation.", href: "/marketing/non-allowable-cam-nnn-expenses", action: "See expenses to check" },
  { number: "06", title: "Protect your review window", text: "Find your agreement's notice, records-access, and audit procedures before a deadline passes.", href: "/marketing/nnn-audit-rights", action: "Understand audit rights" },
];

const focusAreas = [
  { title: "The space", detail: "What square footage and property area are used to calculate your share?" },
  { title: "The expenses", detail: "Which cost categories does the lease allow, limit, or exclude?" },
  { title: "The timing", detail: "When can you request records or question an annual statement?" },
];

const faqs = [
  { question: "What should I read first in a retail lease?", answer: "Start with the operating-expense definitions, tenant-share method, caps, exclusions, and notice or records-access terms. Amendments can change those provisions." },
  { question: "Does a large CAM increase mean I was overcharged?", answer: "No. An increase is a reason to compare the annual statement with the signed lease and supporting records. The increase alone does not establish an error." },
  { question: "Can I verify a charge from the statement alone?", answer: "Often not. A summary can reveal questions, but invoices, ledgers, area schedules, and fee calculations may be needed to understand the underlying amount." },
];

export default function RetailLeaseHubPage() {
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };

  return (
    <main className="bg-[#f5f7f3] text-[#17243a]">
      <nav aria-label="Retail and franchise guides" className="border-b border-[#dbe6dc] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2">
          {retailNav.map((item) => <Link key={item.href} href={item.href} aria-current={item.href === pageUrl ? "page" : undefined} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${item.href === pageUrl ? "border-[#102c25] bg-[#102c25] text-white" : "border-[#dbe6dc] bg-white text-[#36554a] hover:border-[#006d57] hover:text-[#006d57]"}`}>{item.label}</Link>)}
        </div>
      </nav>

      <section className="relative overflow-hidden bg-[#102c25] px-6 py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Retail lease learning center</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">Know what your store <span className="text-[#a9e9be]">is paying for.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">CAM, NNN, annual true-ups, and deadlines can be hard to connect. Use these guides to turn your retail lease and billing records into specific questions you can verify.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#guides" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Explore the guides ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Start a free lease preview ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">The retail cost map</p>
            <div className="mt-6 space-y-3">
              {[["01", "The lease", "What is shared, capped, excluded, or allocated?"], ["02", "The annual bill", "What was charged, credited, and assigned to your store?"], ["03", "The records", "Which invoices and calculations support the charge?"]].map(([number, title, detail]) => <div key={number} className="flex gap-4 rounded-xl border border-white/20 bg-white/10 p-4"><span className="text-sm font-bold text-[#a9e9be]">{number}</span><div><p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p></div></div>)}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">A line item is a question to investigate, not proof of an overcharge.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Where to focus</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Three questions behind your occupancy costs.</h2><p className="mt-5 text-base leading-8 text-[#516073]">A useful review starts with the terms that govern the charge, then follows the amount through the statement and supporting detail.</p></div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {focusAreas.map((item, index) => <div key={item.title} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7"><span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#516073]">{item.detail}</p></div>)}
        </div>
      </section>

      <section id="guides" className="scroll-mt-28 bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Choose your next question</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">The retail lease guides.</h2><p className="mt-5 text-base leading-8 text-[#516073]">Start wherever your statement or lease leaves a gap. Each guide points to the terms and records that can help answer it.</p></div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {guideCards.map((item) => <article key={item.number} className="flex flex-col rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6 transition hover:border-[#a5c9ae] hover:shadow-md sm:p-7"><span className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Guide {item.number}</span><h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{item.title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#516073]">{item.text}</p><Link href={item.href} className="mt-6 text-sm font-semibold text-[#006d57] underline underline-offset-4 hover:text-[#102c25]">{item.action} ↗</Link></article>)}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20"><div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Keep the dates close</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Your review window comes from your lease.</h2><p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">The agreement may set notice, records-access, or audit procedures after a reconciliation arrives. Read those terms early and retain the statement and your correspondence.</p></div><Link href="/marketing/nnn-audit-rights" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Understand audit rights ↗</Link></div></section>

      <section className="bg-white px-6 py-16 sm:py-20"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Common questions</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Before you draw a conclusion.</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{faqs.map((faq) => <div key={faq.question} className="rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6"><h3 className="text-lg font-semibold text-[#102c25]">{faq.question}</h3><p className="mt-3 text-sm leading-7 text-[#516073]">{faq.answer}</p></div>)}</div></div></section>

      <section className="bg-[#102c25] px-6 py-16 text-white sm:py-20"><div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your next step</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Start with the lease you have.</h2><p className="mt-4 text-base leading-8 text-[#d9e9df]">Begin with a free lease preview. Add an annual statement and supporting PDFs if you have them, then review the initial questions before deciding whether a full report is useful.</p></div><Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
