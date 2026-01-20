// app/layout.tsx
import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "SaveOnLease — CAM & NNN Lease Audits",
  description:
    "Identify CAM and NNN overcharges in commercial leases. Upload your lease and receive a clear audit with estimated savings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <Header />
        {children}
      </body>
    </html>
  );
}


