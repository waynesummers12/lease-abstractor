export default function SuccessPage() {
  return (
    <main style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>
        ✅ Payment Successful
      </h1>

      <p style={{ marginTop: 16 }}>
        Thank you! Your CAM / NNN Audit Summary is being prepared.
      </p>

      <p style={{ marginTop: 8, color: "#555" }}>
        You’ll receive your PDF shortly.
      </p>

      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: 24,
          padding: "10px 16px",
          background: "#000",
          color: "#fff",
          borderRadius: 6,
          textDecoration: "none",
        }}
      >
        Back to Dashboard
      </a>
    </main>
  );
}
