import { bubbleSortInfo } from './algorithms/bubble-sort';
import { selectionSortInfo } from './algorithms/selection-sort';
import { insertionSortInfo } from './algorithms/insertion-sort';
import { mergeSortInfo } from './algorithms/merge-sort';
import { quickSortInfo } from './algorithms/quick-sort';
import { heapSortInfo } from './algorithms/heap-sort';
import type { AlgorithmId, AlgorithmInfo } from '@/types/algorithm';

export const algorithms: AlgorithmInfo[] = [
  bubbleSortInfo,
  selectionSortInfo,
  insertionSortInfo,
  mergeSortInfo,
  quickSortInfo,
  heapSortInfo,
];

export const algorithmMap: Record<AlgorithmId, AlgorithmInfo> = Object.fromEntries(
  algorithms.map((algo) => [algo.id, algo])
) as Record<AlgorithmId, AlgorithmInfo>;

export function getAlgorithmById(id: AlgorithmId): AlgorithmInfo | undefined {
  return algorithmMap[id];
}

export { bubbleSortInfo, selectionSortInfo, insertionSortInfo, mergeSortInfo, quickSortInfo, heapSortInfo };
