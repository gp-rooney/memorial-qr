// Purpose: Robots.txt for basic SEO privacy (blocks private areas; points to sitemap).
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    rules: [
      // Let search engines crawl public pages…
      { userAgent: "*", allow: ["/", "/m/"] },
      // …but keep private areas out of indexes.
      { userAgent: "*", disallow: ["/dashboard", "/partners", "/admin", "/q/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
