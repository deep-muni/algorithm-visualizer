'use client';

import Link from 'next/link';
import { Flex, Heading, Badge, IconButton } from '@chakra-ui/react';
import { AlgorithmSwitcher } from './algorithm-switcher';
import { COLOR_TOKENS } from '@/config/colors';
import type { AlgorithmCategory } from '@/types/algorithm';

interface PageNavHeaderProps {
  title: string;
  category: AlgorithmCategory;
  currentId: string;
  isMuted?: boolean;
  onToggleSound?: () => void;
  onShare?: () => void;
  isCopied?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export function PageNavHeader({
  title,
  category,
  currentId,
  isMuted,
  onToggleSound,
  onShare,
  isCopied,
  isFullscreen,
  onToggleFullscreen,
}: PageNavHeaderProps) {
  const isSorting = category === 'sorting';
  const isDS = category === 'data-structures';

  const badgeColorPalette = isDS ? 'teal' : isSorting ? 'indigo' : 'purple';
  const categoryLabel = isDS ? 'Data Structure' : isSorting ? 'Sorting' : 'Searching';

  return (
    <Flex justify="space-between" align="center" mb={5} wrap="wrap" gap={3}>
      <Flex align="center" gap={3}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <IconButton
            aria-label="Back to all"
            variant="outline"
            size="xs"
            borderRadius="md"
            borderColor={COLOR_TOKENS.border}
            color={COLOR_TOKENS.text}
            _hover={{ borderColor: COLOR_TOKENS.default, bg: COLOR_TOKENS.surfaceLight }}
            title="Back to all algorithms"
            h="28px"
            w="28px"
          >
            ←
          </IconButton>
        </Link>

        <Heading
          as="h1"
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight="bold"
          color={COLOR_TOKENS.text}
        >
          {title}
        </Heading>

        <Badge
          colorPalette={badgeColorPalette}
          variant="subtle"
          borderRadius="full"
          px={2.5}
          py={0.5}
          fontSize="2xs"
          fontFamily="var(--font-mono)"
        >
          {categoryLabel}
        </Badge>
      </Flex>

      <Flex align="center" gap={2} wrap="wrap">
        {onToggleSound && typeof isMuted === 'boolean' && (
          <IconButton
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            variant="outline"
            size="xs"
            borderRadius="md"
            borderColor={COLOR_TOKENS.border}
            color={isMuted ? COLOR_TOKENS.textMuted : COLOR_TOKENS.default}
            bg="transparent"
            _hover={{
              borderColor: COLOR_TOKENS.default,
              color: COLOR_TOKENS.text,
              bg: COLOR_TOKENS.surfaceLight,
            }}
            onClick={onToggleSound}
            title={isMuted ? 'Unmute sound effects (Key: M)' : 'Mute sound effects (Key: M)'}
            h="28px"
            w="28px"
          >
            {isMuted ? '🔇' : '🔊'}
          </IconButton>
        )}

        {onShare && (
          <IconButton
            aria-label="Share URL"
            variant="outline"
            size="xs"
            borderRadius="md"
            borderColor={isCopied ? '#34d399' : COLOR_TOKENS.border}
            color={isCopied ? '#34d399' : COLOR_TOKENS.text}
            bg={isCopied ? 'rgba(52, 211, 153, 0.1)' : 'transparent'}
            _hover={{
              borderColor: isCopied ? '#34d399' : COLOR_TOKENS.default,
              bg: isCopied ? 'rgba(52, 211, 153, 0.15)' : COLOR_TOKENS.surfaceLight,
            }}
            onClick={onShare}
            title={isCopied ? '✓ URL copied to clipboard!' : 'Share URL (Key: S)'}
            h="28px"
            w="28px"
            fontSize="xs"
          >
            {isCopied ? '✓' : '🔗'}
          </IconButton>
        )}

        {onToggleFullscreen && (
          <IconButton
            aria-label={isFullscreen ? 'Exit Focus Mode' : 'Focus Mode'}
            variant="outline"
            size="xs"
            borderRadius="md"
            borderColor={isFullscreen ? COLOR_TOKENS.danger : COLOR_TOKENS.border}
            color={isFullscreen ? COLOR_TOKENS.danger : COLOR_TOKENS.text}
            bg={isFullscreen ? 'rgba(248, 113, 113, 0.1)' : 'transparent'}
            _hover={{
              borderColor: isFullscreen ? COLOR_TOKENS.danger : COLOR_TOKENS.default,
              color: isFullscreen ? COLOR_TOKENS.danger : COLOR_TOKENS.default,
              bg: isFullscreen ? 'rgba(248, 113, 113, 0.15)' : COLOR_TOKENS.surfaceLight,
            }}
            onClick={onToggleFullscreen}
            title={
              isFullscreen
                ? 'Exit Fullscreen Focus (Key: Z or Esc)'
                : 'Fullscreen Focus Mode (Key: Z)'
            }
            h="28px"
            w="28px"
            fontSize="xs"
          >
            {isFullscreen ? '✕' : '⛶'}
          </IconButton>
        )}

        <AlgorithmSwitcher currentId={currentId} />
      </Flex>
    </Flex>
  );
}
