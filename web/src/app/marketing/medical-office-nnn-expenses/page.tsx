import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/medical-office-nnn-expenses";

export const metadata: Metadata = {
  title: "Medical Office NNN Expenses Explained",
  description:
    "Understand taxes, insurance, CAM, and other NNN questions in a medical office lease. Learn what to compare with your statement and which records to request.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Medical Office NNN Expenses | SaveOnLease",
    description: "A practical guide to the three NNN cost groups and lease-specific review questions for healthcare tenants.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const medicalNav = [
  { href: "/marketing/medical-hub", label: "Overview" },
  { href: "/marketing/medical-office-lease-audit", label: "Lease review" },
  { href: "/marketing/medical-office-cam-reconciliation", label: "Medical CAM" },
  { href: pageUrl, label: "Medical NNN" },
];

const nets = [
  { number: "01", title: "Property taxes", example: "Real estate taxes assigned to the property or project.", check: "Which parcel is included, how is your share set, and how are adjustments handled?" },
  { number: "02", title: "Insurance", example: "Building policies and premiums the lease permits the landlord to recover.", check: "Which policies and limits are covered, and how is the premium allocated?" },
  { number: "03", title: "CAM", example: "Shared operating and maintenance costs, as defined by the lease.", check: "Which services are included, excluded, capped, or subject to a fee?" },
];

const reviewQuestions = [
  { title: "Specialized systems", detail: "If the building has imaging-related electrical work, generators, or specialized HVAC, ask who benefits and how the lease allocates each cost." },
  { title: "Capital work", detail: "Check whether a replacement or improvement can be passed through, whether amortization is required, and what records support it." },
  { title: "Fees and reserves", detail: "Review management fees, their calculation base, any cap, and whether reserves are allowed and reconciled." },
  { title: "Tenant share", detail: "Compare your premises area, the denominator, and any cost pool or occupancy adjustment with the signed agreement." },
];

const faqs = [
  { question: "Do medical tenants pay a standard NNN amount?", answer: "No. NNN amounts vary by property, lease terms, allocation method, and actual taxes, insurance, and operating costs." },
  { question: "Can a tenant review NNN billing records?", answer: "The lease may provide records-access, audit, or dispute rights. Read its procedure and deadlines, then request the detail needed to verify the charge." },
  { question: "Are capital costs always excluded?", answer: "No. Treatment of capital work depends on the signed lease and the nature of the project, including any conditions on amortization or allocation." },
];

const related = [
  { title: "Medical lease review", text: "Start with shared systems, tenant share, records, and notice terms.", href: "/marketing/medical-office-lease-audit" },
  { title: "Medical CAM reconciliation", text: "See how estimated payments and actual shared costs are compared.", href: "/marketing/medical-office-cam-reconciliation" },
  { title: "NNN lease basics", text: "Get a plain-English explanation of the triple net structure.", href: "/marketing/triple-net-lease" },
];

export default function MedicalNNNExpensesPage() {
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
              Know what&apos;s inside your <span className="text-[#a9e9be]">NNN bill.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">
              Medical office NNN charges generally group property taxes, insurance, and common area maintenance. The lease tells you which costs can be passed through and how your share is calculated; the annual statement shows what was billed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#three-nets" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Explore the cost groups ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">The NNN structure</p>
            <div className="mt-6 space-y-3">
              {[["Base rent", "Set by the rent schedule"], ["+ Taxes", "Your lease-defined share"], ["+ Insurance", "Your lease-defined share"], ["+ CAM", "Your lease-defined share"]].map(([title, detail]) => (
                <div key={title} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <span className="font-semibold text-white">{title}</span><span className="text-sm text-[#d9e9df]">{detail}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">A category label does not prove that every amount billed under it is permitted.</p>
          </div>
        </div>
      </section>

      <section id="three-nets" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">The three expense groups</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Read beyond the headings on the bill.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">These are common NNN categories. Check the signed lease and billing detail to understand what each includes at your property.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {nets.map((net) => (
            <article key={net.number} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{net.number}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{net.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{net.example}</p>
              <p className="mt-4 border-t border-[#e0e9e1] pt-4 text-sm leading-7 text-[#425b50]"><span className="font-semibold text-[#102c25]">Check: </span>{net.check}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Illustrative math</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Base rent is only part of the payment.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">An NNN lease may bill estimates during the year, then reconcile your share with actual costs. A change in taxes, insurance, or CAM can change the total payment even when base rent stays the same.</p>
            <p className="mt-4 text-sm leading-7 text-[#516073]">The amounts shown here are arithmetic only. They are not a claim about medical office costs or a forecast for your building.</p>
          </div>
          <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Example annual rate</p>
            <div className="mt-6 grid gap-3 text-sm text-[#425b50]">
              {[["Base rent", "$30 / sq ft"], ["Taxes", "$4 / sq ft"], ["Insurance", "$1 / sq ft"], ["CAM", "$4 / sq ft"]].map(([title, amount]) => (
                <div key={title} className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4"><span>{title}</span><span className="font-semibold text-[#102c25]">{amount}</span></div>
              ))}
              <div className="flex justify-between gap-4 rounded-xl bg-[#102c25] px-5 py-4 font-semibold text-white"><span>Total</span><span>$39 / sq ft</span></div>
            </div>
            <p className="mt-5 text-xs leading-6 text-[#516073]">For 10,000 sq ft, this illustration equals $390,000 annually. Actual charges depend on the lease and property records.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Questions worth investigating</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Look at how specialized costs were assigned.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">Some medical properties have systems and services that differ from a standard office. Their presence is not evidence of an error; the lease and underlying records determine how they should be billed.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {reviewQuestions.map((item) => (
            <div key={item.title} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <h3 className="text-xl font-semibold tracking-tight text-[#102c25]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">When the statement arrives</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Compare the estimate with actual costs.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Check each expense category, your share, and payments already credited. The reconciliation and supporting records help show how the final balance was calculated.</p>
          </div>
          <Link href="/marketing/medical-office-cam-reconciliation" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Understand the CAM true-up ↗</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 rounded-[28px] border border-[#dbe6dc] bg-white p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Review rights and dates</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Find the timing in your lease.</h2>
            <p className="mt-4 text-sm leading-7 text-[#516073] sm:text-base">The notice period and records-access procedure vary by agreement. Read the signed terms when the annual statement arrives and keep a copy of your document requests.</p>
          </div>
          <Link href="/marketing/audit-window-deadlines" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#102c25] px-6 text-center text-sm font-semibold text-[#102c25] transition hover:bg-[#e9f4ec]">Understand review deadlines ↗</Link>
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
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">See your medical NNN terms together.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement if you have one, then review the initial questions before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
