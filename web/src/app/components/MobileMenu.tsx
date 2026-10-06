"use client";

import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";

interface MobileMenuProps {
  open: boolean;
  user: User | null;
  onLogout: () => Promise<void>;
  setOpen: (open: boolean) => void;
}

export default function MobileMenu({
  open,
  user,
  onLogout,
  setOpen,
}: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      ));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.getElementById("mobile-menu-toggle")?.focus();
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      id="mobile-navigation"
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-0 z-[1001] overflow-y-auto overscroll-contain bg-slate-950 text-white xl:hidden"
    >
      <div className="mx-auto flex min-h-full max-w-xl flex-col px-5 pb-8 pt-5 sm:px-8">
        <div className="flex items-center justify-between border-b border-white/15 pb-5">
          <Link href="/" onClick={() => setOpen(false)} className="text-lg font-semibold tracking-tight">
            SaveOnLease
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-2xl leading-none hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            ×
          </button>
        </div>

        <Link
          href="/app/step-1-upload"
          onClick={() => setOpen(false)}
          className="mt-7 flex min-h-12 items-center justify-center rounded-xl bg-emerald-400 px-5 py-3 text-center text-base font-semibold text-slate-950 hover:bg-emerald-300"
        >
          Run a free lease preview
        </Link>

        {user && (
          <nav aria-label="Your workspace" className="mt-8 border-b border-white/15 pb-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Your workspace</p>
            {[
              ["Dashboard", "/product/app/dashboard"],
              ["Leases", "/product/app/leases"],
              ["Portfolio", "/product/app/portfolio"],
              ["Alerts", "/product/app/alerts"],
              ["Settings", "/product/app/settings"],
            ].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-lg px-2 text-base hover:bg-white/10">
                {label}
              </Link>
            ))}
          </nav>
        )}

        <nav aria-label="Explore SaveOnLease" className="mt-7 border-b border-white/15 pb-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Explore</p>
          {[
            ["What We Find", "/marketing/what-we-find"],
            ["How It Works", "/marketing/how-it-works"],
            ["Pricing", "/pricing"],
            ["Statement Pilot", "/marketing/reconciliation-pilot"],
            ["CAM Reconciliation", "/marketing/cam-reconciliation"],
            ["NNN Audit Rights", "/marketing/nnn-audit-rights"],
            ["Audit Deadlines", "/marketing/audit-window-deadlines"],
            ["Contact", "/marketing/contact"],
          ].map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-lg px-2 text-base hover:bg-white/10">
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-5">
          {user ? (
            <button
              type="button"
              onClick={async () => {
                try { await onLogout(); } finally { setOpen(false); }
              }}
              className="flex min-h-12 w-full items-center rounded-lg px-2 text-left text-base text-slate-200 hover:bg-white/10"
            >
              Log out
            </button>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-lg px-2 text-base hover:bg-white/10">
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
