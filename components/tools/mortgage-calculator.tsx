"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getDefaultWhatsAppUrl } from "@/lib/whatsapp";

// ─── Calculation ────────────────────────────────────────────────────────────

function calcMortgage(
  price: number,
  downPct: number,
  annualRate: number,
  years: number,
) {
  const principal = price * (1 - downPct / 100);
  const downPayment = price * (downPct / 100);
  const n = years * 12;
  const r = annualRate / 100 / 12;

  const monthly =
    r === 0
      ? principal / n
      : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const totalPaid = monthly * n;
  const totalInterest = totalPaid - principal;

  return { principal, downPayment, monthly, totalPaid, totalInterest };
}

function calculateStampDuty(price: number) {
  if (price <= 4000000) return 100;
  if (price <= 4323780) return 100 + (price - 4000000) * 0.2;
  if (price <= 4500000) return price * 0.015;
  if (price <= 4935480) return 67500 + (price - 4500000) * 0.1;
  if (price <= 6000000) return price * 0.0225;
  if (price <= 6642860) return 135000 + (price - 6000000) * 0.1;
  if (price <= 9000000) return price * 0.03;
  if (price <= 10080000) return 270000 + (price - 9000000) * 0.1;
  if (price <= 20000000) return price * 0.0375;
  return price * 0.0425;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function hkd(n: number) {
  return `HK$${Math.round(n).toLocaleString("en-HK")}`;
}

function pct(n: number) {
  return `${n.toFixed(2)}%`;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1.5 text-sm font-medium text-neutral-700">{children}</p>
  );
}

function PillGroup<T extends string | number>({
  options,
  value,
  onChange,
  format,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  format?: (v: T) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={String(opt)}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
            value === opt
              ? "border-neutral-900 bg-neutral-900 text-white"
              : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
          }`}
        >
          {format ? format(opt) : String(opt)}
        </button>
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${highlight ? "border-amber-200 bg-amber-50" : "bg-white"}`}
    >
      <p className="text-xs text-neutral-500">{label}</p>
      <p
        className={`mt-1 text-lg font-semibold ${highlight ? "text-amber-800" : "text-neutral-900"}`}
      >
        {value}
      </p>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const DOWN_PCT_OPTIONS = [10, 20, 30, 40];
const TERM_OPTIONS = [10, 15, 20, 25, 30];
const PRICE_MIN = 1_000_000;
const PRICE_MAX = 50_000_000;
const PRICE_STEP = 100_000;
const RATE_MIN = 0.5;
const RATE_MAX = 8;
const RATE_STEP = 0.05;

