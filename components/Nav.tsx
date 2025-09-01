// Purpose: Simple top navigation for the demo site
import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight">Memorial QR</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link className="hover:underline" href="/q/DEMO123">Scan (unclaimed)</Link>
          <Link className="hover:underline" href="/q/CLAIMED1">Scan (claimed)</Link>
          <Link className="hover:underline" href="/m/jane-doe">Sample memorial</Link>
        </div>
      </nav>
    </header>
  );
}
