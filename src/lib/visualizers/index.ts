import type { AlgorithmId, VisualizationStep } from '@/types/algorithm';
import { generateBubbleSortSteps } from './bubble-sort';
import { generateSelectionSortSteps } from './selection-sort';
import { generateInsertionSortSteps } from './insertion-sort';
import { generateMergeSortSteps } from './merge-sort';
import { generateQuickSortSteps } from './quick-sort';
import { generateHeapSortSteps } from './heap-sort';

type StepGenerator = (input: number[]) => VisualizationStep[];

const generators: Partial<Record<AlgorithmId, StepGenerator>> = {
  'bubble-sort': generateBubbleSortSteps,
  'selection-sort': generateSelectionSortSteps,
  'insertion-sort': generateInsertionSortSteps,
  'merge-sort': generateMergeSortSteps,
  'quick-sort': generateQuickSortSteps,
  'heap-sort': generateHeapSortSteps,
};

export function generateSteps(id: AlgorithmId, input: number[]): VisualizationStep[] {
  const generator = generators[id];
  if (!generator) throw new Error(`No visualizer found for algorithm: ${id}`);
  return generator(input);
}

export const DEFAULT_ARRAY = [64, 34, 25, 12, 22, 11, 90];

export function generateRandomArray(size = 12, max = 95, min = 10): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

export function generateReversedArray(size = 12): number[] {
  const step = Math.floor(90 / size);
  return Array.from({ length: size }, (_, i) => 95 - i * step);
}

export function generateNearlySortedArray(size = 12): number[] {
  const step = Math.floor(85 / size);
  const arr = Array.from({ length: size }, (_, i) => 10 + i * step);
  if (arr.length > 3) {
    const temp = arr[2];
    arr[2] = arr[3];
    arr[3] = temp;
  }
  if (arr.length > 7) {
    const temp = arr[6];
    arr[6] = arr[7];
    arr[7] = temp;
  }
  return arr;
}

export function generateFewUniqueArray(size = 12): number[] {
  const pool = [15, 35, 60, 85];
  return Array.from({ length: size }, () => pool[Math.floor(Math.random() * pool.length)]);
}
