// Purpose: Public memorial page (static demo; no backend). Renders sample content for /m/jane-doe or /m/john-doe.
import Link from "next/link";

type Memorial = {
  slug: string;
  name: string;
  dates: string; // keep simple text for demo
  bio: string;
  coverImg: string;
  photos: { src: string; alt: string }[];
  links?: { youtube?: string; vimeo?: string; website?: string };
  unlisted: boolean; // demo flag – shows privacy note
};

// Demo in-memory "data"
const DEMO_MEMORIALS: Record<string, Memorial> = {
  "jane-doe": {
    slug: "jane-doe",
    name: "Jane A. Doe",
    dates: "1950 – 2020",
    bio:
      "Jane loved the mountains, baking sourdough, and reading to her grandkids. This demo page shows how a real memorial might look, without any backend.",
    coverImg: "https://placehold.co/1200x400?text=Jane+Doe+Memorial",
    photos: [
      { src: "https://placehold.co/600x400?text=Photo+1", alt: "Family picnic" },
      { src: "https://placehold.co/600x400?text=Photo+2", alt: "Hiking trail" },
      { src: "https://placehold.co/600x400?text=Photo+3", alt: "Baking bread" },
    ],
    links: {
      youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      website: "https://example.com",
    },
    unlisted: true,
  },
  "john-doe": {
    slug: "john-doe",
    name: "John Q. Doe",
    dates: "1948 – 2015",
    bio:
      "John served his community for decades. He enjoyed jazz records and restoring old radios. This is a second sample memorial.",
    coverImg: "https://placehold.co/1200x400?text=John+Doe+Memorial",
    photos: [
      { src: "https://placehold.co/600x400?text=Photo+1", alt: "At the workshop" },
      { src: "https://placehold.co/600x400?text=Photo+2", alt: "Jazz night" },
    ],
    links: { vimeo: "https://player.vimeo.com/video/76979871" },
    unlisted: true,
  },
};

// Optional SEO – dynamic per slug
export function generateMetadata({ params }: { params: { slug: string } }) {
  const m = DEMO_MEMORIALS[params.slug];
  const title = m ? `${m.name} • Memorial` : "Memorial not found";
  const description = m
    ? `${m.name} (${m.dates}). A memorial with photos and stories.`
    : "This memorial is private or not found.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: m ? [{ url: m.coverImg }] : [],
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const m = DEMO_MEMORIALS[params.slug];

  if (!m) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Memorial not found</h1>
        <p className="mt-2">
          This memorial is private or doesn’t exist. Try the demo:{" "}
          <Link href="/m/jane-doe" className="underline">/m/jane-doe</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-0 sm:p-6">
      {/* Cover */}
      <div className="w-full">
        {/* External placeholder image so it works out-of-the-box */}
        <img src={m.coverImg} alt={`${m.name} cover`} className="w-full h-auto" />
      </div>

      {/* Header */}
      <section className="px-6 sm:px-0 mt-6">
        <h1 className="text-3xl font-bold">{m.name}</h1>
        <p className="text-gray-600">{m.dates}</p>
        {m.unlisted && (
          <p className="mt-2 text-sm italic text-gray-500">
            This memorial is <strong>unlisted</strong>. Share the link directly or via QR.
          </p>
        )}
      </section>

      {/* Bio */}
      <section className="px-6 sm:px-0 mt-6">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="leading-7">{m.bio}</p>
      </section>

      {/* Links (YouTube/Vimeo/Website) */}
      {(m.links?.youtube || m.links?.vimeo || m.links?.website) && (
        <section className="px-6 sm:px-0 mt-8">
          <h2 className="text-xl font-semibold mb-2">Media & Links</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {m.links?.youtube && (
              <div className="aspect-video w-full">
                <iframe
                  src={m.links.youtube}
                  title="YouTube video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            )}
            {m.links?.vimeo && (
              <div className="aspect-video w-full">
                <iframe
                  src={m.links.vimeo}
                  title="Vimeo video"
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                />
              </div>
            )}
            {m.links?.website && (
              <a className="underline block" href={m.links.website} target="_blank">
                {m.links.website}
              </a>
            )}
          </div>
        </section>
      )}

      {/* Photo gallery */}
      <section className="px-6 sm:px-0 mt-8">
        <h2 className="text-xl font-semibold mb-3">Photos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {m.photos.map((p, i) => (
            <img key={i} src={p.src} alt={p.alt} className="w-full h-auto rounded" />
          ))}
        </div>
      </section>

      {/* Footer actions */}
      <section className="px-6 sm:px-0 my-10 flex items-center gap-4">
        <Link href="/q/DEMO123" className="underline">
          Scan/claim demo code
        </Link>
        <a
          className="underline"
          href={`mailto:support@example.com?subject=Report%20memorial:%20${encodeURIComponent(
            m.slug
          )}`}
        >
          Report content
        </a>
      </section>
    </main>
  );
}
