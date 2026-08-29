'use client';

import { Container, Grid, Box, Flex, Text, Separator } from '@chakra-ui/react';
import type { DataStructureInfo } from '@/types/algorithm';
import { CodePanel, ComplexityCard, PageNavHeader } from '@/components/shared';
import { StackVisualizer } from './stack-visualizer';
import { QueueVisualizer } from './queue-visualizer';
import { LinkedListVisualizer } from './linked-list-visualizer';
import { getLegendItems } from '@/lib/algorithm-utils';
import { COLOR_TOKENS } from '@/config/colors';

interface DataStructurePageClientProps {
  dataStructure: DataStructureInfo;
}

export function DataStructurePageClient({ dataStructure }: DataStructurePageClientProps) {
  const legendItems = getLegendItems(dataStructure.category);

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
            <ComplexityCard complexity={dataStructure.complexity} />
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
              Color Legend
            </Text>
            <Flex direction="column" gap={2}>
              {legendItems.map(({ color, label }) => (
                <Flex key={label} align="center" gap={3}>
                  <Box w="14px" h="14px" borderRadius="sm" bg={color} flexShrink={0} />
                  <Text fontSize="sm" color={COLOR_TOKENS.text}>
                    {label}
                  </Text>
                </Flex>
              ))}
            </Flex>

            <Separator my={4} borderColor={COLOR_TOKENS.border} />

            <Text fontSize="xs" color={COLOR_TOKENS.textMuted} lineHeight="tall">
              {dataStructure.description}
            </Text>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
