import Link from "next/link";
import type { Metadata } from "next";

const url = "https://www.saveonlease.com/marketing/triple-net-lease";

export const metadata: Metadata = {
  title: "What Is a Triple Net (NNN) Lease?",
  description:
    "Learn what taxes, insurance, and CAM mean in a triple net lease, how estimates are reconciled, and which lease terms to check against a statement.",
  alternates: { canonical: url },
  openGraph: {
    title: "What Is a Triple Net (NNN) Lease? | SaveOnLease",
    description: "A practical guide to NNN charges, annual reconciliations, and lease terms to verify.",
    url,
    siteName: "SaveOnLease",
    type: "article",
    images: [{ url: "https://www.saveonlease.com/og-triple-net-lease.jpg" }],
  },
};

const expenseGroups = [
  { number: "01", title: "Property taxes", example: "Real estate tax bill", check: "The property included, your share, and any adjustments." },
  { number: "02", title: "Insurance", example: "Building insurance premium", check: "The policies covered and how the cost is allocated." },
  { number: "03", title: "CAM", example: "Shared area and operating costs", check: "Allowed costs, exclusions, caps, and fees in the lease." },
];

const reviewQuestions = [
  "Does the lease include or exclude the billed cost?",
  "Does a cap or administrative fee limit apply?",
  "Was a capital project treated as the lease requires?",
  "Was the correct area, cost pool, and tenant share used?",
  "Were estimated payments and credits counted?",
  "What records and notice procedure does the lease provide?",
];

const related = [
  { title: "Triple net vs. gross", text: "Compare how the two lease structures assign operating costs.", href: "/marketing/triple-net-lease-vs-gross" },
  { title: "NNN expenses explained", text: "Look more closely at common expense categories.", href: "/marketing/nnn-expenses-explained" },
  { title: "Review and notice rights", text: "Find the deadlines and procedures in your own lease.", href: "/marketing/nnn-audit-rights" },
];

