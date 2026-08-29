'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Container, Flex, Grid, Text, Heading, Separator, Button, Badge } from '@chakra-ui/react';
import { useVisualizer } from '@/hooks/use-visualizer';
import { VisualizerBarChart } from '@/components/visualizer/visualizer-bar-chart';
import { VisualizerControls } from '@/components/visualizer/visualizer-controls';
import { ArrayConfigBar } from '@/components/visualizer/array-config-bar';
import { CodePanel } from '@/components/visualizer/code-panel';
import { ComplexityCard } from '@/components/visualizer/complexity-card';
import { algorithms } from '@/data';
import type { AlgorithmInfo, AlgorithmId } from '@/types/algorithm';

interface AlgorithmPageClientProps {
  algorithm: AlgorithmInfo;
}

export function AlgorithmPageClient({ algorithm }: AlgorithmPageClientProps) {
  const router = useRouter();
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
    setCustomArray,
    regenerate,
  } = useVisualizer(algorithm.id);

  const isRunning = playbackState === 'playing';
  const isSearch = algorithm.category === 'searching';

  const legendItems = isSearch
    ? [
        { color: '#818cf8', label: 'Array Element' },
        { color: '#fbbf24', label: 'Comparing / Inspecting' },
        { color: '#34d399', label: 'Target Found' },
      ]
    : [
        { color: '#818cf8', label: 'Unsorted' },
        { color: '#fbbf24', label: 'Comparing' },
        { color: '#f87171', label: 'Swapping' },
        { color: '#34d399', label: 'Sorted' },
      ];

  const sortingAlgos = algorithms.filter((a) => a.category === 'sorting');
  const searchingAlgos = algorithms.filter((a) => a.category === 'searching');

  return (
    <Container maxW="1200px" py={8} px={4}>
      {/* Breadcrumb / Top Bar */}
      <Flex justify="space-between" align="center" mb={6} gap={4}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button
            size="xs"
            variant="outline"
            borderColor="whiteAlpha.300"
            color="whiteAlpha.900"
            _hover={{ borderColor: 'indigo.400', bg: 'whiteAlpha.100' }}
            fontFamily="var(--font-mono)"
          >
            ← All Algorithms
          </Button>
        </Link>

        {/* Algorithm Switcher Dropdown */}
        <Flex align="center" gap={2}>
          <Text fontSize="xs" color="whiteAlpha.700" fontFamily="var(--font-mono)" display={{ base: 'none', sm: 'block' }}>
            Switch:
          </Text>
          <Box position="relative">
            <select
              value={algorithm.id}
              onChange={(e) => router.push(`/algorithm/${e.target.value as AlgorithmId}`)}
              style={{
                backgroundColor: 'var(--color-surface)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <optgroup label="Sorting Algorithms" style={{ backgroundColor: '#16162a', color: '#a5b4fc' }}>
                {sortingAlgos.map((a) => (
                  <option key={a.id} value={a.id} style={{ backgroundColor: '#13131a', color: '#ffffff' }}>
                    {a.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Searching Algorithms" style={{ backgroundColor: '#16162a', color: '#c084fc' }}>
                {searchingAlgos.map((a) => (
                  <option key={a.id} value={a.id} style={{ backgroundColor: '#13131a', color: '#ffffff' }}>
                    {a.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </Box>
        </Flex>
      </Flex>

      {/* Header Info */}
      <Box mb={6}>
        <Flex align="center" gap={3} mb={2}>
          <Heading
            as="h1"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
            color="white"
          >
            {algorithm.name}
          </Heading>
          <Badge
            colorPalette={algorithm.category === 'sorting' ? 'indigo' : 'purple'}
            variant="subtle"
            borderRadius="full"
            px={2}
            fontSize="xs"
          >
            {algorithm.category}
          </Badge>
        </Flex>
        <Text color="whiteAlpha.800" fontSize="md" maxW="700px">
          {algorithm.description}
        </Text>
      </Box>

      <ArrayConfigBar onArrayChange={setCustomArray} disabled={isRunning} />

      <Grid templateColumns={{ base: '1fr', lg: '1fr 340px' }} gap={6}>
        <Box>
          <Box
            bg="var(--color-surface)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="whiteAlpha.300"
            p={5}
            mb={4}
          >
            {currentStepData && <VisualizerBarChart step={currentStepData} />}

            <Flex
              mt={4}
              px={3}
              py={3}
              bg="whiteAlpha.100"
              borderRadius="lg"
              border="1px solid"
              borderColor="whiteAlpha.200"
              align="center"
              minH="44px"
            >
              <Text
                fontSize="sm"
                color="whiteAlpha.900"
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
            borderColor="whiteAlpha.300"
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
            borderColor="whiteAlpha.300"
            p={5}
          >
            <Text fontSize="sm" fontWeight="semibold" color="whiteAlpha.900" mb={3}>
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
            borderColor="whiteAlpha.300"
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
            borderColor="whiteAlpha.300"
            p={5}
          >
            <Text fontSize="sm" fontWeight="semibold" color="whiteAlpha.900" mb={3}>
              Color Legend
            </Text>
            <Flex direction="column" gap={2}>
              {legendItems.map(({ color, label }) => (
                <Flex key={label} align="center" gap={3}>
                  <Box w="14px" h="14px" borderRadius="sm" bg={color} flexShrink={0} />
                  <Text fontSize="sm" color="whiteAlpha.900">
                    {label}
                  </Text>
                </Flex>
              ))}
            </Flex>

            <Separator my={4} borderColor="whiteAlpha.300" />

            <Text fontSize="xs" color="whiteAlpha.800" lineHeight="tall">
              Use the controls to step through the algorithm one frame at a time, or press play to watch it run automatically.
            </Text>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
