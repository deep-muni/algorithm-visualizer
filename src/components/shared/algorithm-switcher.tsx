'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Flex, Text, Badge } from '@chakra-ui/react';
import { dataStructures, sortingAlgorithms, searchingAlgorithms } from '@/data';
import { COLOR_TOKENS } from '@/config/colors';

interface AlgorithmSwitcherProps {
  currentId: string;
}

export function AlgorithmSwitcher({ currentId }: AlgorithmSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentDS = dataStructures.find((d) => d.id === currentId);
  const currentSorting = sortingAlgorithms.find((s) => s.id === currentId);
  const currentSearching = searchingAlgorithms.find((s) => s.id === currentId);

  const currentItem = currentDS || currentSorting || currentSearching;
  const currentCategory = currentDS ? 'data-structures' : currentSorting ? 'sorting' : 'searching';

  const categoryColor =
    currentCategory === 'data-structures'
      ? COLOR_TOKENS.sorted
      : currentCategory === 'sorting'
        ? COLOR_TOKENS.default
        : 'var(--color-violet)';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (category: string, id: string) => {
    setIsOpen(false);
    if (category === 'data-structures') {
      router.push(`/data-structures/${id}`);
    } else if (category === 'sorting') {
      router.push(`/sorting/${id}`);
    } else {
      router.push(`/searching/${id}`);
    }
  };

  return (
    <Box position="relative" ref={dropdownRef}>
      <Flex
        role="button"
        tabIndex={0}
        align="center"
        gap={2.5}
        px={3.5}
        py={1.5}
        bg={COLOR_TOKENS.surface}
        border="1px solid"
        borderColor={isOpen ? COLOR_TOKENS.default : COLOR_TOKENS.border}
        borderRadius="xl"
        cursor="pointer"
        transition="all 0.2s ease"
        _hover={{
          borderColor: COLOR_TOKENS.default,
          bg: COLOR_TOKENS.surfaceLight,
        }}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <Box w="8px" h="8px" borderRadius="full" bg={categoryColor} flexShrink={0} />
        <Text
          fontSize="xs"
          fontFamily="var(--font-mono)"
          fontWeight="semibold"
          color={COLOR_TOKENS.text}
          maxW="140px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {currentItem?.name || 'Switch'}
        </Text>
        <Text
          fontSize="xs"
          color={COLOR_TOKENS.textMuted}
          transform={isOpen ? 'rotate(180deg)' : 'none'}
          transition="transform 0.2s"
        >
          ▾
        </Text>
      </Flex>

      {isOpen && (
        <Box
          position="absolute"
          top="calc(100% + 8px)"
          right={0}
          left="auto"
          w="300px"
          maxH="420px"
          overflowY="auto"
          bg="var(--color-bg)"
          backdropFilter="blur(16px)"
          border="1px solid"
          borderColor={COLOR_TOKENS.border}
          borderRadius="2xl"
          boxShadow="0 16px 40px var(--color-shadow)"
          p={2}
          zIndex={50}
        >
          <Box mb={2}>
            <Text
              fontSize="2xs"
              fontWeight="bold"
              fontFamily="var(--font-mono)"
              textTransform="uppercase"
              letterSpacing="0.08em"
              color={COLOR_TOKENS.sorted}
              px={3}
              py={1.5}
            >
              Data Structures
            </Text>
            {dataStructures.map((ds) => {
              const isSelected = ds.id === currentId;
              return (
                <Flex
                  key={ds.id}
                  align="center"
                  justify="space-between"
                  px={3}
                  py={2}
                  borderRadius="xl"
                  cursor="pointer"
                  bg={isSelected ? COLOR_TOKENS.surfaceLight : 'transparent'}
                  _hover={{ bg: COLOR_TOKENS.surfaceLight }}
                  onClick={() => handleSelect('data-structures', ds.id)}
                >
                  <Flex align="center" gap={2}>
                    <Box
                      w="6px"
                      h="6px"
                      borderRadius="full"
                      bg={isSelected ? COLOR_TOKENS.sorted : 'transparent'}
                      border="1px solid"
                      borderColor={COLOR_TOKENS.sorted}
                    />
                    <Text
                      fontSize="xs"
                      fontFamily="var(--font-mono)"
                      color={isSelected ? COLOR_TOKENS.text : COLOR_TOKENS.textMuted}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {ds.name}
                    </Text>
                  </Flex>
                  <Badge colorPalette="teal" variant="subtle" fontSize="2xs" px={1.5}>
                    {ds.complexity.insertion}
                  </Badge>
                </Flex>
              );
            })}
          </Box>

          <Box mb={2}>
            <Text
              fontSize="2xs"
              fontWeight="bold"
              fontFamily="var(--font-mono)"
              textTransform="uppercase"
              letterSpacing="0.08em"
              color={COLOR_TOKENS.default}
              px={3}
              py={1.5}
            >
              Sorting Algorithms
            </Text>
            {sortingAlgorithms.map((algo) => {
              const isSelected = algo.id === currentId;
              return (
                <Flex
                  key={algo.id}
                  align="center"
                  justify="space-between"
                  px={3}
                  py={2}
                  borderRadius="xl"
                  cursor="pointer"
                  bg={isSelected ? COLOR_TOKENS.surfaceLight : 'transparent'}
                  _hover={{ bg: COLOR_TOKENS.surfaceLight }}
                  onClick={() => handleSelect('sorting', algo.id)}
                >
                  <Flex align="center" gap={2}>
                    <Box
                      w="6px"
                      h="6px"
                      borderRadius="full"
                      bg={isSelected ? COLOR_TOKENS.default : 'transparent'}
                      border="1px solid"
                      borderColor={COLOR_TOKENS.default}
                    />
                    <Text
                      fontSize="xs"
                      fontFamily="var(--font-mono)"
                      color={isSelected ? COLOR_TOKENS.text : COLOR_TOKENS.textMuted}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {algo.name}
                    </Text>
                  </Flex>
                  <Badge colorPalette="indigo" variant="subtle" fontSize="2xs" px={1.5}>
                    {algo.complexity.average}
                  </Badge>
                </Flex>
              );
            })}
          </Box>

          <Box>
            <Text
              fontSize="2xs"
              fontWeight="bold"
              fontFamily="var(--font-mono)"
              textTransform="uppercase"
              letterSpacing="0.08em"
              color="var(--color-violet)"
              px={3}
              py={1.5}
            >
              Searching Algorithms
            </Text>
            {searchingAlgorithms.map((algo) => {
              const isSelected = algo.id === currentId;
              return (
                <Flex
                  key={algo.id}
                  align="center"
                  justify="space-between"
                  px={3}
                  py={2}
                  borderRadius="xl"
                  cursor="pointer"
                  bg={isSelected ? COLOR_TOKENS.surfaceLight : 'transparent'}
                  _hover={{ bg: COLOR_TOKENS.surfaceLight }}
                  onClick={() => handleSelect('searching', algo.id)}
                >
                  <Flex align="center" gap={2}>
                    <Box
                      w="6px"
                      h="6px"
                      borderRadius="full"
                      bg={isSelected ? 'var(--color-violet)' : 'transparent'}
                      border="1px solid"
                      borderColor="var(--color-violet)"
                    />
                    <Text
                      fontSize="xs"
                      fontFamily="var(--font-mono)"
                      color={isSelected ? COLOR_TOKENS.text : COLOR_TOKENS.textMuted}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {algo.name}
                    </Text>
                  </Flex>
                  <Badge colorPalette="purple" variant="subtle" fontSize="2xs" px={1.5}>
                    {algo.complexity.average}
                  </Badge>
                </Flex>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}
