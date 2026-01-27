"use client";

import React from "react";

const sectionStyle: React.CSSProperties = {
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: 24,
  marginBottom: 24,
};

const headingStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 800,
  marginBottom: 12,
};

const subHeadingStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  marginBottom: 8,
};

const textStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.6,
  color: "#334155",
};

const ctaStyle: React.CSSProperties = {
  marginTop: 20,
  padding: "14px 20px",
  background: "#0f172a",
  color: "white",
  borderRadius: 10,
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
};

export default function CamAdminFeesPage() {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "48px 24px",
      }}
    >
      {/* ---------- HERO ---------- */}
      <section style={{ marginBottom: 40 }}>
        <h1 style={headingStyle}>
          CAM Admin Fees: What They Are — and Why Tenants Overpay
        </h1>

        <p style={{ ...textStyle, fontSize: 17 }}>
          <strong>
            CAM admin fees are often inflated — and frequently challengeable.
          </strong>
        </p>

        <p style={{ ...textStyle, marginTop: 12 }}>
          If you’re paying CAM or NNN charges, there’s a good chance you’re also
          paying administrative or management fees buried inside them. Many
          tenants don’t realize these fees aren’t always allowed — and often add
          thousands in unnecessary costs.
        </p>
      </section>

      {/* ---------- WHAT THEY ARE ---------- */}
      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>What are CAM admin fees?</h2>
        <p style={textStyle}>
          CAM admin fees are percentage-based charges added on top of Common Area
          Maintenance expenses. They’re typically labeled as “administrative,”
          “management,” or “overhead” fees — and they are <strong>not</strong>{" "}
          direct maintenance costs.
        </p>
      </section>

      {/* ---------- RANGES ---------- */}
      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Typical CAM admin fee ranges</h2>
        <p style={textStyle}>
          Most leases list admin fees between <strong>10% and 15%</strong>. Fees
          above 15% are common — and often questionable.
        </p>

        <ul style={{ marginTop: 12, paddingLeft: 20, ...textStyle }}>
          <li>$25,000 CAM × 10% = $2,500 extra</li>
          <li>$40,000 CAM × 15% = $6,000 extra</li>
          <li>$60,000 CAM × 15% = $9,000 extra</li>
        </ul>
      </section>

      {/* ---------- ABUSE ---------- */}
      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Common CAM admin fee abuse patterns</h2>

        <ul style={{ paddingLeft: 20, ...textStyle }}>
          <li>
            <strong>Double-counting:</strong> Management salaries plus admin
            markup
          </li>
          <li>
            <strong>Improper scope:</strong> Admin fees applied to taxes,
            insurance, or capital expenses
          </li>
          <li>
            <strong>Stacking:</strong> Management fee + admin fee + overhead
          </li>
          <li>
            <strong>No cap:</strong> Percentage increases with no upper limit
          </li>
        </ul>
      </section>
{/* ---------- INLINE COST CALCULATOR ---------- */}
<section
  style={{
    marginTop: 32,
    padding: 20,
    borderRadius: 12,
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
  }}
>
  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>
    What CAM admin fees really cost
  </h3>

  <p style={{ fontSize: 15, color: "#374151" }}>
    CAM admin fees are usually charged as a percentage of total CAM expenses.
    That percentage compounds every year.
  </p>

  <div
    style={{
      marginTop: 12,
      padding: 16,
      borderRadius: 10,
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      fontSize: 16,
      fontWeight: 600,
    }}
  >
    A <strong>12% admin fee</strong> on{" "}
    <strong>$80,000</strong> in CAM charges =
    <span style={{ color: "#991b1b", marginLeft: 6 }}>
      $9,600 per year
    </span>
  </div>

  <p style={{ marginTop: 8, fontSize: 14, color: "#6b7280" }}>
    Most tenants never see this number clearly — it’s buried inside CAM
    reconciliations and labeled as “standard.”
  </p>
</section>
      {/* ---------- WHEN NOT ALLOWED ---------- */}
      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>When CAM admin fees are not allowed</h2>
        <p style={textStyle}>
          Admin fees are often limited or prohibited when the lease excludes
          overhead, restricts capital costs, or requires fees to reflect actual
          services rendered. Even when allowed, the calculation is frequently
          wrong — and hinges on how clearly your lease defines
          <a
            href="/marketing/nnn-audit-rights"
            style={{ color: "#0f172a", fontWeight: 600, marginLeft: 4 }}
          >
            NNN audit rights
          </a>.
        </p>
      </section>

      {/* ---------- WHY MISSED ---------- */}
      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Why most tenants miss this</h2>
        <p style={textStyle}>
          CAM admin fees are buried deep in lease language and rarely itemized in
          reconciliation statements. Most tenants assume percentages are
          standard — and never verify them.
        </p>
      </section>

{/* ---------- COLORADO TENANT INSIGHT ---------- */}
<section
  style={{
    marginTop: 24,
    padding: 18,
    borderLeft: "4px solid #0f172a",
    background: "#f9fafb",
  }}
>
  <h4 style={{ fontSize: 16, fontWeight: 800 }}>
    Colorado tenant insight
  </h4>

  <p style={{ fontSize: 15, color: "#374151", marginTop: 6 }}>
    In Colorado, CAM admin fees are frequently bundled with{" "}
    <strong>management fees</strong> and labeled as “overhead” — even when the
    lease restricts or caps those charges.
  </p>

  <p style={{ fontSize: 14, color: "#374151", marginTop: 6 }}>
    This is especially common in retail and mixed-use properties across Denver
    and the Front Range, where tenants rarely receive itemized CAM breakdowns.
  </p>
