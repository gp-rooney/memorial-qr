// Purpose: Funeral Home partner portal (demo). Shows referral link, copy button, and a simple commissions table computed client-side.
"use client";

import { useMemo, useState } from "react";

type Order = {
  id: string;
  buyer: string;
  amount: number; // USD
  status: "paid" | "pending" | "refunded";
  fromReferral: boolean;
  commissionPct: number; // e.g., 0.2 for 20%
};

const DEMO_ORDERS: Order[] = [
  { id: "ord_1001", buyer: "Smith Family", amount: 120, status: "paid", fromReferral: true, commissionPct: 0.2 },
  { id: "ord_1002", buyer: "Nguyen Family", amount: 120, status: "paid", fromReferral: false, commissionPct: 0.2 },
  { id: "ord_1003", buyer: "Garcia Family", amount: 120, status: "pending", fromReferral: true, commissionPct: 0.2 },
];

export default function PartnersPage() {
  const [code] = useState("FH-DEMO-001");
  const siteBase =
    (typeof window !== "undefined" && window.location.origin) ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const referralLink = `${siteBase}/q/DEMO123?ref=${encodeURIComponent(code)}`;

  const totals = useMemo(() => {
    const paid = DEMO_ORDERS.filter((o) => o.status === "paid");
    const referred = paid.filter((o) => o.fromReferral);
    const gross = paid.reduce((s, o) => s + o.amount, 0);
    const commission = referred.reduce((s, o) => s + o.amount * o.commissionPct, 0);
    return { gross, commission, countPaid: paid.length, countReferred: referred.length };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      alert("Referral link copied!");
    } catch {
      // fallback
      prompt("Copy your referral link:", referralLink);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Partner Portal (Demo)</h1>
      <p className="mt-2 text-gray-700">
        Share your link below. Any memorials purchased through it will credit your commission.
      </p>

      <section className="mt-6 border rounded p-4 grid gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium">Your partner code:</span>
          <code className="bg-gray-100 px-2 py-1 rounded">{code}</code>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium">Referral link:</span>
          <input className="border rounded px-3 py-2 min-w-[280px] flex-1" readOnly value={referralLink} />
          <button onClick={copy} className="px-3 py-2 rounded bg-black text-white">
            Copy
          </button>
        </div>

        <p className="text-xs text-gray-600">
          Tip: Open the link in a new tab to see the demo claim flow with your <code>ref</code> attached.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Commissions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <Stat label="Paid Orders" value={totals.countPaid.toString()} />
          <Stat label="Referred Orders" value={totals.countReferred.toString()} />
          <Stat label="Gross Sales" value={`$${totals.gross.toFixed(2)}`} />
          <Stat label="Your Commission" value={`$${totals.commission.toFixed(2)}`} />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full border">
            <thead className="bg-gray-50">
              <tr>
                <Th>Order</Th>
                <Th>Buyer</Th>
                <Th>Status</Th>
                <Th className="text-right">Amount</Th>
                <Th className="text-right">Commission</Th>
              </tr>
            </thead>
            <tbody>
              {DEMO_ORDERS.map((o) => {
                const commission = o.status === "paid" && o.fromReferral ? o.amount * o.commissionPct : 0;
                return (
                  <tr key={o.id} className="border-t">
                    <Td>{o.id}</Td>
                    <Td>{o.buyer}</Td>
                    <Td>{o.status}</Td>
                    <Td className="text-right">${o.amount.toFixed(2)}</Td>
                    <Td className="text-right">${commission.toFixed(2)}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded p-3">
      <div className="text-xs text-gray-600">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`text-left px-3 py-2 border-b ${className}`}>{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}
