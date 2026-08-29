'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
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
  const [speed, setSpeedState] = useState(450);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentStepRef = useRef(currentStep);
  const stepsRef = useRef(steps);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  useEffect(() => {
    isPlayingRef.current = playbackState === 'playing';
  }, [playbackState]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const pause = useCallback(() => {
    clearTimer();
    setPlaybackState('paused');
  }, [clearTimer]);

  const play = useCallback(() => {
    if (currentStepRef.current >= stepsRef.current.length - 1) return;

    clearTimer();
    setPlaybackState('playing');

    intervalRef.current = setInterval(() => {
      if (currentStepRef.current >= stepsRef.current.length - 1) {
        clearTimer();
        setPlaybackState('done');
        return;
      }
      setCurrentStep((prev) => prev + 1);
    }, speed);
  }, [speed, clearTimer]);

  const setSpeed = useCallback(
    (newSpeed: number) => {
      setSpeedState(newSpeed);
      if (isPlayingRef.current) {
        clearTimer();
        intervalRef.current = setInterval(() => {
          if (currentStepRef.current >= stepsRef.current.length - 1) {
            clearTimer();
            setPlaybackState('done');
            return;
          }
          setCurrentStep((prev) => prev + 1);
        }, newSpeed);
      }
    },
    [clearTimer]
  );

  const stepForward = useCallback(() => {
    clearTimer();
    setPlaybackState('paused');
    setCurrentStep((prev) => Math.min(prev + 1, stepsRef.current.length - 1));
  }, [clearTimer]);

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
    const newArr = generateRandomArray(array.length);
    setCustomArray(newArr);
  }, [array.length, setCustomArray]);

  // Keyboard shortcut listeners and cleanup on unmount
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

      if (e.code === 'Space') {
        e.preventDefault();
        if (isPlayingRef.current) {
          pause();
        } else {
          play();
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        stepForward();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        stepBackward();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimer();
    };
  }, [play, pause, stepForward, stepBackward, reset, clearTimer]);

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
