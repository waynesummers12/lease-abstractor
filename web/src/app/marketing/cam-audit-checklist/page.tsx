import Link from "next/link";

export const metadata = {
  title: "Tenant-First CAM Audit Checklist (Free Download) | SaveOnLease",
  description:
    "Download the Tenant-First CAM Audit Checklist for retail and office leases. Identify administrative overcharges, capital misclassification, pro rata errors, and audit window risks before exposure compounds.",
};

export default function CamAuditChecklistPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a CAM audit checklist in a commercial lease?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "A CAM audit checklist is a structured framework commercial tenants use to review Common Area Maintenance (CAM) reconciliation charges for administrative overapplication, capital misclassification, pro rata allocation errors, and audit window exposure.",
        },
      },
      {
        "@type": "Question",
        name: "What are common CAM reconciliation errors in retail and office leases?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Common CAM reconciliation errors include management fee overapplication, capital expenses improperly passed through, pro rata share miscalculations, gross-up distortion during vacancy, and controllable expense cap violations.",
        },
      },
      {
        "@type": "Question",
        name: "How much money can a CAM audit identify or recover?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Depending on lease structure and square footage, structured CAM reviews frequently identify annual exposure ranging from $5,000 to $50,000 or more in misapplied or misclassified charges.",
        },
      },
      {
        "@type": "Question",
        name: "When should a tenant review CAM reconciliation charges?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Tenants should review CAM reconciliation charges immediately upon receipt, especially before contractual audit windows close. Most commercial leases limit dispute rights to a defined period after reconciliation delivery.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do if CAM charges increase significantly year over year?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "If CAM charges increase materially year over year, tenants should review lease caps, allocation methodology, expense classifications, and audit window deadlines before accepting the reconciliation statement.",
        },
      },
    ],
  };
  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
          Free Download
        </p>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          The Tenant-First CAM Audit Checklist
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          A structured, professional framework for reviewing Common Area
          Maintenance (CAM) reconciliations before audit windows close.
        </p>

        <p className="text-gray-700 max-w-2xl mx-auto mb-10">
          Designed for retail and office tenants. Frequently identifies
          administrative overcharges, capital misclassification, allocation
          drift, and structural exposure ranging from{" "}
          <strong>$5,000–$50,000+ annually</strong>.
        </p>

        <a
          href="/assets/cam-audit-checklist-v1.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black text-white px-8 py-4 text-lg font-semibold rounded-md hover:bg-gray-800 transition"
        >
          Download Free Checklist (PDF)
        </a>
      </section>

      {/* Authority Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            What This Guide Covers
          </h2>

          <ul className="space-y-4 text-gray-700">
            <li>• Administrative & management fee review</li>
            <li>• Capital expenditure classification</li>
            <li>• Pro rata allocation verification</li>
            <li>• Gross-up & vacancy distortion analysis</li>
            <li>• Controllable vs. uncontrollable expense testing</li>
            <li>• Year-over-year variance review methodology</li>
            <li>• Audit window leverage protection</li>
            <li>• Financial exposure compounding models</li>
          </ul>
          <p className="mt-8 text-gray-700">
            If you're new to CAM structures, you may also want to review our{" "}
            <Link href="/marketing/common-area-maintenance-cam" className="underline">
              overview of Common Area Maintenance (CAM)
            </Link>{" "}
            and our guide to{" "}
            <Link href="/marketing/nnn" className="underline">
              NNN (Triple Net) leases
            </Link>{" "}
            to understand how operating expenses are structured before applying this checklist.
          </p>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            Why CAM Reviews Are Increasing
          </h2>

          <p className="text-gray-700 mb-4">
            Rising insurance premiums, post-COVID vacancy shifts, operating
            volatility, and inflation in controllable expense categories have
            materially increased CAM variability.
          </p>

          <p className="text-gray-700 mb-4">
            Structural lease complexity combined with expense volatility
            increases the probability of misapplication — even in good-faith
            reconciliations.
          </p>

          <p className="text-gray-700">
            Structured tenant-side review is no longer optional due diligence.
            It is financial risk management.
            Tenants reviewing CAM exposure should also understand how charges appear in practice within{" "}
            <Link href="/marketing/cam-commercial-real-estate" className="underline">
              commercial real estate CAM structures
            </Link>{" "}
            and how allocation mechanics differ under{" "}
            <Link href="/marketing/triple-net-lease" className="underline">
              triple net lease agreements
            </Link>.
            For a deeper breakdown of reconciliation mechanics, see our{" "}
            <Link href="/marketing/cam-reconciliation" className="underline">
              CAM reconciliation guide
            </Link>{" "}
            and our analysis of{" "}
            <Link href="/marketing/cam-vs-nnn" className="underline">
              CAM vs. NNN lease structures
            </Link>.
          </p>
        </div>
      </section>

      {/* Visible FAQ Section */}
      <section className="py-20 px-6 bg-white border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8 text-gray-700">

            <div>
              <h3 className="text-xl font-semibold mb-2">
                What is a CAM audit checklist in a commercial lease?
              </h3>
              <p>
                A CAM audit checklist is a structured framework commercial tenants use to review Common Area Maintenance (CAM) reconciliation charges for administrative overapplication, capital misclassification, pro rata allocation errors, and audit window exposure.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                What are common CAM reconciliation errors in retail and office leases?
              </h3>
              <p>
                Common CAM reconciliation errors include management fee overapplication,
                capital expenses improperly passed through, pro rata share miscalculations,
                gross-up distortion during vacancy, and controllable expense cap violations.
                For a detailed explanation of how these errors appear in practice, review our{" "}
                <Link href="/marketing/cam-reconciliation" className="underline">
                  CAM reconciliation breakdown
                </Link>.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                How much money can a CAM audit identify or recover?
              </h3>
              <p>
                Depending on lease structure and square footage, structured CAM reviews frequently identify annual exposure ranging from $5,000 to $50,000 or more in misapplied or misclassified charges.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                When should a tenant review CAM reconciliation charges?
              </h3>
              <p>
                Tenants should review CAM reconciliation charges immediately upon receipt,
                especially before contractual audit windows close. Most commercial leases
                limit dispute rights to a defined period after reconciliation delivery.
                Learn more about timing risks in our{" "}
                <Link href="/marketing/audit-window-deadlines" className="underline">
                  audit window deadlines guide
                </Link>.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                What should I do if CAM charges increase significantly year over year?
              </h3>
              <p>
                If CAM charges increase materially year over year, tenants should review
                lease caps, allocation methodology, expense classifications, and audit
                window deadlines before accepting the reconciliation statement. You may
                also want to reference our{" "}
                <Link href="/marketing/cam-reconciliation-checklist" className="underline">
                  CAM reconciliation checklist overview
                </Link>{" "}
                for a structured review sequence.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="bg-gray-50 py-16 px-6 border-t">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-gray-600 mb-6">
            Continue your CAM & NNN lease research with these structured tenant-side guides.
          </p>
          <h2 className="text-2xl font-bold mb-8 text-center">
            Related CAM & NNN Guides
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-gray-700">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3">CAM Reconciliation Guide</h3>
              <p className="text-sm mb-4">
                Step-by-step breakdown of how CAM reconciliations are calculated,
                where errors occur, and how to review allocations.
              </p>
              <Link href="/marketing/cam-reconciliation" className="underline">
                Read Guide →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3">Audit Window Deadlines</h3>
              <p className="text-sm mb-4">
                Understand 30, 60, and 90-day audit notice requirements and how
                missed deadlines eliminate dispute leverage.
              </p>
              <Link href="/marketing/audit-window-deadlines" className="underline">
                Review Deadlines →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3">CAM vs. NNN Explained</h3>
              <p className="text-sm mb-4">
                Compare CAM charges and Triple Net lease structures to understand
                how operating expenses are passed through.
              </p>
              <Link href="/marketing/cam-vs-nnn" className="underline">
                Compare Structures →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Before Your Audit Window Closes
          </h2>

          <p className="text-lg text-gray-300 mb-8">
            If you want a structured CAM & NNN lease review with quantified
            exposure analysis, SaveOnLease provides tenant-side evaluation with
            clear written findings.
          </p>

          <Link
            href="/app/step-1-upload"
            className="inline-block bg-white text-black px-8 py-4 text-lg font-semibold rounded-md hover:bg-gray-200 transition"
          >
            Start Lease Review
          </Link>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}