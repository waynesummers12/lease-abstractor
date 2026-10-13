import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refer a Tenant, Earn 20%",
  description: "Share SaveOnLease with commercial tenants. They start with a free lease preview, and you earn 20% when a referred customer buys a report.",
  alternates: { canonical: "https://www.saveonlease.com/marketing/referral" },
};

export default function ReferralLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
