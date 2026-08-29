'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import type { VisualizationStep } from '@/types/algorithm';

interface VisualizerBarChartProps {
  step: VisualizationStep;
}

function getBarColor(
  index: number,
  comparing: number[],
  swapping: number[],
  sorted: number[]
): string {
  if (sorted.includes(index)) return 'var(--color-sorted)';
  if (swapping.includes(index)) return 'var(--color-swap)';
  if (comparing.includes(index)) return 'var(--color-compare)';
  return 'var(--color-bar-default)';
}

export function VisualizerBarChart({ step }: VisualizerBarChartProps) {
  const { array, comparing, swapping, sorted } = step;
  const max = Math.max(...array);

  return (
    <Box
      w="full"
      h="280px"
      position="relative"
      style={
        {
          '--color-bar-default': '#818cf8',
          '--color-compare': '#fbbf24',
          '--color-swap': '#f87171',
          '--color-sorted': '#34d399',
        } as React.CSSProperties
      }
    >
      <Flex h="full" align="flex-end" justify="center" gap="3px" px={2}>
        {array.map((value, index) => {
          const heightPct = (value / max) * 100;
          const color = getBarColor(index, comparing, swapping, sorted);
          const isActive = comparing.includes(index) || swapping.includes(index);

          return (
            <Flex
              key={index}
              direction="column"
              align="center"
              justify="flex-end"
              flex={1}
              h="full"
              maxW="60px"
            >
              <Text
                fontSize="10px"
                color="whiteAlpha.600"
                mb="2px"
                fontFamily="var(--font-mono)"
                style={{ opacity: isActive ? 1 : 0.5 }}
              >
                {value}
              </Text>
              <Box
                w="full"
                borderTopRadius="sm"
                transition="height 0.15s ease, background-color 0.15s ease"
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: color,
                  boxShadow: isActive ? `0 0 8px ${color}88` : 'none',
                }}
              />
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}
