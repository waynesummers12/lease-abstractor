import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/medical-hub";

export const metadata: Metadata = {
  title: "Medical Office Lease Guide for Healthcare Tenants",
  description:
    "Explore practical guides to medical office CAM and NNN terms, annual reconciliations, records to request, and lease-specific review deadlines.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Medical Office Lease Guide | SaveOnLease",
    description: "A starting point for healthcare tenants reviewing CAM, NNN, and annual statements.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "website",
  },
};

const medicalNav = [
  { href: pageUrl, label: "Overview" },
  { href: "/marketing/medical-office-lease-audit", label: "Lease review" },
  { href: "/marketing/medical-office-cam-reconciliation", label: "Medical CAM" },
  { href: "/marketing/medical-office-nnn-expenses", label: "Medical NNN" },
];

const guideCards = [
  { number: "01", title: "Medical office lease review", text: "Start with lease definitions, shared systems, tenant share, records, and notice terms.", href: "/marketing/medical-office-lease-audit", action: "Read the guide" },
  { number: "02", title: "Annual CAM reconciliation", text: "Understand the statement, allocation questions, and billing detail to request.", href: "/marketing/medical-office-cam-reconciliation", action: "Review CAM" },
  { number: "03", title: "Medical NNN expenses", text: "See how taxes, insurance, and shared operating costs may be assigned.", href: "/marketing/medical-office-nnn-expenses", action: "Explore NNN" },
  { number: "04", title: "Fee and cost questions", text: "Look at administrative fees, capital items, and other charges that need lease-specific review.", href: "/marketing/medical-practice-lease-overcharges", action: "Explore questions" },
  { number: "05", title: "CAM changes year to year", text: "Find a method for investigating a sharp increase without assuming it is an error.", href: "/marketing/medical-office-cam-spikes", action: "Review changes" },
  { number: "06", title: "Multiple locations", text: "Keep lease terms, dates, and review questions organized across a portfolio.", href: "/marketing/multi-location-medical-lease-risk", action: "Explore the approach" },
];

const focusAreas = [
  { title: "Shared vs. tenant-specific", text: "Which systems and services benefit the building, and which relate to a particular suite or piece of equipment?" },
  { title: "Allocation and limits", text: "What tenant share, caps, fee limits, and capital-cost rules appear in the signed lease?" },
  { title: "Evidence and timing", text: "Which invoices and schedules support the bill, and when does the lease require notice?" },
];

const faqs = [
  { question: "What makes a medical office lease different?", answer: "Some medical properties have specialized systems or services. Whether their costs are shared, tenant-specific, or excluded depends on the signed lease and the billing records." },
  { question: "How much do CAM and NNN add?", answer: "There is no standard amount. Charges depend on the property, the agreement, allocation methods, and actual expenses. Compare your own lease with the annual statement." },
  { question: "Can a medical tenant challenge a charge?", answer: "The lease may provide notice, records-access, or audit rights. Check its exact procedure and deadlines before acting, and verify the charge with supporting documents." },
];

export default function MedicalHubPage() {
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
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Medical lease learning center</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Make sense of your <span className="text-[#a9e9be]">medical office lease.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">
              A practical starting place for healthcare tenants reviewing CAM, NNN, annual statements, and lease deadlines. Learn which questions to ask and which records can help answer them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#guides" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Explore the guides ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Start a free lease preview ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">A simple way through</p>
            <div className="mt-6 space-y-3">
              {[["01", "Know the lease", "Find the definitions, allocations, caps, and dates."], ["02", "Read the annual bill", "Compare the reconciliation with those terms."], ["03", "Verify the questions", "Request records for amounts you cannot confirm."]].map(([number, title, detail]) => (
                <div key={number} className="flex gap-4 rounded-xl border border-white/20 bg-white/10 p-4">
                  <span className="text-sm font-bold text-[#a9e9be]">{number}</span>
                  <div><p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p></div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">The lease and supporting records determine what applies to your practice.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Why this deserves attention</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Specialized space calls for specific questions.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">Some outpatient properties have shared systems, extended services, or tenant-specific equipment. Those details can make operating costs harder to interpret. The key is to see how your agreement assigns each cost and what the statement actually billed.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {focusAreas.map((item) => (
            <div key={item.title} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold tracking-tight text-[#102c25]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="guides" className="scroll-mt-28 bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Choose your next question</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">The medical lease guides.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">Start with the lease review, or jump to the topic that matches the statement or question in front of you.</p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {guideCards.map((guide) => (
              <Link key={guide.href} href={guide.href} className="group flex flex-col rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-6 transition hover:border-[#a8ccb2] hover:shadow-lg">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{guide.number}</span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{guide.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#516073]">{guide.text}</p>
                <span className="mt-6 text-sm font-semibold text-[#006d57] underline underline-offset-4 group-hover:text-[#102c25]">{guide.action} ↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Timing and records</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Find your review window early.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Notice periods and records-access rights vary by lease. Check the signed terms when the annual reconciliation arrives, and keep a record of any questions or document requests.</p>
          </div>
          <Link href="/marketing/audit-window-deadlines" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Understand review deadlines ↗</Link>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-[#dbe6dc] bg-[#f9fbf8] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Free field guide</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Keep a CAM review checklist beside you.</h2>
            <p className="mt-4 text-sm leading-7 text-[#516073] sm:text-base">The Tenant-First CAM Audit Checklist has 25 practical checks, a worksheet, and a records request draft. Use it to organize questions before drawing conclusions about a charge.</p>
          </div>
          <Link href="/marketing/cam-audit-checklist" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#102c25] px-6 text-center text-sm font-semibold text-[#102c25] transition hover:bg-[#e9f4ec]">Explore the free checklist ↗</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Common questions</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Before you dive in.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
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
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">See what your medical lease says.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement if you have one and review the initial questions before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
