import type { AlgorithmInfo } from '@/types/algorithm';

export const selectionSortInfo: AlgorithmInfo = {
  id: 'selection-sort',
  name: 'Selection Sort',
  category: 'sorting',
  shortDescription: 'Finds the minimum element and places it at the beginning each pass.',
  description:
    'Selection Sort divides the array into two parts: a sorted subarray built from left to right and an unsorted subarray. In each iteration, the algorithm finds the minimum element from the unsorted part and moves it to the end of the sorted part. It performs at most O(n) swaps, making it useful when write operations are costly.',
  complexity: {
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
  },
  stable: false,
  inPlace: true,
  code: {
    typescript: `function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
    java: `public static int[] selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
    return arr;
}`,
    python: `def selection_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
  },
};
