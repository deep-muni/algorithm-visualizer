'use client';

import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import type { VisualizationStep } from '@/types/algorithm';
import { getBarColor, calculateBarHeightPct } from '@/lib/chart-utils';

interface VisualizerBarChartProps {
  step: VisualizationStep;
}

export function VisualizerBarChart({ step }: VisualizerBarChartProps) {
  const { array, comparing, swapping, sorted } = step;
  const max = Math.max(...array, 1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getBarStatus = (index: number) => {
    if (swapping.includes(index)) {
      const other = swapping.find((i) => i !== index);
      return {
        label: other !== undefined ? `Swapping with [${other}]` : 'Swapping',
        color: '#c084fc',
      };
    }
    if (comparing.includes(index)) {
      const other = comparing.find((i) => i !== index);
      return {
        label: other !== undefined ? `Comparing with [${other}]` : 'Comparing',
        color: '#fbbf24',
      };
    }
    if (sorted.includes(index)) {
      return {
        label: 'Sorted / In Place',
        color: '#34d399',
      };
    }
    return {
      label: 'Unsorted',
      color: '#818cf8',
    };
  };

  return (
    <Box
      w="full"
      h="340px"
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
    >
      {hoveredIndex !== null && hoveredIndex < array.length && (
        <Box
          position="absolute"
          top={2}
          left="50%"
          transform="translateX(-50%)"
          zIndex={10}
          px={3.5}
          py={1.5}
          bg="var(--color-surface)"
          borderRadius="xl"
          border="1px solid var(--color-border)"
          boxShadow="0 8px 24px var(--color-shadow)"
          backdropFilter="blur(12px)"
          pointerEvents="none"
        >
          <Flex align="center" gap={2}>
            <Box
              w="8px"
              h="8px"
              borderRadius="full"
              bg={getBarStatus(hoveredIndex).color}
              boxShadow={`0 0 8px ${getBarStatus(hoveredIndex).color}`}
            />
            <Text
              fontSize="xs"
              fontFamily="var(--font-mono)"
              color="var(--color-text)"
              fontWeight="bold"
            >
              Index [{hoveredIndex}]:{' '}
              <span style={{ color: getBarStatus(hoveredIndex).color }}>{array[hoveredIndex]}</span>
            </Text>
            <Text fontSize="2xs" color="var(--color-text-muted)" fontFamily="var(--font-mono)">
              • {getBarStatus(hoveredIndex).label}
            </Text>
          </Flex>
        </Box>
      )}

      <Flex h="290px" align="flex-end" justify="center" gap="5px" px={2} pb={2}>
        {array.map((value, index) => {
          const heightPct = calculateBarHeightPct(value, max);
          const color = getBarColor(index, comparing, swapping, sorted);
          const isActive = comparing.includes(index) || swapping.includes(index);
          const isSorted = sorted.includes(index);
          const isHovered = hoveredIndex === index;

          return (
            <Flex
              key={index}
              direction="column"
              align="center"
              justify="flex-end"
              flex={1}
              h="full"
              maxW="52px"
              cursor="pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Text
                fontSize={{ base: '10px', md: '12px' }}
                fontWeight={isActive || isHovered ? 'bold' : '600'}
                mb="4px"
                fontFamily="var(--font-mono)"
                style={{
                  color: isHovered ? 'white' : isActive ? color : 'var(--color-text)',
                  transform: isActive || isHovered ? 'scale(1.25)' : 'scale(1)',
                  transition: 'transform 0.15s ease, color 0.15s ease',
                  textShadow: isActive || isHovered ? `0 0 10px ${color}` : 'none',
                }}
              >
                {value}
              </Text>

              <Box
                w="full"
                borderTopRadius="md"
                transition="height 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease"
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: isHovered ? 'var(--color-indigo)' : color,
                  transform: isHovered ? 'scaleY(1.02)' : 'scaleY(1)',
                  transformOrigin: 'bottom',
                  boxShadow: isHovered
                    ? `0 0 20px var(--color-indigo), inset 0 1px 1px rgba(255,255,255,0.6)`
                    : isActive
                      ? `0 0 18px ${color}cc, inset 0 1px 1px rgba(255,255,255,0.4)`
                      : isSorted
                        ? `0 0 10px ${color}66`
                        : 'inset 0 1px 1px rgba(255,255,255,0.15)',
                }}
              />
            </Flex>
          );
        })}
      </Flex>

      <Flex
        h="26px"
        align="center"
        justify="center"
        gap="5px"
        px={2}
        borderTop="1px solid"
        borderColor="var(--color-border)"
      >
        {array.map((_, index) => {
          const isActive = comparing.includes(index) || swapping.includes(index);
          const isHovered = hoveredIndex === index;
          const color = getBarColor(index, comparing, swapping, sorted);
          return (
            <Flex
              key={index}
              justify="center"
              align="center"
              flex={1}
              maxW="52px"
              cursor="pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Text
                fontSize="11px"
                fontFamily="var(--font-mono)"
                fontWeight={isActive || isHovered ? 'bold' : 'normal'}
                style={{
                  color: isHovered
                    ? 'var(--color-text)'
                    : isActive
                      ? color
                      : 'var(--color-text-muted)',
                }}
              >
                {index}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}
