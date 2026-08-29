'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container, Heading, Text, Badge, Grid, Box, Flex, IconButton } from '@chakra-ui/react';
import type { DataStructureInfo } from '@/types/algorithm';
import { CodePanel } from '@/components/shared';
import { StackVisualizer } from './stack-visualizer';
import { QueueVisualizer } from './queue-visualizer';
import { LinkedListVisualizer } from './linked-list-visualizer';
import { dataStructures, sortingAlgorithms, searchingAlgorithms } from '@/data';
import { COLOR_TOKENS } from '@/config/colors';

interface DataStructurePageClientProps {
  dataStructure: DataStructureInfo;
}

function DSComplexityBadge({ label, value }: { label: string; value: string }) {
  const isGood = value === 'O(1)';
  const color = isGood ? COLOR_TOKENS.success : COLOR_TOKENS.warning;

  return (
    <Box
      bg={COLOR_TOKENS.surfaceLight}
      borderRadius="lg"
      p={3}
      border="1px solid"
      borderColor={COLOR_TOKENS.border}
    >
      <Text fontSize="xs" color={COLOR_TOKENS.textMuted} mb={1} fontFamily="var(--font-mono)">
        {label}
      </Text>
      <Text fontSize="sm" fontFamily="var(--font-mono)" fontWeight="bold" color={color}>
        {value}
      </Text>
    </Box>
  );
}

export function DataStructurePageClient({ dataStructure }: DataStructurePageClientProps) {
  const router = useRouter();

  return (
    <Container maxW="1200px" py={6} px={4}>
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
            {dataStructure.name}
          </Heading>

          <Badge colorPalette="teal" variant="subtle" borderRadius="full" px={2} fontSize="2xs">
            Data Structure
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
          <select
            value={dataStructure.id}
            onChange={(e) => {
              const targetId = e.target.value;
              const isDS = dataStructures.some((d) => d.id === targetId);
              const isSort = sortingAlgorithms.some((s) => s.id === targetId);
              if (isDS) router.push(`/data-structures/${targetId}`);
              else if (isSort) router.push(`/sorting/${targetId}`);
              else router.push(`/searching/${targetId}`);
            }}
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              padding: '5px 10px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              outline: 'none',
              cursor: 'pointer',
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
        </Flex>
      </Flex>

      <Box
        bg={COLOR_TOKENS.surface}
        borderRadius="2xl"
        border="1px solid"
        borderColor={COLOR_TOKENS.border}
        p={{ base: 4, md: 6 }}
        mb={6}
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.25)"
      >
        {dataStructure.id === 'stack' && <StackVisualizer />}
        {dataStructure.id === 'queue' && <QueueVisualizer />}
        {dataStructure.id === 'singly-linked-list' && <LinkedListVisualizer isDoubly={false} />}
        {dataStructure.id === 'doubly-linked-list' && <LinkedListVisualizer isDoubly={true} />}
      </Box>

      <Grid templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }} gap={6} mb={8} alignItems="start">
        <Box
          bg={COLOR_TOKENS.surface}
          borderRadius="2xl"
          border="1px solid"
          borderColor={COLOR_TOKENS.border}
          p={5}
        >
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color={COLOR_TOKENS.textMuted}
            fontFamily="var(--font-mono)"
            textTransform="uppercase"
            letterSpacing="0.05em"
            mb={3}
          >
            Implementation Code
          </Text>
          <CodePanel code={dataStructure.code} />
        </Box>

        <Box display="flex" flexDirection="column" gap={6}>
          <Box
            bg={COLOR_TOKENS.surface}
            borderRadius="2xl"
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
            p={5}
          >
            <Text
              fontSize="xs"
              fontWeight="semibold"
              color={COLOR_TOKENS.textMuted}
              fontFamily="var(--font-mono)"
              textTransform="uppercase"
              letterSpacing="0.05em"
              mb={3}
            >
              Operation Complexity
            </Text>

            <Grid templateColumns="repeat(2, 1fr)" gap={2} mb={3}>
              <DSComplexityBadge label="Access" value={dataStructure.complexity.access} />
              <DSComplexityBadge label="Search" value={dataStructure.complexity.search} />
              <DSComplexityBadge label="Insertion" value={dataStructure.complexity.insertion} />
              <DSComplexityBadge label="Deletion" value={dataStructure.complexity.deletion} />
            </Grid>

            <Box mt={2}>
              <DSComplexityBadge label="Space Complexity" value={dataStructure.complexity.space} />
            </Box>
          </Box>

          <Box
            bg={COLOR_TOKENS.surface}
            borderRadius="2xl"
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
            p={5}
          >
            <Text
              fontSize="xs"
              fontWeight="semibold"
              color={COLOR_TOKENS.textMuted}
              fontFamily="var(--font-mono)"
              textTransform="uppercase"
              letterSpacing="0.05em"
              mb={3}
            >
              Overview & Applications
            </Text>
            <Text fontSize="xs" color={COLOR_TOKENS.textMuted} lineHeight="tall">
              {dataStructure.description}
            </Text>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
