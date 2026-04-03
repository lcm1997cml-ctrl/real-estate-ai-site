import Link from "next/link";
import { Project } from "@/types/project";

/** Parse "HK$18,800" or "HK$4,980,000" → number for comparison. */
function parseHKD(str: string): number {
  return parseInt(str.replace(/[^0-9]/g, ""), 10);
}

type CellMeta = { value: string; isLower?: boolean };

/** For numeric rows: tag the lower-value cell. Ties get no tag. */
function tagLower(a: string, b: string): [CellMeta, CellMeta] {
  const na = parseHKD(a);
  const nb = parseHKD(b);
  if (na < nb) return [{ value: a, isLower: true }, { value: b }];
  if (nb < na) return [{ value: a }, { value: b, isLower: true }];
  return [{ value: a }, { value: b }];
}

function LowerBadge() {
  return (
    <span className="ml-1.5 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
      較低
    </span>
  );
}

type RowProps = {
  label: string;
  cells: CellMeta[];
  className?: string;
};

function Row({ label, cells, className = "" }: RowProps) {
  return (
    <tr className={`border-t ${className}`}>
      <td className="px-4 py-3 text-sm font-medium text-neutral-500 md:w-36">{label}</td>
      {cells.map((cell, i) => (
        <td key={i} className="px-4 py-3 text-sm text-neutral-800">
          {cell.value}
          {cell.isLower && <LowerBadge />}
        </td>
      ))}
    </tr>
  );
}

function SectionHeader({ label, colSpan }: { label: string; colSpan: number }) {
  return (
    <tr className="bg-neutral-50">
      <td colSpan={colSpan} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {label}
      </td>
    </tr>
  );
}

type Props = {
  projects: Project[];
};

export function ComparisonTable({ projects }: Props) {
  if (projects.length < 2) {
    return (
      <div className="rounded-xl border bg-neutral-50 px-6 py-10 text-center text-neutral-500">
        <p>請選擇至少兩個樓盤進行比較。</p>
        <Link
          href="/compare"
          className="mt-3 inline-block text-sm font-medium text-amber-700 hover:underline"
        >
          前往比較頁面 →
        </Link>
      </div>
    );
  }

  const colSpan = projects.length + 1;

  // ── Price cells with lower-value tagging ──────────────────
  const [priceA, priceB] = tagLower(projects[0].priceFrom, projects[1].priceFrom);
  const [sqftA, sqftB] = tagLower(projects[0].avgPricePerSqft, projects[1].avgPricePerSqft);

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full min-w-[560px] text-left">
        {/* Sticky project-name header */}
        <thead>
          <tr className="bg-neutral-900 text-white">
            <th className="px-4 py-3 text-sm font-medium text-neutral-400 md:w-36">比較項目</th>
            {projects.map((p) => (
              <th key={p.slug} className="px-4 py-3">
                <Link
                  href={`/project/${p.slug}`}
                  className="text-sm font-semibold hover:text-amber-300"
                >
                  {p.name}
                </Link>
                <p className="mt-0.5 text-xs font-normal text-neutral-400">{p.district}</p>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* ── 基本資料 ── */}
          <SectionHeader label="基本資料" colSpan={colSpan} />
          <Row label="地區" cells={projects.map((p) => ({ value: p.district }))} />
          <Row label="入場價" cells={[priceA, priceB]} />
          <Row label="平均呎價" cells={[sqftA, sqftB]} />
          <Row label="發展商" cells={projects.map((p) => ({ value: p.developer }))} />
          <Row label="銷售狀態" cells={projects.map((p) => ({ value: p.status }))} />

          {/* ── 戶型選擇 ── */}
          <SectionHeader label="戶型選擇" colSpan={colSpan} />
          <tr className="border-t">
            <td className="px-4 py-3 text-sm font-medium text-neutral-500 align-top">戶型</td>
            {projects.map((p) => (
              <td key={p.slug} className="px-4 py-3 align-top">
                <ul className="space-y-1">
                  {p.unitTypes.map((u) => (
                    <li key={u.name} className="text-sm text-neutral-800">
                      <span className="font-medium">{u.name}</span>
                      <span className="text-neutral-500">
                        {" "}
                        {u.area} · {u.priceFrom} 起
                      </span>
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* ── 周邊配套 ── */}
          <SectionHeader label="周邊配套" colSpan={colSpan} />
          <tr className="border-t">
            <td className="px-4 py-3 text-sm font-medium text-neutral-500 align-top">設施</td>
            {projects.map((p) => (
              <td key={p.slug} className="px-4 py-3 align-top">
                <ul className="space-y-1">
                  {p.nearbyFacilities.map((f) => (
                    <li key={f.name} className="text-sm text-neutral-800">
                      <span className="font-medium text-neutral-500">{f.category}：</span>
                      {f.name}
                      <span className="text-neutral-400"> {f.distance}</span>
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* ── 主要優點 ── */}
          <SectionHeader label="主要優點" colSpan={colSpan} />
          <tr className="border-t">
            <td className="px-4 py-3 text-sm font-medium text-neutral-500 align-top">亮點</td>
            {projects.map((p) => (
              <td key={p.slug} className="px-4 py-3 align-top">
                <ul className="space-y-1.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-neutral-800">
                      <span className="mt-0.5 shrink-0 text-emerald-500">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* ── 注意事項 ── */}
          {projects.some((p) => p.cons && p.cons.length > 0) && (
            <>
              <SectionHeader label="注意事項" colSpan={colSpan} />
              <tr className="border-t">
                <td className="px-4 py-3 text-sm font-medium text-neutral-500 align-top">風險</td>
                {projects.map((p) => (
                  <td key={p.slug} className="px-4 py-3 align-top">
                    {p.cons && p.cons.length > 0 ? (
                      <ul className="space-y-1.5">
                        {p.cons.map((c) => (
                          <li key={c} className="flex gap-2 text-sm text-neutral-700">
                            <span className="mt-0.5 shrink-0 text-amber-500">!</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-sm text-neutral-400">—</span>
                    )}
                  </td>
                ))}
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
