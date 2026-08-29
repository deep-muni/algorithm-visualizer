import { COLOR_TOKENS } from '@/config/colors';

export function getBarColor(
  index: number,
  comparing: number[],
  swapping: number[],
  sorted: number[]
): string {
  if (sorted.includes(index)) return COLOR_TOKENS.sorted;
  if (swapping.includes(index)) return COLOR_TOKENS.swap;
  if (comparing.includes(index)) return COLOR_TOKENS.compare;
  return COLOR_TOKENS.default;
}

export function calculateBarHeightPct(value: number, max: number): number {
  const safeMax = Math.max(max, 1);
  return Math.max((value / safeMax) * 100, 6);
}
