import { Project } from "@/types/project";
import { calcMortgageMonthly, formatHkd, parseHkdPrice } from "@/lib/mortgage";
import { Banknote, Ruler, Building2, MapPin, Activity, Calculator } from "lucide-react";
import { formatPrice, formatPSF, parseNumber } from "@/lib/price";

export function ProjectOverview({
  project,
  compactText = false,
}: {
  project: Project;
  compactText?: boolean;
}) {
  const fromPrice = parseHkdPrice(project.priceFrom);
  const priceNum = parseNumber(project.priceFrom);
  const psfNum = parseNumber(project.avgPricePerSqft);
  const estimatedMonthly = calcMortgageMonthly({
    price: fromPrice,
    downPaymentPct: 30,
    annualRate: 3.5,
    years: 30,
  });

  const items = [
    { label: "入場價", value: formatPrice(priceNum), Icon: Banknote, highlight: true },
    { label: "平均呎價", value: formatPSF(psfNum), Icon: Ruler },
    { label: "發展商", value: project.developer, Icon: Building2 },
    { label: "地區", value: project.district, Icon: MapPin },
    { label: "銷售狀態", value: project.status, Icon: Activity },
    {
      label: "入場月供估算*",
      value: formatHkd(estimatedMonthly),
      Icon: Calculator,
      highlight: true,
    },
  ];

  return (
    <section>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {items.map(({ label, value, Icon, highlight }) => {
          const isDeveloper = label === "發展商";
          const isPsf = label === "平均呎價";
          return (
          <div
            key={label}
            className={`rounded-xl border p-4 ${highlight ? "border-amber-200 bg-amber-50" : "bg-white"}`}
          >
            <div className="flex items-center gap-1.5">
              <Icon
                className={`h-3.5 w-3.5 ${highlight ? "text-amber-500" : "text-neutral-400"}`}
              />
              <p className={`${compactText ? "text-xs" : "text-sm"} text-neutral-500`}>{label}</p>
            </div>
            <p
              className={`mt-2 font-semibold ${isDeveloper ? "leading-relaxed" : "leading-tight"} ${isDeveloper ? (compactText ? "text-sm md:text-base" : "text-base md:text-lg") : compactText ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"} ${highlight ? "text-amber-800" : "text-neutral-900"}`}
            >
              {isPsf ? <span className="whitespace-nowrap">{value}</span> : value}
            </p>
          </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-neutral-400">
        * 月供估算以 30% 首期、3.5% 年利率、30 年期計算，僅供參考。
      </p>
    </section>
  );
}
