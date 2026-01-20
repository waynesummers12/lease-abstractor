export default function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is CAM and NNN?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "CAM (Common Area Maintenance) and NNN (Triple Net) charges are operating expenses passed through to commercial tenants for property maintenance, insurance, and taxes."
        }
      },
      {
        "@type": "Question",
        "name": "How often do CAM overcharges occur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "CAM and NNN overcharges are common due to complex lease language, reconciliation errors, administrative fees, and improper allocation of expenses."
        }
      },
      {
        "@type": "Question",
        "name": "Is a CAM audit worth it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Many tenants uncover thousands to tens of thousands of dollars in potential overcharges through a CAM audit, depending on lease size and duration."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
