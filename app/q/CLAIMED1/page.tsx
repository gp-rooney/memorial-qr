// Purpose: Claimed demo QR page that links straight to the memorial.
import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">This code is already claimed</h1>
      <Link href="/m/jane-doe" className="mt-3 inline-block px-4 py-2 rounded bg-black text-white">
        Go to memorial
      </Link>
    </main>
  );
}
