export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="mb-4 text-4xl font-bold">
        CAM & NNN Lease Audit — Built for Tenants
      </h1>

      <p className="mb-10 text-gray-600">
        Upload your commercial lease and instantly identify CAM / NNN
        overcharges, uncapped expenses, and audit-window risk.
      </p>

      <a
        href="/product/app"
        className="inline-flex items-center rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition"
      >
        Start CAM Audit
      </a>
    </main>
  );
}


