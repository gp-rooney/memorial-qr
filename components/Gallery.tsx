// Purpose: Simple responsive image gallery with an optional lightbox (client-only, no backend).
"use client";

import { useEffect, useState } from "react";

export type GalleryImage = { src: string; alt?: string };

type Props = {
  images: GalleryImage[];
  enableLightbox?: boolean; // default true
  columns?: 2 | 3 | 4; // default 3
};

export default function Gallery({ images, enableLightbox = true, columns = 3 }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Close on ESC when lightbox open
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : Math.min(images.length - 1, i + 1)));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : Math.max(0, i - 1)));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, images.length]);

  const gridCols =
    columns === 4 ? "sm:grid-cols-4" : columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";

  return (
    <>
      <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            className="group relative rounded overflow-hidden border focus:outline-none focus:ring"
            onClick={() => enableLightbox && setOpenIndex(i)}
            aria-label={`Open image ${i + 1}`}
          >
            <img
              src={img.src}
              alt={img.alt ?? `Photo ${i + 1}`}
              className="w-full h-auto group-hover:opacity-95"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {enableLightbox && openIndex !== null && images[openIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpenIndex(null)}
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[openIndex].src}
              alt={images[openIndex].alt ?? `Photo ${openIndex + 1}`}
              className="w-full h-auto rounded"
            />
            <div className="mt-3 flex items-center justify-between text-white/90">
              <div className="text-sm">{images[openIndex].alt}</div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                  onClick={() => setOpenIndex(Math.max(0, openIndex - 1))}
                  aria-label="Previous image"
                >
                  ← Prev
                </button>
                <button
                  className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                  onClick={() => setOpenIndex(Math.min(images.length - 1, openIndex + 1))}
                  aria-label="Next image"
                >
                  Next →
                </button>
                <button
                  className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                  onClick={() => setOpenIndex(null)}
                  aria-label="Close"
                >
                  Close ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
