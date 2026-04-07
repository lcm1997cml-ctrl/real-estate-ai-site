import Link from "next/link";
import { UnitType } from "@/types/project";
import { calcMortgageMonthly, formatHkd, parseHkdPrice } from "@/lib/mortgage";
import { formatPSF } from "@/lib/price";

export function PricingCard({ unit }: { unit: UnitType }) {
  const fromPrice = parseHkdPrice(unit.priceFrom);
  const hasPrice = fromPrice > 0;
  const hasPsf = (unit.pricePsf ?? 0) > 0;
  const isTwoPlusOne = unit.tag === "2+1房" || unit.name.includes("2房半");
  const estimatedMonthly = calcMortgageMonthly({
    price: fromPrice,
    downPaymentPct: 30,
    annualRate: 3.5,
    years: 30,
  });

  return (
    <div
      className={`flex flex-col rounded-xl border p-5 ${
        isTwoPlusOne ? "border-amber-300 bg-amber-50/40 shadow-sm" : "bg-white"
      }`}
    >
      {/* Unit type badge */}
      <span
        className={`self-start rounded-full px-2.5 py-0.5 text-xs font-medium ${
          isTwoPlusOne
            ? "bg-amber-100 text-amber-800"
            : "bg-neutral-100 text-neutral-600"
        }`}
      >
        {unit.name}
      </span>
      {unit.tag && (
        <p className={`mt-2 text-xs font-medium ${isTwoPlusOne ? "text-amber-700" : "text-neutral-500"}`}>
          {unit.tag}
        </p>
      )}

      {/* Entry price */}
      {hasPrice ? (
        <p className="mt-3 text-2xl font-semibold text-neutral-900">{unit.priceFrom}</p>
      ) : (
        <p className="mt-3 text-sm text-neutral-400">價錢待更新</p>
      )}

      {/* Specs */}
      <div className="mt-3 space-y-1 text-sm text-neutral-600">
        <p>實用面積：{unit.area}</p>
        {hasPsf ? <p>呎價：{formatPSF(unit.pricePsf)}</p> : null}
        {(unit.description ?? unit.layout) ? (
          <p>{unit.description ?? unit.layout}</p>
        ) : null}
      </div>

      {/* Monthly estimate */}
      {estimatedMonthly > 0 && hasPrice && (
        <div className="mt-4 rounded-lg bg-amber-50 px-3 py-2.5">
          <p className="text-xs text-amber-700">月供估算（30% 首期 / 3.5% / 30 年）</p>
          <p className="mt-0.5 text-base font-semibold text-amber-800">
            約 {formatHkd(estimatedMonthly)} / 月
          </p>
        </div>
      )}

      <Link
        href="/tools/mortgage-calculator"
        className="mt-4 text-xs font-medium text-neutral-500 hover:text-neutral-900 hover:underline"
      >
        調整計算條件 →
      </Link>
    </div>
  );
}
