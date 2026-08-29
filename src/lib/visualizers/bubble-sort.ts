import type { VisualizationStep } from '@/types/algorithm';

export function generateBubbleSortSteps(input: number[]): VisualizationStep[] {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const n = arr.length;
  const sorted: number[] = [];

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description: 'Starting Bubble Sort. We will repeatedly compare adjacent elements.',
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        description: `Comparing arr[${j}] = ${arr[j]} and arr[${j + 1}] = ${arr[j + 1]}.`,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          description: `${arr[j + 1]} > ${arr[j]}, swapping them.`,
        });
      }
    }

    sorted.unshift(n - 1 - i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      description: `Pass ${i + 1} complete. Element ${arr[n - 1 - i]} is now in its correct position.`,
    });

    if (!swapped) {
      for (let k = 0; k < n - 1 - i; k++) sorted.push(k);
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k),
        description: 'No swaps occurred — array is already sorted!',
      });
      break;
    }
  }

  if (sorted.length < n) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: n }, (_, k) => k),
      description: 'Bubble Sort complete!',
    });
  }

  return steps;
}
