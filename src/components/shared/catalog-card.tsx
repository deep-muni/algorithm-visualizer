import Link from 'next/link';
import { Box, Flex, Heading, Text, Badge } from '@chakra-ui/react';
import { COLOR_TOKENS } from '@/config/colors';

export interface CatalogCardMetric {
  label: string;
  value: string;
  color?: string;
}

export interface CatalogCardProps {
  title: string;
  categoryLabel: string;
  categoryColorPalette: string;
  description: string;
  href: string;
  metrics: CatalogCardMetric[];
}

export function CatalogCard({
  title,
  categoryLabel,
  categoryColorPalette,
  description,
  href,
  metrics,
}: CatalogCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <Box
        bg={COLOR_TOKENS.surface}
        borderRadius="2xl"
        border="1px solid"
        borderColor={COLOR_TOKENS.border}
        p={5}
        h="full"
        cursor="pointer"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        transition="border-color 0.2s, transform 0.2s, box-shadow 0.2s"
        _hover={{
          borderColor: COLOR_TOKENS.default,
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Box>
          <Flex justify="space-between" align="flex-start" mb={3}>
            <Heading as="h3" fontSize="lg" color={COLOR_TOKENS.text} fontWeight="bold">
              {title}
            </Heading>
            <Badge
              colorPalette={categoryColorPalette}
              variant="subtle"
              borderRadius="full"
              px={2}
              fontSize="xs"
              flexShrink={0}
              ml={2}
            >
              {categoryLabel}
            </Badge>
          </Flex>

          <Text fontSize="sm" color={COLOR_TOKENS.textMuted} mb={4} lineHeight="tall">
            {description}
          </Text>
        </Box>

        <Flex gap={2} flexWrap="wrap" mt="auto">
          {metrics.map((metric, idx) => (
            <Box
              key={idx}
              bg={COLOR_TOKENS.surfaceLight}
              border="1px solid"
              borderColor={COLOR_TOKENS.border}
              borderRadius="md"
              px={2}
              py={1}
            >
              <Text fontSize="xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
                {metric.label}
              </Text>
              <Text
                fontSize="xs"
                fontFamily="var(--font-mono)"
                color={metric.color || COLOR_TOKENS.default}
                fontWeight="bold"
              >
                {metric.value}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </Link>
  );
}
