"use client";

import { useEffect, useState } from "react";

export function GallerySection({
  images,
  projectName,
}: {
  images: string[];
  projectName: string;
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const hasActive = activeIdx !== null;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (activeIdx === null) return;
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowRight") setActiveIdx((prev) => (prev === null ? null : (prev + 1) % images.length));
      if (e.key === "ArrowLeft") setActiveIdx((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIdx, images.length]);

  return (
    <section>
      <h2 className="text-2xl font-semibold">圖片廊</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {images.map((image, idx) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className="relative h-56 w-full overflow-hidden rounded-xl transition hover:opacity-90"
          >
            <img
              src={image}
              alt={
                images.length > 1 ? `${projectName} 圖片 ${idx + 1}` : `${projectName} 圖片`
              }
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {hasActive && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setActiveIdx(null)}
        >
          <button
            type="button"
            className="absolute left-4 rounded-full bg-white/20 px-3 py-2 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
            }}
          >
            ←
          </button>
          <img
            src={images[activeIdx]}
            alt={
              images.length > 1
                ? `${projectName} 圖片 ${activeIdx + 1}`
                : `${projectName} 圖片`
            }
            className="max-w-[90%] max-h-[90%]"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="absolute right-4 rounded-full bg-white/20 px-3 py-2 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx((prev) => (prev === null ? null : (prev + 1) % images.length));
            }}
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}
