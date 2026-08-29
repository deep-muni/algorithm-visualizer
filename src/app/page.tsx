import { Container, Heading, Text, Box } from '@chakra-ui/react';
import { HomeCatalog } from '@/components/shared';
import { COLOR_TOKENS } from '@/config/colors';

export default function HomePage() {
  return (
    <Container maxW="1200px" py={12} px={4}>
      <Box textAlign="center" mb={10}>
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight="bold"
          color={COLOR_TOKENS.text}
          mb={4}
          lineHeight="1.1"
        >
          Algorithm & Data Structure Visualizer
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          color={COLOR_TOKENS.textMuted}
          maxW="680px"
          mx="auto"
          lineHeight="tall"
        >
          Interactive, step-by-step visualizations for fundamental computer science data structures
          and algorithms. Explore runtime complexities, observe animated transitions, and inspect
          clean implementations in TypeScript, Java, and Python.
        </Text>
      </Box>

      <HomeCatalog />
    </Container>
  );
}
