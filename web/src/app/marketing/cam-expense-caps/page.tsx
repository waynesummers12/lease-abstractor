import Link from "next/link";
import type { Metadata } from "next";

const pageUrl = "https://www.saveonlease.com/marketing/cam-expense-caps";

export const metadata: Metadata = {
  title: "CAM Expense Caps Explained",
  description: "Understand how a CAM expense cap can limit certain increases, which costs and years it covers, and how to compare the lease with an annual statement.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "CAM Expense Caps Explained | SaveOnLease",
    description: "A practical guide to CAM cap scope, base year, calculation, and supporting records.",
    url: pageUrl,
    siteName: "SaveOnLease",
    type: "article",
  },
};

const guides = [
  { href: "/marketing/cam-reconciliation", label: "Reconciliation" },
  { href: "/marketing/cam-reconciliation-errors", label: "Errors" },
  { href: pageUrl, label: "Expense caps" },
  { href: "/marketing/cam-admin-page", label: "Admin fees" },
];

const terms = [
  { number: "01", title: "Which costs?", detail: "The cap may cover only defined controllable expenses. Check whether taxes, insurance, utilities, capital work, or fees are excluded." },
  { number: "02", title: "Which starting amount?", detail: "Find the base year or prior-year amount and any adjustment for occupancy, changes in space, or unusual costs." },
  { number: "03", title: "Which formula?", detail: "A cap may use a percentage, an index, or a fixed amount. Check whether unused increases carry forward or the limit compounds." },
  { number: "04", title: "Which allocation?", detail: "Follow the capped property cost through the tenant-share calculation and any separate cost pools." },
];

const documents = [
  { title: "Lease and amendments", detail: "Cap clause, defined expense pool, exclusions, base period, and formula." },
  { title: "Current and prior statements", detail: "Compare the same expense categories across the relevant periods." },
  { title: "Supporting schedules", detail: "See the cost detail, occupancy or area adjustments, and cap worksheet." },
];

const faqs = [
  { question: "Does a CAM cap apply to every expense?", answer: "Not necessarily. The signed lease may limit only certain expenses and exclude others, such as taxes, insurance, utilities, or specified projects." },
  { question: "Is there a standard CAM cap percentage?", answer: "No single percentage applies to every commercial lease. Some agreements use a percentage, an index, a fixed amount, or no cap." },
  { question: "What does cumulative mean in a cap clause?", answer: "A cumulative formula may allow unused permitted increases to carry into later years. Read the exact lease language and worksheet before applying a simple annual comparison." },
  { question: "Does an increase above a stated rate prove a violation?", answer: "No. First check which costs are capped, the correct base, exceptions, and the formula. The statement total alone may combine capped and uncapped items." },
];

const related = [
  { title: "CAM reconciliation", text: "See how actual costs and estimated payments become a true-up.", href: "/marketing/cam-reconciliation" },
  { title: "CAM admin fees", text: "Check whether a fee is in the capped cost pool and how it is calculated.", href: "/marketing/cam-admin-page" },
  { title: "CAM errors", text: "Explore other allocation, category, and credit questions.", href: "/marketing/cam-reconciliation-errors" },
];

export default function CamExpenseCapsPage() {
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
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Understand the limit</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">A CAM cap is only as clear as <span className="text-[#a9e9be]">its formula.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">A lease may limit increases in certain shared operating costs. To check the annual statement, you need to know which costs are covered, where the calculation starts, and how the cap carries forward.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cap-terms" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Explore the four terms ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">Before comparing two totals</p>
            <div className="mt-6 space-y-3">
              {[["Scope", "Which costs are capped?"], ["Starting point", "Which year and adjusted amount apply?"], ["Method", "Does the cap compound or carry forward?"]].map(([title, detail]) => (
                <div key={title} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-6 text-[#d9e9df]">{detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">A statement can include both capped and uncapped costs, so its total may not be the right comparison.</p>
          </div>
        </div>
      </section>

      <section id="cap-terms" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Read the cap clause</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Four details can change the answer.</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">A percentage alone does not tell you the permitted increase. Read the signed lease and amendments for the complete calculation.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {terms.map((term) => (
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
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Illustrative math</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">See a simple annual limit in action.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">Suppose a lease caps increases in a defined expense pool at 5% over the prior year. If that pool was $100,000, a simple one-year cap would be $105,000. A reported $112,000 for the same pool calls for checking the lease formula and any adjustments or exceptions.</p>
            <p className="mt-4 text-sm leading-7 text-[#516073]">This example is arithmetic only. It does not establish a lease violation, a tenant credit, or a recoverable amount.</p>
          </div>
          <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Simple one-year example</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4"><span>Prior-year defined pool</span><span className="font-semibold text-[#102c25]">$100,000</span></div>
              <div className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4"><span>Illustrative increase limit</span><span className="font-semibold text-[#102c25]">5%</span></div>
              <div className="flex justify-between gap-4 rounded-xl bg-[#102c25] px-5 py-4 font-semibold text-white"><span>Simple capped amount</span><span>$105,000</span></div>
              <div className="flex justify-between gap-4 rounded-xl border border-[#cfe1d3] bg-white px-5 py-4"><span>Reported same pool</span><span className="font-semibold text-[#102c25]">$112,000</span></div>
            </div>
            <p className="mt-5 text-xs leading-6 text-[#516073]">Before comparing, confirm the cost pool, base, carry-forward rules, exceptions, and tenant allocation.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Build the comparison</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Put the same costs side by side.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">A prior-year CAM total and current-year CAM total may contain different categories. Separate capped items from uncapped items before applying the lease formula.</p>
          </div>
          <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
            <div className="space-y-3">
              {documents.map((item) => (
                <div key={item.title} className="rounded-xl border border-[#cfe1d3] bg-white p-5">
                  <h3 className="font-semibold text-[#102c25]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#516073]">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Then check the timing</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#102c25] sm:text-3xl">Find the review procedure in your lease.</h2>
            <p className="mt-4 text-sm leading-7 text-[#425b50] sm:text-base">Notice and records-access periods vary. Read the signed terms soon after receiving the statement and keep copies of any calculation or request.</p>
          </div>
          <Link href="/marketing/nnn-audit-rights" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#102c25] px-6 text-center text-sm font-semibold text-white transition hover:bg-[#1e4b3c]">Understand audit rights ↗</Link>
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
        </div>
      </section>

      <section className="bg-[#102c25] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your next step</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Find the cap language in your lease.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement if you have one, then review the initial questions before deciding whether a full report is useful.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  );
}
