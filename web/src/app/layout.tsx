// web/src/app/layout.tsx

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Header />

        {/* Header height = 64px */}
        <main className="flex-1 pt-16">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

