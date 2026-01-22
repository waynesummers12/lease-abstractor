// web/src/app/layout.tsx
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "SaveOnLease — CAM & NNN Audit for Commercial Tenants",
  description:
    "Identify CAM and NNN overcharges in commercial leases with a clear, secure lease audit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        {/* Fixed header */}
        <Header />

        {/* 🔑 OFFSET LAYER — THIS IS THE FIX */}
        <div className="pt-32 min-h-screen">
          {/* Semantic content container */}
          <main className="mx-auto">
            {children}
          </main>
        </div>

        <Footer />
      </body>
    </html>
  );
}


