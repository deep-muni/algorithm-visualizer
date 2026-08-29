import type { VisualizationStep } from '@/types/algorithm';

export function generateBinarySearchSteps(input: number[], target?: number): VisualizationStep[] {
  const arr = [...input].sort((a, b) => a - b);
  const steps: VisualizationStep[] = [];
  const searchTarget = target !== undefined ? target : (arr[Math.floor(arr.length / 2)] ?? arr[0]);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description: `Starting Binary Search for target value ${searchTarget} on sorted array.`,
  });

  let low = 0;
  let high = arr.length - 1;
  let foundIndex = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    steps.push({
      array: [...arr],
      comparing: [mid, low, high],
      swapping: [],
      sorted: [],
      description: `Searching interval [${low}..${high}], inspecting middle index ${mid} (value = ${arr[mid]}).`,
    });

    if (arr[mid] === searchTarget) {
      foundIndex = mid;
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [mid],
        found: mid,
        description: `Target ${searchTarget} found at index ${mid}!`,
      });
      break;
    } else if (arr[mid] < searchTarget) {
      steps.push({
        array: [...arr],
        comparing: [mid],
        swapping: [],
        sorted: [],
        description: `arr[${mid}] = ${arr[mid]} < ${searchTarget}. Narrowing search to right half [${mid + 1}..${high}].`,
      });
      low = mid + 1;
    } else {
      steps.push({
        array: [...arr],
        comparing: [mid],
        swapping: [],
        sorted: [],
        description: `arr[${mid}] = ${arr[mid]} > ${searchTarget}. Narrowing search to left half [${low}..${mid - 1}].`,
      });
      high = mid - 1;
    }
  }

  if (foundIndex === -1) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      description: `Target ${searchTarget} not found in the array.`,
    });
  }

  return steps;
}
