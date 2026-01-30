import UploadForm from "./UploadForm";

export const metadata = {
  title: "Upload Lease | SaveOnLease",
  description:
    "Upload your commercial lease to identify CAM and NNN overcharges and audit risks.",
};

export default function UploadPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-light tracking-tight">
          Upload Your Lease
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Upload your commercial lease PDF to begin your CAM & NNN audit.
        </p>
      </div>

      {/* Upload Form */}
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <UploadForm />
      </div>
    </main>
  );
}

