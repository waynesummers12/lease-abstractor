"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import { authenticatedPortfolioFetch, portfolioFetch } from "@/lib/portfolioFetch";
import { trackFunnel } from "@/lib/funnelAnalytics";

export default function AddLeasePage() {
  const { session, loading: authLoading } = useAuth();

  const router = useRouter();

  const [fileName, setFileName] = useState<string | null>(null);
  const [leaseFile, setLeaseFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [extractionNote, setExtractionNote] = useState<string | null>(null);
  const uploadSequence = useRef(0);

  const [form, setForm] = useState({
    propertyName: "",
    landlord: "",
    squareFeet: "",
    leaseType: "",
    renewalDate: "",
    renewalRemindersEnabled: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedLeaseId, setSavedLeaseId] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const sequence = ++uploadSequence.current;

    setFileName(file.name);
    setLeaseFile(null);
    setExtracting(true);
    setError(null);
    setExtractionNote(null);
    setForm({ propertyName: "", landlord: "", squareFeet: "", leaseType: "", renewalDate: "", renewalRemindersEnabled: false });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await authenticatedPortfolioFetch("/api/extract-lease-metadata", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Extraction failed");
      }
      if (sequence !== uploadSequence.current) return;
      setLeaseFile(file);

      setForm({
        propertyName: data.metadata?.propertyName || "",
        landlord: data.metadata?.landlord || "",
        squareFeet: data.metadata?.squareFeet
          ? String(data.metadata.squareFeet)
          : "",
        leaseType: data.metadata?.leaseType || "",
        renewalDate: data.metadata?.renewalDate || "",
        renewalRemindersEnabled: false,
      });
      const found = Object.values(data.metadata ?? {}).filter(Boolean).length;
      setExtractionNote(`Read ${data.pageCount} PDF page${data.pageCount === 1 ? "" : "s"} and suggested ${found} field${found === 1 ? "" : "s"}. Review every field before saving.`);
    } catch (err) {
      if (sequence !== uploadSequence.current) return;
      setLeaseFile(null);
      console.error("Extraction error:", err);
      setError(err instanceof Error ? err.message : "Could not read this PDF. Enter details manually.");
    } finally {
      if (sequence === uploadSequence.current) setExtracting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await portfolioFetch({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_name: form.propertyName,
          landlord: form.landlord,
          square_footage: form.squareFeet
            ? Number(form.squareFeet)
            : null,
          lease_type: form.leaseType,
          renewal_date: form.renewalDate || null,
          renewal_reminders_enabled: form.renewalRemindersEnabled && Boolean(form.renewalDate),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save lease");
      }
      setSavedLeaseId(data.lease.id);
      trackFunnel("portfolio_lease_saved", { has_pdf: Boolean(leaseFile), has_renewal_date: Boolean(form.renewalDate) });
      if (leaseFile && data.lease?.id) {
        try {
          const auditId = crypto.randomUUID();
          const objectPath = `leases/${auditId}.pdf`;
          const createRes = await authenticatedPortfolioFetch("/api/audits", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ auditId, objectPath, portfolioLeaseId: data.lease.id }),
          });
          const created = await createRes.json();
          if (!createRes.ok || typeof created.capability !== "string") throw new Error("Could not start the free preview");
          const documents = new FormData();
          documents.append("file", leaseFile);
          documents.append("auditId", auditId);
          documents.append("objectPath", objectPath);
          const ingestRes = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/ingest/lease/pdf`, {
            method: "POST",
            headers: {
              "X-Lease-Worker-Key": process.env.NEXT_PUBLIC_WORKER_KEY!,
              "X-Audit-Capability": created.capability,
            },
            body: documents,
          });
          if (!ingestRes.ok) throw new Error("Could not analyze the lease PDF");
          trackFunnel("portfolio_preview_started");
          router.push(`/app/step-3-review?auditId=${auditId}`);
          return;
        } catch (previewError) {
          console.error("Portfolio preview failed:", previewError);
          setError("Your lease was saved, but its free preview could not open. Open the saved lease to try again.");
          setLoading(false);
          return;
        }
      }
      router.push("/product/app/dashboard#leases");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-2">
        Add Lease (Free Portfolio)
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Add confirmed lease details to track renewal dates. PDF text can suggest fields for you to review; no audit is required.
      </p>

      <div className="rounded border border-gray-200 p-6 bg-white space-y-8">

        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="leaseUpload"
          />

          <label
            htmlFor="leaseUpload"
            className="cursor-pointer text-sm text-gray-600"
          >
            {fileName ? (
              <div>
                <div className="font-medium">{fileName}</div>
                {extracting && (
                  <div className="text-xs text-gray-500 mt-2">
                    Extracting lease details...
                  </div>
                )}
              </div>
            ) : (
              <div>
                Click to upload your lease (PDF)
              </div>
            )}
          </label>
          <div className="mt-4 text-xs text-gray-400">
            After you save, we securely keep the PDF with your lease and open its free preview.
          </div>
        </div>

        {extractionNote && <p className="text-sm text-blue-700">{extractionNote}</p>}

        {/* Prefilled Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Property Name
              </label>
              <input
                name="propertyName"
                value={form.propertyName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Landlord
              </label>
              <input
                name="landlord"
                value={form.landlord}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Square Footage
              </label>
              <input
                name="squareFeet"
                type="number"
                value={form.squareFeet}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Lease Type
              </label>
              <select
                name="leaseType"
                value={form.leaseType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="">Select lease type</option>
                <option value="NNN">NNN</option>
                <option value="Gross">Gross</option>
                <option value="Modified Gross">Modified Gross</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Renewal Date (if stated)
              </label>
              <input
                name="renewalDate"
                type="date"
                value={form.renewalDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
            <input type="checkbox" checked={form.renewalRemindersEnabled} disabled={!form.renewalDate}
              onChange={(event) => setForm((current) => ({ ...current, renewalRemindersEnabled: event.target.checked }))}
              className="mt-1 h-4 w-4" />
            <span>Email me reminders before this saved renewal date. I can change this later. I will check the signed lease for any earlier notice deadline.</span>
          </label>

          {error && (
            <div className="text-sm text-red-600 font-medium">
              {error}
              {savedLeaseId && <Link href={`/product/app/leases/${encodeURIComponent(savedLeaseId)}`} className="ml-2 underline">Open saved lease →</Link>}
            </div>
          )}

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="submit"
              disabled={loading || extracting || Boolean(savedLeaseId)}
              className="min-h-11 bg-black text-white rounded px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Saving and opening preview..." : extracting ? "Reading PDF..." : leaseFile ? "Save lease and preview free" : "Add Lease (Free)"}
            </button>

            <Link
              href="/product/app/dashboard"
              className="min-h-11 inline-flex items-center justify-center text-sm text-gray-600 hover:underline"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
