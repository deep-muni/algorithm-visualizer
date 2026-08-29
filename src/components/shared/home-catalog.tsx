'use client';

import { useState } from 'react';
import { Box, Flex, Button, Input, Heading, Badge, SimpleGrid } from '@chakra-ui/react';
import { CatalogCard } from './catalog-card';
import { sortingAlgorithms, searchingAlgorithms, dataStructures } from '@/data';
import { COLOR_TOKENS } from '@/config/colors';

type FilterCategory = 'all' | 'data-structures' | 'sorting' | 'searching';

export function HomeCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.toLowerCase().trim();

  const filteredDataStructures = dataStructures.filter(
    (ds) =>
      (selectedCategory === 'all' || selectedCategory === 'data-structures') &&
      (!query ||
        ds.name.toLowerCase().includes(query) ||
        ds.shortDescription.toLowerCase().includes(query))
  );

  const filteredSorting = sortingAlgorithms.filter(
    (algo) =>
      (selectedCategory === 'all' || selectedCategory === 'sorting') &&
      (!query ||
        algo.name.toLowerCase().includes(query) ||
        algo.shortDescription.toLowerCase().includes(query))
  );

  const filteredSearching = searchingAlgorithms.filter(
    (algo) =>
      (selectedCategory === 'all' || selectedCategory === 'searching') &&
      (!query ||
        algo.name.toLowerCase().includes(query) ||
        algo.shortDescription.toLowerCase().includes(query))
  );

  const totalCount = dataStructures.length + sortingAlgorithms.length + searchingAlgorithms.length;

  return (
    <Box>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        align="center"
        gap={4}
        mb={10}
        p={2}
        bg={COLOR_TOKENS.surface}
        borderRadius="2xl"
        border="1px solid"
        borderColor={COLOR_TOKENS.border}
      >
        <Flex gap={2} wrap="wrap">
          <Button
            size="sm"
            variant={selectedCategory === 'all' ? 'solid' : 'ghost'}
            bg={selectedCategory === 'all' ? COLOR_TOKENS.default : 'transparent'}
            color={selectedCategory === 'all' ? 'white' : COLOR_TOKENS.textMuted}
            _hover={{
              bg:
                selectedCategory === 'all' ? 'var(--color-indigo-dim)' : COLOR_TOKENS.surfaceLight,
            }}
            borderRadius="xl"
            fontFamily="var(--font-mono)"
            fontSize="xs"
            onClick={() => setSelectedCategory('all')}
          >
            All ({totalCount})
          </Button>

          <Button
            size="sm"
            variant={selectedCategory === 'data-structures' ? 'solid' : 'ghost'}
            bg={selectedCategory === 'data-structures' ? COLOR_TOKENS.default : 'transparent'}
            color={selectedCategory === 'data-structures' ? 'white' : COLOR_TOKENS.textMuted}
            _hover={{
              bg:
                selectedCategory === 'data-structures'
                  ? 'var(--color-indigo-dim)'
                  : COLOR_TOKENS.surfaceLight,
            }}
            borderRadius="xl"
            fontFamily="var(--font-mono)"
            fontSize="xs"
            onClick={() => setSelectedCategory('data-structures')}
          >
            Data Structures ({dataStructures.length})
          </Button>

          <Button
            size="sm"
            variant={selectedCategory === 'sorting' ? 'solid' : 'ghost'}
            bg={selectedCategory === 'sorting' ? COLOR_TOKENS.default : 'transparent'}
            color={selectedCategory === 'sorting' ? 'white' : COLOR_TOKENS.textMuted}
            _hover={{
              bg:
                selectedCategory === 'sorting'
                  ? 'var(--color-indigo-dim)'
                  : COLOR_TOKENS.surfaceLight,
            }}
            borderRadius="xl"
            fontFamily="var(--font-mono)"
            fontSize="xs"
            onClick={() => setSelectedCategory('sorting')}
          >
            Sorting ({sortingAlgorithms.length})
          </Button>

          <Button
            size="sm"
            variant={selectedCategory === 'searching' ? 'solid' : 'ghost'}
            bg={selectedCategory === 'searching' ? COLOR_TOKENS.default : 'transparent'}
            color={selectedCategory === 'searching' ? 'white' : COLOR_TOKENS.textMuted}
            _hover={{
              bg:
                selectedCategory === 'searching'
                  ? 'var(--color-indigo-dim)'
                  : COLOR_TOKENS.surfaceLight,
            }}
            borderRadius="xl"
            fontFamily="var(--font-mono)"
            fontSize="xs"
            onClick={() => setSelectedCategory('searching')}
          >
            Searching ({searchingAlgorithms.length})
          </Button>
        </Flex>

        <Input
          size="sm"
          placeholder="Filter algorithms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          w={{ base: 'full', sm: '220px' }}
          bg="var(--color-bg)"
          color={COLOR_TOKENS.text}
          borderColor={COLOR_TOKENS.border}
          fontFamily="var(--font-mono)"
          borderRadius="xl"
        />
      </Flex>

      {filteredDataStructures.length > 0 && (
        <Box mb={14}>
          <Flex align="center" gap={3} mb={6}>
            <Heading as="h2" fontSize="xl" color={COLOR_TOKENS.text} fontWeight="bold">
              Data Structures
            </Heading>
            <Badge colorPalette="teal" variant="subtle" borderRadius="full" px={2}>
              {filteredDataStructures.length}
            </Badge>
          </Flex>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={5}>
            {filteredDataStructures.map((ds) => (
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
      )}

      {filteredSorting.length > 0 && (
        <Box mb={14}>
          <Flex align="center" gap={3} mb={6}>
            <Heading as="h2" fontSize="xl" color={COLOR_TOKENS.text} fontWeight="bold">
              Sorting Algorithms
            </Heading>
            <Badge colorPalette="indigo" variant="subtle" borderRadius="full" px={2}>
              {filteredSorting.length}
            </Badge>
          </Flex>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={5}>
            {filteredSorting.map((algo) => (
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
      )}

      {filteredSearching.length > 0 && (
        <Box mb={12}>
          <Flex align="center" gap={3} mb={6}>
            <Heading as="h2" fontSize="xl" color={COLOR_TOKENS.text} fontWeight="bold">
              Searching Algorithms
            </Heading>
            <Badge colorPalette="purple" variant="subtle" borderRadius="full" px={2}>
              {filteredSearching.length}
            </Badge>
          </Flex>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={5}>
            {filteredSearching.map((algo) => (
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
      )}
    </Box>
  );
}
