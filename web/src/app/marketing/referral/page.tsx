"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
export default function ReferralPage() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "";
  const [name, setName] = useState(() => ref || localStorage.getItem("saveonlease_ref") || "");
  useEffect(() => {
  const refFromUrl = searchParams.get("ref");

  if (refFromUrl) {
    localStorage.setItem("saveonlease_ref", refFromUrl);
  }
}, [searchParams]);
  const topReferrers = [
    { name: "Eric Kovatch (Tenant Advisor)", earned: 299.94 },
    { name: "Shari Johnson (Dental)", earned: 199.96 },
    { name: "Dan Villanueva (Real Estate)", earned: 99.98 },
  ];

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

  const emailTemplate = `Subject: Quick Lease Savings Check

Hi — I came across a simple tool that analyzes commercial leases and flags potential overcharges or negotiation opportunities.

You can upload your lease securely here and get a quick report:

${referralLink}

It usually takes about 10 seconds to generate the analysis.

Thought it might be useful.`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailTemplate);
      alert("Email template copied!");
    } catch (err) {
      console.error("Copy email failed", err);
    }
  };

  const smsTemplate = `Quick lease savings check: upload your lease here and get a fast analysis (~10 seconds): ${referralLink}`;

  const copySMS = async () => {
    try {
      await navigator.clipboard.writeText(smsTemplate);
      alert("SMS text copied!");
    } catch (err) {
      console.error("Copy SMS failed", err);
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
            onChange={(e) => {
            const value = e.target.value;
            setName(value);
            localStorage.setItem("saveonlease_ref", value);
             }}
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

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4">Top Referrers This Month</h2>

          <ul className="space-y-2 text-gray-700">
            {topReferrers.map((ref) => (
              <li
                key={ref.name}
                className="flex justify-between bg-white border rounded-lg px-4 py-2"
              >
                <span className="font-medium">{ref.name}</span>
                <span className="text-green-700 font-semibold">
                  ${ref.earned} earned
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border rounded-xl p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4">What Your Client Will See</h2>

          <p className="text-gray-600 mb-6">
            When your client uploads their lease, they receive a fast analysis that
            highlights potential overcharges, negotiation opportunities, and risk
            areas. The report typically generates in about 10 seconds.
          </p>

          <div className="border rounded-lg overflow-hidden">
            <Image
              src="/green-box-preview.png"
              alt="Example lease savings analysis"
              width={1200}
              height={700}
              className="w-full h-auto"
            />
          </div>

          <p className="text-sm text-gray-500 mt-3">
            Example preview of the savings analysis your client will receive.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            Industries Already Using SaveOnLease
          </h2>

          <p className="text-gray-600 mb-6">
            Advisors across multiple industries are already sharing SaveOnLease
            with their clients to quickly identify lease savings and negotiation
            opportunities.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="bg-white border px-4 py-2 rounded-lg text-sm font-medium">Dental Practices</span>
            <span className="bg-white border px-4 py-2 rounded-lg text-sm font-medium">Medical Offices</span>
            <span className="bg-white border px-4 py-2 rounded-lg text-sm font-medium">Retail Chains</span>
            <span className="bg-white border px-4 py-2 rounded-lg text-sm font-medium">Franchise Operators</span>
            <span className="bg-white border px-4 py-2 rounded-lg text-sm font-medium">Restaurants</span>
            <span className="bg-white border px-4 py-2 rounded-lg text-sm font-medium">Fitness Studios</span>
            <span className="bg-white border px-4 py-2 rounded-lg text-sm font-medium">Professional Offices</span>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4">Average Lease Savings Identified</h2>

          <p className="text-gray-600 mb-6">
            Based on early analyses, many businesses discover meaningful savings
            opportunities in their leases through overcharges, CAM reconciliations,
            and negotiation opportunities.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-700">$12,400</div>
              <div className="text-sm text-gray-600 mt-1">Dental Offices</div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-700">$18,700</div>
              <div className="text-sm text-gray-600 mt-1">Retail Chains</div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-700">$9,800</div>
              <div className="text-sm text-gray-600 mt-1">Medical Offices</div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4">Broker Deal Review Tool</h2>

          <p className="text-gray-700 mb-4">
            Many brokers quickly run a lease through SaveOnLease before a renewal
            or negotiation to identify potential CAM overcharges, expense
            allocations, and negotiation opportunities.
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Quickly review a client lease before renewal</li>
            <li>Identify CAM reconciliation issues</li>
            <li>Spot negotiation leverage before landlord discussions</li>
            <li>Share potential savings opportunities with clients</li>
          </ul>

          <div className="bg-white border rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Many advisors use SaveOnLease as a quick &quot;deal review&quot; step when
              evaluating leases for clients. The analysis typically generates in
              about 10 seconds.
            </p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4">5 Questions Brokers Ask Before Lease Renewal</h2>

          <p className="text-gray-600 mb-6">
            Before advising clients on a lease renewal or negotiation, many brokers
            quickly review the lease to answer a few critical questions.
          </p>

          <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
            <li>Are CAM charges being calculated correctly?</li>
            <li>Are there expense categories that should be excluded?</li>
            <li>Has the tenant been overpaying compared to similar leases?</li>
            <li>Are there negotiation opportunities before renewal?</li>
            <li>Is there hidden risk or landlord-friendly language in the lease?</li>
          </ol>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              SaveOnLease helps surface these insights quickly so brokers and
              advisors can walk into renewal discussions with better information.
            </p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-6">How Brokers Use SaveOnLease in 30 Seconds</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border rounded-lg p-4">
              <div className="text-green-700 font-bold text-lg mb-2">1. Upload Lease</div>
              <p className="text-sm text-gray-600">
                Upload the client&#39;s lease document securely to quickly analyze
                potential overcharges and hidden clauses.
              </p>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="text-green-700 font-bold text-lg mb-2">2. Review Insights</div>
              <p className="text-sm text-gray-600">
                Instantly see flagged CAM charges, expense allocations,
                and negotiation opportunities.
              </p>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="text-green-700 font-bold text-lg mb-2">3. Share With Client</div>
              <p className="text-sm text-gray-600">
                Send the findings to your client and walk into renewal
                discussions with stronger negotiation leverage.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4">Why Brokers Share SaveOnLease</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="font-semibold text-green-700 mb-2">Uncover Hidden Lease Costs</div>
              <p className="text-sm text-gray-600">
                Brokers use SaveOnLease to help clients discover potential CAM
                overcharges, expense allocation issues, and other hidden lease costs.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="font-semibold text-green-700 mb-2">Stronger Negotiation Leverage</div>
              <p className="text-sm text-gray-600">
                By identifying savings opportunities early, brokers can walk into
                lease renewal discussions with stronger data and negotiation leverage.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="font-semibold text-green-700 mb-2">Look Proactive With Clients</div>
              <p className="text-sm text-gray-600">
                Sharing SaveOnLease helps advisors demonstrate proactive thinking
                and adds extra value when guiding clients through lease decisions.
              </p>
            </div>
          </div>
        </div>

<div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-10">
  <h2 className="text-2xl font-semibold mb-4">Example Client Result</h2>

  <p className="text-gray-700 mb-4">
    One early analysis of a multi-location dental practice identified
    significant lease cost issues that were previously unnoticed.
  </p>

  <div className="bg-white border rounded-lg p-5">
    <div className="text-green-700 font-bold text-lg mb-2">
      Dental Practice — Potential Savings Identified
    </div>

    <ul className="list-disc pl-6 space-y-2 text-gray-700">
      <li>CAM reconciliation discrepancies flagged</li>
      <li>Administrative fee calculations reviewed</li>
      <li>Expense allocations identified for negotiation</li>
    </ul>

    <div className="mt-4 text-green-700 font-semibold text-lg">
      Estimated savings opportunity: $14,800
    </div>
  </div>
</div>

<div className="bg-white border rounded-xl p-6 mt-10">
  <h2 className="text-2xl font-semibold mb-4">
    How Brokers Earn $500+ per Month Referring SaveOnLease
  </h2>

  <p className="text-gray-600 mb-6">
    Brokers and tenant advisors often review dozens of leases each month.
    Simply sharing your referral link during lease reviews can generate
    recurring referral income.
  </p>

  <div className="grid md:grid-cols-3 gap-4">

    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
      <div className="text-lg font-semibold text-gray-700">10 Audits</div>
      <div className="text-2xl font-bold text-green-700 mt-1">$98</div>
      <div className="text-sm text-gray-600 mt-1">per month</div>
    </div>

    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
      <div className="text-lg font-semibold text-gray-700">25 Audits</div>
      <div className="text-2xl font-bold text-green-700 mt-1">$245</div>
      <div className="text-sm text-gray-600 mt-1">per month</div>
    </div>

    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
      <div className="text-lg font-semibold text-gray-700">50 Audits</div>
      <div className="text-2xl font-bold text-green-700 mt-1">$490</div>
      <div className="text-sm text-gray-600 mt-1">per month</div>
    </div>

  </div>

  <p className="text-sm text-gray-500 mt-4">
    Example estimates assume a $49 lease audit and a 20% referral commission.
  </p>
</div>

        <div className="bg-gray-50 border rounded-xl p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4">Send This To Your Client</h2>

          <p className="text-gray-600 mb-4">
            Brokers and advisors often forward this quick message to clients when reviewing leases.
          </p>

          <textarea
            readOnly
            value={emailTemplate}
            className="w-full border rounded-lg p-4 text-sm font-mono h-40 mb-4"
          />

          <button
            onClick={copyEmail}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Copy Email Template
          </button>
          <button
            onClick={copySMS}
            className="ml-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Copy Text Message
          </button>
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