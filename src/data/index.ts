import type {
  AlgorithmInfo,
  AlgorithmId,
  DataStructureInfo,
  DataStructureId,
} from '@/types/algorithm';

import { bubbleSortInfo } from './sorting/bubble-sort';
import { selectionSortInfo } from './sorting/selection-sort';
import { insertionSortInfo } from './sorting/insertion-sort';
import { mergeSortInfo } from './sorting/merge-sort';
import { quickSortInfo } from './sorting/quick-sort';
import { heapSortInfo } from './sorting/heap-sort';

import { linearSearchInfo } from './searching/linear-search';
import { binarySearchInfo } from './searching/binary-search';

import { stackData } from './data-structures/stack';
import { queueData } from './data-structures/queue';
import { singlyLinkedListData } from './data-structures/singly-linked-list';
import { doublyLinkedListData } from './data-structures/doubly-linked-list';

export const bubbleSort = bubbleSortInfo;
export const selectionSort = selectionSortInfo;
export const insertionSort = insertionSortInfo;
export const mergeSort = mergeSortInfo;
export const quickSort = quickSortInfo;
export const heapSort = heapSortInfo;

export const linearSearch = linearSearchInfo;
export const binarySearch = binarySearchInfo;

export const sortingAlgorithms: AlgorithmInfo[] = [
  bubbleSortInfo,
  selectionSortInfo,
  insertionSortInfo,
  mergeSortInfo,
  quickSortInfo,
  heapSortInfo,
];

export const searchingAlgorithms: AlgorithmInfo[] = [linearSearchInfo, binarySearchInfo];

export const algorithms: AlgorithmInfo[] = [...sortingAlgorithms, ...searchingAlgorithms];

export const dataStructures: DataStructureInfo[] = [
  stackData,
  queueData,
  singlyLinkedListData,
  doublyLinkedListData,
];

export const algorithmMap: Record<AlgorithmId, AlgorithmInfo> = {
  'bubble-sort': bubbleSortInfo,
  'selection-sort': selectionSortInfo,
  'insertion-sort': insertionSortInfo,
  'merge-sort': mergeSortInfo,
  'quick-sort': quickSortInfo,
  'heap-sort': heapSortInfo,
  'linear-search': linearSearchInfo,
  'binary-search': binarySearchInfo,
};

export const dataStructureMap: Record<DataStructureId, DataStructureInfo> = {
  stack: stackData,
  queue: queueData,
  'singly-linked-list': singlyLinkedListData,
  'doubly-linked-list': doublyLinkedListData,
};
