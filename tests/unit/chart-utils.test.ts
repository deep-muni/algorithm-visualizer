import { describe, it, expect } from 'vitest';
import { getBarColor, calculateBarHeightPct } from '@/lib/chart-utils';
import { getLegendItems, groupAlgorithms } from '@/lib/algorithm-utils';
import { COLOR_TOKENS } from '@/config/colors';
import { algorithms } from '@/data';

describe('Chart Utilities', () => {
  it('assigns sorted color token to sorted elements', () => {
    expect(getBarColor(2, [], [], [2])).toBe(COLOR_TOKENS.sorted);
  });

  it('assigns swap color token to swapping elements', () => {
    expect(getBarColor(1, [], [1, 2], [])).toBe(COLOR_TOKENS.swap);
  });

  it('assigns compare color token to comparing elements', () => {
    expect(getBarColor(0, [0, 1], [], [])).toBe(COLOR_TOKENS.compare);
  });

  it('assigns default color token to untouched elements', () => {
    expect(getBarColor(5, [0, 1], [2, 3], [4])).toBe(COLOR_TOKENS.default);
  });

  it('calculates bar height percentage safely with zero max', () => {
    expect(calculateBarHeightPct(0, 0)).toBe(6);
    expect(calculateBarHeightPct(50, 100)).toBe(50);
  });
});

describe('Algorithm Utilities', () => {
  it('returns appropriate legend items for sorting', () => {
    const items = getLegendItems('sorting');
    expect(items.length).toBe(4);
    expect(items.map((i) => i.label)).toEqual(['Unsorted', 'Comparing', 'Swapping', 'Sorted']);
    expect(items.map((i) => i.color)).toEqual([
      COLOR_TOKENS.default,
      COLOR_TOKENS.compare,
      COLOR_TOKENS.swap,
      COLOR_TOKENS.sorted,
    ]);
  });

  it('returns appropriate legend items for searching', () => {
    const items = getLegendItems('searching');
    expect(items.length).toBe(3);
    expect(items.map((i) => i.label)).toEqual([
      'Array Element',
      'Comparing / Inspecting',
      'Target Found',
    ]);
    expect(items.map((i) => i.color)).toEqual([
      COLOR_TOKENS.default,
      COLOR_TOKENS.compare,
      COLOR_TOKENS.sorted,
    ]);
  });

  it('groups algorithms into sorting and searching categories', () => {
    const grouped = groupAlgorithms(algorithms);
    expect(grouped.sorting.length).toBe(6);
    expect(grouped.searching.length).toBe(2);
  });
});
