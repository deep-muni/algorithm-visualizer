'use client';

import { Flex, Button, Text, Badge, IconButton } from '@chakra-ui/react';
import { COLOR_TOKENS } from '@/config/colors';

export interface TelemetryItem {
  label: string;
  value: string | number;
  color?: string;
  isBadge?: boolean;
}

export interface SpeedConfig<T = number | string> {
  current: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}

interface VisualizerHeaderBarProps {
  title?: string;
  badgeLabel?: string;
  badgePalette?: string;
  telemetry?: TelemetryItem[];
  speedConfig?: SpeedConfig<number | string>;
  isMuted?: boolean;
  onToggleSound?: () => void;
  onShare?: () => void;
  isCopied?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export function VisualizerHeaderBar({
  title,
  badgeLabel,
  badgePalette = 'indigo',
  telemetry = [],
  speedConfig,
  isMuted,
  onToggleSound,
  onShare,
  isCopied = false,
  isFullscreen = false,
  onToggleFullscreen,
}: VisualizerHeaderBarProps) {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      gap={3}
      justify="space-between"
      align={{ base: 'stretch', md: 'center' }}
      pb={3}
      mb={4}
      borderBottom="1px solid"
      borderColor={COLOR_TOKENS.border}
    >
      <Flex align="center" gap={2} wrap="wrap">
        {badgeLabel && (
          <Badge
            colorPalette={badgePalette}
            variant="subtle"
            size="xs"
            fontFamily="var(--font-mono)"
            px={2}
            py={0.5}
            borderRadius="md"
          >
            {badgeLabel}
          </Badge>
        )}

        {title && (
          <Text
            fontSize="xs"
            fontWeight="bold"
            fontFamily="var(--font-mono)"
            color={COLOR_TOKENS.text}
          >
            {title}
          </Text>
        )}

        {telemetry.map((item, idx) => (
          <Flex
            key={idx}
            align="center"
            gap={1.5}
            px={2.5}
            py={1}
            bg="var(--color-bg)"
            borderRadius="md"
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
          >
            <Text fontSize="2xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
              {item.label}:
            </Text>
            {item.isBadge ? (
              <Badge colorPalette="indigo" size="xs" variant="subtle" fontFamily="var(--font-mono)">
                {item.value}
              </Badge>
            ) : (
              <Text
                fontSize="xs"
                fontWeight="bold"
                color={item.color ?? COLOR_TOKENS.text}
                fontFamily="var(--font-mono)"
              >
                {item.value}
              </Text>
            )}
          </Flex>
        ))}
      </Flex>

      <Flex align="center" gap={2} wrap="wrap" justify={{ base: 'flex-start', md: 'flex-end' }}>
        {speedConfig && (
          <Flex
            align="center"
            bg="var(--color-bg)"
            p={0.5}
            borderRadius="md"
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
          >
            {speedConfig.options.map((opt) => {
              const isActive = speedConfig.current === opt.value;
              return (
                <Button
                  key={opt.label}
                  size="2xs"
                  variant={isActive ? 'solid' : 'ghost'}
                  bg={isActive ? COLOR_TOKENS.default : 'transparent'}
                  color={isActive ? 'white' : COLOR_TOKENS.textMuted}
                  _hover={{
                    color: isActive ? 'white' : COLOR_TOKENS.text,
                    bg: isActive ? COLOR_TOKENS.default : 'var(--color-surface)',
                  }}
                  onClick={() => speedConfig.onChange(opt.value)}
                  fontFamily="var(--font-mono)"
                  px={2}
                  h="22px"
                  borderRadius="sm"
                >
                  {opt.label}
                </Button>
              );
            })}
          </Flex>
        )}

        {onToggleSound && typeof isMuted === 'boolean' && (
          <IconButton
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            variant="ghost"
            size="xs"
            borderRadius="full"
            color={isMuted ? COLOR_TOKENS.textMuted : COLOR_TOKENS.default}
            _hover={{ color: COLOR_TOKENS.text, bg: 'var(--color-surface)' }}
            onClick={onToggleSound}
            title={isMuted ? 'Enable sound synthesis (Key: M)' : 'Mute sound synthesis (Key: M)'}
          >
            {isMuted ? '🔇' : '🔊'}
          </IconButton>
        )}

        {onShare && (
          <Button
            size="xs"
            variant="outline"
            borderColor={isCopied ? '#34d399' : COLOR_TOKENS.border}
            color={isCopied ? '#34d399' : COLOR_TOKENS.text}
            bg={isCopied ? 'rgba(52, 211, 153, 0.1)' : 'transparent'}
            _hover={{
              borderColor: isCopied ? '#34d399' : COLOR_TOKENS.default,
              bg: isCopied ? 'rgba(52, 211, 153, 0.15)' : 'var(--color-surface)',
            }}
            onClick={onShare}
            fontFamily="var(--font-mono)"
            h="24px"
            px={2.5}
            borderRadius="md"
          >
            {isCopied ? '✓ Copied!' : '🔗 Share'}
          </Button>
        )}

        {onToggleFullscreen && (
          <Button
            size="xs"
            variant="outline"
            borderColor={isFullscreen ? COLOR_TOKENS.danger : COLOR_TOKENS.border}
            color={isFullscreen ? COLOR_TOKENS.danger : COLOR_TOKENS.text}
            bg={isFullscreen ? 'rgba(248, 113, 113, 0.1)' : 'transparent'}
            _hover={{
              borderColor: isFullscreen ? COLOR_TOKENS.danger : COLOR_TOKENS.default,
              color: isFullscreen ? COLOR_TOKENS.danger : COLOR_TOKENS.default,
              bg: isFullscreen ? 'rgba(248, 113, 113, 0.15)' : 'var(--color-surface)',
            }}
            onClick={onToggleFullscreen}
            fontFamily="var(--font-mono)"
            h="24px"
            px={2.5}
            borderRadius="md"
          >
            {isFullscreen ? '✕ Exit' : '⛶ Focus'}
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
