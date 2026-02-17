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
        name: "What is a CAM audit checklist?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "A CAM audit checklist is a structured review framework used by commercial tenants to evaluate Common Area Maintenance reconciliations for administrative fee overcharges, capital misclassification, allocation errors, and audit window risk.",
        },
      },
      {
        "@type": "Question",
        name: "What errors does a CAM review typically uncover?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Common findings include management fee overapplication, improper capital expense allocation, pro rata share miscalculations, gross-up distortion, controllable expense cap violations, and audit window timing exposure.",
        },
      },
      {
        "@type": "Question",
        name: "How much money can a CAM audit recover?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Depending on lease structure and property size, structured CAM reviews frequently identify annual exposure ranging from $5,000 to $50,000 or more in misapplied or misclassified charges.",
        },
      },
      {
        "@type": "Question",
        name: "When should a tenant perform a CAM audit?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Tenants should perform a CAM review immediately upon receiving an annual reconciliation, especially before contractual audit windows close. Most leases limit dispute rights to a defined period after reconciliation delivery.",
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
                What is a CAM audit checklist?
              </h3>
              <p>
                A CAM audit checklist is a structured review framework used by
                commercial tenants to evaluate Common Area Maintenance (CAM)
                reconciliations for administrative fee overcharges, capital
                misclassification, allocation errors, and audit window risk.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                What errors does a CAM review typically uncover?
              </h3>
              <p>
                Common findings include management fee overapplication, improper
                capital expense allocation, pro rata share miscalculations,
                gross-up distortion, controllable expense cap violations, and
                audit window timing exposure.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                How much money can a CAM audit recover?
              </h3>
              <p>
                Depending on lease structure and property size, structured CAM
                reviews frequently identify annual exposure ranging from
                $5,000 to $50,000 or more in misapplied or misclassified charges.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                When should a tenant perform a CAM audit?
              </h3>
              <p>
                Tenants should perform a CAM review immediately upon receiving
                an annual reconciliation, especially before contractual audit
                windows close. Most leases limit dispute rights to a defined
                period after reconciliation delivery.
              </p>
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