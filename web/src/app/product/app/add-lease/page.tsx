"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddLeasePage() {
  const router = useRouter();

  const [fileName, setFileName] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);

  const [form, setForm] = useState({
    propertyName: "",
    landlord: "",
    squareFeet: "",
    leaseType: "NNN",
    renewalDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setExtracting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/extract-lease-metadata", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Extraction failed");
      }

      setForm({
        propertyName: data.metadata?.propertyName || "",
        landlord: data.metadata?.landlord || "",
        squareFeet: data.metadata?.squareFeet
          ? String(data.metadata.squareFeet)
          : "",
        leaseType: data.metadata?.leaseType || "NNN",
        renewalDate: data.metadata?.renewalDate || "",
      });
    } catch (err) {
      console.error("Extraction error:", err);
    } finally {
      setExtracting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/portfolio-leases", {
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
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save lease");
      }

      // Redirect to leases page after successful save
      router.push("/product/app/leases");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">
        Upload Lease to Add to Portfolio
      </h1>

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
        </div>

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
                <option value="NNN">NNN</option>
                <option value="Gross">Gross</option>
                <option value="Modified">Modified Gross</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Renewal Date
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

          {error && (
            <div className="text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white rounded px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Lease to Portfolio"}
            </button>

            <Link
              href="/product/app/dashboard"
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
