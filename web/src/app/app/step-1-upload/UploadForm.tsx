"use client";

import { useState, type FormEvent } from "react";

type Props = {
  onUpload: (lease: File, statement?: File, supporting?: File[]) => void;
  loading: boolean;
};

const MAX_FILE = 10 * 1024 * 1024;
const MAX_DOCUMENTS = 29 * 1024 * 1024;

function isPdf(file: File) {
  return file.name.toLowerCase().endsWith(".pdf");
}

export default function UploadForm({ onUpload, loading }: Props) {
  const [lease, setLease] = useState<File | null>(null);
  const [statement, setStatement] = useState<File | null>(null);
  const [supporting, setSupporting] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!lease) return setError("Choose your signed lease PDF to start.");
    if (![lease, statement, ...supporting].filter(Boolean).every((file) => isPdf(file as File))) return setError("Choose PDF files only.");
    if (supporting.length > 4) return setError("Choose up to four supporting PDFs.");
    const billingFiles = [statement, ...supporting].filter((file): file is File => Boolean(file));
    if (billingFiles.some((file) => file.size > MAX_FILE) || billingFiles.reduce((total, file) => total + file.size, 0) > MAX_DOCUMENTS) return setError("Each billing PDF must be under 10 MB and all billing PDFs together under 29 MB.");
    onUpload(lease, statement ?? undefined, supporting);
  }

  return <form onSubmit={submit} className="space-y-5">
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 sm:p-6">
      <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-sm font-bold text-white">1</span><div><p className="font-semibold text-slate-950">Signed lease PDF</p><p className="text-xs text-slate-600">Required · Include amendments if they are in the same PDF</p></div></div>
      <label className="mt-5 block cursor-pointer rounded-xl border-2 border-dashed border-emerald-300 bg-white px-5 py-6 text-center transition hover:border-emerald-600 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-emerald-700">
        <input type="file" accept="application/pdf,.pdf" aria-label="Choose signed lease PDF" className="sr-only" disabled={loading} onChange={(event) => { setLease(event.target.files?.[0] ?? null); setError(null); }} />
        <span className="block text-base font-semibold text-emerald-900">{lease ? lease.name : "Choose your lease PDF"}</span><span className="mt-1 block text-sm text-slate-600">{lease ? "Click to change the file" : "Select a text-readable PDF from your device"}</span>
      </label>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-[#f8faf8] p-5 sm:p-6">
      <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">2</span><div><p className="font-semibold text-slate-950">Annual CAM or NNN statement</p><p className="text-xs text-slate-600">Optional · Compare the landlord&apos;s bill against your lease</p></div></div>
      <label className="mt-5 block text-sm font-semibold text-slate-800">Annual statement PDF
        <input type="file" accept="application/pdf,.pdf" disabled={loading} onChange={(event) => { setStatement(event.target.files?.[0] ?? null); setSupporting([]); setError(null); }} className="mt-2 block w-full rounded-lg border border-slate-300 bg-white p-3 text-sm font-normal text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-emerald-100 file:px-3 file:py-2 file:font-semibold file:text-emerald-900" />
      </label>
      <label className="mt-5 block text-sm font-semibold text-slate-800">Supporting PDFs <span className="font-normal text-slate-500">(up to four, optional)</span>
        <input key={statement?.name ?? "no-statement"} type="file" accept="application/pdf,.pdf" multiple disabled={loading || !statement} onChange={(event) => { setSupporting(Array.from(event.target.files ?? [])); setError(null); }} className="mt-2 block w-full rounded-lg border border-slate-300 bg-white p-3 text-sm font-normal text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-semibold file:text-slate-800 disabled:opacity-50" />
      </label>
      <p className="mt-3 text-xs leading-5 text-slate-500">Examples: occupancy schedules, invoices, or payment records. Each billing PDF must be under 10 MB. You can add these later on the preview page instead.</p>
    </div>

    {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
    <button type="submit" disabled={loading} className="min-h-12 w-full rounded-xl bg-[#102b25] px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-900 disabled:cursor-wait disabled:opacity-60">{loading ? "Preparing your preview and reviewing documents…" : statement ? "Review lease + annual statement →" : "Preview lease terms for free →"}</button>
  </form>;
}
