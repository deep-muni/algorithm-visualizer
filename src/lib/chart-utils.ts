export function getBarColor(
  index: number,
  comparing: number[],
  swapping: number[],
  sorted: number[]
): string {
  if (sorted.includes(index)) return '#34d399';
  if (swapping.includes(index)) return '#f87171';
  if (comparing.includes(index)) return '#fbbf24';
  return 'var(--color-indigo)';
}

export function calculateBarHeightPct(value: number, max: number): number {
  const safeMax = Math.max(max, 1);
  return Math.max((value / safeMax) * 100, 6);
}
