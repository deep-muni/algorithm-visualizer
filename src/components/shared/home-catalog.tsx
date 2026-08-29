'use client';

import { useState, useMemo } from 'react';
import { Box, Flex, Button, Input, Heading, Badge, SimpleGrid, Text } from '@chakra-ui/react';
import { CatalogCard } from './catalog-card';
import { sortingAlgorithms, searchingAlgorithms, dataStructures } from '@/data';
import { COLOR_TOKENS } from '@/config/colors';

type FilterCategory = 'all' | 'data-structures' | 'sorting' | 'searching';
type ComplexityFilter = 'all' | 'O(1)' | 'O(log n)' | 'O(n log n)' | 'O(n^2)';

function getComplexityColor(comp: string) {
  if (comp === 'O(1)' || (comp.includes('log n') && !comp.includes('n log n'))) {
    return COLOR_TOKENS.success;
  }
  if (comp.includes('n log n') || comp === 'O(n)') {
    return COLOR_TOKENS.warning;
  }
  return COLOR_TOKENS.danger;
}

export function HomeCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<ComplexityFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.toLowerCase().trim();

  const matchesComplexity = (compStr: string, filter: ComplexityFilter): boolean => {
    if (filter === 'all') return true;
    if (filter === 'O(1)') return compStr.includes('O(1)');
    if (filter === 'O(log n)') return compStr.includes('log n') && !compStr.includes('n log n');
    if (filter === 'O(n log n)') return compStr.includes('n log n') || compStr.includes('n log² n');
    if (filter === 'O(n^2)') return compStr.includes('n²') || compStr.includes('n^2');
    return true;
  };

  const filteredDataStructures = useMemo(() => {
    return dataStructures.filter((ds) => {
      const catMatch = selectedCategory === 'all' || selectedCategory === 'data-structures';
      const textMatch =
        !query ||
        ds.name.toLowerCase().includes(query) ||
        ds.shortDescription.toLowerCase().includes(query);
      const compMatch =
        selectedComplexity === 'all' ||
        matchesComplexity(ds.complexity.insertion, selectedComplexity) ||
        matchesComplexity(ds.complexity.access, selectedComplexity) ||
        matchesComplexity(ds.complexity.search, selectedComplexity);
      return catMatch && textMatch && compMatch;
    });
  }, [selectedCategory, query, selectedComplexity]);

  const filteredSorting = useMemo(() => {
    return sortingAlgorithms.filter((algo) => {
      const catMatch = selectedCategory === 'all' || selectedCategory === 'sorting';
      const textMatch =
        !query ||
        algo.name.toLowerCase().includes(query) ||
        algo.shortDescription.toLowerCase().includes(query);
      const compMatch =
        selectedComplexity === 'all' ||
        matchesComplexity(algo.complexity.worst, selectedComplexity) ||
        matchesComplexity(algo.complexity.average, selectedComplexity);
      return catMatch && textMatch && compMatch;
    });
  }, [selectedCategory, query, selectedComplexity]);

  const filteredSearching = useMemo(() => {
    return searchingAlgorithms.filter((algo) => {
      const catMatch = selectedCategory === 'all' || selectedCategory === 'searching';
      const textMatch =
        !query ||
        algo.name.toLowerCase().includes(query) ||
        algo.shortDescription.toLowerCase().includes(query);
      const compMatch =
        selectedComplexity === 'all' ||
        matchesComplexity(algo.complexity.worst, selectedComplexity) ||
        matchesComplexity(algo.complexity.average, selectedComplexity);
      return catMatch && textMatch && compMatch;
    });
  }, [selectedCategory, query, selectedComplexity]);

  const totalResults =
    filteredDataStructures.length + filteredSorting.length + filteredSearching.length;

  const handleReset = () => {
    setSelectedCategory('all');
    setSelectedComplexity('all');
    setSearchQuery('');
  };

  return (
    <Flex direction={{ base: 'column', lg: 'row' }} gap={8} align="flex-start">
      {/* Left Sidebar Panel (Sticky on Desktop) */}
      <Box
        w={{ base: 'full', lg: '280px' }}
        flexShrink={0}
        position={{ base: 'static', lg: 'sticky' }}
        top={{ base: 'auto', lg: '24px' }}
        display="flex"
        flexDirection="column"
        gap={5}
      >
        {/* Search Box */}
        <Box
          bg={COLOR_TOKENS.surface}
          borderRadius="2xl"
          border="1px solid"
          borderColor={COLOR_TOKENS.border}
          p={4}
        >
          <Text
            fontSize="2xs"
            fontWeight="bold"
            fontFamily="var(--font-mono)"
            textTransform="uppercase"
            letterSpacing="0.08em"
            color={COLOR_TOKENS.textMuted}
            mb={2.5}
          >
            Quick Search
          </Text>
          <Input
            size="sm"
            placeholder="Search visualizers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="var(--color-bg)"
            color={COLOR_TOKENS.text}
            borderColor={COLOR_TOKENS.border}
            fontFamily="var(--font-mono)"
            borderRadius="xl"
          />
        </Box>

        {/* Categories List */}
        <Box
          bg={COLOR_TOKENS.surface}
          borderRadius="2xl"
          border="1px solid"
          borderColor={COLOR_TOKENS.border}
          p={4}
        >
          <Text
            fontSize="2xs"
            fontWeight="bold"
            fontFamily="var(--font-mono)"
            textTransform="uppercase"
            letterSpacing="0.08em"
            color={COLOR_TOKENS.textMuted}
            mb={2.5}
          >
            Categories
          </Text>

          <Flex direction="column" gap={1}>
            <Flex
              role="button"
              tabIndex={0}
              align="center"
              justify="space-between"
              px={3}
              py={2}
              borderRadius="xl"
              cursor="pointer"
              bg={selectedCategory === 'all' ? COLOR_TOKENS.surfaceLight : 'transparent'}
              border="1px solid"
              borderColor={selectedCategory === 'all' ? COLOR_TOKENS.default : 'transparent'}
              _hover={{ bg: COLOR_TOKENS.surfaceLight }}
              onClick={() => setSelectedCategory('all')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedCategory('all');
                }
              }}
            >
              <Text
                fontSize="xs"
                fontFamily="var(--font-mono)"
                color={selectedCategory === 'all' ? COLOR_TOKENS.text : COLOR_TOKENS.textMuted}
                fontWeight={selectedCategory === 'all' ? 'bold' : 'medium'}
              >
                All Topics
              </Text>
              <Badge colorPalette="gray" variant="subtle" fontSize="2xs">
                12
              </Badge>
            </Flex>

            <Flex
              role="button"
              tabIndex={0}
              align="center"
              justify="space-between"
              px={3}
              py={2}
              borderRadius="xl"
              cursor="pointer"
              bg={
                selectedCategory === 'data-structures' ? COLOR_TOKENS.surfaceLight : 'transparent'
              }
              border="1px solid"
              borderColor={
                selectedCategory === 'data-structures' ? COLOR_TOKENS.sorted : 'transparent'
              }
              _hover={{ bg: COLOR_TOKENS.surfaceLight }}
              onClick={() => setSelectedCategory('data-structures')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedCategory('data-structures');
                }
              }}
            >
              <Flex align="center" gap={2}>
                <Box w="6px" h="6px" borderRadius="full" bg={COLOR_TOKENS.sorted} />
                <Text
                  fontSize="xs"
                  fontFamily="var(--font-mono)"
                  color={
                    selectedCategory === 'data-structures'
                      ? COLOR_TOKENS.text
                      : COLOR_TOKENS.textMuted
                  }
                  fontWeight={selectedCategory === 'data-structures' ? 'bold' : 'medium'}
                >
                  Data Structures
                </Text>
              </Flex>
              <Badge colorPalette="teal" variant="subtle" fontSize="2xs">
                {dataStructures.length}
              </Badge>
            </Flex>

            <Flex
              role="button"
              tabIndex={0}
              align="center"
              justify="space-between"
              px={3}
              py={2}
              borderRadius="xl"
              cursor="pointer"
              bg={selectedCategory === 'sorting' ? COLOR_TOKENS.surfaceLight : 'transparent'}
              border="1px solid"
              borderColor={selectedCategory === 'sorting' ? COLOR_TOKENS.default : 'transparent'}
              _hover={{ bg: COLOR_TOKENS.surfaceLight }}
              onClick={() => setSelectedCategory('sorting')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedCategory('sorting');
                }
              }}
            >
              <Flex align="center" gap={2}>
                <Box w="6px" h="6px" borderRadius="full" bg={COLOR_TOKENS.default} />
                <Text
                  fontSize="xs"
                  fontFamily="var(--font-mono)"
                  color={
                    selectedCategory === 'sorting' ? COLOR_TOKENS.text : COLOR_TOKENS.textMuted
                  }
                  fontWeight={selectedCategory === 'sorting' ? 'bold' : 'medium'}
                >
                  Sorting Algorithms
                </Text>
              </Flex>
              <Badge colorPalette="indigo" variant="subtle" fontSize="2xs">
                {sortingAlgorithms.length}
              </Badge>
            </Flex>

            <Flex
              role="button"
              tabIndex={0}
              align="center"
              justify="space-between"
              px={3}
              py={2}
              borderRadius="xl"
              cursor="pointer"
              bg={selectedCategory === 'searching' ? COLOR_TOKENS.surfaceLight : 'transparent'}
              border="1px solid"
              borderColor={selectedCategory === 'searching' ? 'var(--color-violet)' : 'transparent'}
              _hover={{ bg: COLOR_TOKENS.surfaceLight }}
              onClick={() => setSelectedCategory('searching')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedCategory('searching');
                }
              }}
            >
              <Flex align="center" gap={2}>
                <Box w="6px" h="6px" borderRadius="full" bg="var(--color-violet)" />
                <Text
                  fontSize="xs"
                  fontFamily="var(--font-mono)"
                  color={
                    selectedCategory === 'searching' ? COLOR_TOKENS.text : COLOR_TOKENS.textMuted
                  }
                  fontWeight={selectedCategory === 'searching' ? 'bold' : 'medium'}
                >
                  Searching Algorithms
                </Text>
              </Flex>
              <Badge colorPalette="purple" variant="subtle" fontSize="2xs">
                {searchingAlgorithms.length}
              </Badge>
            </Flex>
          </Flex>
        </Box>

        {/* Complexity Filter */}
        <Box
          bg={COLOR_TOKENS.surface}
          borderRadius="2xl"
          border="1px solid"
          borderColor={COLOR_TOKENS.border}
          p={4}
        >
          <Text
            fontSize="2xs"
            fontWeight="bold"
            fontFamily="var(--font-mono)"
            textTransform="uppercase"
            letterSpacing="0.08em"
            color={COLOR_TOKENS.textMuted}
            mb={2.5}
          >
            Big-O (Worst Case) Filter
          </Text>

          <Flex gap={1.5} wrap="wrap">
            {(['all', 'O(1)', 'O(log n)', 'O(n log n)', 'O(n^2)'] as ComplexityFilter[]).map(
              (comp) => {
                const isCompActive = selectedComplexity === comp;
                return (
                  <Button
                    key={comp}
                    size="xs"
                    variant={isCompActive ? 'solid' : 'outline'}
                    bg={isCompActive ? COLOR_TOKENS.default : 'transparent'}
                    color={isCompActive ? 'white' : COLOR_TOKENS.textMuted}
                    borderColor={isCompActive ? COLOR_TOKENS.default : COLOR_TOKENS.border}
                    _hover={{
                      bg: isCompActive ? 'var(--color-indigo-dim)' : COLOR_TOKENS.surfaceLight,
                    }}
                    borderRadius="lg"
                    fontFamily="var(--font-mono)"
                    fontSize="2xs"
                    onClick={() => setSelectedComplexity(comp)}
                  >
                    {comp === 'all' ? 'All Rates' : comp}
                  </Button>
                );
              }
            )}
          </Flex>
        </Box>

        {/* Engine Specs */}
        <Box
          bg={COLOR_TOKENS.surface}
          borderRadius="2xl"
          border="1px solid"
          borderColor={COLOR_TOKENS.border}
          p={4}
          display={{ base: 'none', lg: 'block' }}
        >
          <Text
            fontSize="2xs"
            fontWeight="bold"
            fontFamily="var(--font-mono)"
            textTransform="uppercase"
            letterSpacing="0.08em"
            color={COLOR_TOKENS.textMuted}
            mb={2.5}
          >
            Engine Features
          </Text>
          <Flex direction="column" gap={2}>
            <Text fontSize="2xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
              • Interactive Step-by-Step Stepper
            </Text>
            <Text fontSize="2xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
              • TypeScript, Java, Python Reference
            </Text>
            <Text fontSize="2xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
              • Real-time LIFO/FIFO Pointer Chains
            </Text>
          </Flex>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box flex={1} w="full">
        {/* Active Filter Bar & Results Header */}
        <Flex
          justify="space-between"
          align="center"
          mb={8}
          p={3.5}
          bg={COLOR_TOKENS.surface}
          borderRadius="2xl"
          border="1px solid"
          borderColor={COLOR_TOKENS.border}
          wrap="wrap"
          gap={3}
        >
          <Flex align="center" gap={2}>
            <Text fontSize="xs" fontFamily="var(--font-mono)" color={COLOR_TOKENS.textMuted}>
              Showing:
            </Text>
            <Badge
              colorPalette="indigo"
              variant="subtle"
              borderRadius="full"
              px={2.5}
              fontSize="xs"
            >
              {totalResults} items found
            </Badge>
            {(selectedCategory !== 'all' || selectedComplexity !== 'all' || query) && (
              <Button
                size="xs"
                variant="ghost"
                color={COLOR_TOKENS.textMuted}
                _hover={{ color: COLOR_TOKENS.text }}
                fontFamily="var(--font-mono)"
                fontSize="2xs"
                onClick={handleReset}
              >
                ✕ Clear filters
              </Button>
            )}
          </Flex>
        </Flex>

        {/* Empty state if nothing matches */}
        {totalResults === 0 && (
          <Box
            p={12}
            textAlign="center"
            bg={COLOR_TOKENS.surface}
            borderRadius="2xl"
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
          >
            <Heading as="h3" fontSize="lg" color={COLOR_TOKENS.text} mb={2}>
              No algorithms or data structures match your filter
            </Heading>
            <Text fontSize="sm" color={COLOR_TOKENS.textMuted} mb={4}>
              Try adjusting your search term or complexity filter.
            </Text>
            <Button
              size="sm"
              variant="solid"
              bg={COLOR_TOKENS.default}
              color="white"
              borderRadius="xl"
              onClick={handleReset}
            >
              Reset Filters
            </Button>
          </Box>
        )}

        {/* Data Structures Section */}
        {filteredDataStructures.length > 0 && (
          <Box mb={14}>
            <Flex align="center" gap={3} mb={5}>
              <Box w="10px" h="10px" borderRadius="full" bg={COLOR_TOKENS.sorted} />
              <Heading as="h2" fontSize="xl" color={COLOR_TOKENS.text} fontWeight="bold">
                Data Structures
              </Heading>
              <Badge colorPalette="teal" variant="subtle" borderRadius="full" px={2}>
                {filteredDataStructures.length}
              </Badge>
            </Flex>

            <SimpleGrid columns={{ base: 1, sm: 2, xl: 3 }} gap={5}>
              {filteredDataStructures.map((ds) => (
                <CatalogCard
                  key={ds.id}
                  title={ds.name}
                  categoryLabel="Data Structure"
                  categoryColorPalette="teal"
                  description={ds.shortDescription}
                  href={`/data-structures/${ds.id}`}
                  metrics={[
                    {
                      label: 'Worst Insert',
                      value: ds.complexity.insertion,
                      color: getComplexityColor(ds.complexity.insertion),
                    },
                    {
                      label: 'Worst Search',
                      value: ds.complexity.search,
                      color: getComplexityColor(ds.complexity.search),
                    },
                    {
                      label: 'Space',
                      value: ds.complexity.space,
                      color: COLOR_TOKENS.default,
                    },
                  ]}
                />
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* Sorting Algorithms Section */}
        {filteredSorting.length > 0 && (
          <Box mb={14}>
            <Flex align="center" gap={3} mb={5}>
              <Box w="10px" h="10px" borderRadius="full" bg={COLOR_TOKENS.default} />
              <Heading as="h2" fontSize="xl" color={COLOR_TOKENS.text} fontWeight="bold">
                Sorting Algorithms
              </Heading>
              <Badge colorPalette="indigo" variant="subtle" borderRadius="full" px={2}>
                {filteredSorting.length}
              </Badge>
            </Flex>

            <SimpleGrid columns={{ base: 1, sm: 2, xl: 3 }} gap={5}>
              {filteredSorting.map((algo) => (
                <CatalogCard
                  key={algo.id}
                  title={algo.name}
                  categoryLabel="Sorting"
                  categoryColorPalette="indigo"
                  description={algo.shortDescription}
                  href={`/sorting/${algo.id}`}
                  metrics={[
                    {
                      label: 'Worst',
                      value: algo.complexity.worst,
                      color: getComplexityColor(algo.complexity.worst),
                    },
                    {
                      label: 'Avg',
                      value: algo.complexity.average,
                      color: getComplexityColor(algo.complexity.average),
                    },
                    {
                      label: 'Space',
                      value: algo.complexity.space,
                      color: COLOR_TOKENS.default,
                    },
                  ]}
                />
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* Searching Algorithms Section */}
        {filteredSearching.length > 0 && (
          <Box mb={12}>
            <Flex align="center" gap={3} mb={5}>
              <Box w="10px" h="10px" borderRadius="full" bg="var(--color-violet)" />
              <Heading as="h2" fontSize="xl" color={COLOR_TOKENS.text} fontWeight="bold">
                Searching Algorithms
              </Heading>
              <Badge colorPalette="purple" variant="subtle" borderRadius="full" px={2}>
                {filteredSearching.length}
              </Badge>
            </Flex>

            <SimpleGrid columns={{ base: 1, sm: 2, xl: 3 }} gap={5}>
              {filteredSearching.map((algo) => (
                <CatalogCard
                  key={algo.id}
                  title={algo.name}
                  categoryLabel="Searching"
                  categoryColorPalette="purple"
                  description={algo.shortDescription}
                  href={`/searching/${algo.id}`}
                  metrics={[
                    {
                      label: 'Worst',
                      value: algo.complexity.worst,
                      color: getComplexityColor(algo.complexity.worst),
                    },
                    {
                      label: 'Avg',
                      value: algo.complexity.average,
                      color: getComplexityColor(algo.complexity.average),
                    },
                    {
                      label: 'Space',
                      value: algo.complexity.space,
                      color: COLOR_TOKENS.default,
                    },
                  ]}
                />
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Box>
    </Flex>
  );
}
