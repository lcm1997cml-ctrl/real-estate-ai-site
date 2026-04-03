"use client";

import { useEffect, useState } from "react";

type Props = {
  images: string[];
  projectName: string;
};

export function FloorplanSection({ images, projectName }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const hasActive = activeIdx !== null;
  const isSingle = images.length === 1;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (activeIdx === null) return;
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowRight")
        setActiveIdx((prev) => (prev === null ? null : (prev + 1) % images.length));
      if (e.key === "ArrowLeft")
        setActiveIdx((prev) =>
          prev === null ? null : (prev - 1 + images.length) % images.length,
        );
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIdx, images.length]);

  if (!images.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold">平面圖資料</h2>
      <p className="mt-1 text-sm text-neutral-500">查看樓盤平面圖與戶型配置</p>
      <div
        className={`mt-4 grid w-full gap-4 ${isSingle ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}
      >
        {images.map((image, idx) => (
          <button
            key={`${image}-${idx}`}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className="w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-sm transition hover:opacity-95"
          >
            <img
              src={image}
              alt={`${projectName} 平面圖 ${idx + 1}`}
              className={
                isSingle
                  ? "h-auto w-full max-h-[min(640px,85vh)] object-contain object-center"
                  : "h-auto w-full max-h-[min(420px,55vh)] object-contain object-center md:max-h-[min(480px,60vh)]"
              }
              loading="lazy"
              onError={() => {
                console.error("[FloorplanSection] Image failed to load, path:", image);
              }}
            />
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-neutral-400">戶型平面圖（只供參考）</p>

      {hasActive && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setActiveIdx(null)}
        >
          <button
            type="button"
            className="absolute left-4 rounded-full bg-white/20 px-3 py-2 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx((prev) =>
                prev === null ? null : (prev - 1 + images.length) % images.length,
              );
            }}
          >
            ←
          </button>
          <img
            src={images[activeIdx!]}
            alt={`${projectName} 平面圖`}
            className="max-h-[90%] max-w-[90%] object-contain"
            onClick={(e) => e.stopPropagation()}
            onError={() => {
              console.error("[FloorplanSection] Lightbox image failed to load, path:", images[activeIdx!]);
            }}
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
