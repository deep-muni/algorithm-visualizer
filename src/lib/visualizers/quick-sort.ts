import type { VisualizationStep } from '@/types/algorithm';

export function generateQuickSortSteps(input: number[]): VisualizationStep[] {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const n = arr.length;
  const sorted = new Set<number>();

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description: 'Starting Quick Sort. We pick a pivot and partition around it.',
  });

  function partition(low: number, high: number): number {
    const pivot = arr[high];

    steps.push({
      array: [...arr],
      comparing: [high],
      swapping: [],
      sorted: [...sorted],
      description: `Pivot selected: arr[${high}] = ${pivot}.`,
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        swapping: [],
        sorted: [...sorted],
        description: `Comparing arr[${j}] = ${arr[j]} with pivot ${pivot}.`,
      });

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            array: [...arr],
            comparing: [],
            swapping: [i, j],
            sorted: [...sorted],
            description: `arr[${j}] ≤ pivot, swapping arr[${i}] and arr[${j}].`,
          });
        }
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    sorted.add(i + 1);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [i + 1, high],
      sorted: [...sorted],
      description: `Placing pivot ${pivot} at its correct position ${i + 1}.`,
    });

    return i + 1;
  }

  function quickSort(low: number, high: number) {
    if (low < high) {
      const pivotIdx = partition(low, high);
      quickSort(low, pivotIdx - 1);
      quickSort(pivotIdx + 1, high);
    } else if (low === high) {
      sorted.add(low);
    }
  }

  quickSort(0, n - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    description: 'Quick Sort complete!',
  });

  return steps;
}
