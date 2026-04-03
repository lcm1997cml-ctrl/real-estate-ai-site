"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProjectOption = {
  slug: string;
  name: string;
  district: string;
  priceFrom: string;
  status: string;
};

type Props = {
  projects: ProjectOption[];
  initialA?: string;
  initialB?: string;
};

function SlotPicker({
  label,
  projects,
  selected,
  disabledSlug,
  onSelect,
}: {
  label: string;
  projects: ProjectOption[];
  selected: string;
  disabledSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-neutral-500 uppercase tracking-wider">{label}</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {projects.map((p) => {
          const isSelected = selected === p.slug;
          const isDisabled = disabledSlug === p.slug && !isSelected;
          return (
            <button
              key={p.slug}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(isSelected ? "" : p.slug)}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                isSelected
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : isDisabled
                    ? "cursor-not-allowed border-neutral-200 bg-neutral-50 opacity-40"
                    : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400"
              }`}
            >
              <p className="text-sm font-semibold leading-snug">{p.name}</p>
              <p className={`mt-0.5 text-xs ${isSelected ? "text-neutral-300" : "text-neutral-500"}`}>
                {p.district} · {p.priceFrom} 起
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectSelector({ projects, initialA = "", initialB = "" }: Props) {
  const router = useRouter();
  const [slugA, setSlugA] = useState(initialA);
  const [slugB, setSlugB] = useState(initialB);

  const canCompare = slugA && slugB && slugA !== slugB;

  function handleCompare() {
    if (!canCompare) return;
    router.push(`/compare?a=${slugA}&b=${slugB}`);
  }

  return (
    <div className="space-y-6 rounded-2xl border bg-white p-6">
      <SlotPicker
        label="樓盤 A"
        projects={projects}
        selected={slugA}
        disabledSlug={slugB}
        onSelect={setSlugA}
      />
      <SlotPicker
        label="樓盤 B"
        projects={projects}
        selected={slugB}
        disabledSlug={slugA}
        onSelect={setSlugB}
      />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleCompare}
          disabled={!canCompare}
          className={`inline-flex h-10 items-center justify-center rounded-lg px-6 text-sm font-semibold transition ${
            canCompare
              ? "bg-amber-600 text-white hover:bg-amber-700"
              : "cursor-not-allowed bg-neutral-200 text-neutral-400"
          }`}
        >
          開始比較 →
        </button>
        {slugA && slugB && slugA === slugB && (
          <p className="text-sm text-red-500">請選擇兩個不同的樓盤</p>
        )}
        {(!slugA || !slugB) && (slugA || slugB) && (
          <p className="text-sm text-neutral-500">
            {!slugA ? "請選擇樓盤 A" : "請選擇樓盤 B"}
          </p>
        )}
      </div>
    </div>
  );
}
