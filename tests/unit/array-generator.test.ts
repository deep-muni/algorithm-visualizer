import { describe, it, expect } from 'vitest';
import {
  generateRandomArray,
  generateReversedArray,
  generateNearlySortedArray,
  generateFewUniqueArray,
} from '@/lib/visualizers';
import { parseCustomArrayInput } from '@/hooks/use-array-config';

describe('Array Generation Presets', () => {
  it('generates random array with default size', () => {
    const arr = generateRandomArray(12);
    expect(arr.length).toBe(12);
    expect(arr.every((n) => n >= 5 && n <= 100)).toBe(true);
  });

  it('generates reversed array in strictly descending order', () => {
    const arr = generateReversedArray(8);
    expect(arr.length).toBe(8);
    for (let i = 0; i < arr.length - 1; i++) {
      expect(arr[i]).toBeGreaterThanOrEqual(arr[i + 1]);
    }
  });

  it('generates nearly sorted array with specified size', () => {
    const arr = generateNearlySortedArray(10);
    expect(arr.length).toBe(10);
  });

  it('generates array with few unique values (duplicates)', () => {
    const arr = generateFewUniqueArray(16);
    expect(arr.length).toBe(16);
    const uniqueValues = new Set(arr);
    expect(uniqueValues.size).toBeLessThanOrEqual(5);
  });
});

describe('Custom Array Input Parser', () => {
  it('parses valid comma-separated numbers', () => {
    const result = parseCustomArrayInput('10, 25, 30, 45');
    expect(result.error).toBeUndefined();
    expect(result.numbers).toEqual([10, 25, 30, 45]);
  });

  it('parses valid space-separated numbers', () => {
    const result = parseCustomArrayInput('5 12 88 99');
    expect(result.error).toBeUndefined();
    expect(result.numbers).toEqual([5, 12, 88, 99]);
  });

  it('rejects input with fewer than 3 numbers', () => {
    const result = parseCustomArrayInput('10, 20');
    expect(result.error).toBe('Provide at least 3 numbers');
    expect(result.numbers).toEqual([]);
  });

  it('rejects input with non-numeric values', () => {
    const result = parseCustomArrayInput('10, abc, 30');
    expect(result.error).toBe('Enter positive numbers between 1 and 999');
  });

  it('rejects numbers outside the 1-999 range', () => {
    const result = parseCustomArrayInput('10, 1500, 30');
    expect(result.error).toBe('Enter positive numbers between 1 and 999');
  });

  it('handles empty input gracefully', () => {
    const result = parseCustomArrayInput('   ');
    expect(result.error).toBeUndefined();
    expect(result.numbers).toEqual([]);
  });
});
