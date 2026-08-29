import { describe, it, expect } from 'vitest';
import {
  generateBubbleSortSteps,
  generateSelectionSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateHeapSortSteps,
  generateLinearSearchSteps,
  generateBinarySearchSteps,
  generateSteps,
} from '@/lib/visualizers';

const sampleArray = [64, 34, 25, 12, 22, 11, 90];
const expectedSorted = [11, 12, 22, 25, 34, 64, 90];

describe('Sorting Algorithm Step Generators', () => {
  it('Bubble Sort produces correct sorted output on final step', () => {
    const steps = generateBubbleSortSteps(sampleArray);
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.array).toEqual(expectedSorted);
    expect(lastStep.sorted.length).toBe(sampleArray.length);
  });

  it('Selection Sort produces correct sorted output on final step', () => {
    const steps = generateSelectionSortSteps(sampleArray);
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.array).toEqual(expectedSorted);
    expect(lastStep.sorted.length).toBe(sampleArray.length);
  });

  it('Insertion Sort produces correct sorted output on final step', () => {
    const steps = generateInsertionSortSteps(sampleArray);
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.array).toEqual(expectedSorted);
    expect(lastStep.sorted.length).toBe(sampleArray.length);
  });

  it('Merge Sort produces correct sorted output on final step', () => {
    const steps = generateMergeSortSteps(sampleArray);
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.array).toEqual(expectedSorted);
    expect(lastStep.sorted.length).toBe(sampleArray.length);
  });

  it('Quick Sort produces correct sorted output on final step', () => {
    const steps = generateQuickSortSteps(sampleArray);
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.array).toEqual(expectedSorted);
    expect(lastStep.sorted.length).toBe(sampleArray.length);
  });

  it('Heap Sort produces correct sorted output on final step', () => {
    const steps = generateHeapSortSteps(sampleArray);
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.array).toEqual(expectedSorted);
    expect(lastStep.sorted.length).toBe(sampleArray.length);
  });

  it('handles already sorted arrays gracefully', () => {
    const steps = generateBubbleSortSteps([1, 2, 3, 4, 5]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1].array).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles reverse sorted arrays gracefully', () => {
    const steps = generateQuickSortSteps([5, 4, 3, 2, 1]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1].array).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles arrays with duplicate values', () => {
    const steps = generateMergeSortSteps([3, 1, 4, 1, 5, 9, 2, 6, 5]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1].array).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });
});

describe('Searching Algorithm Step Generators', () => {
  it('Linear Search finds existing target element', () => {
    const target = 22;
    const steps = generateLinearSearchSteps(sampleArray, target);
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.found).toBe(sampleArray.indexOf(target));
  });

  it('Linear Search handles missing target element', () => {
    const steps = generateLinearSearchSteps(sampleArray, 999);
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.found).toBeUndefined();
  });

  it('Binary Search finds existing target in sorted array', () => {
    const sorted = [10, 20, 30, 40, 50, 60, 70];
    const target = 40;
    const steps = generateBinarySearchSteps(sorted, target);
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.found).toBe(3);
  });

  it('Binary Search handles missing target element', () => {
    const sorted = [10, 20, 30, 40, 50, 60, 70];
    const steps = generateBinarySearchSteps(sorted, 99);
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.found).toBeUndefined();
  });
});

describe('Step Generator Factory', () => {
  it('dispatches sorting algorithms by ID', () => {
    const bubbleSteps = generateSteps('bubble-sort', [3, 2, 1]);
    expect(bubbleSteps.length).toBeGreaterThan(0);
    expect(bubbleSteps[bubbleSteps.length - 1].array).toEqual([1, 2, 3]);
  });

  it('dispatches searching algorithms by ID', () => {
    const linearSteps = generateSteps('linear-search', [10, 20, 30]);
    expect(linearSteps.length).toBeGreaterThan(0);
  });
});
