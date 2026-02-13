import "../styles/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  metadataBase: new URL("https://saveonlease.com"),
  title: {
    default: "SaveOnLease — CAM & NNN Lease Audit for Commercial Tenants",
    template: "%s | SaveOnLease",
  },
  description:
    "Identify CAM and NNN overcharges in commercial leases with a clear, tenant-first audit and estimated exposure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EWG7MF2T77"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EWG7MF2T77');
          `}
        </Script>
      </head>

      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Header />

        {/* Main content area */}
        <main className="flex-1">
          {/* Offset for fixed / sticky header */}
          <div className="pt-20">
            {children}
          </div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
