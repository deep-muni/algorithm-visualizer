export type AlgorithmCategory = 'sorting' | 'searching';

export type SortingAlgorithmId =
  | 'bubble-sort'
  | 'selection-sort'
  | 'insertion-sort'
  | 'merge-sort'
  | 'quick-sort'
  | 'heap-sort';

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

/** A single step produced by an algorithm visualizer */
export interface VisualizationStep {
  /** Current array state at this step */
  array: number[];
  /** Indices being compared / accessed */
  comparing: number[];
  /** Indices being swapped */
  swapping: number[];
  /** Indices already in their final sorted position */
  sorted: number[];
  /** Index found (for search algorithms) */
  found?: number;
  /** Description of what's happening at this step */
  description: string;
}
