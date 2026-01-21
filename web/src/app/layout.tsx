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
        <Header />

        <main className="pt-16 min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
