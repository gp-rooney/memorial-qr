// Purpose: Print sheet for QR stickers (12 per page demo). Generates QR images from the batch param and a claim URL.
"use client";

import { useMemo } from "react";

type Props = { params: { batch: string } };

export default function PrintBatchPage({ params }: Props) {
  const siteBase =
    (typeof window !== "undefined" && window.location.origin) ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  // Create exactly 12 codes for the sheet: BATCH-01 ... BATCH-12
  const codes = useMemo(() => {
    const b = (params.batch || "BATCH").toUpperCase();
    return Array.from({ length: 12 }, (_, i) => `${b}-${String(i + 1).padStart(2, "0")}`);
  }, [params.batch]);

  return (
    <main className="p-4 print:p-0">
      <header className="flex items-center justify-between mb-4 print:hidden">
        <h1 className="text-2xl font-bold">QR Stickers – {params.batch.toUpperCase()}</h1>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="px-3 py-2 rounded bg-black text-white">
            Print
          </button>
        </div>
      </header>

      {/* 3 x 4 grid = 12 per page */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:gap-2">
        {codes.map((code) => {
          const claimUrl = `${siteBase}/q/${encodeURIComponent(code)}`;
          const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
            claimUrl,
          )}`;
          return (
            <div
              key={code}
              className="border rounded p-3 flex items-center gap-3 print:p-2 print:rounded-none"
              style={{
                breakInside: "avoid",
              }}
            >
              <img
                src={qrSrc}
                alt={`QR for ${code}`}
                className="w-32 h-32 sm:w-40 sm:h-40"
                // Note: using external PNG so it works out-of-the-box without any libs
              />
              <div className="text-sm">
                <div className="font-semibold">Memorial QR</div>
                <div className="text-gray-600">Code: <code>{code}</code></div>
                <div className="text-xs text-gray-700 break-all">{claimUrl}</div>
              </div>
            </div>
          );
        })}
      </section>

      <footer className="mt-6 text-center text-xs text-gray-500 print:hidden">
        Tip: Change the URL segment after <code>/admin/print/</code> to generate labels for any batch, e.g.{" "}
        <code>/admin/print/ALPHA</code>.
      </footer>
    </main>
  );
}
