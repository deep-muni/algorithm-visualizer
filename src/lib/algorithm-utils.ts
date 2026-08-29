import type { AlgorithmCategory, AlgorithmInfo } from '@/types/algorithm';
import { COLOR_TOKENS } from '@/config/colors';

export interface LegendItem {
  color: string;
  label: string;
}

export function getLegendItems(category: AlgorithmCategory): LegendItem[] {
  if (category === 'data-structures') {
    return [
      { color: COLOR_TOKENS.default, label: 'Primary Node (Top / Front / Head)' },
      { color: COLOR_TOKENS.compare, label: 'Inspected / Peeked' },
      { color: COLOR_TOKENS.surfaceLight, label: 'Element / Node' },
    ];
  }
  if (category === 'searching') {
    return [
      { color: COLOR_TOKENS.default, label: 'Array Element' },
      { color: COLOR_TOKENS.compare, label: 'Comparing / Inspecting' },
      { color: COLOR_TOKENS.sorted, label: 'Target Found' },
    ];
  }
  return [
    { color: COLOR_TOKENS.default, label: 'Unsorted' },
    { color: COLOR_TOKENS.compare, label: 'Comparing' },
    { color: COLOR_TOKENS.swap, label: 'Swapping' },
    { color: COLOR_TOKENS.sorted, label: 'Sorted' },
  ];
}

export function groupAlgorithms(algorithmsList: AlgorithmInfo[]) {
  return {
    sorting: algorithmsList.filter((a) => a.category === 'sorting'),
    searching: algorithmsList.filter((a) => a.category === 'searching'),
  };
}
