import Link from 'next/link';
import { Container, Heading, Text, SimpleGrid, Box, Flex, Badge } from '@chakra-ui/react';
import { algorithms } from '@/data';
import type { AlgorithmInfo } from '@/types/algorithm';

function AlgorithmCard({ algo }: { algo: AlgorithmInfo }) {
  const isSorting = algo.category === 'sorting';

  return (
    <Link href={`/algorithm/${algo.id}`} style={{ textDecoration: 'none' }}>
      <Box
        bg="var(--color-surface)"
        borderRadius="2xl"
        border="1px solid"
        borderColor="whiteAlpha.300"
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

        <Text fontSize="sm" color="whiteAlpha.800" mb={4} lineHeight="tall">
          {algo.shortDescription}
        </Text>

        <Flex gap={2} flexWrap="wrap">
          <Box bg="whiteAlpha.100" borderRadius="md" px={2} py={1}>
            <Text fontSize="xs" color="whiteAlpha.700">
              Avg
            </Text>
            <Text
              fontSize="xs"
              fontFamily="var(--font-mono)"
              color="orange.300"
              fontWeight="medium"
            >
              {algo.complexity.average}
            </Text>
          </Box>
          <Box bg="whiteAlpha.100" borderRadius="md" px={2} py={1}>
            <Text fontSize="xs" color="whiteAlpha.700">
              Space
            </Text>
            <Text fontSize="xs" fontFamily="var(--font-mono)" color="blue.300" fontWeight="medium">
              {algo.complexity.space}
            </Text>
          </Box>
          {algo.stable !== undefined && (
            <Box bg="whiteAlpha.100" borderRadius="md" px={2} py={1}>
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
  const searchingAlgos = algorithms.filter((a) => a.category === 'searching');

  return (
    <Container maxW="1200px" py={12} px={4}>
      <Box textAlign="center" mb={12}>
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight="bold"
          color="white"
          mb={4}
          lineHeight="1.1"
        >
          Sort & Search Visualizer
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          color="whiteAlpha.800"
          maxW="640px"
          mx="auto"
          lineHeight="tall"
        >
          Interactive visualizations for classic computer science algorithms. Step through frames,
          analyze time & space complexity, and copy implementations in TypeScript, Java, and Python.
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

      <Box mb={12}>
        <Flex align="center" gap={3} mb={6}>
          <Heading as="h2" fontSize="xl" color="white" fontWeight="semibold">
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
