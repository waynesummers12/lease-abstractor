"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import EducationDropdown from "./EducationDropdown";

export default function Header() {
  const pathname = usePathname();
  const isAppPage = pathname.startsWith("/app");

  const supabase = createClientComponentClient();

  const [session, setSession] = useState<Session | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const avatarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isProUser = false; // Replace with real plan logic later

  const navTextColor = isAppPage ? "text-gray-900" : "text-white";
  const bgClass = isAppPage
    ? "bg-white border-b border-gray-200"
    : "bg-black shadow-md";

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] ${bgClass}`}>
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 ${navTextColor}`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="SaveOnLease" width={24} height={44} />
          <span className="text-lg font-light">SaveOnLease</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm relative">
          <EducationDropdown />

          <Link href="/marketing/what-we-find" className="opacity-80 hover:opacity-100">
            What We Find
          </Link>
          <Link href="/marketing/how-it-works" className="opacity-80 hover:opacity-100">
            How It Works
          </Link>
          <Link href="/marketing/pricing" className="opacity-80 hover:opacity-100">
            Pricing
          </Link>

          <div className="h-5 w-px bg-white/20" />

          {!session ? (
            <>
              <Link href="/login" className="opacity-80 hover:opacity-100">
                Login
              </Link>
              <Link
                href="/app/step-1-upload"
                className="rounded-full bg-white px-5 py-2 font-semibold text-black hover:bg-gray-200"
              >
                Run Audit
              </Link>
            </>
          ) : (
            <div ref={avatarRef} className="flex items-center gap-4 relative">
              {!isProUser && (
                <Link
                  href="/upgrade"
                  className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-semibold"
                >
                  Upgrade
                </Link>
              )}

              <button
                onClick={() => setAvatarOpen((v) => !v)}
                className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center font-bold"
              >
                {session.user.email?.[0].toUpperCase()}
              </button>

              {avatarOpen && (
                <div className="absolute right-0 mt-12 w-48 bg-white text-black rounded-md shadow-lg py-2">
                  <Link href="/app/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-black text-white z-[1001] px-6 pt-24 overflow-y-auto">
          <div className="flex justify-end mb-6">
            <button onClick={() => setMenuOpen(false)}>✕</button>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <Link href="/marketing/cam-reconciliation" onClick={() => setMenuOpen(false)}>CAM Reconciliation</Link>
            <Link href="/marketing/nnn-audit-rights" onClick={() => setMenuOpen(false)}>NNN Audit Rights</Link>
            <Link href="/marketing/what-we-find" onClick={() => setMenuOpen(false)}>What We Find</Link>
            <Link href="/marketing/how-it-works" onClick={() => setMenuOpen(false)}>How It Works</Link>
            <Link href="/marketing/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>

            <hr className="border-white/20 my-4" />

            {!session ? (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link href="/app/step-1-upload" onClick={() => setMenuOpen(false)}>Run Audit</Link>
              </>
            ) : (
              <>
                <Link href="/app/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <button onClick={() => supabase.auth.signOut()}>Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
