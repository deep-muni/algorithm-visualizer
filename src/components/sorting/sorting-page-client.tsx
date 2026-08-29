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
import { VisualizerBarChart } from './visualizer-bar-chart';
import { VisualizerControls } from './visualizer-controls';
import { ArrayConfigBar } from './array-config-bar';
import { CodePanel, ComplexityCard } from '@/components/shared';
import { dataStructures, sortingAlgorithms, searchingAlgorithms } from '@/data';
import { getLegendItems } from '@/lib/algorithm-utils';
import { COLOR_TOKENS } from '@/config/colors';
import type { AlgorithmInfo } from '@/types/algorithm';

interface SortingPageClientProps {
  algorithm: AlgorithmInfo;
}

export function SortingPageClient({ algorithm }: SortingPageClientProps) {
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
              borderColor={COLOR_TOKENS.border}
              color={COLOR_TOKENS.text}
              _hover={{ borderColor: COLOR_TOKENS.default, bg: COLOR_TOKENS.surfaceLight }}
              title="Back to all algorithms"
            >
              ←
            </IconButton>
          </Link>

          <Heading
            as="h1"
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="bold"
            color={COLOR_TOKENS.text}
          >
            {algorithm.name}
          </Heading>

          <Badge colorPalette="indigo" variant="subtle" borderRadius="full" px={2} fontSize="2xs">
            Sorting
          </Badge>
        </Flex>

        <Flex align="center" gap={2}>
          <Text
            fontSize="xs"
            color={COLOR_TOKENS.textMuted}
            fontFamily="var(--font-mono)"
            display={{ base: 'none', sm: 'block' }}
          >
            Switch:
          </Text>
          <select
            value={algorithm.id}
            onChange={(e) => {
              const targetId = e.target.value;
              const isDS = dataStructures.some((d) => d.id === targetId);
              const isSort = sortingAlgorithms.some((s) => s.id === targetId);
              if (isDS) router.push(`/data-structures/${targetId}`);
              else if (isSort) router.push(`/sorting/${targetId}`);
              else router.push(`/searching/${targetId}`);
            }}
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
              {sortingAlgorithms.map((a) => (
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
              {searchingAlgorithms.map((a) => (
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
              label="Data Structures"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-sorted)' }}
            >
              {dataStructures.map((d) => (
                <option
                  key={d.id}
                  value={d.id}
                  style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
                >
                  {d.name}
                </option>
              ))}
            </optgroup>
          </select>
        </Flex>
      </Flex>

      <ArrayConfigBar onArrayChange={setCustomArray} disabled={isRunning} />

      <Box
        bg={COLOR_TOKENS.surface}
        borderRadius="2xl"
        border="1px solid"
        borderColor={COLOR_TOKENS.border}
        p={{ base: 4, md: 6 }}
        mb={6}
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.25)"
      >
        {currentStepData && <VisualizerBarChart step={currentStepData} />}

        <Flex
          mt={4}
          px={4}
          py={3}
          bg={COLOR_TOKENS.surfaceLight}
          borderRadius="xl"
          border="1px solid"
          borderColor={COLOR_TOKENS.border}
          align="center"
          minH="48px"
        >
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={COLOR_TOKENS.text}
            fontFamily="var(--font-mono)"
          >
            {currentStepData?.description ?? ''}
          </Text>
        </Flex>

        <Separator my={4} borderColor={COLOR_TOKENS.border} />

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
          bg={COLOR_TOKENS.surface}
          borderRadius="2xl"
          border="1px solid"
          borderColor={COLOR_TOKENS.border}
          p={5}
        >
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color={COLOR_TOKENS.textMuted}
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
            bg={COLOR_TOKENS.surface}
            borderRadius="2xl"
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
            p={5}
          >
            <ComplexityCard
              complexity={algorithm.complexity}
              stable={algorithm.stable}
              inPlace={algorithm.inPlace}
            />
          </Box>

          <Box
            bg={COLOR_TOKENS.surface}
            borderRadius="2xl"
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
            p={5}
          >
            <Text
              fontSize="xs"
              fontWeight="semibold"
              color={COLOR_TOKENS.textMuted}
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
                  <Text fontSize="sm" color={COLOR_TOKENS.text}>
                    {label}
                  </Text>
                </Flex>
              ))}
            </Flex>

            <Separator my={4} borderColor={COLOR_TOKENS.border} />

            <Text fontSize="xs" color={COLOR_TOKENS.textMuted} lineHeight="tall">
              {algorithm.description}
            </Text>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
