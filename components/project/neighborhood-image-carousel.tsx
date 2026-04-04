"use client";

import { useState } from "react";

type Props = {
  images: string[];
  projectName: string;
};

/** Simple prev/next when multiple 周邊配套圖；單張時靜態顯示。 */
export function NeighborhoodImageCarousel({ images, projectName }: Props) {
  const [idx, setIdx] = useState(0);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200">
        <img
          src={images[0]}
          alt={`${projectName} 周邊配套`}
          className="h-52 w-full object-cover md:h-64"
          loading="lazy"
        />
      </div>
    );
  }

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="mt-4 space-y-3">
      <div className="overflow-hidden rounded-2xl border border-neutral-200">
        <img
          src={images[idx]}
          alt={`${projectName} 周邊配套 ${idx + 1}`}
          className="h-52 w-full object-cover md:h-64"
          loading="lazy"
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <button
          type="button"
          onClick={prev}
          className="rounded-lg border border-neutral-300 px-3 py-1.5 font-medium text-neutral-800 hover:bg-neutral-50"
        >
          上一張
        </button>
        <span className="text-neutral-500">
          {idx + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={next}
          className="rounded-lg border border-neutral-300 px-3 py-1.5 font-medium text-neutral-800 hover:bg-neutral-50"
        >
          下一張
        </button>
      </div>
    </div>
  );
}
