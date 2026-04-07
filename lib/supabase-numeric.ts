/** Supabase / Postgres numeric may arrive as string; normalize for price fields. */
export function parseDbNumeric(value: unknown): number {
  if (value == null) return 0;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string") {
    const n = Number(value.replace(/,/g, "").trim());
    return Number.isFinite(n) ? n : 0;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}
