import type { AlgorithmCategory, AlgorithmInfo } from '@/types/algorithm';

export interface LegendItem {
  color: string;
  label: string;
}

export function getLegendItems(category: AlgorithmCategory): LegendItem[] {
  if (category === 'searching') {
    return [
      { color: 'var(--color-indigo)', label: 'Array Element' },
      { color: '#fbbf24', label: 'Comparing / Inspecting' },
      { color: '#34d399', label: 'Target Found' },
    ];
  }
  return [
    { color: 'var(--color-indigo)', label: 'Unsorted' },
    { color: '#fbbf24', label: 'Comparing' },
    { color: '#f87171', label: 'Swapping' },
    { color: '#34d399', label: 'Sorted' },
  ];
}

export function groupAlgorithms(algorithmsList: AlgorithmInfo[]) {
  return {
    sorting: algorithmsList.filter((a) => a.category === 'sorting'),
    searching: algorithmsList.filter((a) => a.category === 'searching'),
  };
}
