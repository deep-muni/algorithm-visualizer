import { describe, it, expect } from 'vitest';
import { getBarColor, calculateBarHeightPct } from '@/lib/chart-utils';
import { getLegendItems, groupAlgorithms } from '@/lib/algorithm-utils';
import { algorithms } from '@/data';

describe('Chart Utilities', () => {
  it('assigns green color to sorted elements', () => {
    expect(getBarColor(2, [], [], [2])).toBe('#34d399');
  });

  it('assigns coral color to swapping elements', () => {
    expect(getBarColor(1, [], [1, 2], [])).toBe('#f87171');
  });

  it('assigns amber color to comparing elements', () => {
    expect(getBarColor(0, [0, 1], [], [])).toBe('#fbbf24');
  });

  it('assigns default indigo color to untouched elements', () => {
    expect(getBarColor(5, [0, 1], [2, 3], [4])).toBe('var(--color-indigo)');
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
  });

  it('returns appropriate legend items for searching', () => {
    const items = getLegendItems('searching');
    expect(items.length).toBe(3);
    expect(items.map((i) => i.label)).toEqual([
      'Array Element',
      'Comparing / Inspecting',
      'Target Found',
    ]);
  });

  it('groups algorithms into sorting and searching categories', () => {
    const grouped = groupAlgorithms(algorithms);
    expect(grouped.sorting.length).toBe(6);
    expect(grouped.searching.length).toBe(2);
  });
});
