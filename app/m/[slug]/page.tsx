// Purpose: Public memorial page that now fetches data from Firestore.
import Link from "next/link";
import { db } from "@/lib/firebase"; // Import your Firestore instance
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  DocumentData,
} from "firebase/firestore";

// Define the Memorial type based on our Firestore structure
type Memorial = {
  slug: string;
  name: string;
  dates: string;
  bio: string;
  coverImg: string;
  // For now, photos and links can be added later
  // photos: { src: string; alt: string }[];
  // links?: { youtube?: string; vimeo?: string; website?: string };
  unlisted: boolean;
};

// Helper function to fetch a memorial by its slug from Firestore
async function getMemorialBySlug(slug: string): Promise<Memorial | null> {
  const memorialsRef = collection(db, "memorials");
  const q = query(memorialsRef, where("slug", "==", slug), limit(1));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return null;
    }
    // We get the first document found
    const docData = querySnapshot.docs[0].data() as DocumentData;
    return docData as Memorial;
  } catch (error) {
    console.error("Error fetching memorial:", error);
    return null;
  }
}

// Optional SEO – can be updated to use fetched data
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const m = await getMemorialBySlug(params.slug);
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

// The Page component is now an async function
export default async function Page({ params }: { params: { slug: string } }) {
  const m = await getMemorialBySlug(params.slug);

  if (!m) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Memorial not found</h1>
        <p className="mt-2">
          This memorial is private or doesn’t exist. Try the demo:{" "}
          <Link href="/m/jane-doe" className="underline">
            /m/jane-doe
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-0 sm:p-6">
      {/* Cover */}
      <div className="w-full">
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

      {/* Photo gallery and links are removed for this step but can be added back */}

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