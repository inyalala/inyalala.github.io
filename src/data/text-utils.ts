export function fitAtWord(text: string, maxLen = 155, ellipsis = ''): string {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const budget = Math.max(1, maxLen - ellipsis.length);
  const sliced = clean.slice(0, budget).replace(/\s+\S*$/, '').replace(/[,;:\-]+$/, '').trim();
  const base = sliced || clean.slice(0, budget).trim();
  return ellipsis ? `${base}${ellipsis}` : base;
}
