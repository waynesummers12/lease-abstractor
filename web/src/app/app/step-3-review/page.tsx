import { Suspense } from "react";
import Step3ReviewClient from "./Step3ReviewClient";

export default function Step3ReviewPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Step3ReviewClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
      <p className="text-gray-600 text-center">Preparing your audit…</p>
    </main>
  );
}
