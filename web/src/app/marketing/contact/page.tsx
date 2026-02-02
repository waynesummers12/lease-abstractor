export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-center">
        <h1 className="text-4xl font-light tracking-tight">
          Contact Us
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          We’re excited to support you throughout your lease audit journey.
        </p>

        <p className="mt-4 text-base text-gray-500">
          Whether you have questions about your audit, ideas for future
          enhancements, or feedback on your experience, we’d love to hear
          from you.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border bg-white p-8 shadow-sm">
        <div className="space-y-4 text-sm text-gray-700">
          <p>
            📩 Email us at{" "}
            <a
              href="mailto:support@saveonlease.com"
              className="font-medium text-black underline"
            >
              support@saveonlease.com
            </a>
          </p>

          <p>
            ⏱ Normal response time is within{" "}
            <span className="font-medium">24 hours</span>.
          </p>

          <p className="text-gray-500">
            Your message goes directly to our team — no bots, no ticket
            black holes.
          </p>
        </div>
      </div>
    </main>
  );
}
