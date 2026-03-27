"use client";

import { useState } from "react";
import Link from "next/link";

export default function AddLeasePage() {
  const [form, setForm] = useState({
    propertyName: "",
    landlord: "",
    squareFeet: "",
    leaseType: "NNN",
    renewalDate: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Lease added (mock):", form);
    alert("Lease saved to portfolio (mock). Backend coming next.");
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">
        Add Lease to Portfolio
      </h1>

      <div className="rounded border border-gray-200 p-6 bg-white">
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

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-black text-white rounded px-4 py-2 text-sm font-medium hover:bg-gray-800"
            >
              Save Lease
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
