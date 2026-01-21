// src/app/marketing/page.tsx
import Link from "next/link";

export default function MarketingIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-3xl font-bold mb-4">
        SaveOnLease Resources
      </h1>

      <p className="text-gray-600 mb-8">
        Learn how SaveOnLease helps commercial tenants uncover CAM and NNN
        overcharges.
      </p>

      <div className="flex justify-center gap-4">
        <Link href="/marketing/how-it-works" className="underline">
          How it Works
        </Link>
        <Link href="/marketing/what-we-find" className="underline">
          What We Find
        </Link>
        <Link href="/marketing/pricing" className="underline">
          Pricing
        </Link>
      </div>
    </main>
  );
}

