import Link from "next/link";

export default function LeasePortfolioSoftwarePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-4">Know what each lease needs next.</h1>

      <p className="text-gray-600 mb-8">
        Keep your saved leases, renewal dates, and next steps together. Assign an owner and a date to each task, then see open work across your portfolio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <div className="border rounded-lg p-6">
          <h2 className="text-lg sm:text-xl font-light tracking-tight mb-2">
            See the dates you saved
          </h2>
          <p className="text-sm text-gray-600">
            Find leases by property and view upcoming renewal dates. Leases without a saved date stay visible so you can complete the record.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-lg sm:text-xl font-light tracking-tight mb-2">
            Track the next action
          </h2>
          <p className="text-sm text-gray-600">
            Add a task to a lease, name the person responsible, set a date if known, and mark the work complete. Note the lease page or document that prompted it.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-lg sm:text-xl font-light tracking-tight mb-2">
            Keep the evidence close
          </h2>
          <p className="text-sm text-gray-600">
            Return to saved lease details and any completed review when you need the terms, findings, or follow-up questions.
          </p>
        </div>

      </div>

      <div className="mt-12">
        <Link
          href="/product/app/dashboard"
          className="bg-black text-white px-6 py-3 rounded-md inline-block"
        >
          Open your lease dashboard
        </Link>
      </div>
      <p className="mt-8 max-w-3xl text-sm leading-6 text-gray-500">Tasks and dates are entered by your team. SaveOnLease does not calculate notice deadlines or send task reminders; confirm requirements against the signed lease before acting.</p>
    </main>
  );
}
