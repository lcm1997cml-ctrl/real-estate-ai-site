"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { resolveProjectHeroImage } from "@/lib/project-media";

type Props = {
  projects: Project[];
};

export function ProjectCarousel({ projects }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % projects.length),
    [projects.length],
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + projects.length) % projects.length),
    [projects.length],
  );

  useEffect(() => {
    if (paused || projects.length <= 1) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, paused, projects.length]);

  const project = projects[current];

  return (
    <section
      className="relative overflow-hidden rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide backgrounds */}
      {projects.map((p, i) => (
        <div
          key={p.slug}
          aria-hidden={i !== current}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            opacity: i === current ? 1 : 0,
            backgroundImage: `linear-gradient(to bottom, rgba(17,17,17,.45) 0%, rgba(17,17,17,.2) 40%, rgba(17,17,17,.78) 100%), url(${resolveProjectHeroImage(p)})`,
          }}
        />
      ))}

      {/* Content overlay */}
      <div className="relative flex min-h-[400px] flex-col justify-end px-6 py-10 text-white md:min-h-[500px] md:px-10 md:py-14">
        <p className="text-xs font-medium uppercase tracking-widest text-amber-300">
          香港一手樓盤焦點
        </p>
        <h1 className="mt-2 text-3xl font-semibold md:text-5xl">{project.name}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-200 md:text-base">
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="border border-white/20 bg-white/15 text-white hover:bg-white/15"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Key stats */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="rounded-lg bg-black/40 px-4 py-2 backdrop-blur-sm">
            <p className="text-xs text-neutral-400">入場價</p>
            <p className="mt-0.5 text-sm font-semibold">{project.priceFrom}</p>
          </div>
          <div className="rounded-lg bg-black/40 px-4 py-2 backdrop-blur-sm">
            <p className="text-xs text-neutral-400">平均呎價</p>
            <p className="mt-0.5 text-sm font-semibold">{project.avgPricePerSqft}</p>
          </div>
          <div className="rounded-lg bg-black/40 px-4 py-2 backdrop-blur-sm">
            <p className="text-xs text-neutral-400">地區</p>
            <p className="mt-0.5 text-sm font-semibold">{project.district}</p>
          </div>
          <div className="rounded-lg bg-black/40 px-4 py-2 backdrop-blur-sm">
            <p className="text-xs text-neutral-400">狀態</p>
            <p className="mt-0.5 text-sm font-semibold">{project.status}</p>
          </div>
        </div>

        {/* CTA + navigation row */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href={`/project/${project.slug}`}
            className="inline-flex h-10 items-center rounded-lg bg-amber-500 px-5 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            查看詳情
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="上一張"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition hover:bg-white/35"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-1.5">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`第 ${i + 1} 張`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-amber-400" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="下一張"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition hover:bg-white/35"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
