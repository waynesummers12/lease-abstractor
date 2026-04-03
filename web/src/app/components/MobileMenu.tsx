"use client";

import Link from "next/link";
import { User } from "@supabase/supabase-js";

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black text-white z-[1001] px-6 pt-24 overflow-y-auto">
      <div className="flex justify-end mb-6">
        <button onClick={() => setOpen(false)}>✕</button>
      </div>

      <div className="flex flex-col gap-4 text-sm">
        {/* Education Links */}
        <Link href="/marketing/cam-reconciliation" onClick={() => setOpen(false)}>
          CAM Reconciliation
        </Link>
        <Link href="/marketing/nnn-audit-rights" onClick={() => setOpen(false)}>
          NNN Audit Rights
        </Link>
        <Link href="/marketing/audit-window-deadlines" onClick={() => setOpen(false)}>
          Audit Deadlines
        </Link>

        <hr className="border-white/20 my-4" />

        <Link href="/marketing/what-we-find" onClick={() => setOpen(false)}>
          What We Find
        </Link>
        <Link href="/marketing/how-it-works" onClick={() => setOpen(false)}>
          How It Works
        </Link>
        <Link href="/pricing" onClick={() => setOpen(false)}>
          Pricing
        </Link>

        <hr className="border-white/20 my-4" />

        {!user ? (
          <>
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
            <Link href="/app/step-1-upload" onClick={() => setOpen(false)}>
              Run Audit
            </Link>
          </>
        ) : (
          <>
            <Link href="/product/app/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
            <Link href="/product/app/portfolio" onClick={() => setOpen(false)}>
              Portfolio
            </Link>
            <button
              onClick={async () => {
                await onLogout();
                setOpen(false);
              }}
              className="text-left"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
