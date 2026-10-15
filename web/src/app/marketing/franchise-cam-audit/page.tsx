import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/franchise-cam-audit";

export const metadata: Metadata = {
  title: "Franchise CAM Lease Review",
  description: "A practical guide for franchise and multi-location tenants comparing CAM terms, annual statements, records, and review dates for each lease.",
  alternates: { canonical: pageUrl },
  openGraph: { title: "Franchise CAM Lease Review | SaveOnLease", description: "Review CAM and NNN questions one location and one lease at a time.", url: pageUrl, siteName: "SaveOnLease", type: "article" },
};

const retailNav = [
  { href: "/marketing/retail-lease-hub", label: "Retail hub" },
  { href: pageUrl, label: "Franchise CAM" },
  { href: "/marketing/restaurant-nnn-overcharges", label: "Restaurant NNN" },
];

const locationFields = [
  { label: "CAM definition", detail: "What costs are included or excluded?" },
  { label: "Tenant share", detail: "Which area and allocation method apply?" },
  { label: "Fee limits", detail: "Are there caps or defined calculation bases?" },
  { label: "Review date", detail: "When must you request records or give notice?" },
];

const reviewSteps = [
  { number: "01", title: "Collect the signed terms", detail: "Keep each lease and amendment with its location. Identify the provisions that govern shared costs, fees, and notice." },
  { number: "02", title: "Pair each annual statement", detail: "Match the statement to the right lease year and location. Note estimated payments, actual charges, and credits." },
  { number: "03", title: "Record questions separately", detail: "Flag a fee, capital item, or share calculation for that site without assuming another lease uses the same rule." },
  { number: "04", title: "Request the missing support", detail: "Use the lease's records-access procedure to ask for invoices, ledgers, area schedules, or fee calculations." },
];

const faqs = [
  { question: "Can I use one CAM rule for every franchise location?", answer: "Usually each signed lease and amendment needs its own review. Properties can use different definitions, caps, tenant-share methods, and notice procedures." },
  { question: "Does a repeated charge prove a portfolio-wide error?", answer: "No. A similar label across statements can be a useful prompt, but each amount must be checked against its own lease and supporting records." },
  { question: "Can a free lease preview verify an overcharge?", answer: "No. A preview can surface terms and questions to investigate. Confirming a billed amount requires the annual statement and, often, underlying records." },
  { question: "When should I review a reconciliation?", answer: "Read it promptly and check the notice and records-access periods in that lease. Deadlines vary by agreement." },
];

export default function FranchiseCamAuditPage() {
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };

  return (
    <main className="bg-[#f5f7f3] text-[#17243a]">
      <nav aria-label="Retail and franchise guides" className="border-b border-[#dbe6dc] bg-white px-6 py-4"><div className="mx-auto flex max-w-6xl flex-wrap gap-2">{retailNav.map((item) => <Link key={item.href} href={item.href} aria-current={item.href === pageUrl ? "page" : undefined} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${item.href === pageUrl ? "border-[#102c25] bg-[#102c25] text-white" : "border-[#dbe6dc] bg-white text-[#36554a] hover:border-[#006d57] hover:text-[#006d57]"}`}>{item.label}</Link>)}</div></nav>

      <section className="relative overflow-hidden bg-[#102c25] px-6 py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Franchise and multi-location leases</p><h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">Many locations. <span className="text-[#a9e9be]">Each lease has its own rules.</span></h1><p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">CAM and NNN charges can look similar across sites while the lease language differs. Build a clear question for each location before treating a charge as a pattern.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#review" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">See the review method ↓</a><Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview a lease ↗</Link></div></div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">One row per location</p><div className="mt-6 space-y-3">{[["Store A", "Check CAM cap and fee base"], ["Store B", "Confirm tenant-share area"], ["Store C", "Find statement notice date"]].map(([title, detail]) => <div key={title} className="flex items-start gap-4 rounded-xl border border-white/20 bg-white/10 p-4"><span aria-hidden="true" className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#a9e9be]" /><div><p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p></div></div>)}</div><p className="mt-5 text-xs leading-6 text-[#d9e9df]">Illustrative questions, not findings about a real portfolio.</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Build a location record</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Compare the same four fields at every site.</h2><p className="mt-5 text-base leading-8 text-[#516073]">A consistent checklist makes differences easier to spot while keeping each location tied to its own signed agreement.</p></div><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{locationFields.map((item, index) => <div key={item.label} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm"><span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{item.label}</h3><p className="mt-3 text-sm leading-7 text-[#516073]">{item.detail}</p></div>)}</div></section>

      <section id="review" className="scroll-mt-28 bg-white px-6 py-16 sm:py-20"><div className="mx-auto max-w-6xl"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">A repeatable review</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Move from site list to specific questions.</h2><p className="mt-5 text-base leading-8 text-[#516073]">Keep the evidence beside the location. That makes it easier to see what is known, what needs records, and which deadline applies.</p></div><div className="mt-9 grid gap-4 md:grid-cols-2">{reviewSteps.map((step) => <article key={step.number} className="rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6 sm:p-7"><span className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Step {step.number}</span><h3 className="mt-4 text-xl font-semibold tracking-tight text-[#102c25]">{step.title}</h3><p className="mt-3 text-sm leading-7 text-[#516073]">{step.detail}</p></article>)}</div></div></section>

      <section className="px-6 py-16 sm:py-20"><div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Keep the review grounded</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Similar labels can have different answers.</h2><p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">An admin fee, capital project, or tax charge needs to be checked against the relevant lease and records. A property-wide invoice is not the same as your tenant share or a recoverable amount.</p></div><Link href="/marketing/non-allowable-cam-nnn-expenses" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">See expenses to check ↗</Link></div></section>

      <section className="bg-white px-6 py-16 sm:py-20"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Continue learning</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Guides for your next question.</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{[{ title: "CAM reconciliation", text: "Trace the annual true-up for one location.", href: "/marketing/cam-reconciliation" }, { title: "Audit rights", text: "Find lease-specific notice and records-access terms.", href: "/marketing/nnn-audit-rights" }, { title: "CAM checklist", text: "Use a structured set of questions when reviewing a statement.", href: "/marketing/cam-audit-checklist" }].map((item) => <div key={item.href} className="flex flex-col rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6"><h3 className="text-xl font-semibold text-[#102c25]">{item.title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#516073]">{item.text}</p><Link href={item.href} className="mt-5 text-sm font-semibold text-[#006d57] underline underline-offset-4 hover:text-[#102c25]">Read the guide ↗</Link></div>)}</div></div></section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Common questions</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Before you compare locations.</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{faqs.map((faq) => <div key={faq.question} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm"><h3 className="text-lg font-semibold text-[#102c25]">{faq.question}</h3><p className="mt-3 text-sm leading-7 text-[#516073]">{faq.answer}</p></div>)}</div></section>

      <section className="bg-[#102c25] px-6 py-16 text-white sm:py-20"><div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your next step</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Begin with one lease.</h2><p className="mt-4 text-base leading-8 text-[#d9e9df]">Start a free preview to see lease terms and initial questions. Add an annual statement and supporting PDFs if you have them, then review what remains to be verified.</p></div><Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
