import type { AlgorithmInfo } from '@/types/algorithm';

export const binarySearchInfo: AlgorithmInfo = {
  id: 'binary-search',
  name: 'Binary Search',
  category: 'searching',
  shortDescription: 'Repeatedly divides the sorted search interval in half to locate the target.',
  description:
    'Binary Search works on sorted arrays by repeatedly comparing the target value to the middle element. If the target matches the middle element, its index is returned. If the target is smaller, search continues on the left half; if larger, on the right half. This halves the search space each step, achieving O(log n) time complexity.',
  complexity: {
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)',
    space: 'O(1)',
  },
  code: {
    typescript: `function binarySearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}`,
    java: `public static int binarySearch(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}`,
    python: `def binary_search(arr: list[int], target: int) -> int:
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1`,
  },
};
