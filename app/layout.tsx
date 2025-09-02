// Purpose: Root layout shell (header/nav/footer) shared by all pages.
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css"; // Import your global styles

export const metadata: Metadata = {
  title: "Memorial QR · Demo",
  description: "Static demo of QR-linked memorial pages.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold">Memorial QR</Link>
            <nav className="flex gap-4 text-sm">
              <Link className="hover:underline" href="/q/DEMO123">Scan/Claim (demo)</Link>
              <Link className="hover:underline" href="/m/jane-doe">Memorial</Link>
              <Link className="hover:underline" href="/dashboard">Dashboard</Link>
              <Link className="hover:underline" href="/partners">Partners</Link>
              <Link className="hover:underline" href="/admin">Admin</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">
            © {new Date().getFullYear()} Memorial QR — Demo only. Privacy-first, unlisted by default.
          </div>
        </footer>
      </body>
    </html>
  );
}