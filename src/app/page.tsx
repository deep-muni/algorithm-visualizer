import { Container, Heading, Text, SimpleGrid, Box, Flex, Badge } from '@chakra-ui/react';
import { sortingAlgorithms, searchingAlgorithms, dataStructures } from '@/data';
import { CatalogCard } from '@/components/shared';
import { COLOR_TOKENS } from '@/config/colors';

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
          Algorithm & Data Structure Visualizer
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          color={COLOR_TOKENS.textMuted}
          maxW="680px"
          mx="auto"
          lineHeight="tall"
        >
          Interactive, step-by-step visualizations for fundamental computer science data structures
          and algorithms. Explore runtime complexities, observe animated transitions, and inspect
          clean implementations in TypeScript, Java, and Python.
        </Text>
      </Box>

      <Box mb={14}>
        <Flex align="center" gap={3} mb={6}>
          <Heading as="h2" fontSize="xl" color={COLOR_TOKENS.text} fontWeight="bold">
            Data Structures
          </Heading>
          <Badge colorPalette="teal" variant="subtle" borderRadius="full" px={2}>
            {dataStructures.length}
          </Badge>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={5}>
          {dataStructures.map((ds) => (
            <CatalogCard
              key={ds.id}
              title={ds.name}
              categoryLabel="Data Structure"
              categoryColorPalette="teal"
              description={ds.shortDescription}
              href={`/data-structures/${ds.id}`}
              metrics={[
                { label: 'Insert', value: ds.complexity.insertion, color: COLOR_TOKENS.success },
                { label: 'Delete', value: ds.complexity.deletion, color: COLOR_TOKENS.success },
                { label: 'Space', value: ds.complexity.space, color: COLOR_TOKENS.default },
              ]}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Box mb={14}>
        <Flex align="center" gap={3} mb={6}>
          <Heading as="h2" fontSize="xl" color={COLOR_TOKENS.text} fontWeight="bold">
            Sorting Algorithms
          </Heading>
          <Badge colorPalette="indigo" variant="subtle" borderRadius="full" px={2}>
            {sortingAlgorithms.length}
          </Badge>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={5}>
          {sortingAlgorithms.map((algo) => (
            <CatalogCard
              key={algo.id}
              title={algo.name}
              categoryLabel="Sorting"
              categoryColorPalette="indigo"
              description={algo.shortDescription}
              href={`/sorting/${algo.id}`}
              metrics={[
                { label: 'Avg', value: algo.complexity.average, color: COLOR_TOKENS.warning },
                { label: 'Space', value: algo.complexity.space, color: COLOR_TOKENS.default },
                ...(algo.stable !== undefined
                  ? [
                      {
                        label: 'Stability',
                        value: algo.stable ? 'Stable' : 'Unstable',
                        color: algo.stable ? COLOR_TOKENS.success : COLOR_TOKENS.danger,
                      },
                    ]
                  : []),
              ]}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Box mb={12}>
        <Flex align="center" gap={3} mb={6}>
          <Heading as="h2" fontSize="xl" color={COLOR_TOKENS.text} fontWeight="bold">
            Searching Algorithms
          </Heading>
          <Badge colorPalette="purple" variant="subtle" borderRadius="full" px={2}>
            {searchingAlgorithms.length}
          </Badge>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={5}>
          {searchingAlgorithms.map((algo) => (
            <CatalogCard
              key={algo.id}
              title={algo.name}
              categoryLabel="Searching"
              categoryColorPalette="purple"
              description={algo.shortDescription}
              href={`/searching/${algo.id}`}
              metrics={[
                { label: 'Avg', value: algo.complexity.average, color: COLOR_TOKENS.warning },
                { label: 'Space', value: algo.complexity.space, color: COLOR_TOKENS.default },
                ...(algo.stable !== undefined
                  ? [
                      {
                        label: 'Stability',
                        value: algo.stable ? 'Stable' : 'Unstable',
                        color: algo.stable ? COLOR_TOKENS.success : COLOR_TOKENS.danger,
                      },
                    ]
                  : []),
              ]}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
