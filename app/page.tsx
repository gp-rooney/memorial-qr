// Purpose: Simple homepage (static). Introduces the product and links to key demo routes.
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl font-bold leading-tight">
            QR-linked memorial pages — simple, private, and beautiful.
          </h1>
          <p className="mt-4 text-gray-700">
            Place a QR code on a gravestone to open a memorial page with photos, stories, and links.
            Unclaimed codes show a friendly “claim & set up” flow.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/q/DEMO123" className="px-4 py-2 rounded bg-black text-white">
              Try the claim flow
            </Link>
            <Link href="/m/jane-doe" className="px-4 py-2 rounded border">
              View a memorial
            </Link>
          </div>
          <p className="mt-3 text-xs text-gray-600">
            Demo only — no login or payments required.
          </p>
        </div>

        {/* QR preview card */}
        <div className="border rounded p-4">
          <div className="text-sm font-medium mb-2">Sample QR</div>
          <div className="flex items-center gap-4">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                "http://localhost:3000/q/DEMO123",
              )}`}
              alt="Demo QR to claim URL"
              className="w-40 h-40"
            />
            <div className="text-sm">
              <div className="font-semibold">Claim URL</div>
              <code className="text-xs break-all">/q/DEMO123</code>
              <div className="mt-3">
                <Link href="/admin/print/DEMO" className="underline">
                  Print a 12-up QR sheet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card
              n="1"
              title="Scan a code"
              body={
                <>
                  Put <code>/q/DEMO123</code> in your address bar or scan the QR. If unclaimed,
                  you’ll see a setup screen.
                </>
              }
            />
            <Card
              n="2"
              title="Claim & build"
              body={
                <>
                  In production: sign in with a magic link and pay. In this demo: jump straight to{" "}
                  <Link href="/dashboard" className="underline">
                    the editor
                  </Link>
                  .
                </>
              }
            />
            <Card
              n="3"
              title="Share privately"
              body={
                <>
                  Pages are unlisted by default. Share the link or QR. Example:{" "}
                  <Link href="/m/jane-doe" className="underline">
                    Jane Doe
                  </Link>
                  .
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="border rounded p-6 grid gap-4 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-xl font-semibold">For Funeral Homes</h3>
            <p className="mt-2 text-gray-700">
              Share memorials with families and earn commissions. Subscribe or resell per memorial.
            </p>
          </div>
          <div className="md:text-right">
            <Link href="/partners" className="px-4 py-2 rounded bg-black text-white">
              Open Partner Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ n, title, body }: { n: string; title: string; body: React.ReactNode }) {
  return (
    <div className="border rounded p-4 bg-white">
      <div className="text-xs text-gray-500">Step {n}</div>
      <div className="text-lg font-semibold mt-1">{title}</div>
      <div className="mt-2 text-gray-700 text-sm">{body}</div>
    </div>
  );
}
