// Purpose: Owner editor (demo only). Lets you fill fields, add photo previews, and "save" to localStorage; links to the public page.
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type DemoMemorial = {
  slug: string;
  name: string;
  dates: string;
  bio: string;
  unlisted: boolean;
  photos: string[]; // data URLs/Object URLs for demo preview
  links: { youtube?: string; vimeo?: string; website?: string };
};

const DEFAULT_MEMORIAL: DemoMemorial = {
  slug: "jane-doe",
  name: "Jane A. Doe",
  dates: "1950 – 2020",
  bio:
    "Write a short biography here. This is only stored in your browser for the demo.",
  unlisted: true,
  photos: [],
  links: { youtube: "", vimeo: "", website: "" },
};

const STORAGE_KEY = "demoMemorial";

export default function DashboardPage() {
  const sp = useSearchParams();
  const claimedCode = sp.get("code") || undefined;

  const [m, setM] = useState<DemoMemorial>(DEFAULT_MEMORIAL);
  const memorialUrl = useMemo(() => `/m/${m.slug || "jane-doe"}`, [m.slug]);

  // Load any prior demo edits from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setM({ ...DEFAULT_MEMORIAL, ...JSON.parse(raw) });
    } catch {}
  }, []);

  // Helpers
  const saveLocal = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(m));
      alert("Saved locally ✔ (demo)");
    } catch {
      alert("Could not save to localStorage in this browser.");
    }
  };

  const resetLocal = () => {
    localStorage.removeItem(STORAGE_KEY);
    setM(DEFAULT_MEMORIAL);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const urls = await Promise.all(
      files.map(
        (f) =>
          new Promise<string>((resolve) => {
            const r = new FileReader();
            r.onload = () => resolve(String(r.result));
            r.readAsDataURL(f); // encode so it persists on refresh
          }),
      ),
    );
    setM((prev) => ({ ...prev, photos: [...prev.photos, ...urls] }));
    // clear input so same file can be re-selected later
    e.currentTarget.value = "";
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Memorial Editor (Demo)</h1>
      {claimedCode && (
        <p className="mt-2 text-sm text-gray-600">
          Claiming code: <code className="bg-gray-100 px-1 rounded">{claimedCode}</code>{" "}
          (demo only – no payment or auth)
        </p>
      )}

      {/* Basics */}
      <section className="mt-6 grid gap-4">
        <label className="grid">
          <span className="text-sm font-medium">Slug (URL part)</span>
          <input
            className="border rounded px-3 py-2"
            value={m.slug}
            onChange={(e) => setM({ ...m, slug: e.target.value.trim().toLowerCase() })}
            placeholder="jane-doe"
          />
          <span className="text-xs text-gray-600 mt-1">
            Public link will be <code>{memorialUrl}</code>
          </span>
        </label>

        <label className="grid">
          <span className="text-sm font-medium">Name</span>
          <input
            className="border rounded px-3 py-2"
            value={m.name}
            onChange={(e) => setM({ ...m, name: e.target.value })}
            placeholder="Full name"
          />
        </label>

        <label className="grid">
          <span className="text-sm font-medium">Dates</span>
          <input
            className="border rounded px-3 py-2"
            value={m.dates}
            onChange={(e) => setM({ ...m, dates: e.target.value })}
            placeholder="1948 – 2015"
          />
        </label>

        <label className="grid">
          <span className="text-sm font-medium">Bio</span>
          <textarea
            className="border rounded px-3 py-2 min-h-[120px]"
            value={m.bio}
            onChange={(e) => setM({ ...m, bio: e.target.value })}
            placeholder="A short life story, favorite memories, etc."
          />
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={m.unlisted}
            onChange={(e) => setM({ ...m, unlisted: e.target.checked })}
          />
          <span className="text-sm">Unlisted (only people with link/QR can view)</span>
        </label>
      </section>

      {/* Links */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Optional Links</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <input
            className="border rounded px-3 py-2"
            placeholder="YouTube embed URL"
            value={m.links.youtube}
            onChange={(e) => setM({ ...m, links: { ...m.links, youtube: e.target.value } })}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Vimeo embed URL"
            value={m.links.vimeo}
            onChange={(e) => setM({ ...m, links: { ...m.links, vimeo: e.target.value } })}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Website URL"
            value={m.links.website}
            onChange={(e) => setM({ ...m, links: { ...m.links, website: e.target.value } })}
          />
        </div>
      </section>

      {/* Photos */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Photos (demo uploads)</h2>
        <input type="file" multiple accept="image/*" onChange={onFileChange} />
        {m.photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {m.photos.map((src, i) => (
              <img key={i} src={src} alt={`Photo ${i + 1}`} className="rounded w-full h-auto" />
            ))}
          </div>
        )}
      </section>

      {/* Actions */}
      <section className="mt-10 flex gap-3">
        <button onClick={saveLocal} className="px-4 py-2 rounded bg-black text-white">
          Save (demo)
        </button>
        <Link href={memorialUrl} className="px-4 py-2 rounded border">
          Open public page
        </Link>
        <button onClick={resetLocal} className="px-4 py-2 rounded border">
          Reset demo
        </button>
      </section>

      <p className="text-xs text-gray-500 mt-4">
        Privacy note: for the demo, content is stored only in your browser (localStorage) and
        cleared with “Reset”.
      </p>
    </main>
  );
}
