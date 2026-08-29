import type { VisualizationStep } from '@/types/algorithm';

export function generateInsertionSortSteps(input: number[]): VisualizationStep[] {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const n = arr.length;

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [0],
    description: 'Starting Insertion Sort. The first element is trivially sorted.',
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: Array.from({ length: i }, (_, k) => k),
      description: `Picking arr[${i}] = ${key} to insert into the sorted portion.`,
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: Array.from({ length: i }, (_, k) => k),
        description: `arr[${j}] = ${arr[j]} > ${key}, shifting it right.`,
      });

      arr[j + 1] = arr[j];
      j--;

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [j + 1, j + 2],
        sorted: Array.from({ length: i }, (_, k) => k),
        description: `Shifted ${arr[j + 1]} to position ${j + 2}.`,
      });
    }

    arr[j + 1] = key;
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      description: `Inserted ${key} at position ${j + 1}. Sorted portion grows to ${i + 1} elements.`,
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    description: 'Insertion Sort complete!',
  });

  return steps;
}
