import type { VisualizationStep } from '@/types/algorithm';

export function generateHeapSortSteps(input: number[]): VisualizationStep[] {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const n = arr.length;
  const sorted: number[] = [];

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description: 'Starting Heap Sort. First we build a max-heap from the array.',
  });

  function heapify(size: number, root: number) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      steps.push({
        array: [...arr],
        comparing: [largest, left],
        swapping: [],
        sorted: [...sorted],
        description: `Comparing parent arr[${largest}] = ${arr[largest]} with left child arr[${left}] = ${arr[left]}.`,
      });
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < size) {
      steps.push({
        array: [...arr],
        comparing: [largest, right],
        swapping: [],
        sorted: [...sorted],
        description: `Comparing largest arr[${largest}] = ${arr[largest]} with right child arr[${right}] = ${arr[right]}.`,
      });
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== root) {
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [root, largest],
        sorted: [...sorted],
        description: `Swapping arr[${root}] = ${arr[largest]} and arr[${largest}] = ${arr[root]} to maintain heap property.`,
      });
      heapify(size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [],
      description: `Heapifying subtree rooted at index ${i}.`,
    });
    heapify(n, i);
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description: 'Max-heap built. Now extracting elements one by one.',
  });

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    sorted.unshift(i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [0, i],
      sorted: [...sorted],
      description: `Moving max element ${arr[i]} to position ${i}.`,
    });
    heapify(i, 0);
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    description: 'Heap Sort complete!',
  });

  return steps;
}
