import { Box, Grid, Text, Badge } from '@chakra-ui/react';
import type { ComplexityInfo } from '@/types/algorithm';

interface ComplexityCardProps {
  complexity: ComplexityInfo;
  stable?: boolean;
  inPlace?: boolean;
}

function ComplexityBadge({ label, value }: { label: string; value: string }) {
  const isGood = value.includes('n)') || value.includes('log n)');
  const color = isGood ? 'green' : 'orange';

  return (
    <Box
      bg="whiteAlpha.50"
      borderRadius="lg"
      p={3}
      border="1px solid"
      borderColor="whiteAlpha.100"
    >
      <Text fontSize="xs" color="whiteAlpha.500" mb={1}>
        {label}
      </Text>
      <Text
        fontSize="sm"
        fontFamily="var(--font-mono)"
        fontWeight="semibold"
        color={`${color}.300`}
      >
        {value}
      </Text>
    </Box>
  );
}

export function ComplexityCard({ complexity, stable, inPlace }: ComplexityCardProps) {
  return (
    <Box>
      <Text fontSize="sm" fontWeight="semibold" color="whiteAlpha.700" mb={3}>
        Complexity
      </Text>

      <Grid templateColumns="repeat(2, 1fr)" gap={2} mb={3}>
        <ComplexityBadge label="Best Case" value={complexity.best} />
        <ComplexityBadge label="Average Case" value={complexity.average} />
        <ComplexityBadge label="Worst Case" value={complexity.worst} />
        <ComplexityBadge label="Space" value={complexity.space} />
      </Grid>

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
