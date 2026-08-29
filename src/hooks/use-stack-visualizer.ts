'use client';

import { useState, useCallback, useEffect } from 'react';
import { executeStackPush, executeStackPop, executeStackPeek } from '@/lib/data-structures';
import { soundEngine } from '@/lib/audio-synthesizer';

export function useStackVisualizer(initialItems: number[] = [15, 42, 88]) {
  const [items, setItems] = useState<number[]>(initialItems);
  const [operationLog, setOperationLog] = useState<string>(
    'Stack initialized with initial elements'
  );
  const [peekedIndex, setPeekedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('50');
  const [isMuted, setIsMuted] = useState(() => soundEngine.isMuted());

  const push = useCallback(
    (value: number) => {
      setPeekedIndex(null);
      setError(null);
      const res = executeStackPush(items, value);
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

  const pop = useCallback(() => {
    setPeekedIndex(null);
    setError(null);
    const res = executeStackPop(items);
    if (res.error) {
      setError(res.error);
      soundEngine.playError();
    } else {
      setItems(res.nextItems);
      soundEngine.playDelete();
    }
    setOperationLog(res.action);
  }, [items]);

  const peek = useCallback(() => {
    setError(null);
    const res = executeStackPeek(items);
    if (res.error) {
      setError(res.error);
      setPeekedIndex(null);
      soundEngine.playError();
    } else {
      setPeekedIndex(items.length - 1);
      soundEngine.playPeek();
    }
    setOperationLog(res.action);
  }, [items]);

  const clear = useCallback(() => {
    setItems([]);
    setPeekedIndex(null);
    setError(null);
    soundEngine.playDelete();
    setOperationLog('Stack cleared (0 elements)');
  }, []);

  const toggleSound = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  const handlePushSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const num = parseInt(inputValue.trim(), 10);
      if (isNaN(num) || num < 1 || num > 999) {
        setError('Enter a number between 1 and 999');
        soundEngine.playError();
        return;
      }
      push(num);
      setInputValue(String(Math.floor(Math.random() * 90) + 10));
    },
    [inputValue, push]
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

      if (e.code === 'KeyP') {
        e.preventDefault();
        const randomVal = Math.floor(Math.random() * 90) + 10;
        push(randomVal);
      } else if (e.code === 'KeyO' || e.code === 'Backspace' || e.code === 'Delete') {
        e.preventDefault();
        pop();
      } else if (e.code === 'KeyK') {
        e.preventDefault();
        peek();
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
  }, [push, pop, peek, clear, toggleSound]);

  return {
    items,
    operationLog,
    peekedIndex,
    error,
    inputValue,
    isMuted,
    setInputValue,
    push,
    pop,
    peek,
    clear,
    toggleSound,
    handlePushSubmit,
  };
}
