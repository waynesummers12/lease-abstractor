"use client";

import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 space-y-6">
      <h1 className="text-3xl font-bold">
        Checkout cancelled
      </h1>

      <p className="text-gray-600">
        Your payment was not completed. No charges were made.
      </p>

      <p className="text-gray-600">
        You can return to your audit at any time and complete checkout when
        you’re ready.
      </p>

      <div>
        <Link
          href="/"
          className="inline-block rounded bg-black px-5 py-2 text-white hover:bg-gray-800"
        >
          Back to audit
        </Link>
      </div>
    </main>
  );
}
