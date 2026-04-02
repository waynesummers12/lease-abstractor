"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";

interface AvatarDropdownProps {
  session: Session;
  isProUser?: boolean;
}

export default function AvatarDropdown({
  session,
  isProUser = false,
}: AvatarDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initial = session.user.email?.[0]?.toUpperCase() ?? "U";

  return (
    <div ref={ref} className="relative flex items-center gap-4">
      {!isProUser && (
        <Link
          href="/marketing/pricing"
          className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-semibold"
        >
          Upgrade
        </Link>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center font-bold text-white"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {initial}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-12 w-52 bg-white text-black rounded-md shadow-lg py-2 z-50"
        >
          <div className="px-4 py-2 text-xs text-gray-500 border-b">
            {session.user.email}
          </div>

          <Link
            href="/product/app/dashboard"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <Link
            href="/product/app/portfolio"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Portfolio
          </Link>

          <Link
            href="/product/app/settings"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Settings
          </Link>

          <button
            onClick={() => supabase.auth.signOut()}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}