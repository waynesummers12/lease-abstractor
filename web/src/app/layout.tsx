// web/src/app/layout.tsx

import "../styles/globals.css";
import HeaderClient from "./components/HeaderClient";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ===================== */}
        {/* FLO BOT EMBED SCRIPT */}
        {/* ===================== */}
        <script
          src="https://flobotagent.com/embed.js"
          data-site-id="0daed93e-acfd-43ef-b0f3-fccf7bb12584"
          defer
        />
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