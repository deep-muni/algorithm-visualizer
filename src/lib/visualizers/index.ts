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

export function generateRandomArray(size = 12, max = 95, min = 5): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}
