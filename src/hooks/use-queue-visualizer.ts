'use client';

import { useState, useCallback, useEffect } from 'react';
import { executeQueueEnqueue, executeQueueDequeue, executeQueueFront } from '@/lib/data-structures';
import { soundEngine } from '@/lib/audio-synthesizer';

function getInitialItems(fallback: number[]): number[] {
  if (typeof window === 'undefined') return fallback;
  const params = new URLSearchParams(window.location.search);
  const itemsParam = params.get('items') || params.get('data');
  if (itemsParam) {
    const parsed = itemsParam
      .split(/[, ]+/)
      .map(Number)
      .filter((n) => !isNaN(n) && n > 0 && n <= 999);
    if (parsed.length > 0 && parsed.length <= 6) {
      return parsed;
    }
  }
  return fallback;
}

export function useQueueVisualizer(initialItems: number[] = [20, 35, 70]) {
  const [items, setItems] = useState<number[]>(() => getInitialItems(initialItems));
  const [operationLog, setOperationLog] = useState<string>(
    'Queue initialized with initial elements'
  );
  const [frontPeeked, setFrontPeeked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('45');
  const [isMuted, setIsMuted] = useState(() => soundEngine.isMuted());

  const enqueue = useCallback(
    (value: number) => {
      setFrontPeeked(false);
      setError(null);
      const res = executeQueueEnqueue(items, value);
      if (res.error) {
        setError(res.error);
        soundEngine.playError();
      } else {
        setItems(res.nextItems);
        soundEngine.playInsert(value);
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
      soundEngine.playError();
    } else {
      setItems(res.nextItems);
      soundEngine.playDelete();
    }
    setOperationLog(res.action);
  }, [items]);

  const front = useCallback(() => {
    setError(null);
    const res = executeQueueFront(items);
    if (res.error) {
      setError(res.error);
      setFrontPeeked(false);
      soundEngine.playError();
    } else {
      setFrontPeeked(true);
      soundEngine.playPeek();
    }
    setOperationLog(res.action);
  }, [items]);

  const clear = useCallback(() => {
    setItems([]);
    setFrontPeeked(false);
    setError(null);
    soundEngine.playDelete();
    setOperationLog('Queue cleared (0 elements)');
  }, []);

  const toggleSound = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  const handleEnqueueSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const num = parseInt(inputValue.trim(), 10);
      if (isNaN(num) || num < 1 || num > 999) {
        setError('Enter a number between 1 and 999');
        soundEngine.playError();
        return;
      }
      enqueue(num);
      setInputValue(String(Math.floor(Math.random() * 90) + 10));
    },
    [inputValue, enqueue]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        return;
      }

      if (e.code === 'KeyE') {
        e.preventDefault();
        const randomVal = Math.floor(Math.random() * 90) + 10;
        enqueue(randomVal);
      } else if (e.code === 'KeyD' || e.code === 'Backspace' || e.code === 'Delete') {
        e.preventDefault();
        dequeue();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        front();
      } else if (e.code === 'KeyC') {
        e.preventDefault();
        clear();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enqueue, dequeue, front, clear, toggleSound]);

  return {
    items,
    operationLog,
    frontPeeked,
    error,
    inputValue,
    isMuted,
    setInputValue,
    enqueue,
    dequeue,
    front,
    clear,
    toggleSound,
    handleEnqueueSubmit,
  };
}
