import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="mb-4 text-3xl font-semibold">
        Audit Not Completed
      </h1>

      <p className="mb-8 text-gray-600">
        No worries — your lease audit preview is still available.
        You can continue reviewing your results or restart the checkout at any time.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/app/step-3-review"
          className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Return to Audit Review
        </Link>

        <Link
          href="/app/step-1-upload"
          className="rounded-lg border px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Upload Another Lease
        </Link>
      </div>

      <p className="mt-6 text-xs text-gray-500">
        You were not charged.
      </p>
    </main>
  );
}