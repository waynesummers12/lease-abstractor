import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">
        CAM & NNN Lease Audit — Built for Tenants
      </h1>

      <p className="text-gray-600 mb-8">
        Upload your commercial lease and instantly identify CAM / NNN
        overcharges, uncapped expenses, and audit-window risk.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="/product/app"
          className="rounded-md bg-black px-6 py-3 text-white font-medium hover:bg-gray-800"
        >
          Start CAM Audit
        </Link>

        <Link
          href="/marketing/how-it-works"
          className="rounded-md border px-6 py-3 font-medium hover:bg-gray-50"
        >
          How it works
        </Link>
      </div>
    </main>
  );
}

