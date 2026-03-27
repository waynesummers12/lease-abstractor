"use client";

import Link from "next/link";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  session: Session | null;
}

export default function MobileMenu({
  open,
  onClose,
  session,
}: MobileMenuProps) {
  const supabase = createBrowserClient();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black text-white z-[1001] px-6 pt-24 overflow-y-auto">
      <div className="flex justify-end mb-6">
        <button onClick={onClose}>✕</button>
      </div>

      <div className="flex flex-col gap-4 text-sm">
        {/* Education Links */}
        <Link href="/marketing/cam-reconciliation" onClick={onClose}>
          CAM Reconciliation
        </Link>
        <Link href="/marketing/nnn-audit-rights" onClick={onClose}>
          NNN Audit Rights
        </Link>
        <Link href="/marketing/audit-window-deadlines" onClick={onClose}>
          Audit Deadlines
        </Link>

        <hr className="border-white/20 my-4" />

        <Link href="/marketing/what-we-find" onClick={onClose}>
          What We Find
        </Link>
        <Link href="/marketing/how-it-works" onClick={onClose}>
          How It Works
        </Link>
        <Link href="/marketing/pricing" onClick={onClose}>
          Pricing
        </Link>

        <hr className="border-white/20 my-4" />

        {!session ? (
          <>
            <Link href="/login" onClick={onClose}>
              Login
            </Link>
            <Link href="/app/step-1-upload" onClick={onClose}>
              Run Audit
            </Link>
          </>
        ) : (
          <>
            <Link href="/app/dashboard" onClick={onClose}>
              Dashboard
            </Link>
            <Link href="/app/portfolio" onClick={onClose}>
              Portfolio
            </Link>
            <button
              onClick={() => {
                supabase.auth.signOut();
                onClose();
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
