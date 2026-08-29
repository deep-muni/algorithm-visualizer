'use client';

import { Flex, IconButton, Text, Button } from '@chakra-ui/react';

interface VisualizerControlsProps {
  playbackState: 'idle' | 'playing' | 'paused' | 'done';
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onRegenerate: () => void;
}

const speedOptions = [
  { label: '0.5x', speed: 800 },
  { label: '1x', speed: 450 },
  { label: '2x', speed: 200 },
  { label: '4x', speed: 80 },
];

export function VisualizerControls({
  playbackState,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onStepBack,
  onStepForward,
  onReset,
  onSpeedChange,
  onRegenerate,
}: VisualizerControlsProps) {
  const isPlaying = playbackState === 'playing';
  const isDone = playbackState === 'done';
  const canGoForward = currentStep < totalSteps - 1;
  const canGoBack = currentStep > 0;

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      gap={4}
      w="full"
      py={2}
    >
      <Flex align="center" gap={2}>
        <Text fontSize="xs" fontFamily="var(--font-mono)" color="var(--color-text-muted)">
          Step:
        </Text>
        <Text
          fontSize="xs"
          fontFamily="var(--font-mono)"
          color="var(--color-text)"
          fontWeight="bold"
        >
          {currentStep + 1} / {totalSteps}
        </Text>
      </Flex>

      <Flex align="center" gap={2}>
        <IconButton
          aria-label="New random array"
          variant="ghost"
          size="sm"
          borderRadius="full"
          color="var(--color-text-muted)"
          _hover={{ color: 'var(--color-text)', bg: 'var(--color-surface-light)' }}
          onClick={onRegenerate}
          title="New random array"
        >
          ↺
        </IconButton>

        <IconButton
          aria-label="Reset to start"
          variant="ghost"
          size="sm"
          borderRadius="full"
          color="var(--color-text-muted)"
          _hover={{ color: 'var(--color-text)', bg: 'var(--color-surface-light)' }}
          onClick={onReset}
          disabled={currentStep === 0 && playbackState === 'idle'}
          title="Reset to beginning (Key: R)"
        >
          ⏮
        </IconButton>

        <IconButton
          aria-label="Step backward"
          variant="ghost"
          size="sm"
          borderRadius="full"
          color="var(--color-text-muted)"
          _hover={{ color: 'var(--color-text)', bg: 'var(--color-surface-light)' }}
          onClick={onStepBack}
          disabled={!canGoBack}
          title="Step backward (Key: ←)"
        >
          ◂
        </IconButton>

        <IconButton
          aria-label={isPlaying ? 'Pause' : 'Play'}
          size="md"
          borderRadius="full"
          bg="var(--color-indigo)"
          color="white"
          _hover={{ filter: 'brightness(1.15)', transform: 'scale(1.05)' }}
          transition="all 0.15s ease"
          boxShadow="0 0 16px rgba(129, 140, 248, 0.45)"
          onClick={isPlaying ? onPause : onPlay}
          disabled={isDone && !canGoForward}
          title={isPlaying ? 'Pause (Space)' : 'Play animation (Space)'}
        >
          {isPlaying ? '⏸' : isDone ? '✓' : '▶'}
        </IconButton>

        <IconButton
          aria-label="Step forward"
          variant="ghost"
          size="sm"
          borderRadius="full"
          color="var(--color-text-muted)"
          _hover={{ color: 'var(--color-text)', bg: 'var(--color-surface-light)' }}
          onClick={onStepForward}
          disabled={!canGoForward}
          title="Step forward (Key: →)"
        >
          ▸
        </IconButton>

        <IconButton
          aria-label="Skip to end"
          variant="ghost"
          size="sm"
          borderRadius="full"
          color="var(--color-text-muted)"
          _hover={{ color: 'var(--color-text)', bg: 'var(--color-surface-light)' }}
          onClick={() => {
            for (let i = currentStep; i < totalSteps - 1; i++) onStepForward();
          }}
          disabled={!canGoForward}
          title="Skip to end"
        >
          ⏭
        </IconButton>
      </Flex>

      <Flex align="center" gap={1}>
        <Text fontSize="xs" color="var(--color-text-muted)" fontFamily="var(--font-mono)" mr={1}>
          Speed:
        </Text>
        {speedOptions.map((opt) => {
          const isActive = speed === opt.speed;
          return (
            <Button
              key={opt.speed}
              size="2xs"
              variant={isActive ? 'solid' : 'ghost'}
              bg={isActive ? 'var(--color-indigo)' : 'transparent'}
              color={isActive ? 'white' : 'var(--color-text-muted)'}
              _hover={{
                color: 'var(--color-text)',
                bg: isActive ? 'var(--color-indigo)' : 'var(--color-surface-light)',
              }}
              borderRadius="sm"
              fontFamily="var(--font-mono)"
              onClick={() => onSpeedChange(opt.speed)}
            >
              {opt.label}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
}
