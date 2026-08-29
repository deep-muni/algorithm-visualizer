'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import type { VisualizationStep } from '@/types/algorithm';
import { getBarColor, calculateBarHeightPct } from '@/lib/chart-utils';

interface VisualizerBarChartProps {
  step: VisualizationStep;
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
    >
      <Flex h="290px" align="flex-end" justify="center" gap="5px" px={2} pb={2}>
        {array.map((value, index) => {
          const heightPct = calculateBarHeightPct(value, max);
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
              maxW="52px"
            >
              <Text
                fontSize={{ base: '10px', md: '12px' }}
                fontWeight={isActive ? 'bold' : '600'}
                mb="4px"
                fontFamily="var(--font-mono)"
                style={{
                  color: isActive ? color : 'var(--color-text)',
                  transform: isActive ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.15s ease, color 0.15s ease',
                  textShadow: isActive ? `0 0 10px ${color}` : 'none',
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
          const color = getBarColor(index, comparing, swapping, sorted);
          return (
            <Flex key={index} justify="center" align="center" flex={1} maxW="52px">
              <Text
                fontSize="11px"
                fontFamily="var(--font-mono)"
                fontWeight={isActive ? 'bold' : 'normal'}
                style={{
                  color: isActive ? color : 'var(--color-text-muted)',
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
