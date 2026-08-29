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
}

export function PageNavHeader({ title, category, currentId }: PageNavHeaderProps) {
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
            title="Back to all"
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
          px={2}
          fontSize="2xs"
        >
          {categoryLabel}
        </Badge>
      </Flex>

      <Flex align="center" gap={2}>
        <AlgorithmSwitcher currentId={currentId} />
      </Flex>
    </Flex>
  );
}
