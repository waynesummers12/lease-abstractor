"use client";

import Link from "next/link";
import { User } from "@supabase/supabase-js";

interface MobileMenuProps {
  open: boolean;
  user: User | null;
  onLogout: () => Promise<void>;
}

export default function MobileMenu({
  open,
  user,
  onLogout,
}: MobileMenuProps) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black text-white z-[1001] px-6 pt-24 overflow-y-auto">
      <div className="flex justify-end mb-6">
        <button onClick={() => window.location.reload()}>✕</button>
      </div>

      <div className="flex flex-col gap-4 text-sm">
        {/* Education Links */}
        <Link href="/marketing/cam-reconciliation" onClick={() => window.location.reload()}>
          CAM Reconciliation
        </Link>
        <Link href="/marketing/nnn-audit-rights" onClick={() => window.location.reload()}>
          NNN Audit Rights
        </Link>
        <Link href="/marketing/audit-window-deadlines" onClick={() => window.location.reload()}>
          Audit Deadlines
        </Link>

        <hr className="border-white/20 my-4" />

        <Link href="/marketing/what-we-find" onClick={() => window.location.reload()}>
          What We Find
        </Link>
        <Link href="/marketing/how-it-works" onClick={() => window.location.reload()}>
          How It Works
        </Link>
        <Link href="/marketing/pricing" onClick={() => window.location.reload()}>
          Pricing
        </Link>

        <hr className="border-white/20 my-4" />

        {!user ? (
          <>
            <Link href="/login" onClick={() => window.location.reload()}>
              Login
            </Link>
            <Link href="/product/app/step-1-upload" onClick={() => window.location.reload()}>
              Run Audit
            </Link>
          </>
        ) : (
          <>
            <Link href="/product/app/dashboard" onClick={() => window.location.reload()}>
              Dashboard
            </Link>
            <Link href="/product/app/portfolio" onClick={() => window.location.reload()}>
              Portfolio
            </Link>
            <button
              onClick={async () => {
                await onLogout();
                window.location.reload();
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
