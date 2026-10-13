import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaveOnLease Pricing | Lease and Statement Review",
  description:
    "Start with a free lease preview, then choose a $49.99 one-time report. Annual CAM or NNN statement review is included at the same price.",
  openGraph: {
    title: "SaveOnLease Pricing | One Report, $49.99",
    description:
      "Preview your lease for free. Add an annual statement and supporting PDFs for a fuller $49.99 report.",
    url: "https://www.saveonlease.com/marketing/pricing",
    siteName: "SaveOnLease",
    type: "website",
    images: [
      {
        url: "https://www.saveonlease.com/demo/OG%20Imagev1.png",
        width: 1200,
        height: 630,
        alt: "SaveOnLease CAM & NNN Audit Report Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaveOnLease Pricing | One Report, $49.99",
    description:
      "Preview your lease for free. Add an annual statement and supporting PDFs for a fuller $49.99 report.",
    images: ["https://www.saveonlease.com/demo/OG%20Imagev1.png"],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
