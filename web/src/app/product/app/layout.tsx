"use client";

import * as React from "react";
import Link from "next/link";


export function AvatarDropdown() {

  return (
  <div className="relative group">
    <button className="flex items-center rounded-full bg-gray-100 p-1">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
        U
      </div>
    </button>

    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
      <div className="px-4 py-2 text-sm font-medium border-b">My Account</div>

      <Link href="/product/app/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
        Profile
      </Link>

      <Link href="/product/app/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">
        Settings
      </Link>

      <div className="border-t" />

      <button
        onClick={() => {
          window.location.href = "/login";
        }}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        Sign out
      </button>
    </div>
  </div>
  );
}