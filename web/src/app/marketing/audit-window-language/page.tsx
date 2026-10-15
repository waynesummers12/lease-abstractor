import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/audit-window-language";

export const metadata: Metadata = {
  title: "Audit Window Language Explained",
  description: "Learn how to read a commercial lease's CAM and NNN review clause: the trigger, action, period, recipient, delivery method, and possible consequence.",
  alternates: { canonical: pageUrl },
  openGraph: { title: "Audit Window Language Explained | SaveOnLease", description: "Read the words that control a CAM or NNN review window.", url: pageUrl, siteName: "SaveOnLease", type: "article" },
};

const guideNav = [
  { href: "/marketing/learn", label: "All guides" },
  { href: pageUrl, label: "Clause language" },
  { href: "/marketing/audit-window-deadlines", label: "Deadline guide" },
  { href: "/marketing/nnn-audit-rights", label: "Audit rights" },
];

const clauseParts = [
  { number: "01", title: "The trigger", question: "What starts the clock?", detail: "Look for words such as receipt, delivery, the statement date, or the end of the calendar year. Keep evidence of the event the lease names." },
  { number: "02", title: "The period", question: "How much time is allowed?", detail: "Identify the period for each action. Requesting records, objecting to a charge, and beginning an audit may have different clocks." },
  { number: "03", title: "The required act", question: "What must the tenant do?", detail: "The clause may call for written notice, a specific objection, a records request, or an election to audit. The verb matters as much as the number of days." },
  { number: "04", title: "The delivery rule", question: "Who receives it, and how?", detail: "Read the general notices section for the recipient, address, permitted method, and when a notice is considered given." },
];

const sampleRows = [
  { label: "Trigger", value: "Receipt of the annual reconciliation" },
  { label: "Period", value: "60 days in this fictional example" },
  { label: "Required act", value: "Written objection with disputed items identified" },
  { label: "Recipient", value: "The party named in the notices section" },
  { label: "Delivery", value: "The method the lease permits" },
];

const faqs = [
  { question: "Is there one standard audit window?", answer: "No. The signed lease and amendments set the relevant periods and triggering events. Different actions may have separate requirements." },
  { question: "Is asking for records the same as objecting?", answer: "Not necessarily. A lease may treat a records request, written objection, and formal audit election as different steps. Read each provision before assuming one preserves another." },
  { question: "Does a free preview send a notice for me?", answer: "No. A preview can surface language to check. It does not send an objection, request records, or preserve contractual rights." },
  { question: "What if I think a deadline has passed?", answer: "Review the full agreement, amendments, delivery evidence, and correspondence before concluding what options remain. A qualified adviser can help interpret the clause and circumstances." },
];

