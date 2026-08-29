'use client';

import { Container, Text, Grid, Box } from '@chakra-ui/react';
import type { DataStructureInfo } from '@/types/algorithm';
import { CodePanel, PageNavHeader } from '@/components/shared';
import { StackVisualizer } from './stack-visualizer';
import { QueueVisualizer } from './queue-visualizer';
import { LinkedListVisualizer } from './linked-list-visualizer';
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
  return (
    <Container maxW="1200px" py={6} px={4}>
      <PageNavHeader
        title={dataStructure.name}
        category={dataStructure.category}
        currentId={dataStructure.id}
      />

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
