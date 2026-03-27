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
          className="absolute left-0 top-full mt-2 w-72 max-h-[70vh] overflow-y-auto rounded-lg bg-black text-white border border-white/10 shadow-xl p-4"
        >
          <Link href="/marketing/cam-reconciliation" className="block py-1 hover:opacity-70">
            CAM Reconciliation
          </Link>
          <Link href="/marketing/nnn-audit-rights" className="block py-1 hover:opacity-70">
            NNN Audit Rights
          </Link>
          <Link href="/marketing/audit-window-deadlines" className="block py-1 hover:opacity-70">
            Audit Deadlines
          </Link>
          <Link href="/marketing/cam-expense-caps" className="block py-1 hover:opacity-70">
            CAM Expense Caps
          </Link>
          <Link href="/marketing/medical-hub" className="block py-1 hover:opacity-70">
            Medical Hub
          </Link>
        </div>
      )}
    </div>
  );
}