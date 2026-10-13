import Link from "next/link";
import type { Metadata } from "next";
import styles from "../RetailGuide.module.css";
import RetailGuideNav from "../RetailGuideNav";

export const metadata: Metadata = {
  title: "Restaurant NNN Charges: What to Check on Your CAM Statement",
  description:
    "A practical checklist for restaurant tenants reviewing NNN charges, CAM allocations, shared services, fee calculations, and payment credits.",
  alternates: {
    canonical: "https://www.saveonlease.com/marketing/restaurant-nnn-overcharges",
  },
};

export default function RestaurantNNNOverchargesPage() {
  return (
    <main className={`${styles.guide} bg-white text-slate-900`}>
      <RetailGuideNav current="/marketing/restaurant-nnn-overcharges" />
      <section className="bg-slate-950 px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
            Restaurant lease guide
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Restaurant NNN charges: what to check on your CAM statement
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-200">
            A restaurant&apos;s annual NNN bill may include property taxes,
            insurance, and shared operating costs. A higher bill is not
            automatically an overcharge. Compare the statement with your
            lease and payment records to find figures that need an explanation.
          </p>
          <Link
            href="/app/step-1-upload"
            className="mt-8 inline-block rounded-lg bg-emerald-400 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-300"
          >
            Upload your lease for a free preview
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-14 px-6 py-16">
        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">First, identify the three inputs</h2>
          <ol className="list-decimal space-y-3 pl-6 text-slate-700">
            <li>
              <strong>Lease and amendments:</strong> Find the allowed expense
              categories, exclusions, tenant share, caps, and review procedure.
            </li>
            <li>
              <strong>Annual reconciliation:</strong> Note the year, cost pool,
              your share, each category, and any balance or credit.
            </li>
            <li>
              <strong>Payment ledger:</strong> Add the monthly estimates and
              other credits paid during the same period.
            </li>
          </ol>
          <p className="text-slate-700">
            If NNN terms are new to you, start with our{" "}
            <Link href="/marketing/triple-net-lease" className="text-emerald-800 underline">
              triple net lease explanation
            </Link>
            .
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-3xl font-semibold">Five restaurant billing questions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Is the tenant share correct?",
                text: "Compare your rentable area, the property's denominator, and any separate cost pools with the lease and area schedule.",
              },
              {
                title: "Are shared services allocated consistently?",
                text: "Check whether trash, grease service, delivery areas, parking, or utilities are charged to all tenants or only the spaces that use them, as the lease provides.",
              },
              {
                title: "Are fees calculated on the right base?",
                text: "Compare management and administrative fee rates and bases with any lease limits. Ask for the calculation behind a lump-sum fee.",
              },
              {
                title: "How were capital projects treated?",
                text: "Check roof, paving, HVAC, or equipment projects against the lease's capital cost and amortization language before classifying a charge as improper.",
              },
              {
                title: "Were all payments credited?",
                text: "Reconcile twelve monthly estimates, prior-year credits, and any direct reimbursements to the annual statement.",
              },
            ].map(({ title, text }) => (
              <article key={title} className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
          <p className="text-slate-700">
            These are checks, not claims that a particular charge is
            disallowed. An invoice, ledger, or allocation schedule may be
            needed to resolve the question.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">A simple reconciliation example</h2>
          <p className="text-slate-700">
            Suppose a statement shows $300,000 of allocated expenses and a
            5% tenant share. That produces $15,000 before adjustments. If
            $12,000 in estimated payments were credited, the visible balance
            is $3,000. Next, verify whether the $300,000 cost pool, 5% share,
            and $12,000 credit match the lease and records. The $3,000 is a
            balance in this example, not a proven overcharge.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">What to do when a line does not match</h2>
          <p className="text-slate-700">
            Record the statement year, line item, amount, and lease clause.
            Request the particular invoice, area schedule, fee calculation,
            or payment ledger needed to check it. Follow the lease&apos;s
            instructions for who receives a request or objection and when.
            A report does not send a notice or preserve rights for you.
          </p>
          <p className="text-slate-700">
            Use the{" "}
            <Link href="/marketing/cam-audit-checklist" className="text-emerald-800 underline">
              CAM review checklist
            </Link>{" "}
            to organize your work. Multi-location operators can also compare
            lease language and statement formats across sites using the{" "}
            <Link href="/marketing/franchise-cam-audit" className="text-emerald-800 underline">
              franchise CAM guide
            </Link>
            .
          </p>
        </section>

        <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-3xl font-semibold">Review your restaurant lease and statement</h2>
          <p className="mt-3 text-slate-700">
            Start with a free lease preview. You can add an annual CAM or NNN
            statement and up to four supporting PDFs before checkout. The
            $49.99 report compares readable billing details with extracted
            lease terms and labels what still needs verification.
          </p>
          <Link
            href="/app/step-1-upload"
            className="mt-5 inline-block rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            Start your free preview
          </Link>
        </section>
      </div>
    </main>
  );
}
