'use client';

import { useState, useCallback, useRef } from 'react';
import type { AlgorithmId, VisualizationStep } from '@/types/algorithm';
import { generateSteps, generateRandomArray, DEFAULT_ARRAY } from '@/lib/visualizers';

type PlaybackState = 'idle' | 'playing' | 'paused' | 'done';

interface UseVisualizerReturn {
  array: number[];
  steps: VisualizationStep[];
  currentStep: number;
  currentStepData: VisualizationStep | null;
  playbackState: PlaybackState;
  speed: number;
  setSpeed: (speed: number) => void;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  setCustomArray: (arr: number[]) => void;
  regenerate: () => void;
}

export function useVisualizer(algorithmId: AlgorithmId): UseVisualizerReturn {
  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY);
  const [steps, setSteps] = useState<VisualizationStep[]>(() =>
    generateSteps(algorithmId, DEFAULT_ARRAY)
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [speed, setSpeed] = useState(500);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    if (currentStep >= steps.length - 1) return;

    setPlaybackState('playing');
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearTimer();
          setPlaybackState('done');
          return prev;
        }
        return prev + 1;
      });
    }, speed);
  }, [currentStep, steps.length, speed, clearTimer]);

  const pause = useCallback(() => {
    clearTimer();
    setPlaybackState('paused');
  }, [clearTimer]);

  const stepForward = useCallback(() => {
    clearTimer();
    setPlaybackState('paused');
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [clearTimer, steps.length]);

  const stepBackward = useCallback(() => {
    clearTimer();
    setPlaybackState('paused');
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setCurrentStep(0);
    setPlaybackState('idle');
  }, [clearTimer]);

  const setCustomArray = useCallback(
    (arr: number[]) => {
      clearTimer();
      setArray(arr);
      const newSteps = generateSteps(algorithmId, arr);
      setSteps(newSteps);
      setCurrentStep(0);
      setPlaybackState('idle');
    },
    [algorithmId, clearTimer]
  );

  const regenerate = useCallback(() => {
    const newArr = generateRandomArray();
    setCustomArray(newArr);
  }, [setCustomArray]);

  return {
    array,
    steps,
    currentStep,
    currentStepData: steps[currentStep] ?? null,
    playbackState,
    speed,
    setSpeed,
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
    setCustomArray,
    regenerate,
  };
}
