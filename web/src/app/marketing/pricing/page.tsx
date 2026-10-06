"use client";

import Link from "next/link";
import FaqSchema from "@/app/components/FaqSchema";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface WindowWithAnalytics extends Window {
  analytics?: {
    track?: (event: string) => void;
  };
}

export default function PricingPage() {
  const router = useRouter();

  useEffect(() => {
    (window as WindowWithAnalytics)?.analytics?.track?.("pricing_view");
  }, [router]);

  return (
  <div className="mx-auto max-w-3xl space-y-10 px-6">
    {/* HERO */}
    <section>
      <h1 className="text-4xl sm:text-5xl font-light tracking-tight leading-tight">
        Simple, Transparent Pricing
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        One lease. One audit. One clear answer.
      </p>
      <p className="mt-2 text-gray-500">
        No subscriptions, no retainers, no pressure.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Start with a free preview. Pay $49.99 only if you choose to unlock the full audit.
      </p>
    </section>

    {/* PRICE CARD */}
    <section className="rounded-2xl border border-gray-200 p-8 shadow-sm bg-white">
      <div className="flex items-baseline gap-3">
        <div className="text-5xl font-bold">$49.99</div>
        <div className="text-lg text-gray-500">one-time</div>
      </div>

      <p className="mt-4 text-gray-600">
        Includes a full CAM / NNN lease audit with a downloadable PDF
        summary. We also email a download link when a checkout email is available.
      </p>

      <p className="mt-3 text-sm text-red-500 font-medium">
        Your lease terms determine which CAM and NNN charges may need a closer review.
        <a className="ml-1 underline" href="https://archibus.tn.gov/archibus_help/user/Subsystems/webc/Content/gloss/rplm/cam_costs_def.htm">Source: Tennessee CAM cost guide</a>
      </p>

      <ul className="mt-6 space-y-2 text-gray-600 list-none">
        <li className="flex items-start gap-2">
          <span className="text-green-500">✔</span>
          <span>Lease language review</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500">✔</span>
          <span>CAM & NNN risk identification</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500">✔</span>
          <span>Administrative & management fee analysis</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500">✔</span>
          <span>Capital expenditure responsibility review</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500">✔</span>
          <span>Insurance and tax pass-through review</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500">✔</span>
          <span>Pro-rata share & allocation checks</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500">✔</span>
          <span>Lease review items and verification steps</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500">✔</span>
          <span>Secure PDF download; email link when available</span>
        </li>
      </ul>

      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <h2 className="text-lg font-semibold text-emerald-950">See what the report looks like</h2>
        <p className="mt-2 text-sm text-emerald-900">
          Open a deidentified three-page report. It includes page-linked lease topics, a records checklist, a billing worksheet, and clearly labeled missing fields. Results vary by lease, and a lease alone cannot verify an overcharge.
        </p>
        <a
          href="/sample/lease-review-sample.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-emerald-900 underline underline-offset-4 hover:text-emerald-950"
        >
          View the sample report (PDF) ↗
        </a>
      </div>

      <Link
        href="/app/step-1-upload"
        onClick={() => console.log("pricing_cta_click_top")}
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
      >
        Preview Your Savings →
      </Link>
    </section>

    {/* VALUE COMPARISON (HIGH-CONVERSION) */}
    <section className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-3">
        $49.99 vs. What You Might Be Losing
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="text-sm text-gray-400">Audit Cost</div>
          <div className="text-3xl font-bold text-black">$49.99</div>
        </div>

        <div>
          <div className="text-sm text-gray-400">Typical Avoidable Costs</div>
          <div className="text-3xl font-bold text-red-600">$5,000 – $20,000+</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Even a small CAM or NNN error can exceed the cost of this audit within a single billing cycle.
      </div>
      <Link
        href="/app/step-1-upload"
        onClick={() => console.log("pricing_cta_click_value_block")}
        className="mt-3 inline-block text-sm font-medium underline hover:opacity-80"
      >
        See My Potential Savings →
      </Link>
    </section>

    {/* ROI */}
    <section className="rounded-2xl bg-gray-50 p-6">
      <h2 className="text-2xl font-semibold">What the Audit Reviews</h2>
      <p className="mt-3 text-gray-600">
        CAM and NNN charges depend on the property and your lease terms.
        The audit flags clauses that may need review against your billing records.
      </p>
      <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 marker:text-green-600">
        <li>CAM and NNN charges defined in your lease</li>
        <li>Administrative fee terms and limits</li>
        <li>Insurance and tax pass-through terms</li>
      </ul>
      <p className="mt-3 text-gray-600">
        Actual savings, if any, require verification against invoices and the lease.
      </p>
    </section>

    {/* FAQ (VISIBLE) */}
    <section>
      <h2 className="text-2xl font-semibold">Common Questions</h2>

      <div className="mt-4 space-y-4 text-gray-700">
        <div>
          <h3 className="font-medium">Is this a subscription?</h3>
          <p>No. Pricing is per lease, one-time.</p>
        </div>

        <div>
          <h3 className="font-medium">
            Do you negotiate with my landlord?
          </h3>
          <p>
            No. SaveOnLease provides clarity and documentation so you
            can decide how to proceed.
          </p>
        </div>

        <div>
          <h3 className="font-medium">
            Is this legal or accounting advice?
          </h3>
          <p>
            No. The audit highlights financial and contractual risk
            areas based on lease language.
          </p>
        </div>

        <div>
          <h3 className="font-medium">
            What if my lease has no issues?
          </h3>
          <p>
            You’ll still receive a clear summary confirming that no
            significant CAM / NNN risks were identified.
          </p>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="mt-8 pb-12">
      <Link
        href="/app/step-1-upload"
        onClick={() => console.log("pricing_cta_click_bottom")}
        className="inline-flex items-center justify-center rounded-lg bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-800 hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
      >
        Analyze My Lease →
      </Link>
      <p className="mt-3 text-xs text-gray-500 text-center">
        Results vary by lease and available records
      </p>
    </section>

    {/* FAQ SCHEMA (SEO) */}
    <FaqSchema
      faqs={[
        {
          question: "How much does a CAM or NNN audit cost?",
          answer:
            "SaveOnLease offers a one-time CAM and NNN lease audit for $49.99 with no subscription or ongoing fees.",
        },
        {
          question: "Is the CAM audit fee refundable?",
          answer:
            "The audit provides a detailed analysis regardless of findings, including confirmation when no significant issues are detected.",
        },
        {
          question: "Do CAM and NNN audits usually save money?",
          answer:
            "The audit identifies potential risks. Actual overcharges require checking the lease against billing records.",
        },
      ]}
    />
  </div>
  );
}
