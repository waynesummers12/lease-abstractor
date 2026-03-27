"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  // TEMP auth mock (replace later with real auth)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  return (
    <nav className="w-full bg-black text-white px-8 py-4 flex items-center justify-between">
      {/* Brand */}
      <Link href="/" className="text-lg font-bold">
        SaveOnLease
      </Link>

      {/* Center - Learn Dropdown */}
      <div className="relative">
        <button
          onClick={() => setLearnOpen(!learnOpen)}
          className="text-sm hover:text-gray-300"
        >
          Learn ▾
        </button>

        {learnOpen && (
          <div className="absolute mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
            <Link
              href="/marketing/what-we-find"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              What We Find
            </Link>
            <Link
              href="/marketing/how-it-works"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              How It Works
            </Link>
            <Link
              href="/marketing/pricing"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Pricing
            </Link>
          </div>
        )}
      </div>

      {/* Right App Zone */}
      <div className="flex items-center gap-6">
        {!isLoggedIn ? (
          <>
            <Link
              href="/login"
              className="text-sm text-gray-300 hover:text-white"
            >
              Login
            </Link>

            <Link
              href="/app/step-1-upload"
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
            >
              Run Audit (Free Preview)
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setAvatarOpen(!avatarOpen)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-sm font-bold">
                WS
              </div>
            </button>

            {avatarOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
                <Link
                  href="/product/app/portfolio"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
