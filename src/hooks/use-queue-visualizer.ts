'use client';

import { useState, useCallback } from 'react';
import { executeQueueEnqueue, executeQueueDequeue, executeQueueFront } from '@/lib/data-structures';

export function useQueueVisualizer(initialItems: number[] = [20, 35, 70]) {
  const [items, setItems] = useState<number[]>(initialItems);
  const [operationLog, setOperationLog] = useState<string>(
    'Queue initialized with initial elements'
  );
  const [frontPeeked, setFrontPeeked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('45');

  const enqueue = useCallback(
    (value: number) => {
      setFrontPeeked(false);
      setError(null);
      const res = executeQueueEnqueue(items, value);
      if (res.error) {
        setError(res.error);
      } else {
        setItems(res.nextItems);
      }
      setOperationLog(res.action);
    },
    [items]
  );

  const dequeue = useCallback(() => {
    setFrontPeeked(false);
    setError(null);
    const res = executeQueueDequeue(items);
    if (res.error) {
      setError(res.error);
    } else {
      setItems(res.nextItems);
    }
    setOperationLog(res.action);
  }, [items]);

  const front = useCallback(() => {
    setError(null);
    const res = executeQueueFront(items);
    if (res.error) {
      setError(res.error);
      setFrontPeeked(false);
    } else {
      setFrontPeeked(true);
    }
    setOperationLog(res.action);
  }, [items]);

  const clear = useCallback(() => {
    setItems([]);
    setFrontPeeked(false);
    setError(null);
    setOperationLog('Queue cleared (0 elements)');
  }, []);

  const handleEnqueueSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const num = parseInt(inputValue.trim(), 10);
      if (isNaN(num) || num < 1 || num > 999) {
        setError('Enter a number between 1 and 999');
        return;
      }
      enqueue(num);
      setInputValue(String(Math.floor(Math.random() * 90) + 10));
    },
    [inputValue, enqueue]
  );

  return {
    items,
    operationLog,
    frontPeeked,
    error,
    inputValue,
    setInputValue,
    enqueue,
    dequeue,
    front,
    clear,
    handleEnqueueSubmit,
  };
}
