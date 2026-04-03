"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calcMortgageMonthly, formatHkd } from "@/lib/mortgage";

export function QuickMortgageCalculator() {
  const [price, setPrice] = useState(6_000_000);
  const [downPct, setDownPct] = useState(30);

  const monthly = useMemo(
    () =>
      calcMortgageMonthly({
        price,
        downPaymentPct: downPct,
        annualRate: 3.5,
        years: 30,
      }),
    [price, downPct],
  );

  return (
    <section className="rounded-2xl border bg-white p-6 md:p-8">
      <h2 className="text-xl font-semibold text-neutral-900">快速估算每月供款</h2>
      <p className="mt-2 text-sm text-neutral-600">
        看完樓盤資料後，可先試算供款是否符合預算，協助你比較不同樓盤的財務負擔。
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-neutral-600">樓價 (HK$)</span>
          <input
            type="number"
            min={1_000_000}
            step={100_000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
            className="mt-1 h-10 w-full rounded-lg border px-3"
          />
        </label>
        <label className="block">
          <span className="text-sm text-neutral-600">首期 (%)</span>
          <input
            type="number"
            min={10}
            max={90}
            step={1}
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value) || 0)}
            className="mt-1 h-10 w-full rounded-lg border px-3"
          />
        </label>
      </div>

      <div className="mt-5 rounded-xl bg-neutral-900 px-4 py-4 text-white">
        <p className="text-xs text-neutral-300">估算每月供款（3.5% 利率 / 30 年）</p>
        <p className="mt-1 text-2xl font-semibold">{formatHkd(monthly)}</p>
      </div>

      <Link
        href="/tools/mortgage-calculator"
        className="mt-5 inline-flex h-9 items-center justify-center rounded-lg border px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
      >
        查看完整按揭計算
      </Link>
    </section>
  );
}
