'use client';

import { Box, Container, Flex, Grid, Text, Separator } from '@chakra-ui/react';
import { useVisualizer } from '@/hooks/use-visualizer';
import { VisualizerBarChart } from '@/components/sorting/visualizer-bar-chart';
import { VisualizerControls } from '@/components/sorting/visualizer-controls';
import { ArrayConfigBar } from '@/components/sorting/array-config-bar';
import { CodePanel, ComplexityCard, PageNavHeader } from '@/components/shared';
import { getLegendItems } from '@/lib/algorithm-utils';
import { COLOR_TOKENS } from '@/config/colors';
import type { AlgorithmInfo } from '@/types/algorithm';

interface SearchingPageClientProps {
  algorithm: AlgorithmInfo;
}

export function SearchingPageClient({ algorithm }: SearchingPageClientProps) {
  const {
    array,
    steps,
    currentStep,
    currentStepData,
    playbackState,
    speed,
    comparisonCount,
    swapCount,
    isMuted,
    setSpeed,
    play,
    pause,
    stepForward,
    stepBackward,
    goToStep,
    reset,
    setCustomArray,
    regenerate,
    toggleSound,
  } = useVisualizer(algorithm.id);

  const isRunning = playbackState === 'playing';
  const legendItems = getLegendItems(algorithm.category);

  return (
    <Container maxW="1200px" py={6} px={4}>
      <PageNavHeader
        title={algorithm.name}
        category={algorithm.category}
        currentId={algorithm.id}
      />

      <ArrayConfigBar onArrayChange={setCustomArray} disabled={isRunning} currentArray={array} />

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
          comparisonCount={comparisonCount}
          swapCount={swapCount}
          isMuted={isMuted}
          onPlay={play}
          onPause={pause}
          onStepBack={stepBackward}
          onStepForward={stepForward}
          onGoToStep={goToStep}
          onReset={reset}
          onSpeedChange={setSpeed}
          onRegenerate={regenerate}
          onToggleSound={toggleSound}
        />
      </Box>

      <Grid
        templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }}
        gap={6}
        mb={8}
        alignItems="stretch"
      >
        <Box position="relative" w="full" minH={{ base: '420px', lg: 'auto' }}>
          <Box
            position={{ base: 'relative', lg: 'absolute' }}
            top={0}
            bottom={0}
            left={0}
            right={0}
            display="flex"
            flexDirection="column"
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
              flexShrink={0}
            >
              Implementation Code
            </Text>
            <Box flex={1} minH={0} overflow="hidden">
              <CodePanel code={algorithm.code} />
            </Box>
          </Box>
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
