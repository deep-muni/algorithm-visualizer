'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Flex,
  Grid,
  Text,
  Heading,
  Separator,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import { useVisualizer } from '@/hooks/use-visualizer';
import { VisualizerBarChart } from '@/components/visualizer/visualizer-bar-chart';
import { VisualizerControls } from '@/components/visualizer/visualizer-controls';
import { ArrayConfigBar } from '@/components/visualizer/array-config-bar';
import { CodePanel } from '@/components/visualizer/code-panel';
import { ComplexityCard } from '@/components/visualizer/complexity-card';
import { algorithms } from '@/data';
import { getLegendItems, groupAlgorithms } from '@/lib/algorithm-utils';
import type { AlgorithmInfo, AlgorithmId } from '@/types/algorithm';

interface AlgorithmPageClientProps {
  algorithm: AlgorithmInfo;
}

const { sorting: sortingAlgos, searching: searchingAlgos } = groupAlgorithms(algorithms);

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
  const legendItems = getLegendItems(algorithm.category);

  return (
    <Container maxW="1200px" py={6} px={4}>
      <Flex justify="space-between" align="center" mb={5} wrap="wrap" gap={3}>
        <Flex align="center" gap={3}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <IconButton
              aria-label="Back to all algorithms"
              variant="outline"
              size="xs"
              borderRadius="md"
              borderColor="var(--color-border)"
              color="var(--color-text)"
              _hover={{ borderColor: 'var(--color-indigo)', bg: 'var(--color-surface-light)' }}
              title="Back to all algorithms"
            >
              ←
            </IconButton>
          </Link>

          <Heading
            as="h1"
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="bold"
            color="var(--color-text)"
          >
            {algorithm.name}
          </Heading>

          <Badge
            colorPalette={algorithm.category === 'sorting' ? 'indigo' : 'purple'}
            variant="subtle"
            borderRadius="full"
            px={2}
            fontSize="2xs"
          >
            {algorithm.category}
          </Badge>
        </Flex>

        <Flex align="center" gap={2}>
          <Text
            fontSize="xs"
            color="var(--color-text-muted)"
            fontFamily="var(--font-mono)"
            display={{ base: 'none', sm: 'block' }}
          >
            Switch:
          </Text>
          <select
            value={algorithm.id}
            onChange={(e) => router.push(`/algorithm/${e.target.value as AlgorithmId}`)}
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              padding: '5px 10px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <optgroup
              label="Sorting Algorithms"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-indigo)' }}
            >
              {sortingAlgos.map((a) => (
                <option
                  key={a.id}
                  value={a.id}
                  style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
                >
                  {a.name}
                </option>
              ))}
            </optgroup>
            <optgroup
              label="Searching Algorithms"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-violet)' }}
            >
              {searchingAlgos.map((a) => (
                <option
                  key={a.id}
                  value={a.id}
                  style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
                >
                  {a.name}
                </option>
              ))}
            </optgroup>
          </select>
        </Flex>
      </Flex>

      <ArrayConfigBar onArrayChange={setCustomArray} disabled={isRunning} />

      <Box
        bg="var(--color-surface)"
        borderRadius="2xl"
        border="1px solid"
        borderColor="var(--color-border)"
        p={{ base: 4, md: 6 }}
        mb={6}
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.25)"
      >
        {currentStepData && <VisualizerBarChart step={currentStepData} />}

        <Flex
          mt={4}
          px={4}
          py={3}
          bg="var(--color-surface-light)"
          borderRadius="xl"
          border="1px solid"
          borderColor="var(--color-border)"
          align="center"
          minH="48px"
        >
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="var(--color-text)"
            fontFamily="var(--font-mono)"
          >
            {currentStepData?.description ?? ''}
          </Text>
        </Flex>

        <Separator my={4} borderColor="var(--color-border)" />

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

      <Grid templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }} gap={6} mb={8} alignItems="start">
        <Box
          bg="var(--color-surface)"
          borderRadius="2xl"
          border="1px solid"
          borderColor="var(--color-border)"
          p={5}
        >
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color="var(--color-text-muted)"
            fontFamily="var(--font-mono)"
            textTransform="uppercase"
            letterSpacing="0.05em"
            mb={3}
          >
            Implementation Code
          </Text>
          <CodePanel code={algorithm.code} />
        </Box>

        <Box display="flex" flexDirection="column" gap={6}>
          <Box
            bg="var(--color-surface)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="var(--color-border)"
            p={5}
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
            borderColor="var(--color-border)"
            p={5}
          >
            <Text
              fontSize="xs"
              fontWeight="semibold"
              color="var(--color-text-muted)"
              fontFamily="var(--font-mono)"
              textTransform="uppercase"
              letterSpacing="0.05em"
              mb={3}
            >
              Color Legend
            </Text>
            <Flex direction="column" gap={2}>
              {legendItems.map(({ color, label }) => (
                <Flex key={label} align="center" gap={3}>
                  <Box w="14px" h="14px" borderRadius="sm" bg={color} flexShrink={0} />
                  <Text fontSize="sm" color="var(--color-text)">
                    {label}
                  </Text>
                </Flex>
              ))}
            </Flex>

            <Separator my={4} borderColor="var(--color-border)" />

            <Text fontSize="xs" color="var(--color-text-muted)" lineHeight="tall">
              {algorithm.description}
            </Text>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
