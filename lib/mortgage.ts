export type MortgageInput = {
  price: number;
  downPaymentPct: number;
  annualRate: number;
  years: number;
};

export function calcMortgageMonthly({
  price,
  downPaymentPct,
  annualRate,
  years,
}: MortgageInput): number {
  const principal = price * (1 - downPaymentPct / 100);
  const n = years * 12;
  const r = annualRate / 100 / 12;

  if (n <= 0 || principal <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function parseHkdPrice(priceText: string): number {
  const cleaned = priceText.replace(/[^0-9.]/g, "");
  return Number(cleaned) || 0;
}

export function formatHkd(value: number): string {
  return `HK$${Math.round(value).toLocaleString("en-HK")}`;
}
