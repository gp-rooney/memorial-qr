// Purpose: Demo claim page that "creates" the memorial by sending you to /m/jane-doe.
import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Claim code DEMO123</h1>
      <p className="mt-4">For the demo, clicking the button takes you to the new memorial page.</p>
      <Link href="/m/jane-doe" className="mt-6 inline-block px-4 py-2 rounded bg-black text-white">
        Create demo memorial
      </Link>
      <p className="mt-4 text-sm text-gray-500">We’ll add real payments + login later.</p>
    </main>
  );
}
