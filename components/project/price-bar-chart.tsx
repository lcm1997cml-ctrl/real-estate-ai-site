import Link from "next/link";
import { Project } from "@/types/project";
import { parseHkdPrice } from "@/lib/mortgage";

type Props = {
  /** All projects to compare. */
  projects: Project[];
  /** Slug of the project currently being viewed. */
  currentSlug: string;
};

function BarRow({
  label,
  value,
  displayValue,
  pct,
  isCurrent,
  href,
}: {
  label: string;
  value: number;
  displayValue: string;
  pct: number;
  isCurrent: boolean;
  href: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <Link
          href={href}
          className={`font-medium transition hover:underline ${isCurrent ? "text-amber-700" : "text-neutral-700 hover:text-neutral-900"}`}
        >
          {label}
          {isCurrent && (
            <span className="ml-1.5 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
              本盤
            </span>
          )}
        </Link>
        <span className="font-medium text-neutral-600">{displayValue}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isCurrent ? "bg-amber-500" : "bg-neutral-300"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function PriceBarChart({ projects, currentSlug }: Props) {
  const entryPrices = projects.map((p) => parseHkdPrice(p.priceFrom));
  const sqftPrices = projects.map((p) => parseHkdPrice(p.avgPricePerSqft));
  const maxEntry = Math.max(...entryPrices);
  const maxSqft = Math.max(...sqftPrices);

  return (
    <section className="rounded-2xl border bg-white p-6">
      <h2 className="text-xl font-semibold text-neutral-900">同期樓盤價格比較</h2>
      <p className="mt-1 text-sm text-neutral-500">
        以各盤最低入場價及平均呎價作參考對比
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Entry price comparison */}
        <div>
          <p className="mb-4 text-sm font-semibold text-neutral-700">入場價</p>
          <div className="space-y-4">
            {projects.map((p, i) => (
              <BarRow
                key={p.slug}
                label={p.name}
                value={entryPrices[i]}
                displayValue={p.priceFrom}
                pct={(entryPrices[i] / maxEntry) * 100}
                isCurrent={p.slug === currentSlug}
                href={`/project/${p.slug}`}
              />
            ))}
          </div>
        </div>

        {/* Per-sqft price comparison */}
        <div>
          <p className="mb-4 text-sm font-semibold text-neutral-700">平均呎價</p>
          <div className="space-y-4">
            {projects.map((p, i) => (
              <BarRow
                key={p.slug}
                label={p.name}
                value={sqftPrices[i]}
                displayValue={p.avgPricePerSqft}
                pct={(sqftPrices[i] / maxSqft) * 100}
                isCurrent={p.slug === currentSlug}
                href={`/project/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-neutral-400">
          * 入場價及呎價為各盤官方公布數據，實際成交視乎樓層、景觀及市況。
        </p>
        <Link
          href="/compare"
          className="shrink-0 text-xs font-medium text-amber-700 hover:underline"
        >
          詳細並排比較 →
        </Link>
      </div>
    </section>
  );
}