export function MortgageCalculator() {
  const [price, setPrice] = useState(6_000_000);
  const [priceInput, setPriceInput] = useState("6,000,000");
  const [downPct, setDownPct] = useState(30);
  const [rate, setRate] = useState(3.5);
  const [term, setTerm] = useState(30);
  const [agentFee, setAgentFee] = useState(0);
  const [agentFeeManuallyChanged, setAgentFeeManuallyChanged] = useState(false);
  const [lawyerFee, setLawyerFee] = useState(10_000);
  const [renovationCost, setRenovationCost] = useState(0);

  const effectiveAgentFee = agentFeeManuallyChanged ? agentFee : price * 0.01;

  const result = useMemo(
    () => calcMortgage(price, downPct, rate, term),
    [price, downPct, rate, term],
  );

  const stressResult = useMemo(
    () => calcMortgage(price, downPct, rate + 2, term),
    [price, downPct, rate, term],
  );

  const principalPct =
    result.totalPaid > 0
      ? (result.principal / result.totalPaid) * 100
      : 100;

  const stampDuty = useMemo(() => calculateStampDuty(price), [price]);
  const otherFeesTotal = useMemo(() => effectiveAgentFee + lawyerFee + renovationCost, [effectiveAgentFee, lawyerFee, renovationCost]);
  const requiredIncome = useMemo(() => result.monthly / 0.5, [result.monthly]);
  const totalCashNeeded = useMemo(
    () => result.downPayment + stampDuty + effectiveAgentFee + lawyerFee + renovationCost,
    [result.downPayment, stampDuty, effectiveAgentFee, lawyerFee, renovationCost],
  );

  const waHref = getDefaultWhatsAppUrl();

  const clampPrice = (value: number) => {
    if (!Number.isFinite(value)) return PRICE_MIN;
    return Math.min(PRICE_MAX, Math.max(PRICE_MIN, value));
  };

  const syncPrice = (nextPrice: number) => {
    const clampedPrice = clampPrice(nextPrice);
    setPrice(clampedPrice);
    setPriceInput(Math.round(clampedPrice).toLocaleString("en-HK"));
  };

  const commitPriceInput = () => {
    const numericText = priceInput.replace(/\D/g, "");
    if (!numericText) {
      setPriceInput(Math.round(price).toLocaleString("en-HK"));
      return;
    }

    const parsed = Number(numericText);
    if (!Number.isFinite(parsed)) {
      setPriceInput(Math.round(price).toLocaleString("en-HK"));
      return;
    }

    syncPrice(parsed);
  };

  return (
    <div className="space-y-8">
      {/* ── Inputs ── */}
      <div className="rounded-2xl border bg-white p-6 md:p-8">
        <h2 className="text-xl font-semibold text-neutral-900 md:text-2xl">輸入資料</h2>

        <div className="mt-6 space-y-7">
          {/* Property price */}
          <div>
            <div className="flex items-end justify-between gap-2">
              <Label>樓價</Label>
              <span className="text-2xl font-semibold text-neutral-900 md:text-3xl">
                {hkd(price)}
              </span>
            </div>
            <input
              type="text"
              inputMode="numeric"
              value={priceInput}
              onChange={(e) => {
                const numericText = e.target.value.replace(/\D/g, "");
                setPriceInput(numericText);
              }}
              onFocus={() => setPriceInput((prev) => prev.replace(/\D/g, ""))}
              onBlur={commitPriceInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitPriceInput();
                }
              }}
              className="mt-2 h-12 w-full rounded-lg border px-4 text-lg"
            />
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={price}
              onChange={(e) => syncPrice(Number(e.target.value))}
              className="mt-2 w-full accent-amber-600"
            />
            <div className="mt-1 flex justify-between text-xs text-neutral-400">
              <span>{hkd(PRICE_MIN)}</span>
              <span>{hkd(PRICE_MAX)}</span>
            </div>
          </div>

          {/* Down payment */}
          <div>
            <div className="flex items-end justify-between gap-2">
              <Label>首期比例</Label>
              <span className="text-base font-semibold text-neutral-700 md:text-lg">
                首期 {hkd(result.downPayment)} · 按揭 {hkd(result.principal)}
              </span>
            </div>
            <div className="mt-2">
              <PillGroup
                options={DOWN_PCT_OPTIONS}
                value={downPct}
                onChange={setDownPct}
                format={(v) => `${v}%`}
              />
            </div>
          </div>

          {/* Interest rate */}
          <div>
            <div className="flex items-end justify-between gap-2">
              <Label>年利率</Label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setRate((r) => Math.max(RATE_MIN, parseFloat((r - RATE_STEP).toFixed(2))))
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-lg border text-neutral-700 hover:bg-neutral-100"
                >
                  −
                </button>
                <span className="w-16 text-center text-xl font-semibold text-neutral-900 md:text-2xl">
                  {rate.toFixed(2)}%
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setRate((r) => Math.min(RATE_MAX, parseFloat((r + RATE_STEP).toFixed(2))))
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-lg border text-neutral-700 hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
            </div>
            <input
              type="range"
              min={RATE_MIN}
              max={RATE_MAX}
              step={RATE_STEP}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-2 w-full accent-amber-600"
            />
            <div className="mt-1 flex justify-between text-xs text-neutral-400">
              <span>{RATE_MIN}%</span>
              <span>{RATE_MAX}%</span>
            </div>
          </div>

          {/* Loan term */}
          <div>
            <Label>還款年期</Label>
            <div className="mt-2">
              <PillGroup
                options={TERM_OPTIONS}
                value={term}
                onChange={setTerm}
                format={(v) => `${v} 年`}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>代理佣金</Label>
              <input
                type="number"
                min={0}
                value={Math.round(effectiveAgentFee)}
                onChange={(e) => {
                  setAgentFeeManuallyChanged(true);
                  setAgentFee(Number(e.target.value) || 0);
                }}
                className="h-11 w-full rounded-lg border px-4 text-lg"
              />
            </div>
            <div>
              <Label>律師費</Label>
              <input
                type="number"
                min={0}
                value={Math.round(lawyerFee)}
                onChange={(e) => setLawyerFee(Number(e.target.value) || 0)}
                className="h-11 w-full rounded-lg border px-4 text-lg"
              />
            </div>
            <div>
              <Label>裝修費</Label>
              <input
                type="number"
                min={0}
                value={Math.round(renovationCost)}
                onChange={(e) => setRenovationCost(Number(e.target.value) || 0)}
                className="h-11 w-full rounded-lg border px-4 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="rounded-2xl border bg-white p-6 md:p-8">
        <h2 className="text-xl font-semibold text-neutral-900 md:text-2xl">計算結果</h2>

        {/* Monthly payment — hero number */}
        <div className="mt-5 rounded-xl bg-neutral-900 px-6 py-5 text-center text-white">
          <p className="text-sm text-neutral-400">每月供款</p>
          <p className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">
            {hkd(result.monthly)}
          </p>
          <p className="mt-1 text-sm text-neutral-400">
            年利率 {pct(rate)} · {term} 年 · 按揭 {hkd(result.principal)}
          </p>
        </div>

        {/* Stats grid */}
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-center">
          <p className="text-sm text-amber-700">每月入息要求（供款比率 50%）</p>
          <p className="mt-1 text-3xl font-semibold text-amber-900 md:text-4xl">{hkd(requiredIncome)}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="首期金額" value={hkd(result.downPayment)} />
          <StatCard label="印花稅（Scale 2）" value={hkd(stampDuty)} />
          <StatCard label="其他費用總和" value={hkd(otherFeesTotal)} />
          <StatCard label="總入場資金" value={hkd(totalCashNeeded)} highlight />
        </div>

        <p className="mt-2 text-sm text-neutral-500">印花稅按政府 Scale 2 估算</p>

        {/* Repayment breakdown bar */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-medium text-neutral-500">還款結構</p>
          <div className="flex h-4 w-full overflow-hidden rounded-full">
            <div
              className="bg-neutral-800"
              style={{ width: `${principalPct.toFixed(1)}%` }}
              title={`本金 ${principalPct.toFixed(1)}%`}
            />
            <div
              className="bg-amber-400"
              style={{ width: `${(100 - principalPct).toFixed(1)}%` }}
              title={`利息 ${(100 - principalPct).toFixed(1)}%`}
            />
          </div>
          <div className="mt-2 flex gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-neutral-800" />
              本金 {principalPct.toFixed(1)}%
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-400" />
              利息 {(100 - principalPct).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Stress test */}
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-amber-900">
                壓力測試結果（+2% 利率）
              </p>
              <p className="mt-0.5 text-xs text-amber-700">
                HKMA 要求借款人須通過利率上升 2% 的壓力測試
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-amber-800">
                {hkd(stressResult.monthly)}
              </p>
              <p className="text-xs text-amber-600">假設利率 {pct(rate + 2)} / 月</p>
            </div>
          </div>
          <div className="mt-3 border-t border-amber-200 pt-3 text-xs text-amber-700">
            供款比率（壓測）：月供佔月入建議不超過 50%，即月入最少約{" "}
            <span className="font-semibold">
              {hkd(stressResult.monthly * 2)}
            </span>{" "}
            才通過壓測基準。
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-neutral-400">
          * 以上計算僅供參考，實際按揭條款、利率及批核條件視乎個人信貸狀況及銀行政策而定。
        </p>
      </div>

      {/* ── CTA ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-8">
        <div className="md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900">
              需要延伸資料進一步比較？
            </h3>
            <p className="mt-2 text-sm text-neutral-700">
              計算機可作初步估算，實際按揭成數與銀行條款可再配合樓盤資料一併比較。
            </p>
            <ul className="mt-3 space-y-1 text-sm text-neutral-700">
              <li>✓ 對照不同首期比例與月供變化</li>
              <li>✓ 檢視利率變動對現金流影響</li>
              <li>✓ 將供款結果套入樓盤比較流程</li>
            </ul>
          </div>
          <div className="mt-6 flex flex-col gap-3 md:mt-0 md:shrink-0">
            <Link
              href="/get-latest-price"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-neutral-900 px-5 text-sm font-semibold text-white hover:bg-neutral-700"
            >
              索取相關資料
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-lg border px-5 text-sm font-semibold text-neutral-900 hover:bg-amber-100"
            >
              WhatsApp 查詢
            </a>
            <Link
              href="/projects"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-amber-300 bg-white px-5 text-sm font-semibold text-amber-800 hover:bg-amber-50"
            >
              查看更多樓盤數據
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
