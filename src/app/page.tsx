import Link from 'next/link';
import { Container, Heading, Text, SimpleGrid, Box, Flex, Badge } from '@chakra-ui/react';
import { algorithms } from '@/data';
import { groupAlgorithms } from '@/lib/algorithm-utils';
import { COLOR_TOKENS } from '@/config/colors';
import type { AlgorithmInfo } from '@/types/algorithm';

function AlgorithmCard({ algo }: { algo: AlgorithmInfo }) {
  const isSorting = algo.category === 'sorting';

  return (
    <Link href={`/algorithm/${algo.id}`} style={{ textDecoration: 'none' }}>
      <Box
        bg={COLOR_TOKENS.surface}
        borderRadius="2xl"
        border="1px solid"
        borderColor={COLOR_TOKENS.border}
        p={5}
        h="full"
        cursor="pointer"
        transition="border-color 0.2s, transform 0.2s, box-shadow 0.2s"
        _hover={{
          borderColor: COLOR_TOKENS.default,
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Flex justify="space-between" align="flex-start" mb={3}>
          <Heading as="h3" fontSize="lg" color={COLOR_TOKENS.text} fontWeight="bold">
            {algo.name}
          </Heading>
          <Badge
            colorPalette={isSorting ? 'indigo' : 'purple'}
            variant="subtle"
            borderRadius="full"
            px={2}
            fontSize="xs"
            flexShrink={0}
            ml={2}
          >
            {algo.category}
          </Badge>
        </Flex>

        <Text fontSize="sm" color={COLOR_TOKENS.textMuted} mb={4} lineHeight="tall">
          {algo.shortDescription}
        </Text>

        <Flex gap={2} flexWrap="wrap">
          <Box
            bg={COLOR_TOKENS.surfaceLight}
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
            borderRadius="md"
            px={2}
            py={1}
          >
            <Text fontSize="xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
              Avg
            </Text>
            <Text
              fontSize="xs"
              fontFamily="var(--font-mono)"
              color={COLOR_TOKENS.warning}
              fontWeight="bold"
            >
              {algo.complexity.average}
            </Text>
          </Box>
          <Box
            bg={COLOR_TOKENS.surfaceLight}
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
            borderRadius="md"
            px={2}
            py={1}
          >
            <Text fontSize="xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
              Space
            </Text>
            <Text
              fontSize="xs"
              fontFamily="var(--font-mono)"
              color={COLOR_TOKENS.default}
              fontWeight="bold"
            >
              {algo.complexity.space}
            </Text>
          </Box>
          {algo.stable !== undefined && (
            <Box
              bg={COLOR_TOKENS.surfaceLight}
              border="1px solid"
              borderColor={COLOR_TOKENS.border}
              borderRadius="md"
              px={2}
              py={1}
            >
              <Text
                fontSize="xs"
                fontFamily="var(--font-mono)"
                color={algo.stable ? COLOR_TOKENS.success : COLOR_TOKENS.danger}
                fontWeight="bold"
              >
                {algo.stable ? 'Stable' : 'Unstable'}
              </Text>
            </Box>
          )}
        </Flex>
      </Box>
    </Link>
  );
}

const { sorting: sortingAlgos, searching: searchingAlgos } = groupAlgorithms(algorithms);

export default function HomePage() {
  return (
    <Container maxW="1200px" py={12} px={4}>
      <Box textAlign="center" mb={14}>
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight="bold"
          color={COLOR_TOKENS.text}
          mb={4}
          lineHeight="1.1"
        >
          Algorithm Visualizer
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          color={COLOR_TOKENS.textMuted}
          maxW="640px"
          mx="auto"
          lineHeight="tall"
        >
          Interactive, step-by-step animations for classic computer science algorithms. Observe how
          data transforms frame-by-frame, understand complexity trade-offs, and copy clean
          implementations in TypeScript, Java, and Python.
        </Text>
      </Box>

      <Box mb={12}>
        <Flex align="center" gap={3} mb={6}>
          <Heading as="h2" fontSize="xl" color={COLOR_TOKENS.text} fontWeight="bold">
            Sorting Algorithms
          </Heading>
          <Badge colorPalette="indigo" variant="subtle" borderRadius="full" px={2}>
            {sortingAlgos.length}
          </Badge>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
          {sortingAlgos.map((algo) => (
            <AlgorithmCard key={algo.id} algo={algo} />
          ))}
        </SimpleGrid>
      </Box>

      <Box mb={12}>
        <Flex align="center" gap={3} mb={6}>
          <Heading as="h2" fontSize="xl" color={COLOR_TOKENS.text} fontWeight="bold">
            Searching Algorithms
          </Heading>
          <Badge colorPalette="purple" variant="subtle" borderRadius="full" px={2}>
            {searchingAlgos.length}
          </Badge>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
          {searchingAlgos.map((algo) => (
            <AlgorithmCard key={algo.id} algo={algo} />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
