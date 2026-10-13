import type { Metadata } from "next";
import Link from "next/link";
import styles from "../RetailGuide.module.css";
import RetailGuideNav from "../RetailGuideNav";

export const metadata: Metadata = {
  title: "How Much Rent Should a Burger Restaurant Pay?",
  description:
    "Calculate a burger restaurant's full occupancy cost, including base rent, CAM, taxes, and insurance. See what the result can and cannot tell you about your lease.",
  alternates: {
    canonical: "https://www.saveonlease.com/marketing/how-much-rent-should-a-burger-restaurant-pay",
  },
};

export default function HowMuchRentBurgerRestaurantPage() {
  return (
    <main className={`${styles.guide} mx-auto max-w-4xl px-6 py-16 text-slate-800 sm:py-20`}>
      <RetailGuideNav current="/marketing/how-much-rent-should-a-burger-restaurant-pay" embedded />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">Restaurant occupancy costs</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          How much rent should a burger restaurant pay?
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          There is no single rent percentage that fits every burger restaurant. Sales, location, store format, lease terms, and operating margins all matter. Start by calculating the full annual occupancy cost, then compare locations and test the charges against each lease.
        </p>
      </header>

      <section className="mt-14 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-950">Calculate the whole occupancy cost</h2>
        <p className="mt-3 leading-relaxed"><strong>Annual occupancy cost</strong> = base rent + percentage rent, if any + CAM + property tax + insurance + other occupancy charges the lease requires.</p>
        <p className="mt-3 leading-relaxed"><strong>Occupancy-cost ratio</strong> = annual occupancy cost ÷ annual gross sales × 100.</p>
        <p className="mt-3 text-sm text-slate-700">Use the same reporting period for costs and sales. Keep sales tax, discounts, delivery fees, and franchise reporting definitions consistent with your own financial statements.</p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">A worked example</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[440px] text-left">
            <caption className="sr-only">Illustrative annual burger restaurant occupancy cost</caption>
            <thead className="bg-slate-50 text-slate-950"><tr><th scope="col" className="px-5 py-3">Annual item</th><th scope="col" className="px-5 py-3 text-right">Example amount</th></tr></thead>
            <tbody className="divide-y divide-slate-200">
              <tr><td className="px-5 py-3">Base rent</td><td className="px-5 py-3 text-right">$72,000</td></tr>
              <tr><td className="px-5 py-3">CAM</td><td className="px-5 py-3 text-right">$18,000</td></tr>
              <tr><td className="px-5 py-3">Property tax</td><td className="px-5 py-3 text-right">$12,000</td></tr>
              <tr><td className="px-5 py-3">Insurance</td><td className="px-5 py-3 text-right">$3,000</td></tr>
              <tr className="font-semibold text-slate-950"><td className="px-5 py-3">Total occupancy cost</td><td className="px-5 py-3 text-right">$105,000</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-5 leading-relaxed">If annual gross sales are $1,500,000, the example ratio is <strong>7%</strong> ($105,000 ÷ $1,500,000). This illustrates the calculation; it is not a market benchmark or a conclusion that the charges are correct.</p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">What to compare across locations</h2>
        <ul className="mt-5 list-disc space-y-3 pl-5 leading-relaxed">
          <li><strong>Total cost per square foot:</strong> Divide annual occupancy cost by the premises area stated in that location&apos;s lease.</li>
          <li><strong>CAM and NNN components:</strong> Keep rent, maintenance, taxes, and insurance separate so a change in one category is visible.</li>
          <li><strong>Estimated versus actual payments:</strong> A reconciliation should credit payments already made during the year.</li>
          <li><strong>Year-over-year changes:</strong> Record the stated reason for a jump and request backup before treating it as an error.</li>
          <li><strong>Lease differences:</strong> One store may have a cap, exclusion, or allocation method that another does not.</li>
        </ul>
      </section>

      <section className="mt-16 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-950">High cost is a business question; an overcharge is a document question</h2>
        <p className="mt-3 leading-relaxed">A high occupancy-cost ratio may reflect an expensive location, weaker sales, or a charge worth investigating. It does not prove the landlord billed contrary to the lease. To test a CAM or NNN line, compare the lease, annual statement, and supporting invoices or allocation records.</p>
        <p className="mt-3 text-slate-700">Use our <Link href="/marketing/burger-restaurant-cam-reconciliation-checklist" className="font-medium text-emerald-800 underline">burger restaurant CAM checklist</Link> for that review.</p>
      </section>

      <section className="mt-16 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
        <h2 className="text-2xl font-semibold">Check the lease behind the number</h2>
        <p className="mt-3 leading-relaxed text-slate-200">Upload your lease for a free preview of its CAM and NNN terms. Add an annual statement and supporting PDFs before checkout if you have them. The $49.99 report flags visible billing questions and states what still needs verification.</p>
        <Link href="/app/step-1-upload" className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-slate-100">
          Upload a lease for a free preview
        </Link>
      </section>
    </main>
  );
}
