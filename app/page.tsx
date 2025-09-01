// Purpose: Visual landing page with CTAs into the demo flows
import Link from "next/link";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <div className="space-y-8">
      <section className="text-center py-6">
        <h1 className="text-4xl font-bold tracking-tight">QR-linked memorial pages</h1>
        <p className="mt-3 text-gray-600">Scan a code to claim a page, or visit an existing memorial.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/q/DEMO123" className="px-5 py-2 rounded bg-black text-white">Try unclaimed flow</Link>
          <Link href="/q/CLAIMED1" className="px-5 py-2 rounded border">See claimed flow</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <Card title="How it works">
          <ol className="list-decimal ml-5 space-y-1 text-sm text-gray-700">
            <li>Scan QR on a memorial.</li>
            <li>If unclaimed, claim & create the page.</li>
            <li>If claimed, view the memorial immediately.</li>
          </ol>
        </Card>
        <Card title="Sample memorial">
          <img
            src="https://picsum.photos/600/360?random=3"
            alt="Sample gallery"
            className="rounded mb-3"
          />
          <Link className="text-sm underline" href="/m/jane-doe">Open /m/jane-doe</Link>
        </Card>
        <Card title="What’s next">
          <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
            <li>Real data (Postgres) and login (magic link)</li>
            <li>Image uploads (S3) + gallery</li>
            <li>Checkout (Stripe) + partner commissions</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
