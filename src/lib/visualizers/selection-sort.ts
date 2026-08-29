import type { VisualizationStep } from '@/types/algorithm';

export function generateSelectionSortSteps(input: number[]): VisualizationStep[] {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const n = arr.length;
  const sorted: number[] = [];

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description:
      'Starting Selection Sort. We find the minimum element in each pass and place it at the front.',
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [...sorted],
      description: `Pass ${i + 1}: assuming arr[${i}] = ${arr[i]} is the minimum.`,
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, minIdx],
        swapping: [],
        sorted: [...sorted],
        description: `Comparing arr[${j}] = ${arr[j]} with current minimum arr[${minIdx}] = ${arr[minIdx]}.`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          comparing: [minIdx],
          swapping: [],
          sorted: [...sorted],
          description: `New minimum found: arr[${minIdx}] = ${arr[minIdx]}.`,
        });
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted],
        description: `Swapping arr[${i}] and arr[${minIdx}]. ${arr[i]} placed in correct position.`,
      });
    }

    sorted.push(i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      description: `Pass ${i + 1} done. ${arr[i]} is now sorted.`,
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    description: 'Selection Sort complete!',
  });

  return steps;
}
