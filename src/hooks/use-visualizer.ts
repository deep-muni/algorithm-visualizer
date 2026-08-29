'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { AlgorithmId, VisualizationStep } from '@/types/algorithm';
import { generateSteps, generateRandomArray, DEFAULT_ARRAY } from '@/lib/visualizers';
import { soundEngine } from '@/lib/audio-synthesizer';

type PlaybackState = 'idle' | 'playing' | 'paused' | 'done';

interface UseVisualizerReturn {
  array: number[];
  steps: VisualizationStep[];
  currentStep: number;
  currentStepData: VisualizationStep | null;
  playbackState: PlaybackState;
  speed: number;
  comparisonCount: number;
  swapCount: number;
  isMuted: boolean;
  setSpeed: (speed: number) => void;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
  setCustomArray: (arr: number[]) => void;
  regenerate: () => void;
  toggleSound: () => void;
}

export function useVisualizer(algorithmId: AlgorithmId): UseVisualizerReturn {
  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY);
  const [steps, setSteps] = useState<VisualizationStep[]>(() =>
    generateSteps(algorithmId, DEFAULT_ARRAY)
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [speed, setSpeedState] = useState(450);
  const [isMuted, setIsMuted] = useState(() => soundEngine.isMuted());

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

  const triggerSoundForStep = useCallback((stepData: VisualizationStep) => {
    if (!stepData) return;
    const maxVal = Math.max(...stepData.array, 100);
    if (stepData.swapping && stepData.swapping.length > 0) {
      const idx = stepData.swapping[0];
      soundEngine.playTone(stepData.array[idx] || 50, maxVal, true);
    } else if (stepData.comparing && stepData.comparing.length > 0) {
      const idx = stepData.comparing[0];
      soundEngine.playTone(stepData.array[idx] || 50, maxVal, false);
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
      const nextStep = currentStepRef.current + 1;
      setCurrentStep(nextStep);
      const stepData = stepsRef.current[nextStep];
      if (stepData) {
        triggerSoundForStep(stepData);
      }
    }, speed);
  }, [speed, clearTimer, triggerSoundForStep]);

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
          const nextStep = currentStepRef.current + 1;
          setCurrentStep(nextStep);
          const stepData = stepsRef.current[nextStep];
          if (stepData) {
            triggerSoundForStep(stepData);
          }
        }, newSpeed);
      }
    },
    [clearTimer, triggerSoundForStep]
  );

  const stepForward = useCallback(() => {
    clearTimer();
    setPlaybackState('paused');
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, stepsRef.current.length - 1);
      const stepData = stepsRef.current[next];
      if (stepData) triggerSoundForStep(stepData);
      return next;
    });
  }, [clearTimer, triggerSoundForStep]);

  const stepBackward = useCallback(() => {
    clearTimer();
    setPlaybackState('paused');
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, [clearTimer]);

  const goToStep = useCallback(
    (targetStep: number) => {
      clearTimer();
      setPlaybackState('paused');
      const clamped = Math.max(0, Math.min(targetStep, stepsRef.current.length - 1));
      setCurrentStep(clamped);
      const stepData = stepsRef.current[clamped];
      if (stepData) triggerSoundForStep(stepData);
    },
    [clearTimer, triggerSoundForStep]
  );

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

  const toggleSound = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  const { comparisonCount, swapCount } = useMemo(() => {
    let comps = 0;
    let swaps = 0;
    for (let i = 0; i <= currentStep && i < steps.length; i++) {
      if (steps[i].comparing && steps[i].comparing.length > 0) comps++;
      if (steps[i].swapping && steps[i].swapping.length > 0) swaps++;
    }
    return { comparisonCount: comps, swapCount: swaps };
  }, [currentStep, steps]);

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
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimer();
    };
  }, [play, pause, stepForward, stepBackward, reset, toggleSound, clearTimer]);

  return {
    array,
    steps,
    currentStep,
    currentStepData: steps[currentStep] ?? null,
    playbackState,
    speed,
    comparisonCount,
    swapCount,
    isMuted,
    setSpeed,
    play,
    pause,
    stepForward,
    stepBackward,
    goToStep,
    reset,
    setCustomArray,
    regenerate,
    toggleSound,
  };
}
