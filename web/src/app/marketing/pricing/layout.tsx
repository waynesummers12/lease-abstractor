import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaveOnLease Pricing | CAM & NNN Lease Audit for Commercial Tenants",
  description:
    "Review your lease for potential CAM and NNN cost risks. Get a free preview, then choose whether to unlock the full audit.",
  openGraph: {
    title: "SaveOnLease Pricing",
    description:
      "Upload your lease for a CAM and NNN risk preview and choose whether to unlock a full audit.",
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
      "Review your lease for CAM and NNN cost risks with a free preview and optional full audit.",
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