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
  const max = Math.max(...array, 1);

  return (
    <Box
      w="full"
      h="340px"
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      style={
        {
          '--color-bar-default': 'var(--color-indigo)',
          '--color-compare': '#fbbf24',
          '--color-swap': '#f87171',
          '--color-sorted': '#34d399',
        } as React.CSSProperties
      }
    >
      <Flex h="290px" align="flex-end" justify="center" gap="4px" px={2} pb={1}>
        {array.map((value, index) => {
          const heightPct = Math.max((value / max) * 100, 6);
          const color = getBarColor(index, comparing, swapping, sorted);
          const isActive = comparing.includes(index) || swapping.includes(index);
          const isSorted = sorted.includes(index);

          return (
            <Flex
              key={index}
              direction="column"
              align="center"
              justify="flex-end"
              flex={1}
              h="full"
              maxW="54px"
            >
              <Text
                fontSize={{ base: '10px', md: '11px' }}
                fontWeight={isActive ? 'bold' : 'medium'}
                color={isActive ? 'white' : 'var(--color-text-muted)'}
                mb="4px"
                fontFamily="var(--font-mono)"
                style={{
                  transform: isActive ? 'scale(1.15)' : 'scale(1)',
                  transition: 'transform 0.15s ease, color 0.15s ease',
                }}
              >
                {value}
              </Text>
              <Box
                w="full"
                borderTopRadius="md"
                transition="height 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s ease, box-shadow 0.15s ease"
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: color,
                  boxShadow: isActive
                    ? `0 0 16px ${color}bb, inset 0 1px 1px rgba(255,255,255,0.4)`
                    : isSorted
                      ? `0 0 10px ${color}66`
                      : 'inset 0 1px 1px rgba(255,255,255,0.15)',
                }}
              />
            </Flex>
          );
        })}
      </Flex>

      {/* Index numbers row */}
      <Flex
        h="24px"
        align="center"
        justify="center"
        gap="4px"
        px={2}
        borderTop="1px solid"
        borderColor="var(--color-border)"
      >
        {array.map((_, index) => {
          const isActive = comparing.includes(index) || swapping.includes(index);
          return (
            <Flex key={index} justify="center" align="center" flex={1} maxW="54px">
              <Text
                fontSize="10px"
                fontFamily="var(--font-mono)"
                color={isActive ? 'var(--color-indigo)' : 'var(--color-text-muted)'}
                fontWeight={isActive ? 'bold' : 'normal'}
              >
                [{index}]
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}
