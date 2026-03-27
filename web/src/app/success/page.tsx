import { Suspense } from "react";
import DownloadClient from "../app/step-5-download/DownloadClient";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-xl px-6 py-28 text-center">
          <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
          
          <h1 className="text-xl font-semibold mb-2">
            Preparing Your Full Audit Report
          </h1>

          <p className="text-gray-600 mb-4">
            We’re finalizing your detailed CAM / NNN analysis and generating your downloadable report.
          </p>

          <p className="text-xs text-gray-500">
            This usually takes a few seconds
          </p>
        </main>
      }
    >
      <div className="mx-auto max-w-3xl px-6 py-16">
        <DownloadClient />
      </div>
    </Suspense>
  );
}
