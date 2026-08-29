'use client';

import { Box, Flex, IconButton, Text, Button, Badge } from '@chakra-ui/react';
import { COLOR_TOKENS } from '@/config/colors';

interface VisualizerControlsProps {
  playbackState: 'idle' | 'playing' | 'paused' | 'done';
  currentStep: number;
  totalSteps: number;
  speed: number;
  comparisonCount?: number;
  swapCount?: number;
  isMuted?: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onGoToStep?: (step: number) => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onRegenerate: () => void;
  onToggleSound?: () => void;
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
  comparisonCount = 0,
  swapCount = 0,
  isMuted = true,
  onPlay,
  onPause,
  onStepBack,
  onStepForward,
  onGoToStep,
  onReset,
  onSpeedChange,
  onRegenerate,
  onToggleSound,
}: VisualizerControlsProps) {
  const isPlaying = playbackState === 'playing';
  const isDone = playbackState === 'done';
  const canGoForward = currentStep < totalSteps - 1;
  const canGoBack = currentStep > 0;

  const progressPct = totalSteps > 1 ? Math.round((currentStep / (totalSteps - 1)) * 100) : 100;

  return (
    <Box w="full" pt={1}>
      {/* Interactive Timeline Scrubber */}
      <Box mb={4} px={1}>
        <Flex justify="space-between" align="center" mb={1.5}>
          <Flex align="center" gap={2}>
            <Text
              fontSize="2xs"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
              color={COLOR_TOKENS.textMuted}
              textTransform="uppercase"
              letterSpacing="0.05em"
            >
              Timeline Progress:
            </Text>
            <Badge
              colorPalette="indigo"
              variant="subtle"
              fontSize="2xs"
              fontFamily="var(--font-mono)"
            >
              {progressPct}%
            </Badge>
          </Flex>

          <Flex align="center" gap={3}>
            <Text fontSize="xs" fontFamily="var(--font-mono)" color={COLOR_TOKENS.textMuted}>
              Step{' '}
              <Text as="span" color={COLOR_TOKENS.text} fontWeight="bold">
                {currentStep + 1}
              </Text>{' '}
              / {totalSteps}
            </Text>
          </Flex>
        </Flex>

        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStep}
          onChange={(e) => onGoToStep?.(Number(e.target.value))}
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '4px',
            backgroundColor: 'var(--color-surface-light)',
            outline: 'none',
            cursor: 'pointer',
            accentColor: 'var(--color-indigo)',
          }}
        />
      </Box>

      {/* Main Controls Row */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        gap={4}
        w="full"
      >
        {/* Telemetry Live Counters */}
        <Flex align="center" gap={2} wrap="wrap">
          <Box
            bg={COLOR_TOKENS.surfaceLight}
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
            borderRadius="md"
            px={2.5}
            py={1}
          >
            <Text fontSize="2xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
              Comparisons
            </Text>
            <Text
              fontSize="xs"
              fontFamily="var(--font-mono)"
              color={COLOR_TOKENS.warning}
              fontWeight="bold"
            >
              {comparisonCount}
            </Text>
          </Box>

          <Box
            bg={COLOR_TOKENS.surfaceLight}
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
            borderRadius="md"
            px={2.5}
            py={1}
          >
            <Text fontSize="2xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
              Swaps / Actions
            </Text>
            <Text
              fontSize="xs"
              fontFamily="var(--font-mono)"
              color={COLOR_TOKENS.danger}
              fontWeight="bold"
            >
              {swapCount}
            </Text>
          </Box>
        </Flex>

        {/* Playback Button Controls */}
        <Flex align="center" gap={2}>
          <IconButton
            aria-label="New random array"
            variant="ghost"
            size="sm"
            borderRadius="full"
            color={COLOR_TOKENS.textMuted}
            _hover={{ color: COLOR_TOKENS.text, bg: COLOR_TOKENS.surfaceLight }}
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
            color={COLOR_TOKENS.textMuted}
            _hover={{ color: COLOR_TOKENS.text, bg: COLOR_TOKENS.surfaceLight }}
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
            color={COLOR_TOKENS.textMuted}
            _hover={{ color: COLOR_TOKENS.text, bg: COLOR_TOKENS.surfaceLight }}
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
            bg={COLOR_TOKENS.default}
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
            color={COLOR_TOKENS.textMuted}
            _hover={{ color: COLOR_TOKENS.text, bg: COLOR_TOKENS.surfaceLight }}
            onClick={onStepForward}
            disabled={!canGoForward}
            title="Step forward (Key: →)"
          >
            ▸
          </IconButton>

          {onToggleSound && (
            <IconButton
              aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              variant="ghost"
              size="sm"
              borderRadius="full"
              color={isMuted ? COLOR_TOKENS.textMuted : COLOR_TOKENS.default}
              _hover={{ color: COLOR_TOKENS.text, bg: COLOR_TOKENS.surfaceLight }}
              onClick={onToggleSound}
              title={isMuted ? 'Enable sound synthesis (Key: M)' : 'Mute sound synthesis (Key: M)'}
            >
              {isMuted ? '🔇' : '🔊'}
            </IconButton>
          )}
        </Flex>

        {/* Speed Controls */}
        <Flex align="center" gap={1}>
          <Text fontSize="xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)" mr={1}>
            Speed:
          </Text>
          {speedOptions.map((opt) => {
            const isActive = speed === opt.speed;
            return (
              <Button
                key={opt.speed}
                size="2xs"
                variant={isActive ? 'solid' : 'ghost'}
                bg={isActive ? COLOR_TOKENS.default : 'transparent'}
                color={isActive ? 'white' : COLOR_TOKENS.textMuted}
                _hover={{
                  color: COLOR_TOKENS.text,
                  bg: isActive ? COLOR_TOKENS.default : COLOR_TOKENS.surfaceLight,
                }}
                borderRadius="md"
                fontFamily="var(--font-mono)"
                onClick={() => onSpeedChange(opt.speed)}
              >
                {opt.label}
              </Button>
            );
          })}
        </Flex>
      </Flex>

      {/* Keyboard Shortcut Hints */}
      <Flex justify="center" align="center" gap={2} mt={3} opacity={0.6}>
        <Text fontSize="2xs" fontFamily="var(--font-mono)" color={COLOR_TOKENS.textMuted}>
          Shortcuts:{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            Space
          </kbd>{' '}
          Play/Pause •{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            ←/→
          </kbd>{' '}
          Step •{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            R
          </kbd>{' '}
          Reset •{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            M
          </kbd>{' '}
          Sound
        </Text>
      </Flex>
    </Box>
  );
}
