import type { AlgorithmInfo } from '@/types/algorithm';

export const insertionSortInfo: AlgorithmInfo = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  category: 'sorting',
  shortDescription:
    'Builds the sorted array one element at a time by inserting each into its correct position.',
  description:
    'Insertion Sort builds the final sorted array one element at a time. It takes each element from the unsorted part and finds its correct position within the sorted part by shifting larger elements to the right. It is efficient for small datasets and nearly-sorted data, and is the algorithm of choice for sorting small arrays in practice.',
  complexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
  },
  stable: true,
  inPlace: true,
  code: {
    typescript: `function insertionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    java: `public static int[] insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
    python: `def insertion_sort(arr: list[int]) -> list[int]:
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
  },
};
