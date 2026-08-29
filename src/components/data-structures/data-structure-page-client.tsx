'use client';

import Link from 'next/link';
import {
  Container,
  Heading,
  Text,
  Badge,
  Grid,
  GridItem,
  Box,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import type { DataStructureInfo } from '@/types/algorithm';
import { CodePanel } from '@/components/visualizer/code-panel';
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
    <Container maxW="1200px" py={8} px={4}>
      <Flex align="center" gap={3} mb={6}>
        <Link href="/">
          <IconButton
            aria-label="Back to home"
            size="sm"
            variant="outline"
            borderColor={COLOR_TOKENS.border}
            color={COLOR_TOKENS.text}
            _hover={{ borderColor: COLOR_TOKENS.default, color: COLOR_TOKENS.default }}
          >
            ←
          </IconButton>
        </Link>
        <Flex align="center" gap={2}>
          <Heading
            as="h1"
            fontSize={{ base: 'xl', md: '2xl' }}
            color={COLOR_TOKENS.text}
            fontWeight="bold"
          >
            {dataStructure.name}
          </Heading>
          <Badge colorPalette="teal" variant="subtle" borderRadius="full" px={2.5}>
            Data Structure
          </Badge>
        </Flex>
      </Flex>

      <Box
        bg={COLOR_TOKENS.surface}
        borderRadius="2xl"
        border="1px solid"
        borderColor={COLOR_TOKENS.border}
        p={{ base: 4, md: 6 }}
        mb={8}
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.25)"
      >
        <Text fontSize="sm" color={COLOR_TOKENS.textMuted} mb={6} lineHeight="tall">
          {dataStructure.description}
        </Text>

        {dataStructure.id === 'stack' && <StackVisualizer />}
        {dataStructure.id === 'queue' && <QueueVisualizer />}
        {dataStructure.id === 'singly-linked-list' && <LinkedListVisualizer isDoubly={false} />}
        {dataStructure.id === 'doubly-linked-list' && <LinkedListVisualizer isDoubly={true} />}
      </Box>

      <Grid templateColumns={{ base: '1fr', lg: '340px 1fr' }} gap={8} alignItems="start">
        <GridItem>
          <Box
            bg={COLOR_TOKENS.surface}
            borderRadius="2xl"
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
            p={6}
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
        </GridItem>

        <GridItem>
          <Box
            bg={COLOR_TOKENS.surface}
            borderRadius="2xl"
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
            p={6}
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
              Implementation
            </Text>
            <CodePanel code={dataStructure.code} />
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
}
