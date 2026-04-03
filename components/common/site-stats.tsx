import { Project } from "@/types/project";
import { parseHkdPrice, formatHkd } from "@/lib/mortgage";
import { Building2, Calculator, BarChart2, FileText } from "lucide-react";

type Props = {
  projects: Project[];
};

export function SiteStats({ projects }: Props) {
  const minEntry = Math.min(...projects.map((p) => parseHkdPrice(p.priceFrom)));
  const districtCount = new Set(projects.map((p) => p.district)).size;

  const stats = [
    {
      Icon: Building2,
      value: `${projects.length} 個`,
      label: "精選新盤",
    },
    {
      Icon: FileText,
      value: `${districtCount} 區`,
      label: "地區覆蓋",
    },
    {
      Icon: BarChart2,
      value: formatHkd(minEntry),
      label: "最低入場價起",
    },
    {
      Icon: Calculator,
      value: "即時",
      label: "供款試算工具",
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map(({ Icon, value, label }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-xl border bg-white px-4 py-4"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50">
            <Icon className="h-4.5 w-4.5 text-amber-600" />
          </div>
          <div>
            <p className="text-base font-bold text-neutral-900">{value}</p>
            <p className="text-xs text-neutral-500">{label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
