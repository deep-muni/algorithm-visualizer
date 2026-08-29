import type { VisualizationStep } from '@/types/algorithm';

export function generateMergeSortSteps(input: number[]): VisualizationStep[] {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const n = arr.length;
  const sorted = new Set<number>();

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description: 'Starting Merge Sort. Recursively dividing the array into halves.',
  });

  function merge(left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        swapping: [],
        sorted: [...sorted],
        description: `Merging: comparing ${leftArr[i]} and ${rightArr[j]}.`,
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i++];
      } else {
        arr[k] = rightArr[j++];
      }

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [...sorted],
        description: `Placed ${arr[k]} at position ${k}.`,
      });
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i++];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [...sorted],
        description: `Copying remaining left element ${arr[k]} to position ${k}.`,
      });
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j++];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [...sorted],
        description: `Copying remaining right element ${arr[k]} to position ${k}.`,
      });
      k++;
    }

    for (let idx = left; idx <= right; idx++) sorted.add(idx);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      description: `Merged segment [${left}..${right}] successfully.`,
    });
  }

  function mergeSort(left: number, right: number) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  }

  mergeSort(0, n - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    description: 'Merge Sort complete!',
  });

  return steps;
}