export default function AuditWindowLanguagePage() {
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };

  return <main className="bg-[#f5f7f3] text-[#17243a]">
    <nav aria-label="Lease audit guides" className="border-b border-[#dbe6dc] bg-white px-6 py-4"><div className="mx-auto flex max-w-6xl flex-wrap gap-2">{guideNav.map((item) => <Link key={item.href} href={item.href} aria-current={item.href === pageUrl ? "page" : undefined} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${item.href === pageUrl ? "border-[#102c25] bg-[#102c25] text-white" : "border-[#dbe6dc] bg-white text-[#36554a] hover:border-[#006d57] hover:text-[#006d57]"}`}>{item.label}</Link>)}</div></nav>

    <section className="relative overflow-hidden bg-[#102c25] px-6 py-16 text-white sm:py-20 lg:py-24"><div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" /><div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Audit window language</p><h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">Read the words. <span className="text-[#a9e9be]">Then mark the date.</span></h1><p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">An audit clause is more than a number of days. It tells you what event starts a period, what action to take, and how to deliver it. Those details determine the next step for your own lease.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#clause-parts" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Read the clause ↓</a><Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link></div></div><div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">Five questions in one clause</p><div className="mt-6 space-y-3">{[["When?", "What event starts the period?"], ["How long?", "Which period applies to this action?"], ["What?", "Is it a request, objection, or audit election?"], ["To whom?", "Who must receive the communication?"], ["How?", "What delivery method does the lease require?"]].map(([label, detail]) => <div key={label} className="flex gap-4 rounded-xl border border-white/20 bg-white/10 p-4"><span className="min-w-20 font-bold text-[#a9e9be]">{label}</span><span className="text-sm leading-6 text-[#d9e9df]">{detail}</span></div>)}</div><p className="mt-5 text-xs leading-6 text-[#d9e9df]">The signed lease, amendments, and actual delivery facts control.</p></div></div></section>

    <section id="clause-parts" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Break it into parts</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">A deadline only makes sense with its instructions.</h2><p className="mt-5 text-base leading-8 text-[#516073]">Read the review provision alongside amendments and the general notices section. Highlight each piece before calculating or relying on a date.</p></div><div className="mt-9 grid gap-4 md:grid-cols-2">{clauseParts.map((part) => <article key={part.number} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7"><span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{part.number}</span><h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{part.title}</h3><p className="mt-2 text-sm font-semibold text-[#006d57]">{part.question}</p><p className="mt-3 text-sm leading-7 text-[#516073]">{part.detail}</p></article>)}</div></section>

    <section className="bg-white px-6 py-16 sm:py-20"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">A worked reading example</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">“Within 60 days” is only the middle of the sentence.</h2><p className="mt-5 text-base leading-8 text-[#516073]">Imagine a clause requiring a written objection identifying disputed items within 60 days after receipt of an annual reconciliation. To use it, you still need to establish receipt, name the disputed items, and follow the lease’s notice procedure.</p><p className="mt-5 border-l-4 border-[#006d57] pl-5 text-sm leading-7 text-[#36554a]">This is a fictional example, not a deadline calculation or an interpretation of your lease.</p></div><div className="overflow-hidden rounded-[28px] border border-[#dbe6dc] bg-[#f9fbf8] shadow-xl shadow-[#102c25]/10"><div className="bg-[#102c25] px-6 py-5 text-xs font-bold uppercase tracking-[0.18em] text-[#a9e9be] sm:px-8">Illustrative clause worksheet</div><div className="space-y-3 p-6 sm:p-8">{sampleRows.map((row) => <div key={row.label} className="flex flex-wrap justify-between gap-2 rounded-xl border border-[#dbe6dc] bg-white px-5 py-4 text-sm"><span className="font-semibold text-[#102c25]">{row.label}</span><span className="text-[#516073]">{row.value}</span></div>)}<p className="pt-2 text-xs leading-6 text-[#516073]">A separate records request or audit right may have different terms. Look for those clauses too.</p></div></div></div></section>

    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20"><div className="grid gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Three distinct actions</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Do not treat every review step as the same notice.</h2><p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Requesting records, objecting to a charge, and exercising a formal audit right can be separate acts. Your lease may define different periods or procedures for each. Track them individually.</p></div><Link href="/marketing/audit-window-deadlines" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Explore the deadline guide ↗</Link></div></section>

    <section className="bg-white px-6 py-16 sm:py-20"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Common questions</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Before you rely on a window.</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{faqs.map((faq) => <div key={faq.question} className="rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6"><h3 className="text-lg font-semibold text-[#102c25]">{faq.question}</h3><p className="mt-3 text-sm leading-7 text-[#516073]">{faq.answer}</p></div>)}</div></div></section>

    <section className="bg-[#102c25] px-6 py-16 text-white sm:py-20"><div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your next step</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Find the review terms in your own lease.</h2><p className="mt-4 text-base leading-8 text-[#d9e9df]">A free lease preview can surface notice and audit language to verify. It does not calculate a legal deadline or send a notice on your behalf.</p></div><Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
  </main>;
}
