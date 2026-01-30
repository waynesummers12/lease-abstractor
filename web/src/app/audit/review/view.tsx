"use client";

export default function ReviewView(props: any) {
  const {
    file,
    setFile,
    status,
    analysis,
    resultsRef,
    exposureBoxStyle,
    exposureRiskLabel,
    animatedExposure,
    totalAvoidableExposure,
    isCheckingOut,
    onUploadAndAnalyze,
    onCheckout,
  } = props;

  return (
    <main
      style={{
        padding: 32,
        maxWidth: 960,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* ---------- HEADER ---------- */}
      <header style={{ marginBottom: 12 }}>
        <p
          style={{
            fontSize: 12,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#475569",
          }}
        >
          Lease audit
        </p>

        <h1 style={{ fontSize: 28, fontWeight: 800 }}>
          Upload your lease and uncover avoidable CAM / NNN spend
        </h1>

        <p style={{ color: "#475569" }}>
          We run your PDF through our audit pipeline and estimate what you could
          recover in the next 12 months.
        </p>
      </header>

      {/* ---------- UPLOAD ---------- */}
      <section
        style={{
          padding: 20,
          borderRadius: 10,
          border: "2px solid #16a34a",
          background: "#f0fdf4",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />

          <button
            onClick={onUploadAndAnalyze}
            disabled={!file}
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              background: !file ? "#cbd5e1" : "#0f172a",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              border: "none",
              cursor: !file ? "not-allowed" : "pointer",
            }}
          >
            Upload & Analyze
          </button>
        </div>

        {status && (
          <p style={{ color: "#0f172a", fontWeight: 600 }}>{status}</p>
        )}
      </section>

      {/* ---------- RESULTS ---------- */}
      {analysis ? (
        <section ref={resultsRef}>
          {/* ===== GREEN EXPOSURE BOX ===== */}
          <div style={exposureBoxStyle}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#166534" }}>
              Estimated Avoidable Exposure (Next 12 Months)
            </div>

            <div
              style={{
                fontSize: 34,
                fontWeight: 900,
                marginTop: 6,
                color:
                  exposureRiskLabel === "high"
                    ? "#991b1b"
                    : exposureRiskLabel === "medium"
                    ? "#92400e"
                    : "#166534",
              }}
            >
              💰 $
              {(animatedExposure ?? totalAvoidableExposure)?.toLocaleString()}
            </div>

            <div
              style={{
                marginTop: 6,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 999,
                background: "#dcfce7",
                border: "1px solid #86efac",
                fontSize: 12,
                fontWeight: 600,
                color: "#166534",
              }}
            >
              ✓ Calculated from CAM, NNN, escalation, and reconciliation clauses
            </div>
          </div>

          <button
            onClick={onCheckout}
            disabled={isCheckingOut}
            style={{
              marginTop: 14,
              padding: "10px 18px",
              borderRadius: 8,
              background: "#0f172a",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              border: "none",
              cursor: isCheckingOut ? "not-allowed" : "pointer",
            }}
          >
            {isCheckingOut
              ? "Opening secure checkout…"
              : "Unlock full audit report →"}
          </button>
        </section>
      ) : (
        <section
          style={{
            border: "1px dashed #cbd5e1",
            padding: 20,
            color: "#475569",
          }}
        >
          No analysis yet. Upload a PDF to see your results.
        </section>
      )}
    </main>
  );
}
