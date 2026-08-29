'use client';

import Link from 'next/link';
import { Flex, Heading, Badge, IconButton, Button } from '@chakra-ui/react';
import { AlgorithmSwitcher } from './algorithm-switcher';
import { COLOR_TOKENS } from '@/config/colors';
import type { AlgorithmCategory } from '@/types/algorithm';

interface PageNavHeaderProps {
  title: string;
  category: AlgorithmCategory;
  currentId: string;
  onShare?: () => void;
  isCopied?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export function PageNavHeader({
  title,
  category,
  currentId,
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
        {onShare && (
          <Button
            size="xs"
            variant="outline"
            borderColor={isCopied ? '#34d399' : COLOR_TOKENS.border}
            color={isCopied ? '#34d399' : COLOR_TOKENS.text}
            bg={isCopied ? 'rgba(52, 211, 153, 0.1)' : 'transparent'}
            _hover={{
              borderColor: isCopied ? '#34d399' : COLOR_TOKENS.default,
              bg: isCopied ? 'rgba(52, 211, 153, 0.15)' : COLOR_TOKENS.surfaceLight,
            }}
            onClick={onShare}
            fontFamily="var(--font-mono)"
            h="28px"
            px={3}
            borderRadius="md"
          >
            {isCopied ? '✓ Copied!' : '🔗 Share URL'}
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
              bg: isFullscreen ? 'rgba(248, 113, 113, 0.15)' : COLOR_TOKENS.surfaceLight,
            }}
            onClick={onToggleFullscreen}
            fontFamily="var(--font-mono)"
            h="28px"
            px={3}
            borderRadius="md"
          >
            {isFullscreen ? '✕ Exit' : '⛶ Focus (Z)'}
          </Button>
        )}

        <AlgorithmSwitcher currentId={currentId} />
      </Flex>
    </Flex>
  );
}
