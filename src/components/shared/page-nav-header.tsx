'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Flex, Heading, Badge, Text, IconButton, Box } from '@chakra-ui/react';
import { dataStructures, sortingAlgorithms, searchingAlgorithms } from '@/data';
import { COLOR_TOKENS } from '@/config/colors';
import type { AlgorithmCategory } from '@/types/algorithm';

interface PageNavHeaderProps {
  title: string;
  category: AlgorithmCategory;
  currentId: string;
}

export function PageNavHeader({ title, category, currentId }: PageNavHeaderProps) {
  const router = useRouter();

  const isSorting = category === 'sorting';
  const isDS = category === 'data-structures';

  const badgeColorPalette = isDS ? 'teal' : isSorting ? 'indigo' : 'purple';
  const categoryLabel = isDS ? 'Data Structure' : isSorting ? 'Sorting' : 'Searching';

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetId = e.target.value;
    const targetIsDS = dataStructures.some((d) => d.id === targetId);
    const targetIsSort = sortingAlgorithms.some((s) => s.id === targetId);
    if (targetIsDS) router.push(`/data-structures/${targetId}`);
    else if (targetIsSort) router.push(`/sorting/${targetId}`);
    else router.push(`/searching/${targetId}`);
  };

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
        <Text
          fontSize="xs"
          color={COLOR_TOKENS.textMuted}
          fontFamily="var(--font-mono)"
          display={{ base: 'none', sm: 'block' }}
        >
          Switch:
        </Text>

        <Box position="relative">
          <select
            value={currentId}
            onChange={handleSelectChange}
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              outline: 'none',
              cursor: 'pointer',
              minWidth: '180px',
            }}
          >
            <optgroup
              label="Data Structures"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-sorted)' }}
            >
              {dataStructures.map((d) => (
                <option
                  key={d.id}
                  value={d.id}
                  style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
                >
                  {d.name}
                </option>
              ))}
            </optgroup>
            <optgroup
              label="Sorting Algorithms"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-indigo)' }}
            >
              {sortingAlgorithms.map((a) => (
                <option
                  key={a.id}
                  value={a.id}
                  style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
                >
                  {a.name}
                </option>
              ))}
            </optgroup>
            <optgroup
              label="Searching Algorithms"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-violet)' }}
            >
              {searchingAlgorithms.map((a) => (
                <option
                  key={a.id}
                  value={a.id}
                  style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
                >
                  {a.name}
                </option>
              ))}
            </optgroup>
          </select>
        </Box>
      </Flex>
    </Flex>
  );
}
