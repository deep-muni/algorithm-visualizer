export type AlgorithmCategory = 'sorting' | 'searching' | 'data-structures' | 'trees' | 'graphs';

export type SortingAlgorithmId =
  'bubble-sort' | 'selection-sort' | 'insertion-sort' | 'merge-sort' | 'quick-sort' | 'heap-sort';

export type SearchingAlgorithmId = 'linear-search' | 'binary-search';

export type DataStructureId = 'stack' | 'queue' | 'singly-linked-list' | 'doubly-linked-list';

export type AlgorithmId = SortingAlgorithmId | SearchingAlgorithmId;

export type ItemId = SortingAlgorithmId | SearchingAlgorithmId | DataStructureId;

export type CodeLanguage = 'typescript' | 'java' | 'python';

export interface ComplexityInfo {
  best: string;
  average: string;
  worst: string;
  space: string;
}

export interface DataStructureComplexity {
  access: string;
  search: string;
  insertion: string;
  deletion: string;
  space: string;
}

export interface AlgorithmCode {
  typescript: string;
  java: string;
  python: string;
}

export interface AlgorithmInfo {
  id: AlgorithmId;
  name: string;
  category: AlgorithmCategory;
  shortDescription: string;
  description: string;
  complexity: ComplexityInfo;
  stable?: boolean;
  inPlace?: boolean;
  code: AlgorithmCode;
}

export interface DataStructureInfo {
  id: DataStructureId;
  name: string;
  category: 'data-structures';
  shortDescription: string;
  description: string;
  complexity: DataStructureComplexity;
  code: AlgorithmCode;
}

export interface VisualizationStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  found?: number;
  description: string;
}
