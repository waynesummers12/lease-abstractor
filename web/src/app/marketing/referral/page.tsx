"use client";
import Link from "next/link";
import { useState } from "react";
export default function ReferralPage() {
  const [name, setName] = useState("");

  const referralLink = name
    ? `https://saveonlease.com/?ref=${encodeURIComponent(name)}`
    : "https://saveonlease.com/?ref=YOURNAME";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      alert("Referral link copied!");
    } catch (err) {
      console.error("Copy failed", err);
    }
  };
  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Earn 20% for Every Lease Audit You Refer
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          If you work with commercial tenants, brokers, franchise owners, or
          healthcare practices, you likely see leases every day. When someone
          you refer runs a SaveOnLease audit, you earn a <strong>20% referral
          commission</strong>.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-3">Example Earnings</h2>

          <ul className="space-y-2 text-gray-700">
            <li>$49 lease audit → You earn $9.80</li>
            <li>10 referrals per month → $98</li>
            <li>50 referrals per month → $490</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Create Your Referral Link</h2>

        <div className="bg-gray-50 border rounded-xl p-6 mb-10">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your name, brokerage, or company
          </label>

          <input
            type="text"
            placeholder="e.g. johnsmith or acmebrokerage"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mb-4"
          />

          <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm break-all mb-4">
            {referralLink}
          </div>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={copyLink}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Copy Referral Link
            </button>

            <Link
              href={`/?ref=${encodeURIComponent(name || "YOURNAME")}`}
              className="border border-gray-300 px-6 py-3 rounded-lg font-semibold"
            >
              Test Your Link
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Who This Is For</h2>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-12">
          <li>Commercial real estate brokers</li>
          <li>Tenant representation advisors</li>
          <li>Franchise consultants</li>
          <li>Healthcare real estate specialists</li>
          <li>Tenant attorneys</li>
        </ul>

        <div className="bg-gray-50 border rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-3">How Payouts Work</h3>

          <ul className="space-y-2 text-gray-700">
            <li>Referral commissions are tracked automatically.</li>
            <li>Payouts are sent monthly.</li>
            <li>You receive 20% of the audit purchase price.</li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/?ref=YOURNAME"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow transition"
          >
            Start Sharing Your Referral Link
          </Link>

          <p className="text-sm text-gray-500 mt-3">
            Replace YOURNAME in the URL above with your name or company.
          </p>
        </div>
      </div>
    </main>
  );
}