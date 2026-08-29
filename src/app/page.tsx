import Link from 'next/link';
import { Container, Heading, Text, SimpleGrid, Box, Flex, Badge } from '@chakra-ui/react';
import { algorithms } from '@/data';
import type { AlgorithmInfo } from '@/types/algorithm';

function AlgorithmCard({ algo }: { algo: AlgorithmInfo }) {
  return (
    <Link href={`/algorithm/${algo.id}`} style={{ textDecoration: 'none' }}>
      <Box
        bg="var(--color-surface)"
        borderRadius="2xl"
        border="1px solid"
        borderColor="whiteAlpha.100"
        p={5}
        h="full"
        cursor="pointer"
        transition="border-color 0.2s, transform 0.2s"
        _hover={{
          borderColor: 'indigo.500',
          transform: 'translateY(-2px)',
        }}
      >
        <Flex justify="space-between" align="flex-start" mb={3}>
          <Heading as="h3" fontSize="lg" color="white" fontWeight="semibold">
            {algo.name}
          </Heading>
          <Badge
            colorPalette="indigo"
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

        <Text fontSize="sm" color="whiteAlpha.600" mb={4} lineHeight="tall">
          {algo.shortDescription}
        </Text>

        <Flex gap={2} flexWrap="wrap">
          <Box bg="whiteAlpha.50" borderRadius="md" px={2} py={1}>
            <Text fontSize="xs" color="whiteAlpha.500">
              Avg
            </Text>
            <Text fontSize="xs" fontFamily="var(--font-mono)" color="orange.300" fontWeight="medium">
              {algo.complexity.average}
            </Text>
          </Box>
          <Box bg="whiteAlpha.50" borderRadius="md" px={2} py={1}>
            <Text fontSize="xs" color="whiteAlpha.500">
              Space
            </Text>
            <Text fontSize="xs" fontFamily="var(--font-mono)" color="blue.300" fontWeight="medium">
              {algo.complexity.space}
            </Text>
          </Box>
          {algo.stable !== undefined && (
            <Box bg="whiteAlpha.50" borderRadius="md" px={2} py={1}>
              <Text
                fontSize="xs"
                fontFamily="var(--font-mono)"
                color={algo.stable ? 'green.300' : 'red.300'}
                fontWeight="medium"
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

export default function HomePage() {
  const sortingAlgos = algorithms.filter((a) => a.category === 'sorting');

  return (
    <Container maxW="1200px" py={16} px={4}>
      <Box textAlign="center" mb={16}>
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight="bold"
          color="white"
          mb={4}
          lineHeight="1.1"
        >
          Algorithm Visualizer
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          color="whiteAlpha.600"
          maxW="560px"
          mx="auto"
          lineHeight="tall"
        >
          Watch sorting and searching algorithms come to life, step by step. Explore complexity, copy implementations in TypeScript, Java, or Python.
        </Text>
      </Box>

      <Box mb={12}>
        <Flex align="center" gap={3} mb={6}>
          <Heading as="h2" fontSize="xl" color="white" fontWeight="semibold">
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
    </Container>
  );
}
