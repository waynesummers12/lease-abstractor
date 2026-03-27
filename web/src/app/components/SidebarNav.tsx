"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Example role (replace later with real user role)
const userRole = "admin"; // "admin" | "analyst" | "viewer"

const navItems = [
  {
    label: "Dashboard",
    href: "/product/app/dashboard",
    roles: ["admin", "analyst", "viewer"],
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 13h8V3H3v10zm10 8h8V3h-8v18z" />
      </svg>
    ),
  },
  {
    label: "Leases",
    href: "/product/app/leases",
    roles: ["admin", "analyst"],
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 2h9l5 5v15H6V2zm8 1.5V8h4.5" />
      </svg>
    ),
  },
  {
    label: "Portfolio",
    href: "/product/app/portfolio",
    roles: ["admin", "analyst"],
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4h16v16H4V4zm4 4h8v2H8zm0 4h5v2H8z" />
      </svg>
    ),
  },
  {
    label: "Benchmarks",
    href: "/product/app/benchmarks",
    roles: ["admin"],
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 17h4v4H3v-4zm7-7h4v11h-4V10zm7-6h4v17h-4V4z" />
      </svg>
    ),
  },
  {
    label: "Alerts",
    href: "/product/app/alerts",
    roles: ["admin", "analyst"],
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22a2 2 0 002-2h-4a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5L4 18v1h16v-1l-2-2z" />
      </svg>
    ),
  },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const filteredNav = navItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <div className={`relative ${collapsed ? "w-16" : "w-full"}`}>
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="mb-4 text-xs text-gray-500 hover:text-black"
      >
        {collapsed ? "→" : "Collapse"}
      </button>

      <nav className="flex flex-col gap-2 text-sm relative">
        {filteredNav.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <div key={item.href} className="relative">
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-black rounded transition-all" />
              )}

              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded transition-all duration-200 ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
}