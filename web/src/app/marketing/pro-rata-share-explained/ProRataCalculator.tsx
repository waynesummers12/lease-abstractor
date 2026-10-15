"use client";

import { useState } from "react";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const percent = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

export default function ProRataCalculator() {
  const [tenantArea, setTenantArea] = useState("2500");
  const [propertyArea, setPropertyArea] = useState("25000");
  const [expensePool, setExpensePool] = useState("100000");

  const tenant = Number(tenantArea);
  const property = Number(propertyArea);
  const expenses = Number(expensePool);
  const valid = tenantArea.trim() !== "" && propertyArea.trim() !== "" && expensePool.trim() !== "" && Number.isFinite(tenant) && Number.isFinite(property) && Number.isFinite(expenses) && tenant > 0 && property > 0 && tenant <= property && expenses >= 0;
  const share = valid ? tenant / property : 0;

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#cedcd0] bg-white shadow-xl shadow-[#102c25]/10">
      <div className="bg-[#102c25] px-6 py-5 text-xs font-bold uppercase tracking-[0.18em] text-[#a9e9be] sm:px-8">Illustrative share calculator</div>
      <div className="p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-[#102c25]">Your leased area <span className="block text-xs font-normal text-[#516073]">Square feet</span><input type="number" min="0.01" step="any" inputMode="decimal" value={tenantArea} onChange={(event) => setTenantArea(event.target.value)} className="mt-2 w-full rounded-xl border border-[#cfe1d3] bg-white px-4 py-3 text-base font-normal text-[#102c25] outline-none focus:border-[#006d57] focus:ring-2 focus:ring-[#a9e9be]" /></label>
          <label className="block text-sm font-semibold text-[#102c25]">Defined property area <span className="block text-xs font-normal text-[#516073]">Square feet</span><input type="number" min="0.01" step="any" inputMode="decimal" value={propertyArea} onChange={(event) => setPropertyArea(event.target.value)} className="mt-2 w-full rounded-xl border border-[#cfe1d3] bg-white px-4 py-3 text-base font-normal text-[#102c25] outline-none focus:border-[#006d57] focus:ring-2 focus:ring-[#a9e9be]" /></label>
          <label className="block text-sm font-semibold text-[#102c25] sm:col-span-2">Illustrative expense pool <span className="block text-xs font-normal text-[#516073]">Dollars, before credits or other lease adjustments</span><input type="number" min="0" step="any" inputMode="decimal" value={expensePool} onChange={(event) => setExpensePool(event.target.value)} className="mt-2 w-full rounded-xl border border-[#cfe1d3] bg-white px-4 py-3 text-base font-normal text-[#102c25] outline-none focus:border-[#006d57] focus:ring-2 focus:ring-[#a9e9be]" /></label>
        </div>
        <div className="mt-6 rounded-2xl bg-[#e5f5eb] p-5" aria-live="polite">
          {valid ? <div className="grid gap-4 sm:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#006d57]">Illustrative share</p><p className="mt-2 text-3xl font-semibold text-[#102c25]">{percent.format(share * 100)}%</p></div><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#006d57]">Share of entered pool</p><p className="mt-2 text-3xl font-semibold text-[#102c25]">{money.format(share * expenses)}</p></div></div> : <p className="text-sm leading-6 text-[#102c25]">Enter positive areas with your leased area no larger than the defined property area, and an expense pool of zero or more.</p>}
        </div>
        <p className="mt-5 text-xs leading-6 text-[#516073]">For illustration only. The lease may use a different area or allocation method. This result does not account for exclusions, caps, credits, or other adjustments, and it is not a bill or an overcharge estimate.</p>
      </div>
    </div>
  );
}
