//src/app/success/page.tsx
import { Suspense } from "react";
import DownloadClient from "../app/step-5-download/DownloadClient";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-xl px-6 py-28 text-center">
          <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
          <h1 className="text-xl font-semibold">Loading your audit…</h1>
        </main>
      }
    >
      <DownloadClient />
    </Suspense>
  );
}

