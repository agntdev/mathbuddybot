export function formatNumber(n: number): string {
  if (!isFinite(n)) return String(n);

  const fixed = n.toFixed(10);
  const trimmed = fixed.replace(/\.?0+$/, "");
  return trimmed;
}