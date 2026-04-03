import Link from "next/link";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { calcMortgageMonthly, formatHkd, parseHkdPrice } from "@/lib/mortgage";
import { formatPrice, formatPSF, parseNumber } from "@/lib/price";
import { resolveProjectHeroImage } from "@/lib/project-media";

export function ProjectCard({ project }: { project: Project }) {
  const heroImage = resolveProjectHeroImage(project);
  const fromPrice = parseHkdPrice(project.priceFrom);
  const priceNum = parseNumber(project.priceFrom);
  const psfNum = parseNumber(project.avgPricePerSqft);
  const estimatedMonthly = calcMortgageMonthly({
    price: fromPrice,
    downPaymentPct: 30,
    annualRate: 3.5,
    years: 30,
  });

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border bg-white transition hover:shadow-md">
      {/* Hero thumbnail */}
      <Link
        href={`/project/${project.slug}`}
        className="block h-44 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(17,17,17,.4), rgba(17,17,17,.2)), url(${heroImage})`,
        }}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <span
            className={`self-start rounded-full px-2.5 py-1 text-xs font-medium ${
              project.status === "熱賣中"
                ? "bg-red-500 text-white"
                : project.status === "公開發售"
                  ? "bg-amber-500 text-white"
                  : "bg-neutral-700 text-white"
            }`}
          >
            {project.status}
          </span>
          <p className="text-sm font-medium text-white drop-shadow">{project.district}</p>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/project/${project.slug}`}>
          <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-amber-700 md:text-2xl">
            {project.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-base leading-relaxed text-neutral-600 md:text-lg">{project.shortDescription}</p>

        {/* Price row */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-neutral-50 px-3 py-2.5">
            <p className="text-sm text-neutral-500">入場價</p>
            <p className="mt-1 text-xl font-semibold leading-tight text-neutral-900 md:text-2xl">
              {formatPrice(priceNum)}
            </p>
          </div>
          <div className="rounded-lg bg-neutral-50 px-3 py-2.5">
            <p className="text-sm text-neutral-500">平均呎價</p>
            <p className="mt-1 text-xl font-semibold leading-tight text-neutral-700 md:text-2xl">
              <span className="whitespace-nowrap">{formatPSF(psfNum)}</span>
            </p>
          </div>
        </div>

        {/* Monthly estimate */}
        {estimatedMonthly > 0 && (
          <div className="mt-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2.5">
            <p className="text-sm text-amber-700">
              入場月供估算（30% 首期）
            </p>
            <p className="mt-1 text-lg font-semibold leading-tight text-amber-800 md:text-xl">
              約 {formatHkd(estimatedMonthly)} / 月
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action row */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <Link
            href={`/project/${project.slug}`}
            className="text-sm font-medium text-amber-700 hover:underline"
          >
            查看詳情 →
          </Link>
          <Link
            href={`/compare?a=${project.slug}`}
            className="rounded-lg border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-900"
          >
            加入比較
          </Link>
        </div>
      </div>
    </div>
  );
}
