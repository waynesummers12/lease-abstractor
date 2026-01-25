// web/src/app/layout.tsx

import "../styles/globals.css";
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

