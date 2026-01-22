import FaqSchema from "@/app/components/FaqSchema";

export const metadata = {
  title: "SaveOnLease | CAM & NNN Lease Audit for Commercial Tenants",
  description:
    "Upload your commercial lease and identify CAM and NNN overcharges, uncapped expenses, and audit-window risk in minutes.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-6 py-12">
      {/* HERO */}
      <section>
        <h1 className="text-4xl font-bold">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          One lease. One audit. One clear answer.
        </p>
        <p className="mt-2 text-gray-700">
          No subscriptions, no retainers, no pressure.
        </p>
      </section>

      {/* PRICE CARD */}
      <section className="rounded border p-8">
        <div className="flex items-baseline gap-2">
          <div className="text-5xl font-bold">$249.99</div>
          <div className="text-lg text-gray-600">one-time</div>
        </div>

        <p className="mt-4 text-gray-700">
          Includes a full CAM / NNN lease audit with a downloadable PDF
          summary and email delivery.
        </p>

        <ul className="mt-6 space-y-3 text-gray-700">
          <li>✔ Lease language review</li>
          <li>✔ CAM & NNN risk identification</li>
          <li>✔ Administrative & management fee analysis</li>
          <li>✔ Capital expenditure responsibility review</li>
          <li>✔ Insurance and tax pass-through review</li>
          <li>✔ Pro-rata share & allocation checks</li>
          <li>✔ Estimated avoidable exposure (when applicable)</li>
          <li>✔ Secure PDF + email delivery</li>
        </ul>

        <a
          href="/"
          className="mt-6 inline-block rounded bg-black px-6 py-3 text-white"
        >
          Upload a Lease
        </a>
      </section>

      {/* ROI */}
      <section className="rounded bg-gray-50 p-6">
        <h2 className="text-2xl font-semibold">
          Typical ROI for Tenants
        </h2>
        <p className="mt-3 text-gray-700">
          CAM and NNN charges often represent 15–35% of total rent. Even
          small errors can add up over time.
        </p>
        <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">
          <li>Common findings range from $5,000 to $20,000+</li>
          <li>Administrative fees frequently exceed lease limits</li>
          <li>Insurance and tax pass-throughs are often misapplied</li>
        </ul>
        <p className="mt-3 text-gray-700">
          Many tenants recover the cost of the audit many times over.
        </p>
      </section>

      {/* FAQ (VISIBLE) */}
      <section>
        <h2 className="text-2xl font-semibold">
          Common Questions
        </h2>

        <div className="mt-4 space-y-4 text-gray-700">
          <div>
            <h3 className="font-medium">
              Is this a subscription?
            </h3>
            <p>
              No. Pricing is per lease, one-time.
            </p>
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
      <section className="pt-4">
        <a
          href="/"
          className="inline-block rounded border px-6 py-3"
        >
          Get Started
        </a>
      </section>

      {/* FAQ SCHEMA (SEO) */}
      <FaqSchema
        faqs={[
          {
            question: "How much does a CAM or NNN audit cost?",
            answer:
              "SaveOnLease offers a one-time CAM and NNN lease audit for $249.99 with no subscription or ongoing fees.",
          },
          {
            question: "Is the CAM audit fee refundable?",
            answer:
              "The audit provides a detailed analysis regardless of findings, including confirmation when no significant issues are detected.",
          },
          {
            question: "Do CAM and NNN audits usually save money?",
            answer:
              "Many tenants identify thousands of dollars in potential overcharges, though results vary by lease and expense structure.",
          },
        ]}
      />
    </div>
  );
}
