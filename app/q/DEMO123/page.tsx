// Purpose: Unclaimed demo QR page that links to the claim flow.
import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Claim this memorial code</h1>
      <p className="mt-2">Code: <span className="font-mono">DEMO123</span></p>
      <p className="mt-4">This code is unclaimed. Click below to create the page.</p>
      <Link href="/claim/DEMO123" className="mt-6 inline-block px-4 py-2 rounded bg-black text-white">
        Claim & Create
      </Link>
      <p className="mt-4 text-sm text-gray-500">Demo only. Payments later.</p>
    </main>
  );
}