</section>

      {/* ---------- CTA ---------- */}
      <section
        style={{
          border: "2px solid #16a34a",
          background: "#f0fdf4",
          borderRadius: 14,
          padding: 28,
        }}
      >
        <h2 style={{ ...subHeadingStyle, color: "#166534" }}>
          You may be paying thousands you don’t owe
        </h2>

        <p style={{ ...textStyle, marginBottom: 16 }}>
          Upload your lease and we’ll automatically identify admin fees, flag
          overcharges, and estimate your potential recovery.
        </p>

        <button
          style={ctaStyle}
          onClick={() => (window.location.href = "/product/app")}
        >
          Check your CAM admin fees automatically →
        </button>

        <p style={{ marginTop: 10, fontSize: 13, color: "#475569" }}>
          One-time audit • Secure upload • No subscription
        </p>
      </section>
      {/* ---------- FAQ SECTION ---------- */}
      <section
        style={{
          marginTop: 48,
          borderTop: "1px solid #e5e7eb",
          paddingTop: 32,
          display: "grid",
          gap: 16,
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 800 }}>
          CAM Admin Fees — Common Questions
        </h2>

        <details>
          <summary style={{ fontWeight: 700, cursor: "pointer" }}>
            What are CAM admin fees?
          </summary>
          <p style={{ marginTop: 8 }}>
            CAM admin fees are percentage-based charges added to Common Area
            Maintenance expenses. They are often labeled as administrative,
            management, or overhead fees — and they are <strong>not actual
            maintenance costs</strong>.
          </p>
          <p>
            Many tenants discover these fees only after running a lease audit or
            using a tool like{" "}
            <a
              href="/product/app"
              style={{ color: "#0f172a", fontWeight: 600 }}
            >
              SaveOnLease
            </a>.
          </p>
        </details>

        <details>
          <summary style={{ fontWeight: 700, cursor: "pointer" }}>
            What is a normal CAM admin fee percentage?
          </summary>
          <p style={{ marginTop: 8 }}>
            Most CAM admin fees fall between <strong>10% and 15%</strong>.
            Percentages above that range are common — but frequently
            challengeable depending on lease language.
          </p>
          <p>
            Our automated audit flags admin fees that exceed market norms. You
            can{" "}
            <a
              href="/product/app"
              style={{ color: "#0f172a", fontWeight: 600 }}
            >
              check your lease automatically
            </a>{" "}
            in minutes.
          </p>
        </details>

        <details>
          <summary style={{ fontWeight: 700, cursor: "pointer" }}>
            Are CAM admin fees negotiable or challengeable?
          </summary>
          <p style={{ marginTop: 8 }}>
            Yes. CAM admin fees are one of the <strong>most commonly disputed</strong>{" "}
            lease charges. They are often reduced or removed when they include
            double-counting, capital expenses, or vague “management” language.
          </p>
          <p>
            Most tenants never challenge them because the math is buried.{" "}
            <a
              href="/product/app"
              style={{ color: "#0f172a", fontWeight: 600 }}
            >
              Automated review
            </a>{" "}
            makes this obvious.
          </p>
        </details>

        <details>
          <summary style={{ fontWeight: 700, cursor: "pointer" }}>
            When are CAM admin fees not allowed?
          </summary>
          <p style={{ marginTop: 8 }}>
            CAM admin fees may be prohibited when leases exclude overhead costs,
            cap management fees, or require expenses to reflect actual services
            performed.
          </p>
          <p>
            If you’re unsure, the fastest way to confirm is to{" "}
            <a
              href="/product/app"
              style={{ color: "#0f172a", fontWeight: 600 }}
            >
              upload your lease for analysis
            </a>.
          </p>
        </details>

        <details>
          <summary style={{ fontWeight: 700, cursor: "pointer" }}>
            Why do most tenants overpay CAM admin fees?
          </summary>
          <p style={{ marginTop: 8 }}>
            Because admin fees are rarely itemized and often assumed to be
            “standard.” In reality, many tenants are paying thousands they don’t
            owe.
          </p>
          <p>
            That’s why we built an audit designed specifically for tenants.{" "}
            <a
              href="/product/app"
              style={{ color: "#0f172a", fontWeight: 600 }}
            >
              Check your fees automatically
            </a>.
          </p>
        </details>
      </section>

      {/* ---------- SEO FAQ SCHEMA ---------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What are CAM admin fees?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "CAM admin fees are percentage-based charges added to Common Area Maintenance costs, often labeled as administrative, management, or overhead fees. They are not direct maintenance expenses and are frequently inflated or misapplied."
                }
              },
              {
                "@type": "Question",
                "name": "What is a normal CAM admin fee percentage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Most CAM admin fees fall between 10% and 15%. Fees above 15% are common but often questionable and may be challengeable depending on lease language."
                }
              },
              {
                "@type": "Question",
                "name": "Are CAM admin fees negotiable or challengeable?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Yes. CAM admin fees are frequently negotiable and challengeable, especially when they include double-counting, capital expenses, or services not permitted under the lease."
                }
              },
              {
                "@type": "Question",
                "name": "When are CAM admin fees not allowed?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "CAM admin fees may not be allowed when leases exclude overhead costs, limit management fees, prohibit capital expenses, or require fees to reflect actual services rendered."
                }
              },
              {
                "@type": "Question",
                "name": "Why do most tenants overpay CAM admin fees?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Most tenants overpay because admin fees are buried in lease language and rarely itemized in reconciliation statements. Many tenants assume percentages are standard and never review the calculation."
                }
              }
            ]
          }),
        }}
      />
    </main>
  );
}
