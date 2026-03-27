"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function EducationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="opacity-80 hover:opacity-100 transition"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Education ▾
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full mt-2 w-[420px] max-h-[75vh] overflow-y-auto rounded-lg bg-black text-white border border-white/10 shadow-xl p-6"
        >
          <div className="grid grid-cols-2 gap-6 text-sm">
            {/* Core CAM */}
            <div>
              <p className="text-white/50 text-xs mb-2 uppercase">CAM</p>
              <Link href="/marketing/cam-reconciliation" className="block py-1 hover:opacity-70">CAM Reconciliation</Link>
              <Link href="/marketing/cam-reconciliation-errors" className="block py-1 hover:opacity-70">Reconciliation Errors</Link>
              <Link href="/marketing/cam-expense-caps" className="block py-1 hover:opacity-70">Expense Caps</Link>
              <Link href="/marketing/cam-admin-page" className="block py-1 hover:opacity-70">Admin Fees</Link>
              <Link href="/marketing/common-area-maintenance" className="block py-1 hover:opacity-70">Common Area Maintenance</Link>
            </div>

            {/* NNN */}
            <div>
              <p className="text-white/50 text-xs mb-2 uppercase">NNN</p>
              <Link href="/marketing/nnn-audit-rights" className="block py-1 hover:opacity-70">Audit Rights</Link>
              <Link href="/marketing/nnn-expenses-explained" className="block py-1 hover:opacity-70">NNN Expenses Explained</Link>
              <Link href="/marketing/nnn-reconciliation" className="block py-1 hover:opacity-70">NNN Reconciliation</Link>
              <Link href="/marketing/non-allowable-cam-nnn-expenses" className="block py-1 hover:opacity-70">Non-Allowable Expenses</Link>
              <Link href="/marketing/triple-net-lease" className="block py-1 hover:opacity-70">Triple Net Lease</Link>
            </div>

            {/* Medical */}
            <div>
              <p className="text-white/50 text-xs mb-2 uppercase">Medical</p>
              <Link href="/marketing/medical-hub" className="block py-1 hover:opacity-70">Medical Hub</Link>
              <Link href="/marketing/medical-office-lease-audit" className="block py-1 hover:opacity-70">Medical Lease Audit</Link>
              <Link href="/marketing/medical-office-cam-reconciliation" className="block py-1 hover:opacity-70">Medical CAM</Link>
              <Link href="/marketing/medical-office-nnn-expenses" className="block py-1 hover:opacity-70">Medical NNN</Link>
            </div>

            {/* Retail / Franchise */}
            <div>
              <p className="text-white/50 text-xs mb-2 uppercase">Retail / Franchise</p>
              <Link href="/marketing/retail-lease-hub" className="block py-1 hover:opacity-70">Retail Lease Hub</Link>
              <Link href="/marketing/franchise-cam-audit" className="block py-1 hover:opacity-70">Franchise CAM Audit</Link>
              <Link href="/marketing/burger-lease-hub" className="block py-1 hover:opacity-70">Burger Lease Hub</Link>
              <Link href="/marketing/restaurant-nnn-overcharges" className="block py-1 hover:opacity-70">Restaurant NNN</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}