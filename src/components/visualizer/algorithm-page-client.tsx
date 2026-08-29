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
  Button,
  Badge,
} from '@chakra-ui/react';
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
        { color: 'var(--color-indigo)', label: 'Array Element' },
        { color: '#fbbf24', label: 'Comparing / Inspecting' },
        { color: '#34d399', label: 'Target Found' },
      ]
    : [
        { color: 'var(--color-indigo)', label: 'Unsorted' },
        { color: '#fbbf24', label: 'Comparing' },
        { color: '#f87171', label: 'Swapping' },
        { color: '#34d399', label: 'Sorted' },
      ];

  const sortingAlgos = algorithms.filter((a) => a.category === 'sorting');
  const searchingAlgos = algorithms.filter((a) => a.category === 'searching');

  return (
    <Container maxW="1200px" py={6} px={4}>
      {/* Sleek Top Navigation Bar */}
      <Flex justify="space-between" align="center" mb={5} wrap="wrap" gap={3}>
        <Flex align="center" gap={3}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button
              size="xs"
              variant="outline"
              borderColor="var(--color-border)"
              color="var(--color-text)"
              _hover={{ borderColor: 'var(--color-indigo)', bg: 'var(--color-surface-light)' }}
              fontFamily="var(--font-mono)"
            >
              ← All Algorithms
            </Button>
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

        {/* Algorithm Switcher */}
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

      {/* Array Configuration Toolbar */}
      <ArrayConfigBar onArrayChange={setCustomArray} disabled={isRunning} />

      {/* ========================================================================= */}
      {/* 1. HERO VISUALIZER STAGE (Unified Centerpiece Canvas) */}
      {/* ========================================================================= */}
      <Box
        bg="var(--color-surface)"
        borderRadius="2xl"
        border="1px solid"
        borderColor="var(--color-border)"
        p={{ base: 4, md: 6 }}
        mb={8}
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.25)"
      >
        {/* Main Bar Chart Arena */}
        {currentStepData && <VisualizerBarChart step={currentStepData} />}

        {/* Live Step Explanation Narrative */}
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

        {/* Docked Visualizer Controls */}
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

      {/* ========================================================================= */}
      {/* 2. COMPLEXITY BREAKDOWN & COLOR LEGEND ROW */}
      {/* ========================================================================= */}
      <Grid templateColumns={{ base: '1fr', md: '1.2fr 0.8fr' }} gap={6} mb={8}>
        {/* Complexity Card */}
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

        {/* Color Legend & Overview Card */}
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
      </Grid>

      {/* ========================================================================= */}
      {/* 3. FULL-WIDTH CODE IMPLEMENTATION SECTION */}
      {/* ========================================================================= */}
      <Box
        bg="var(--color-surface)"
        borderRadius="2xl"
        border="1px solid"
        borderColor="var(--color-border)"
        p={5}
        mb={8}
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
    </Container>
  );
}
