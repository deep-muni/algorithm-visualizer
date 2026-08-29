'use client';

import { useState, useCallback } from 'react';
import { executeStackPush, executeStackPop, executeStackPeek } from '@/lib/data-structures';

export function useStackVisualizer(initialItems: number[] = [15, 42, 88]) {
  const [items, setItems] = useState<number[]>(initialItems);
  const [operationLog, setOperationLog] = useState<string>(
    'Stack initialized with initial elements'
  );
  const [peekedIndex, setPeekedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('50');

  const push = useCallback(
    (value: number) => {
      setPeekedIndex(null);
      setError(null);
      const res = executeStackPush(items, value);
      if (res.error) {
        setError(res.error);
      } else {
        setItems(res.nextItems);
      }
      setOperationLog(res.action);
    },
    [items]
  );

  const pop = useCallback(() => {
    setPeekedIndex(null);
    setError(null);
    const res = executeStackPop(items);
    if (res.error) {
      setError(res.error);
    } else {
      setItems(res.nextItems);
    }
    setOperationLog(res.action);
  }, [items]);

  const peek = useCallback(() => {
    setError(null);
    const res = executeStackPeek(items);
    if (res.error) {
      setError(res.error);
      setPeekedIndex(null);
    } else {
      setPeekedIndex(items.length - 1);
    }
    setOperationLog(res.action);
  }, [items]);

  const clear = useCallback(() => {
    setItems([]);
    setPeekedIndex(null);
    setError(null);
    setOperationLog('Stack cleared (0 elements)');
  }, []);

  const handlePushSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const num = parseInt(inputValue.trim(), 10);
      if (isNaN(num) || num < 1 || num > 999) {
        setError('Enter a number between 1 and 999');
        return;
      }
      push(num);
      setInputValue(String(Math.floor(Math.random() * 90) + 10));
    },
    [inputValue, push]
  );

  return {
    items,
    operationLog,
    peekedIndex,
    error,
    inputValue,
    setInputValue,
    push,
    pop,
    peek,
    clear,
    handlePushSubmit,
  };
}
