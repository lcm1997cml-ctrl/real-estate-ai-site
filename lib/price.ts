export function formatPrice(num?: number | null) {
  if (!num) return "-";
  return `HK$${num.toLocaleString()}`;
}

export function formatPSF(num?: number | null) {
  if (!num) return "-";
  return `HK$${num.toLocaleString()} / 呎`;
}

export function parseNumber(value: string | number | null | undefined): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (!value) return 0;
  const cleaned = String(value).replace(/[^0-9.]/g, "");
  return Number(cleaned) || 0;
}
