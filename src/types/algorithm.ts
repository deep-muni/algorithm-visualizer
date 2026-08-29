export type AlgorithmCategory = 'sorting' | 'searching';

export type SortingAlgorithmId =
  'bubble-sort' | 'selection-sort' | 'insertion-sort' | 'merge-sort' | 'quick-sort' | 'heap-sort';

export type SearchingAlgorithmId = 'linear-search' | 'binary-search';

export type AlgorithmId = SortingAlgorithmId | SearchingAlgorithmId;

export type CodeLanguage = 'typescript' | 'java' | 'python';

export interface ComplexityInfo {
  best: string;
  average: string;
  worst: string;
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

export interface VisualizationStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  found?: number;
  description: string;
}
