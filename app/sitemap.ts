// Purpose: Sitemap for basic SEO; lists demo memorial pages with a sensible localhost fallback.
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  // Static demo URLs (expand later when you have real data)
  const urls = ["/", "/m/jane-doe", "/m/john-doe"];

  return urls.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
