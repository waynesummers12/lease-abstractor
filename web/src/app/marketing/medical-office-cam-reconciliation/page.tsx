import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/medical-office-cam-reconciliation";

export const metadata: Metadata = {
  title: "Medical Office CAM Reconciliation Guide",
  description:
    "Understand how a medical office CAM reconciliation works, which shared costs to question, and what lease terms and records to verify.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Medical Office CAM Reconciliation | SaveOnLease",
    description: "A practical guide to annual CAM statements for healthcare tenants.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const medicalNav = [
  { href: "/marketing/medical-hub", label: "Overview" },
  { href: "/marketing/medical-office-lease-audit", label: "Lease review" },
  { href: pageUrl, label: "Medical CAM" },
  { href: "/marketing/medical-office-nnn-expenses", label: "Medical NNN" },
];

const reviewAreas = [
  { number: "01", title: "The expense pool", detail: "Compare billed categories with the lease's CAM definition and exclusions. Ask which property or building each cost serves." },
  { number: "02", title: "Your share", detail: "Check the premises area, denominator, allocation method, and any changes from prior years." },
  { number: "03", title: "Shared systems", detail: "Review how costs for HVAC, elevators, parking, generators, or security are assigned when they benefit different users." },
  { number: "04", title: "Fees and limits", detail: "Look at management or administrative fees, caps, gross-up rules, and any special treatment of capital work." },
];

const medicalCosts = [
  { title: "HVAC and after-hours service", detail: "Was the service shared, specific to one tenant, or allocated under a special lease provision?" },
  { title: "Parking and elevators", detail: "Do structural work, modernization, and routine maintenance receive different treatment?" },
  { title: "Generators and electrical systems", detail: "Who uses the system, and how does the lease allocate testing, fuel, or replacement costs?" },
];

const faqs = [
  { question: "What is a medical office CAM reconciliation?", answer: "It is an annual comparison of estimated CAM payments with the tenant's calculated share of actual shared operating costs. The lease defines what can be included and how the share is determined." },
  { question: "Can a specialized building cost be passed through?", answer: "It depends on the signed lease and the facts behind the charge. Check whether the cost is shared, tenant-specific, excluded, capped, or subject to capital-cost rules." },
  { question: "How long do tenants have to review the statement?", answer: "The notice and audit periods vary by lease. Read the exact timing and procedure in your agreement soon after receiving the reconciliation." },
];

const related = [
  { title: "Medical lease review", text: "Start with the lease terms, shared systems, records, and deadlines.", href: "/marketing/medical-office-lease-audit" },
  { title: "Medical NNN expenses", text: "Understand taxes, insurance, CAM, and their allocation.", href: "/marketing/medical-office-nnn-expenses" },
  { title: "CAM reconciliation checklist", text: "Use a structured sequence to compare the statement with your lease.", href: "/marketing/cam-reconciliation-checklist" },
];

export default function MedicalOfficeCAMPage() {
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
          <div className="lg:self-start lg:pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Medical lease learning center</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Make your annual CAM statement <span className="text-[#a9e9be]">make sense.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">
              A medical office reconciliation compares estimated CAM payments with your share of actual costs. Use the lease and billing detail to understand the calculation before deciding which charges need a closer look.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">See how it works ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">The annual comparison</p>
            <div className="mt-6 space-y-3">
              {[["Estimated payments", "What you paid during the year"], ["Actual allocated CAM", "What the statement calculates for your share"], ["Balance or credit", "The difference, subject to lease terms"]].map(([title, detail]) => (
                <div key={title} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">The balance alone does not show whether each underlying charge is allowed.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Read the statement</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">A reconciliation is a true-up, not a verdict.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">The statement should show what was estimated, what was actually spent, how costs were allocated, and what you already paid. The lease determines which expenses belong in CAM and how the final amount is treated.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {[["01", "Find the cost pool", "Identify the property and categories included in the reconciliation."], ["02", "Trace your share", "Match the percentage or other formula to the lease and area schedule."], ["03", "Check the true-up", "Compare actual allocated costs with estimates, payments, and credits."]].map(([number, title, detail]) => (
            <div key={number} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{number}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Four areas to test</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Where to focus your review.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">Medical buildings may have specialized systems and shared services. Their presence is not itself an error; the question is whether the bill follows the lease.</p>
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
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Medical-building questions</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Ask how specialized costs were assigned.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">An invoice or capital schedule may be needed to distinguish routine operations from a replacement project, and a usage or area schedule may be needed to understand allocation. The signed lease sets the rules.</p>
          <Link href="/marketing/medical-office-lease-audit" className="mt-6 inline-flex text-sm font-semibold text-[#006d57] underline underline-offset-4 hover:text-[#102c25]">Explore the medical lease review guide ↗</Link>
        </div>
        <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Examples to investigate</p>
          <div className="mt-6 grid gap-3">
            {medicalCosts.map((item) => (
              <div key={item.title} className="rounded-xl border border-[#cfe1d3] bg-white p-5">
                <h3 className="font-semibold text-[#102c25]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#516073]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Keep the timeline in view</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Check your lease&apos;s review window.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Notice periods and records-access rules vary by agreement. Read the applicable terms soon after the statement arrives, and keep a copy of any questions or requests.</p>
          </div>
          <Link href="/marketing/audit-window-deadlines" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Understand review deadlines ↗</Link>
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
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Review your own lease and statement.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add your annual statement if you have one, then review the initial questions before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
