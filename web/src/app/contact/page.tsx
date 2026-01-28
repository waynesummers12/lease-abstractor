export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Questions about CAM audits, pricing, or your lease?
        We’re happy to help.
      </p>

      <p className="font-medium">
        Email us at{" "}
        <a
          href="mailto:support@saveonlease.com"
          className="text-blue-600 underline"
        >
          support@saveonlease.com
        </a>
      </p>
    </div>
  );
}
