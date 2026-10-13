import Link from "next/link";
import type { Metadata } from "next";
import styles from "../MedicalGuide.module.css";
import MedicalGuideNav from "../MedicalGuideNav";

export const metadata: Metadata = {
  title: "How Medical Practices Can Question CAM Charges",
  description:
    "A document-based guide to reviewing a medical office CAM statement, checking lease terms, requesting records, and raising a specific billing question.",
  alternates: {
    canonical:
      "https://www.saveonlease.com/marketing/how-medical-practices-can-dispute-cam-charges",
  },
};

export default function DisputeMedicalCAMChargesPage() {
  return (
    <main className={`${styles.guide} space-y-12`}>
      <MedicalGuideNav current="/marketing/how-medical-practices-can-dispute-cam-charges" />
      <section className="space-y-5">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          How a medical practice can question CAM charges
        </h1>
        <p className="text-lg text-slate-700">
          A CAM statement tells you what the landlord billed. Your lease and
          amendments tell you which costs may be passed through and how your
          share should be calculated. Compare the two before calling a line
          item an overcharge.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Find the rules in your lease</h2>
        <p className="text-slate-700">
          Read the operating expense definition, exclusions, allocation method,
          administrative fee language, capital cost provisions, and any caps.
          Check amendments too. Locate the exact procedure and deadline, if
          any, for requesting records or sending a billing objection. The
          applicable terms depend on your agreement.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Match each question to a statement line</h2>
        <p className="text-slate-700">
          Note the reconciliation year, category, billed amount, credits, and
          your stated share. Recalculate visible arithmetic. Then identify the
          lease clause that makes a category or allocation worth checking.
          Keep a separate list for figures that cannot be verified from the
          statement alone.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          3. Check costs specific to the building and your practice
        </h2>
        <p className="text-slate-700">
          Medical buildings may have shared and tenant-specific systems. Ask
          whether the billed cost pool includes expenses for equipment or
          services used by only some tenants, such as dedicated HVAC, backup
          power, specialized utilities, medical waste, or reserved parking.
          Also check how capital projects and administrative fees were treated.
          None of these costs is automatically improper; the lease and
          supporting records determine the answer.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Request the records you need</h2>
        <p className="text-slate-700">
          Follow the lease procedure for requesting backup. For each questioned
          line, identify the year and amount and ask for the relevant invoice,
          ledger detail, area or allocation schedule, fee calculation, or
          amortization schedule. A useful question is specific: “The statement
          allocates this generator expense to our suite. Please provide the
          invoice, allocation method, and the lease provision used for this
          charge.”
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Track the response and any deadline</h2>
        <p className="text-slate-700">
          Save the statement, lease excerpts, your calculation, the request,
          and the landlord&apos;s response together. Use the notice recipient,
          method, and timing specified in your lease. If a deadline is close
          or the amount is material, consult a qualified attorney or accountant
          about your next step. A report or records request does not itself
          preserve contractual rights.
        </p>
      </section>

      <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-2xl font-semibold">Start with your documents</h2>
        <p className="mt-3 text-slate-700">
          SaveOnLease offers a free lease preview. You can add an annual CAM
          statement and supporting PDFs before checkout. The $49.99 report
          compares visible billing information with extracted lease terms and
          labels items that still need verification.
        </p>
        <Link
          href="/app/step-1-upload"
          className="mt-5 inline-block rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          Upload your lease for a free preview
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Related guides</h2>
        <ul className="list-disc space-y-2 pl-6 text-emerald-800">
          <li>
            <Link href="/marketing/medical-office-cam-reconciliation">
              Review a medical office CAM reconciliation
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-office-nnn-expenses">
              Understand medical office NNN expenses
            </Link>
          </li>
          <li>
            <Link href="/marketing/medical-office-lease-audit">
              Check medical office lease terms
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
