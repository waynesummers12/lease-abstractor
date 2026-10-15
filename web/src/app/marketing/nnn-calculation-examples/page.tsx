import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NNN Calculation Examples",
  description: "Follow illustrative NNN expense, tenant share, admin fee, and year-end reconciliation calculations. Learn which lease terms and records to verify.",
  alternates: { canonical: "/marketing/nnn-calculation-examples" },
};

const card = "rounded-[28px] border border-[#dbe7df] bg-white p-7 shadow-[0_18px_50px_rgba(16,44,37,0.05)] md:p-9";
const eyebrow = "text-xs font-bold uppercase tracking-[0.22em] text-[#087055]";

export default function NNNCalculationExamplesPage() {
  return (
    <main className="bg-[#f5f7f3] text-[#102c25]">
      <section className="overflow-hidden bg-[#102c25] px-6 py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.06fr_.94fr]">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[#a9e9be]">Learn the math</p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.055em] md:text-7xl">NNN calculations, <span className="text-[#a9e9be]">step by step.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#d6e5dc]">See how a property expense pool becomes a tenant charge, how an admin fee changes the total, and how monthly estimates reconcile at year end.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#example" className="rounded-xl bg-[#a9e9be] px-6 py-3 font-semibold text-[#102c25]">Walk through the example ↓</a>
              <Link href="/app/step-1-upload" className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10">Start free lease preview ↗</Link>
            </div>
            <p className="mt-6 text-sm text-[#b7d0c1]">Fictional numbers for illustration. Your lease and billing records control the actual calculation.</p>
          </div>
          <div className="rounded-[32px] border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <div className="rounded-[24px] bg-white p-7 text-[#102c25] shadow-2xl">
              <p className={eyebrow}>The basic equation</p>
              <div className="mt-7 space-y-4 text-lg">
                <div className="flex justify-between border-b border-[#e4ece5] pb-4"><span>Allowed expense pool</span><strong>$120,000</strong></div>
                <div className="flex justify-between border-b border-[#e4ece5] pb-4"><span>Tenant share</span><strong>10%</strong></div>
                <div className="flex justify-between rounded-xl bg-[#e8f7ed] p-4 text-xl"><span>Annual share</span><strong>$12,000</strong></div>
              </div>
              <p className="mt-5 text-sm leading-6 text-[#52685f]">The crucial work happens before multiplying: which costs are allowed, and which area defines the share?</p>
            </div>
          </div>
        </div>
      </section>

      <section id="example" className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <p className={eyebrow}>Example 01 · Set the share</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Start with the area and the expense pool.</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#53675d]">Assume a 2,000 square foot suite in a 20,000 square foot building and a $120,000 annual pool of taxes, insurance, and CAM. This simplified example uses one allocation percentage for all three categories.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className={card}><p className={eyebrow}>01 / Allocation</p><p className="mt-5 text-3xl font-semibold">2,000 ÷ 20,000</p><p className="mt-3 text-[#53675d]">= 10% tenant share</p></div>
          <div className={card}><p className={eyebrow}>02 / Annual amount</p><p className="mt-5 text-3xl font-semibold">$120,000 × 10%</p><p className="mt-3 text-[#53675d]">= $12,000 for the year</p></div>
          <div className={card}><p className={eyebrow}>03 / Monthly estimate</p><p className="mt-5 text-3xl font-semibold">$12,000 ÷ 12</p><p className="mt-3 text-[#53675d]">= $1,000 per month</p></div>
        </div>
        <p className="mt-6 text-sm leading-6 text-[#62776b]">Your agreement may define different area denominators, category shares, exclusions, caps, or base years. Check each term before using this formula.</p>
      </section>

      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className={eyebrow}>Example 02 · Fee basis</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">What if an admin fee is added?</h2><p className="mt-5 leading-8 text-[#53675d]">Assume $60,000 of the original $120,000 pool is CAM. A 15% admin fee applied to that CAM amount would add $9,000 to the property pool.</p></div>
          <div className="rounded-[28px] bg-[#e9f5ec] p-7 md:p-10">
            <div className="space-y-4 text-lg"><div className="flex justify-between border-b border-[#c8dfcf] pb-4"><span>CAM fee calculation</span><strong>$60,000 × 15% = $9,000</strong></div><div className="flex justify-between border-b border-[#c8dfcf] pb-4"><span>Revised expense pool</span><strong>$129,000</strong></div><div className="flex justify-between border-b border-[#c8dfcf] pb-4"><span>Tenant share at 10%</span><strong>$12,900/year</strong></div><div className="flex justify-between"><span>Monthly equivalent</span><strong>$1,075</strong></div></div>
            <p className="mt-8 rounded-xl bg-white p-5 text-sm leading-6 text-[#40594b]"><strong>Check the lease:</strong> Does it permit the fee, define its percentage and calculation base, or exclude certain CAM costs? The arithmetic alone cannot answer whether the charge is allowed.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className={card}><p className={eyebrow}>Example 03 · Year end</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">How a true-up works.</h2><p className="mt-5 leading-7 text-[#53675d]">Suppose the tenant paid $900 per month in estimates: $10,800 total. If the supported annual share is $12,900, the arithmetic difference is $2,100.</p><div className="mt-7 rounded-2xl bg-[#102c25] p-6 text-xl font-semibold text-white">$12,900 − $10,800 = $2,100 due</div><p className="mt-5 text-sm leading-6 text-[#53675d]">A true-up is a billing difference, not proof that every underlying charge is permitted.</p></div>
          <div className={card}><p className={eyebrow}>Before you accept the total</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Four things to verify.</h2><ol className="mt-6 space-y-5 text-[#40594b]"><li><strong>01 · Area:</strong> Compare the tenant area and denominator with the lease and current area schedule.</li><li><strong>02 · Categories:</strong> Ask for tax, insurance, and CAM detail; check exclusions and duplicate line items.</li><li><strong>03 · Fees and limits:</strong> Apply the lease&apos;s fee base, caps, and any base-year language.</li><li><strong>04 · Payments:</strong> Match monthly estimates and credits to the tenant ledger.</li></ol></div>
        </div>
      </section>

      <section className="bg-[#e9f2eb] px-6 py-20"><div className="mx-auto max-w-6xl"><p className={eyebrow}>Keep learning</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">The calculation is only the beginning.</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{[["CAM vs. NNN", "/marketing/cam-vs-nnn", "See which costs sit inside the NNN total."],["Pro rata share", "/marketing/pro-rata-share-explained", "Understand the percentage applied to a cost pool."],["NNN reconciliation", "/marketing/nnn-reconciliation", "Compare estimates with annual actuals."]].map(([title, href, description]) => <Link key={href} href={href} className="rounded-2xl border border-[#d4e5d8] bg-white p-6 hover:border-[#087055]"><strong className="text-xl">{title} ↗</strong><p className="mt-3 text-sm leading-6 text-[#53675d]">{description}</p></Link>)}</div></div></section>
      <section className="bg-[#102c25] px-6 py-20 text-white"><div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a9e9be]">Review your own lease</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Bring the terms into focus.</h2><p className="mt-4 max-w-2xl text-[#d6e5dc]">Start with a free lease preview. Add an annual statement if available to see initial checks before deciding on a full report.</p></div><Link href="/app/step-1-upload" className="shrink-0 rounded-xl bg-[#a9e9be] px-6 py-4 font-semibold text-[#102c25]">Start free preview ↗</Link></div></section>
    </main>
  );
}
