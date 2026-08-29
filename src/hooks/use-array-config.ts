'use client';

import { useState, useCallback } from 'react';
import {
  generateRandomArray,
  generateReversedArray,
  generateNearlySortedArray,
  generateFewUniqueArray,
} from '@/lib/visualizers';

export type PresetType = 'random' | 'reversed' | 'nearly-sorted' | 'few-unique';

export function parseCustomArrayInput(input: string): { numbers: number[]; error?: string } {
  if (!input.trim()) {
    return { numbers: [] };
  }

  const parsed = input
    .split(/[, ]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map(Number);

  if (parsed.some((n) => isNaN(n) || n <= 0 || n > 999)) {
    return { numbers: [], error: 'Enter positive numbers between 1 and 999' };
  }

  if (parsed.length < 3) {
    return { numbers: [], error: 'Provide at least 3 numbers' };
  }

  if (parsed.length > 30) {
    return { numbers: [], error: 'Maximum 30 numbers allowed' };
  }

  return { numbers: parsed };
}

export function useArrayConfig(onArrayChange: (arr: number[]) => void) {
  const [customInput, setCustomInput] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [arraySize, setArraySize] = useState<number>(12);

  const handlePreset = useCallback(
    (type: PresetType, size = arraySize) => {
      let arr: number[] = [];
      if (type === 'random') arr = generateRandomArray(size);
      else if (type === 'reversed') arr = generateReversedArray(size);
      else if (type === 'nearly-sorted') arr = generateNearlySortedArray(size);
      else if (type === 'few-unique') arr = generateFewUniqueArray(size);

      setInputError(null);
      onArrayChange(arr);
    },
    [arraySize, onArrayChange]
  );

  const handleSizeChange = useCallback(
    (newSize: number) => {
      setArraySize(newSize);
      handlePreset('random', newSize);
    },
    [handlePreset]
  );

  const handleInputChange = useCallback(
    (val: string) => {
      setCustomInput(val);
      if (inputError) setInputError(null);
    },
    [inputError]
  );

  const handleApplyCustom = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const { numbers, error } = parseCustomArrayInput(customInput);
      if (error) {
        setInputError(error);
        return;
      }
      if (numbers.length > 0) {
        setInputError(null);
        setCustomInput('');
        onArrayChange(numbers);
      }
    },
    [customInput, onArrayChange]
  );

  return {
    customInput,
    inputError,
    arraySize,
    handlePreset,
    handleSizeChange,
    handleInputChange,
    handleApplyCustom,
  };
}
