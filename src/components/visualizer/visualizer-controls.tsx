'use client';

import { Flex, IconButton, Slider, Text, Box } from '@chakra-ui/react';

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

  const speedLabel = speed <= 150 ? 'Fast' : speed <= 400 ? 'Medium' : 'Slow';

  return (
    <Box w="full">
      <Flex justify="space-between" align="center" mb={3}>
        <Text fontSize="xs" color="whiteAlpha.900" fontFamily="var(--font-mono)">
          Step {currentStep + 1} / {totalSteps}
        </Text>
        <Text fontSize="xs" color="whiteAlpha.900">
          Speed: {speedLabel}
        </Text>
      </Flex>

      <Flex align="center" gap={3} mb={4}>
        <Slider.Root
          min={100}
          max={800}
          step={50}
          value={[1000 - speed]}
          onValueChange={(e) => onSpeedChange(1000 - e.value[0])}
          flex={1}
        >
          <Slider.Track bg="whiteAlpha.200" h="4px">
            <Slider.Range bg="indigo.500" />
          </Slider.Track>
          <Slider.Thumb index={0} boxSize={3} bg="indigo.400" />
        </Slider.Root>
      </Flex>

      <Flex justify="center" align="center" gap={3}>
        <IconButton
          aria-label="Regenerate array"
          variant="ghost"
          size="sm"
          color="whiteAlpha.800"
          _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
          onClick={onRegenerate}
          title="New random array"
        >
          ↺
        </IconButton>

        <IconButton
          aria-label="Reset"
          variant="ghost"
          size="sm"
          color="whiteAlpha.800"
          _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
          onClick={onReset}
          disabled={currentStep === 0 && playbackState === 'idle'}
        >
          ⏮
        </IconButton>

        <IconButton
          aria-label="Step backward"
          variant="ghost"
          size="sm"
          color="whiteAlpha.800"
          _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
          onClick={onStepBack}
          disabled={!canGoBack}
        >
          ◂
        </IconButton>

        <IconButton
          aria-label={isPlaying ? 'Pause' : 'Play'}
          size="md"
          borderRadius="full"
          bg="indigo.600"
          color="white"
          _hover={{ bg: 'indigo.500' }}
          onClick={isPlaying ? onPause : onPlay}
          disabled={isDone && !canGoForward}
        >
          {isPlaying ? '⏸' : isDone ? '✓' : '▶'}
        </IconButton>

        <IconButton
          aria-label="Step forward"
          variant="ghost"
          size="sm"
          color="whiteAlpha.800"
          _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
          onClick={onStepForward}
          disabled={!canGoForward}
        >
          ▸
        </IconButton>

        <IconButton
          aria-label="Skip to end"
          variant="ghost"
          size="sm"
          color="whiteAlpha.800"
          _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
          onClick={() => {
            for (let i = currentStep; i < totalSteps - 1; i++) onStepForward();
          }}
          disabled={!canGoForward}
        >
          ⏭
        </IconButton>
      </Flex>
    </Box>
  );
}
