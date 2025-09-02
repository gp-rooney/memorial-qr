// Purpose: QR scan → claim flow (static demo; no backend). Handles claimed vs unclaimed codes by simple rules.
import Link from "next/link";

const CLAIMED: Record<string, { slug: string }> = {
  CLAIMED1: { slug: "jane-doe" },
  CLAIMED2: { slug: "john-doe" },
};

// Treat these as unclaimed demo codes
const UNCLAIMED = new Set<string>(["DEMO123", "DEMO456", "TRYME"]);

function QrPreview({ data }: { data: string }) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
    data
  )}`;
  return <img src={url} alt="QR preview" className="w-40 h-40" />;
}

export default function Page({ params }: { params: { code: string } }) {
  const code = params.code.toUpperCase();
  const siteBase =
    typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL
      : "http://localhost:3000";

  // Demo rules
  const claimed = CLAIMED[code];
  const isUnclaimed = UNCLAIMED.has(code);

  if (claimed) {
    const memorialUrl = `/m/${claimed.slug}`;
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold">This QR code is already claimed</h1>
        <p className="mt-2">
          It points to the memorial page for <strong>{claimed.slug.replace("-", " ")}</strong>.
        </p>

        <div className="mt-6 flex items-center gap-6">
          <QrPreview data={`${siteBase}${memorialUrl}`} />
          <div>
            <p className="mb-2 text-gray-700">Open the memorial:</p>
            <Link href={memorialUrl} className="underline">
              {memorialUrl}
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/q/DEMO123" className="underline">
            Try an unclaimed demo code
          </Link>
        </div>
      </main>
    );
  }

  if (isUnclaimed) {
    const claimUrl = `/dashboard?code=${encodeURIComponent(code)}&demo=1`;
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Claim your memorial</h1>
        <p className="mt-2 text-gray-700">
          This code <code className="px-1 py-0.5 bg-gray-100 rounded">{code}</code> is{" "}
          <strong>unclaimed</strong>. In a real app, you’d sign in with a magic link, checkout, and
          then create the memorial. For now, click below to jump to the editor.
        </p>

        <div className="mt-6 flex items-center gap-6">
          <QrPreview data={`${siteBase}/q/${code}`} />
          <ol className="list-decimal pl-5 space-y-2">
            <li>Sign in (magic link)</li>
            <li>Checkout &amp; activate code</li>
            <li>Build the memorial</li>
          </ol>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href={claimUrl} className="underline">
            Start claim (demo)
          </Link>
          <Link href="/m/jane-doe" className="underline">
            View sample memorial
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-600">
          Tip: Try <Link href="/q/CLAIMED1" className="underline">/q/CLAIMED1</Link> to see a
          claimed flow.
        </p>
      </main>
    );
  }

  // Unknown code fallback
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Invalid or unknown code</h1>
      <p className="mt-2">
        Try an unclaimed demo code:{" "}
        <Link href="/q/DEMO123" className="underline">
          /q/DEMO123
        </Link>{" "}
        or a claimed demo code:{" "}
        <Link href="/q/CLAIMED1" className="underline">
          /q/CLAIMED1
        </Link>
        .
      </p>
    </main>
  );
}
