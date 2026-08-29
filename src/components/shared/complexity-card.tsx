import { Box, Grid, Text, Badge } from '@chakra-ui/react';
import type { ComplexityInfo, DataStructureComplexity } from '@/types/algorithm';
import { COLOR_TOKENS } from '@/config/colors';

interface ComplexityCardProps {
  complexity: ComplexityInfo | DataStructureComplexity;
  stable?: boolean;
  inPlace?: boolean;
}

function ComplexityBadge({ label, value }: { label: string; value: string }) {
  const isGood = value.includes('n)') || value.includes('log n)') || value === 'O(1)';
  const color = isGood ? COLOR_TOKENS.success : COLOR_TOKENS.warning;

  return (
    <Box
      bg={COLOR_TOKENS.surfaceLight}
      borderRadius="lg"
      p={3}
      border="1px solid"
      borderColor={COLOR_TOKENS.border}
    >
      <Text fontSize="xs" color={COLOR_TOKENS.textMuted} mb={1} fontFamily="var(--font-mono)">
        {label}
      </Text>
      <Text fontSize="sm" fontFamily="var(--font-mono)" fontWeight="bold" color={color}>
        {value}
      </Text>
    </Box>
  );
}

export function ComplexityCard({ complexity, stable, inPlace }: ComplexityCardProps) {
  const isDataStructure = 'access' in complexity;

  return (
    <Box>
      <Text
        fontSize="xs"
        fontWeight="semibold"
        color={COLOR_TOKENS.textMuted}
        fontFamily="var(--font-mono)"
        textTransform="uppercase"
        letterSpacing="0.05em"
        mb={3}
      >
        Complexity Analysis
      </Text>

      {isDataStructure ? (
        <>
          <Grid templateColumns="repeat(2, 1fr)" gap={2} mb={2}>
            <ComplexityBadge label="Access" value={complexity.access} />
            <ComplexityBadge label="Search" value={complexity.search} />
            <ComplexityBadge label="Insertion" value={complexity.insertion} />
            <ComplexityBadge label="Deletion" value={complexity.deletion} />
          </Grid>
          <Box mb={3}>
            <ComplexityBadge label="Space Complexity" value={complexity.space} />
          </Box>
        </>
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap={2} mb={3}>
          <ComplexityBadge label="Best Case" value={complexity.best} />
          <ComplexityBadge label="Average Case" value={complexity.average} />
          <ComplexityBadge label="Worst Case" value={complexity.worst} />
          <ComplexityBadge label="Space" value={complexity.space} />
        </Grid>
      )}

      <Box display="flex" gap={2} flexWrap="wrap">
        {stable !== undefined && (
          <Badge
            colorPalette={stable ? 'green' : 'red'}
            variant="subtle"
            borderRadius="full"
            px={2}
            fontSize="xs"
          >
            {stable ? 'Stable' : 'Unstable'}
          </Badge>
        )}
        {inPlace !== undefined && (
          <Badge
            colorPalette={inPlace ? 'blue' : 'orange'}
            variant="subtle"
            borderRadius="full"
            px={2}
            fontSize="xs"
          >
            {inPlace ? 'In-Place' : 'Not In-Place'}
          </Badge>
        )}
      </Box>
    </Box>
  );
}
