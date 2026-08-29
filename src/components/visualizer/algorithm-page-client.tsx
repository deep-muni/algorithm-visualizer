'use client';

import { Box, Container, Flex, Grid, Text, Heading, Separator } from '@chakra-ui/react';
import { useVisualizer } from '@/hooks/use-visualizer';
import { VisualizerBarChart } from '@/components/visualizer/visualizer-bar-chart';
import { VisualizerControls } from '@/components/visualizer/visualizer-controls';
import { CodePanel } from '@/components/visualizer/code-panel';
import { ComplexityCard } from '@/components/visualizer/complexity-card';
import type { AlgorithmInfo } from '@/types/algorithm';

interface AlgorithmPageClientProps {
  algorithm: AlgorithmInfo;
}

export function AlgorithmPageClient({ algorithm }: AlgorithmPageClientProps) {
  const {
    steps,
    currentStep,
    currentStepData,
    playbackState,
    speed,
    setSpeed,
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
    regenerate,
  } = useVisualizer(algorithm.id);

  return (
    <Container maxW="1200px" py={8} px={4}>
      <Box mb={6}>
        <Heading
          as="h1"
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="bold"
          color="white"
          mb={2}
        >
          {algorithm.name}
        </Heading>
        <Text color="whiteAlpha.600" fontSize="md" maxW="700px">
          {algorithm.description}
        </Text>
      </Box>

      <Grid templateColumns={{ base: '1fr', lg: '1fr 340px' }} gap={6}>
        <Box>
          <Box
            bg="var(--color-surface)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
            p={5}
            mb={4}
          >
            {currentStepData && <VisualizerBarChart step={currentStepData} />}

            <Flex
              mt={4}
              px={2}
              py={3}
              bg="whiteAlpha.50"
              borderRadius="lg"
              align="center"
              minH="44px"
            >
              <Text
                fontSize="sm"
                color="whiteAlpha.800"
                fontFamily="var(--font-mono)"
              >
                {currentStepData?.description ?? ''}
              </Text>
            </Flex>
          </Box>

          <Box
            bg="var(--color-surface)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
            p={5}
          >
            <VisualizerControls
              playbackState={playbackState}
              currentStep={currentStep}
              totalSteps={steps.length}
              speed={speed}
              onPlay={play}
              onPause={pause}
              onStepBack={stepBackward}
              onStepForward={stepForward}
              onReset={reset}
              onSpeedChange={setSpeed}
              onRegenerate={regenerate}
            />
          </Box>

          <Box
            mt={4}
            bg="var(--color-surface)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
            p={5}
          >
            <Text fontSize="sm" fontWeight="semibold" color="whiteAlpha.700" mb={3}>
              Implementation
            </Text>
            <CodePanel code={algorithm.code} />
          </Box>
        </Box>

        <Box>
          <Box
            bg="var(--color-surface)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
            p={5}
            mb={4}
          >
            <ComplexityCard
              complexity={algorithm.complexity}
              stable={algorithm.stable}
              inPlace={algorithm.inPlace}
            />
          </Box>

          <Box
            bg="var(--color-surface)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
            p={5}
          >
            <Text fontSize="sm" fontWeight="semibold" color="whiteAlpha.700" mb={3}>
              Color Legend
            </Text>
            <Flex direction="column" gap={2}>
              {[
                { color: '#4f46e5', label: 'Unsorted' },
                { color: '#f59e0b', label: 'Comparing' },
                { color: '#ef4444', label: 'Swapping' },
                { color: '#10b981', label: 'Sorted' },
              ].map(({ color, label }) => (
                <Flex key={label} align="center" gap={3}>
                  <Box w="14px" h="14px" borderRadius="sm" bg={color} flexShrink={0} />
                  <Text fontSize="sm" color="whiteAlpha.700">
                    {label}
                  </Text>
                </Flex>
              ))}
            </Flex>

            <Separator my={4} borderColor="whiteAlpha.100" />

            <Text fontSize="xs" color="whiteAlpha.400" lineHeight="tall">
              Use the controls to step through the algorithm one frame at a time, or press play to watch it run automatically.
            </Text>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
