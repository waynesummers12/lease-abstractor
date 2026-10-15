import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/medical-office-lease-audit";

export const metadata: Metadata = {
  title: "Medical Office Lease Review for Healthcare Tenants",
  description:
    "A practical guide to reviewing CAM and NNN terms in medical office leases, including shared systems, tenant share, supporting records, and notice deadlines.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Medical Office Lease Review | SaveOnLease",
    description: "Know which medical office CAM and NNN questions to verify against your lease and billing records.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const medicalNav = [
  { href: "/marketing/medical-hub", label: "Overview" },
  { href: pageUrl, label: "Lease review" },
  { href: "/marketing/medical-office-cam-reconciliation", label: "Medical CAM" },
  { href: "/marketing/medical-office-nnn-expenses", label: "Medical NNN" },
];

const reviewAreas = [
  { number: "01", title: "Shared building systems", detail: "Check how the lease allocates costs for HVAC, elevators, generators, parking, and other systems used by multiple tenants." },
  { number: "02", title: "Tenant-specific work", detail: "Separate costs tied to your space or equipment from charges assigned to the wider building, using the lease and invoices." },
  { number: "03", title: "Capital and replacement costs", detail: "Identify large upgrades and replacements, then review the lease's capital-cost and amortization language." },
  { number: "04", title: "Fees, caps, and share", detail: "Compare administrative fees, expense caps, rentable area, and allocation methods with the annual statement." },
];

const records = [
  "Signed lease and all amendments",
  "Annual CAM or NNN reconciliation",
  "Category ledger and supporting invoices",
  "Tenant-share and rentable-area schedule",
  "Capital work and amortization detail, when relevant",
];

const faqs = [
  { question: "When should a medical tenant review a reconciliation?", answer: "Review it soon after receipt and check the notice and audit deadlines in your own lease. The timing and procedure vary by agreement." },
  { question: "Are capital costs always excluded from CAM?", answer: "No. Whether a capital item can be charged, and how it must be amortized, depends on the lease language and the facts behind the cost." },
  { question: "Can a lease preview confirm an overcharge?", answer: "A preview can surface lease terms and initial questions. Confirming an overcharge requires the applicable statement and supporting records, along with the signed lease." },
];

const related = [
  { title: "Medical CAM reconciliation", text: "Review the categories, allocations, and supporting records behind an annual statement.", href: "/marketing/medical-office-cam-reconciliation" },
  { title: "Medical NNN expenses", text: "Understand how taxes, insurance, and shared operating costs may be assigned.", href: "/marketing/medical-office-nnn-expenses" },
  { title: "Multi-location leases", text: "Organize review questions across more than one healthcare location.", href: "/marketing/multi-location-medical-lease-risk" },
];

export default function MedicalOfficeLeaseAuditPage() {
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
      <nav aria-label="Medical lease guides" className="border-b border-[#dbe6dc] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2">
          {medicalNav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={item.href === pageUrl ? "page" : undefined} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${item.href === pageUrl ? "border-[#102c25] bg-[#102c25] text-white" : "border-[#dbe6dc] bg-white text-[#36554a] hover:border-[#006d57] hover:text-[#006d57]"}`}>{item.label}</Link>
          ))}
        </div>
      </nav>

      <section className="relative overflow-hidden bg-[#102c25] px-6 py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">For healthcare tenants</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Medical office leases deserve a <span className="text-[#a9e9be]">closer look.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">
              Shared building systems, specialized space, and detailed CAM or NNN terms can make an annual bill difficult to evaluate. Start with the lease, then verify the statement against the records behind it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
              <a href="#review-areas" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">See what to review ↓</a>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">A useful review starts here</p>
            <div className="mt-6 space-y-3">
              {[["01", "Read the lease", "Find cost definitions, allocations, caps, and deadlines."], ["02", "Compare the statement", "See how those terms were applied to the annual bill."], ["03", "Request the records", "Get the detail needed to verify questions you cannot answer."]].map(([number, title, detail]) => (
                <div key={number} className="flex gap-4 rounded-xl border border-white/20 bg-white/10 p-4">
                  <span className="text-sm font-bold text-[#a9e9be]">{number}</span>
                  <div><p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p></div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">A flagged charge is a question to verify, not a confirmed overcharge or savings amount.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Who this can help</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Built around healthcare occupancy questions.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">The same review method can help an independent practice, imaging center, urgent care operator, dental group, or multi-location healthcare team. What applies depends on each location&apos;s signed lease and billing records.</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Independent practices", "Imaging centers", "Urgent care", "Dental groups", "Multi-location teams"].map((item) => <span key={item} className="rounded-full border border-[#cfe1d3] bg-white px-4 py-2 text-sm font-medium text-[#36554a]">{item}</span>)}
          </div>
        </div>
      </section>

      <section id="review-areas" className="scroll-mt-28 bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Four places to focus</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Questions behind a medical office bill.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">A medical office may have systems and services that differ from a standard office property. The lease should show how shared and tenant-specific costs are treated.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {reviewAreas.map((area) => (
              <article key={area.number} className="rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6 sm:p-7">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{area.number}</span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#516073]">{area.detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-7 text-sm leading-7 text-[#516073]">Explore the billing process in our <Link href="/marketing/medical-office-cam-reconciliation" className="font-medium text-[#006d57] underline underline-offset-4">medical office CAM reconciliation guide</Link>.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Evidence first</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Know what you have. Ask for what is missing.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">The annual summary alone may not show why a cost was included or how your share was calculated. Keep the lease and statement together, then request the supporting detail your agreement allows you to inspect.</p>
          <p className="mt-4 text-sm leading-7 text-[#516073]">A worksheet can help organize questions, but it cannot confirm recoverable amounts without the underlying records.</p>
          <Link href="/marketing/cam-audit-checklist" className="mt-6 inline-flex text-sm font-semibold text-[#006d57] underline underline-offset-4 hover:text-[#102c25]">Explore the free CAM checklist ↗</Link>
        </div>
        <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Documents to gather</p>
          <ul className="mt-6 grid list-none gap-3 text-sm text-[#425b50]">
            {records.map((item) => <li key={item} className="rounded-xl border border-[#cfe1d3] bg-white px-5 py-4">✓ {item}</li>)}
          </ul>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Timing matters</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Find the review window in your lease.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">The notice period, records-access rules, and dispute procedure vary by agreement. Read those terms when the reconciliation arrives so you know which dates apply.</p>
          </div>
          <Link href="/marketing/audit-window-deadlines" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Understand review deadlines ↗</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Medical lease learning center</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Explore related guides.</h2>
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
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Before you get started.</h2>
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
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">See the terms in your medical lease.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement if you have one, then review the initial questions before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
