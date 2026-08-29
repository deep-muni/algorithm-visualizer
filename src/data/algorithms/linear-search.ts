import type { AlgorithmInfo } from '@/types/algorithm';

export const linearSearchInfo: AlgorithmInfo = {
  id: 'linear-search',
  name: 'Linear Search',
  category: 'searching',
  shortDescription:
    'Sequentially checks each element of the list until a match is found or the list ends.',
  description:
    'Linear Search sequentially checks each element in the list from left to right until the target value is found or the entire list has been traversed. It requires no prior sorting and works on any collection, but has linear O(n) time complexity in the average and worst cases.',
  complexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
    space: 'O(1)',
  },
  code: {
    typescript: `function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    java: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    python: `def linear_search(arr: list[int], target: int) -> int:
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
  },
};
