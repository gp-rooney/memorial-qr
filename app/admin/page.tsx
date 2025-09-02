// Purpose: Admin (read-only demo). Shows simple tables for users, partners, and memorials using in-memory data.
"use client";

import Link from "next/link";

type DemoUser = { id: string; email: string; role: "owner" | "partner" | "admin" };
type DemoPartner = { id: string; name: string; code: string; email: string; totalCommission: number };
type DemoMemorial = { id: string; slug: string; name: string; ownerEmail: string; claimed: boolean };

const USERS: DemoUser[] = [
  { id: "u_1", email: "admin@example.com", role: "admin" },
  { id: "u_2", email: "owner@example.com", role: "owner" },
  { id: "u_3", email: "partner@example.com", role: "partner" },
];

const PARTNERS: DemoPartner[] = [
  { id: "p_1", name: "Evergreen Funeral Home", code: "FH-DEMO-001", email: "fh@example.com", totalCommission: 48.0 },
];

const MEMORIALS: DemoMemorial[] = [
  { id: "m_1", slug: "jane-doe", name: "Jane A. Doe", ownerEmail: "owner@example.com", claimed: true },
  { id: "m_2", slug: "john-doe", name: "John Q. Doe", ownerEmail: "owner@example.com", claimed: true },
];

export default function AdminPage() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Admin (Demo)</h1>
      <p className="mt-2 text-gray-700">
        Read-only demo data. Use <Link className="underline" href="/partners">/partners</Link> and{" "}
        <Link className="underline" href="/dashboard">/dashboard</Link> for interactive views.
      </p>

      {/* Users */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full border">
            <thead className="bg-gray-50">
              <tr>
                <Th>ID</Th>
                <Th>Email</Th>
                <Th>Role</Th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u) => (
                <tr key={u.id} className="border-t">
                  <Td>{u.id}</Td>
                  <Td>{u.email}</Td>
                  <Td><Badge>{u.role}</Badge></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Partners */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Partners</h2>
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full border">
            <thead className="bg-gray-50">
              <tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Code</Th>
                <Th>Email</Th>
                <Th className="text-right">Total Commission</Th>
              </tr>
            </thead>
            <tbody>
              {PARTNERS.map((p) => (
                <tr key={p.id} className="border-t">
                  <Td>{p.id}</Td>
                  <Td>{p.name}</Td>
                  <Td><code className="bg-gray-100 px-2 py-0.5 rounded">{p.code}</code></Td>
                  <Td>{p.email}</Td>
                  <Td className="text-right">${p.totalCommission.toFixed(2)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Memorials */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Memorials</h2>
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full border">
            <thead className="bg-gray-50">
              <tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Slug</Th>
                <Th>Owner</Th>
                <Th>Status</Th>
                <Th>Open</Th>
              </tr>
            </thead>
            <tbody>
              {MEMORIALS.map((m) => (
                <tr key={m.id} className="border-t">
                  <Td>{m.id}</Td>
                  <Td>{m.name}</Td>
                  <Td><code className="bg-gray-100 px-2 py-0.5 rounded">{m.slug}</code></Td>
                  <Td>{m.ownerEmail}</Td>
                  <Td>{m.claimed ? <Badge>claimed</Badge> : <Badge>unclaimed</Badge>}</Td>
                  <Td>
                    <Link className="underline" href={`/m/${m.slug}`}>View</Link>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`text-left px-3 py-2 border-b ${className}`}>{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}
function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-block text-xs px-2 py-0.5 rounded bg-gray-200">{children}</span>;
}
