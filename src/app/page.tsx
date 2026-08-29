import { Container, Heading, Text, Box, Flex, Badge } from '@chakra-ui/react';
import { HomeCatalog } from '@/components/shared';
import { COLOR_TOKENS } from '@/config/colors';

export default function HomePage() {
  return (
    <Container maxW="1400px" py={10} px={{ base: 4, md: 6, lg: 8 }}>
      <Box mb={10} textAlign={{ base: 'center', lg: 'left' }}>
        <Flex align="center" justify={{ base: 'center', lg: 'flex-start' }} gap={2} mb={3}>
          <Badge
            colorPalette="indigo"
            variant="subtle"
            borderRadius="full"
            px={3}
            py={0.5}
            fontSize="xs"
            fontFamily="var(--font-mono)"
          >
            Interactive CS Visualizer
          </Badge>
          <Badge
            colorPalette="teal"
            variant="subtle"
            borderRadius="full"
            px={3}
            py={0.5}
            fontSize="xs"
            fontFamily="var(--font-mono)"
          >
            TypeScript • Java • Python
          </Badge>
        </Flex>

        <Heading
          as="h1"
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}
          fontWeight="bold"
          color={COLOR_TOKENS.text}
          mb={3}
          lineHeight="1.15"
          letterSpacing="-0.02em"
        >
          Algorithms & Data Structures
        </Heading>

        <Text
          fontSize={{ base: 'sm', md: 'md' }}
          color={COLOR_TOKENS.textMuted}
          maxW="720px"
          mx={{ base: 'auto', lg: '0' }}
          lineHeight="tall"
        >
          Step-by-step interactive animations, algorithmic state transitions, and zero-dependency
          multi-language reference implementations.
        </Text>
      </Box>

      <HomeCatalog />
    </Container>
  );
}
