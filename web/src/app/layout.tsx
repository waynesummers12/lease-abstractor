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
      <body className="bg-white text-gray-900">
        <Header />

        {/* Header height = h-16 → 64px */}
        <div className="pt-16">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}




