import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaveOnLease Pricing | CAM & NNN Lease Audit for Commercial Tenants",
  description:
    "Run a fast, AI-powered lease audit to uncover CAM and NNN overcharges. Most tenants identify $5,000–$20,000+ in avoidable costs.",
  openGraph: {
    title: "SaveOnLease Pricing",
    description:
      "Identify hidden CAM and NNN costs in minutes. Upload your lease and uncover potential savings instantly.",
    url: "https://saveonlease.com/marketing/pricing",
    siteName: "SaveOnLease",
    type: "website",
    images: [
      {
        url: "https://saveonlease.com/demo/OG%20Imagev1.png",
        width: 1200,
        height: 630,
        alt: "SaveOnLease CAM & NNN Audit Report Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaveOnLease Pricing",
    description:
      "Uncover hidden CAM & NNN costs in minutes. Most tenants find $5,000–$20,000+ in savings.",
    images: ["https://saveonlease.com/demo/OG%20Imagev1.png"],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}