import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { formatPrice, formatPSF, parseNumber } from "@/lib/price";
import { resolveProjectHeroImage } from "@/lib/project-media";

type Props = {
  project: Project;
  /** Pre-built WhatsApp href — shows a WhatsApp CTA button when provided. */
  waHref?: string;
  /** Compare page href — shows a compare CTA button when provided. */
  compareHref?: string;
  /** Shrink hero stats text size for specific project page only. */
  compactStatsText?: boolean;
};

export function HeroSection({ project, waHref, compareHref, compactStatsText = false }: Props) {
  const heroImage = resolveProjectHeroImage(project);
  const priceNum = parseNumber(project.priceFrom);
  const psfNum = parseNumber(project.avgPricePerSqft);

  return (
    <section className="relative overflow-hidden rounded-2xl">
      {heroImage ? (
        <img
          src={heroImage}
          alt={`${project.name} 外觀`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      ) : null}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(17,17,17,.6) 0%, rgba(17,17,17,.4) 60%, rgba(17,17,17,.7) 100%)",
        }}
        aria-hidden
      />
      <div className="relative px-6 py-14 text-white md:px-10 md:py-20">
        <p className="text-xs font-medium tracking-widest text-amber-300 uppercase">
          香港一手樓盤焦點
        </p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">{project.name}</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-200 md:text-lg">
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-white/15 text-white hover:bg-white/15 border-white/20 border"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Key stats strip */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="rounded-lg bg-black/40 px-4 py-2.5 backdrop-blur-sm">
            <p className={`${compactStatsText ? "text-xs" : "text-sm"} text-neutral-400`}>入場價</p>
            <p
              className={`mt-0.5 font-semibold text-white ${compactStatsText ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"}`}
            >
              {formatPrice(priceNum)}
            </p>
          </div>
          <div className="rounded-lg bg-black/40 px-4 py-2.5 backdrop-blur-sm">
            <p className={`${compactStatsText ? "text-xs" : "text-sm"} text-neutral-400`}>平均呎價</p>
            <p
              className={`mt-0.5 font-semibold text-white ${compactStatsText ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"}`}
            >
              {formatPSF(psfNum)}
            </p>
          </div>
          <div className="rounded-lg bg-black/40 px-4 py-2.5 backdrop-blur-sm">
            <p className="text-xs text-neutral-400">地區</p>
            <p className={`mt-0.5 font-semibold text-white ${compactStatsText ? "text-xs" : "text-sm"}`}>
              {project.district}
            </p>
          </div>
          <div className="rounded-lg bg-black/40 px-4 py-2.5 backdrop-blur-sm">
            <p className="text-xs text-neutral-400">狀態</p>
            <p className={`mt-0.5 font-semibold text-white ${compactStatsText ? "text-xs" : "text-sm"}`}>
              {project.status}
            </p>
          </div>
        </div>

        {/* CTA buttons — only on project detail pages */}
        {(waHref || compareHref) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-amber-500 px-5 text-sm font-semibold text-white hover:bg-amber-600 transition"
              >
                WhatsApp 查詢
              </a>
            )}
            {compareHref && (
              <Link
                href={compareHref}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition"
              >
                與其他樓盤比較 →
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