export default function TripleNetLeasePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What Is a Triple Net (NNN) Lease?",
    description: "A practical guide to taxes, insurance, CAM, and reconciliation in a triple net lease.",
    author: { "@type": "Organization", name: "SaveOnLease" },
    publisher: { "@type": "Organization", name: "SaveOnLease" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <main className="bg-[#f5f7f3] text-[#17243a]">
      <section className="relative overflow-hidden bg-[#102c25] px-6 py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Commercial lease guide</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Triple net leases, <span className="text-[#a9e9be]">explained clearly.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9e9df] sm:text-lg">
              A triple net (NNN) lease generally adds a tenant&apos;s share of property taxes, insurance, and common area maintenance to base rent. Your signed lease defines what belongs in each category and how your share is calculated.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#three-nets" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Understand the three nets ↓</a>
              <Link href="/app/step-1-upload" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Preview your lease ↗</Link>
            </div>
          </div>
          <div className="rounded-[26px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a9e9be]">The basic structure</p>
            <div className="mt-6 space-y-3">
              {[["Base rent", "The amount set by the lease"], ["+ Property taxes", "Your defined share"], ["+ Insurance", "Your defined share"], ["+ CAM", "Your defined share"]].map(([title, detail]) => (
                <div key={title} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <span className="font-semibold text-white">{title}</span><span className="text-sm text-[#d9e9df]">{detail}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#d9e9df]">This is the common pattern. The signed lease controls the actual obligations.</p>
          </div>
        </div>
      </section>

      <section id="three-nets" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">The three expense groups</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">What makes an NNN lease “triple”?</h2>
          <p className="mt-5 text-base leading-8 text-[#516073]">A statement may group these costs separately. The category label does not establish that every billed amount is permitted; compare the detail with the lease.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {expenseGroups.map((group) => (
            <article key={group.number} className="rounded-2xl border border-[#dbe6dc] bg-white p-6 shadow-sm sm:p-7">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e5f5eb] text-sm font-bold text-[#006d57]">{group.number}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#102c25]">{group.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#516073]"><span className="font-semibold text-[#102c25]">On a statement:</span> {group.example}</p>
              <p className="mt-2 text-sm leading-7 text-[#516073]"><span className="font-semibold text-[#102c25]">Check:</span> {group.check}</p>
            </article>
          ))}
        </div>
        <p className="mt-7 text-sm leading-7 text-[#516073]">For a closer look at the third category, read our <Link href="/marketing/common-area-maintenance" className="font-medium text-[#006d57] underline underline-offset-4">Common Area Maintenance guide</Link>.</p>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Understanding your share</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">A small percentage can shape a large bill.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">Some leases divide the tenant&apos;s rentable area by a defined building or project area. Others use a different denominator, cost pool, or allocation rule. Check the lease&apos;s exact formula before relying on any estimate.</p>
            <Link href="/marketing/pro-rata-share-explained" className="mt-6 inline-flex text-sm font-semibold text-[#006d57] underline underline-offset-4 hover:text-[#102c25]">Learn how tenant share works ↗</Link>
          </div>
          <div className="rounded-[26px] border border-[#cfe1d3] bg-[#e9f4ec] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Illustrative allocation</p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-xl border border-[#cfe1d3] bg-white px-5 py-4 text-sm text-[#425b50]">5,000 sq ft tenant space ÷ 50,000 sq ft defined area</div>
              <div className="rounded-xl border border-[#cfe1d3] bg-white px-5 py-4 text-sm text-[#425b50]">= <span className="font-bold text-[#102c25]">10% tenant share</span></div>
              <div className="rounded-xl border border-[#cfe1d3] bg-white px-5 py-4 text-sm text-[#425b50]">10% × $100,000 in allowed costs = <span className="font-bold text-[#102c25]">$10,000</span></div>
            </div>
            <p className="mt-5 text-xs leading-6 text-[#516073]">Arithmetic example only. Your lease may use a different area or calculation method.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Annual true-up</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Why the annual bill can change.</h2>
            <p className="mt-5 text-base leading-8 text-[#516073]">Under many NNN arrangements, tenants pay estimates during the year. The annual statement compares those payments with the calculated share of actual costs, then shows a balance or credit.</p>
            <p className="mt-4 text-base leading-8 text-[#516073]">Check the period covered, expense groups, share applied, and payments credited. The lease determines when and how an adjustment is handled.</p>
            <Link href="/marketing/cam-reconciliation" className="mt-6 inline-flex text-sm font-semibold text-[#006d57] underline underline-offset-4 hover:text-[#102c25]">Understand CAM reconciliation ↗</Link>
          </div>
          <div className="rounded-[26px] border border-[#dbe6dc] bg-white p-7 shadow-sm sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006d57]">Occupancy cost example</p>
            <div className="mt-6 grid gap-3 text-sm text-[#425b50]">
              {[["Base rent", "$25 / sq ft"], ["Taxes", "$4 / sq ft"], ["Insurance", "$1 / sq ft"], ["CAM", "$6 / sq ft"]].map(([title, amount]) => (
                <div key={title} className="flex justify-between gap-4 border-b border-[#e0e9e1] pb-3"><span>{title}</span><span className="font-semibold text-[#102c25]">{amount}</span></div>
              ))}
              <div className="flex justify-between gap-4 rounded-xl bg-[#e9f4ec] px-4 py-4 font-semibold text-[#102c25]"><span>Total</span><span>$36 / sq ft</span></div>
            </div>
            <p className="mt-5 text-xs leading-6 text-[#516073]">For 5,000 sq ft, this equals $180,000 per year. This is an arithmetic illustration, not a quote or forecast.</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Before calling a charge an overcharge</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Six questions worth checking.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {reviewQuestions.map((question, index) => (
              <div key={question} className="flex gap-4 rounded-2xl border border-[#dbe6dc] bg-[#f9fbf8] p-5 sm:p-6">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e5f5eb] text-xs font-bold text-[#006d57]">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-sm font-medium leading-7 text-[#425b50]">{question}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 text-sm leading-7 text-[#516073]">A surprising charge is a reason to request backup, not proof of an error. Use the free <Link href="/marketing/cam-audit-checklist" className="font-medium text-[#006d57] underline underline-offset-4">CAM audit checklist</Link> to organize terms, questions, and records.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006d57]">Keep learning</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102c25] sm:text-4xl">Explore related lease terms.</h2>
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

      <section className="bg-[#102c25] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Your next step</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">See what your NNN lease actually says.</h2>
            <p className="mt-4 text-base leading-8 text-[#d9e9df]">Start with a free lease preview. Add an annual statement if you have one, then decide whether the full report is useful after seeing the initial results.</p>
          </div>
          <Link href="/app/step-1-upload" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#a9e9be] px-6 text-sm font-bold text-[#102c25] transition hover:bg-white">Start a free lease preview ↗</Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </main>
  );
}
