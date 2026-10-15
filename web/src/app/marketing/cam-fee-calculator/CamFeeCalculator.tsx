"use client";

import { useState } from "react";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export default function CamFeeCalculator() {
  const [annualPool, setAnnualPool] = useState("120000");
  const [tenantShare, setTenantShare] = useState("10");
  const [monthlyPaid, setMonthlyPaid] = useState("800");
  const pool = Number(annualPool);
  const share = Number(tenantShare);
  const paid = Number(monthlyPaid);
  const valid = annualPool.trim() !== "" && tenantShare.trim() !== "" && monthlyPaid.trim() !== "" && Number.isFinite(pool) && Number.isFinite(share) && Number.isFinite(paid) && Number.isFinite(pool * share / 100) && Number.isFinite(paid * 12) && pool >= 0 && share >= 0 && share <= 100 && paid >= 0;
  const annualShare = valid ? pool * share / 100 : 0;
  const annualPaid = paid * 12;
  const balance = annualShare - annualPaid;
  const inputClass = "mt-2 w-full rounded-xl border border-[#cfe1d3] bg-white px-4 py-3 text-base font-normal text-[#102c25] outline-none focus:border-[#006d57] focus:ring-2 focus:ring-[#a9e9be]";

  return <div className="overflow-hidden rounded-[28px] border border-[#cedcd0] bg-white shadow-xl shadow-[#102c25]/10">
    <div className="bg-[#102c25] px-6 py-5 text-xs font-bold uppercase tracking-[0.18em] text-[#a9e9be] sm:px-8">Illustrative CAM fee calculator</div>
    <div className="p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-[#102c25] sm:col-span-2">Annual CAM expense pool <span className="block text-xs font-normal text-[#516073]">Dollars, before your share is applied</span><input type="number" min="0" step="any" inputMode="decimal" value={annualPool} onChange={(event) => setAnnualPool(event.target.value)} className={inputClass} /></label>
        <label className="block text-sm font-semibold text-[#102c25]">Your share <span className="block text-xs font-normal text-[#516073]">Percent</span><input type="number" min="0" max="100" step="any" inputMode="decimal" value={tenantShare} onChange={(event) => setTenantShare(event.target.value)} className={inputClass} /></label>
        <label className="block text-sm font-semibold text-[#102c25]">Monthly estimates paid <span className="block text-xs font-normal text-[#516073]">Dollars per month</span><input type="number" min="0" step="any" inputMode="decimal" value={monthlyPaid} onChange={(event) => setMonthlyPaid(event.target.value)} className={inputClass} /></label>
      </div>
      <div className="mt-6 rounded-2xl bg-[#e5f5eb] p-5 sm:p-6" aria-live="polite">
        {valid ? <><div className="grid gap-5 sm:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#006d57]">Your annual share</p><p className="mt-2 text-3xl font-semibold text-[#102c25]">{money.format(annualShare)}</p></div><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#006d57]">Monthly equivalent</p><p className="mt-2 text-3xl font-semibold text-[#102c25]">{money.format(annualShare / 12)}</p></div></div><div className="mt-6 border-t border-[#c1dfc9] pt-5"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#006d57]">Illustrative annual true-up</p><p className="mt-2 text-3xl font-semibold text-[#102c25]">{money.format(Math.abs(balance))} {balance > 0 ? "balance" : balance < 0 ? "credit" : "even"}</p><p className="mt-2 text-xs leading-6 text-[#36554a]">{money.format(annualShare)} annual share − {money.format(annualPaid)} in entered payments</p></div></> : <p className="text-sm leading-6 text-[#102c25]">Enter a cost pool and monthly payments of zero or more, and a share between 0% and 100%.</p>}
      </div>
      <p className="mt-5 text-xs leading-6 text-[#516073]">Illustrative arithmetic only. The result does not verify the expense pool, lease-defined share, caps, exclusions, fees, credits, or payment history. It is not a bill or an overcharge estimate.</p>
    </div>
  </div>;
}
