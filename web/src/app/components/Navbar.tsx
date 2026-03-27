"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";

export default function Navbar() {
  const supabase = createClientComponentClient();

  const [session, setSession] = useState<Session | null>(null);
  const [learnOpen, setLearnOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const learnRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  // Get session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  // Outside click close
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) {
        setLearnOpen(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isProUser = false; // Replace later with real plan logic

  return (
    <nav className="w-full bg-black text-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-lg font-bold">
          SaveOnLease
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Marketing Dropdown */}
          <div ref={learnRef} className="relative">
            <button
              onClick={() => setLearnOpen(!learnOpen)}
              className="text-sm hover:text-gray-300"
            >
              Learn ▾
            </button>

            {learnOpen && (
              <div className="absolute mt-2 w-52 bg-white text-black rounded-md shadow-lg py-2">
                <Link href="/marketing/what-we-find" className="block px-4 py-2 hover:bg-gray-100">
                  What We Find
                </Link>
                <Link href="/marketing/how-it-works" className="block px-4 py-2 hover:bg-gray-100">
                  How It Works
                </Link>
                <Link href="/marketing/pricing" className="block px-4 py-2 hover:bg-gray-100">
                  Pricing
                </Link>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-5 w-px bg-gray-700" />

          {/* App Zone */}
          {!session ? (
            <>
              <Link href="/login" className="text-sm text-gray-300 hover:text-white">
                Login
              </Link>
              <Link
                href="/app/step-1-upload"
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
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
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold"
              >
                {session.user.email?.[0].toUpperCase()}
              </button>

              {avatarOpen && (
                <div className="absolute right-0 mt-10 w-48 bg-white text-black rounded-md shadow-lg py-2">
                  <Link href="/product/app/portfolio" className="block px-4 py-2 hover:bg-gray-100">
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
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <Link href="/marketing/what-we-find">What We Find</Link>
          <Link href="/marketing/how-it-works">How It Works</Link>
          <Link href="/marketing/pricing">Pricing</Link>

          {!session ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/app/step-1-upload">Run Audit</Link>
            </>
          ) : (
            <>
              <Link href="/product/app/portfolio">Dashboard</Link>
              <button onClick={() => supabase.auth.signOut()}>
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
