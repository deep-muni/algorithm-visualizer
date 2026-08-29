import type { VisualizationStep } from '@/types/algorithm';

export function generateLinearSearchSteps(input: number[], target?: number): VisualizationStep[] {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const searchTarget = target !== undefined ? target : (arr[Math.floor(arr.length / 2)] ?? arr[0]);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description: `Starting Linear Search for target value ${searchTarget}.`,
  });

  let foundIndex = -1;

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [],
      description: `Checking index ${i}: arr[${i}] = ${arr[i]} ${arr[i] === searchTarget ? '==' : '!='} ${searchTarget}.`,
    });

    if (arr[i] === searchTarget) {
      foundIndex = i;
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [i],
        found: i,
        description: `Target ${searchTarget} found at index ${i}!`,
      });
      break;
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
