'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Flex, Grid, Text, Separator, Button, Badge } from '@chakra-ui/react';
import { useVisualizer } from '@/hooks/use-visualizer';
import { VisualizerBarChart } from './visualizer-bar-chart';
import { VisualizerControls } from './visualizer-controls';
import { ArrayConfigBar } from './array-config-bar';
import { CodePanel, ComplexityCard, PageNavHeader } from '@/components/shared';
import { getLegendItems } from '@/lib/algorithm-utils';
import { COLOR_TOKENS } from '@/config/colors';
import type { AlgorithmInfo } from '@/types/algorithm';

interface SortingPageClientProps {
  algorithm: AlgorithmInfo;
}

export function SortingPageClient({ algorithm }: SortingPageClientProps) {
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

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        return;
      }
      if (e.code === 'KeyZ') {
        e.preventDefault();
        setIsFullscreen((prev) => !prev);
      } else if (e.code === 'Escape' && isFullscreen) {
        e.preventDefault();
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

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
        borderRadius={isFullscreen ? '0' : '2xl'}
        border={isFullscreen ? 'none' : '1px solid'}
        borderColor={COLOR_TOKENS.border}
        p={{ base: 4, md: 6 }}
        mb={6}
        boxShadow={isFullscreen ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.25)'}
        style={
          isFullscreen
            ? {
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'var(--color-bg)',
                padding: '24px 32px',
                margin: 0,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }
            : undefined
        }
      >
        {isFullscreen && (
          <Flex
            justify="space-between"
            align="center"
            mb={4}
            pb={3}
            borderBottom="1px solid var(--color-border)"
          >
            <Flex align="center" gap={3}>
              <Badge colorPalette="indigo" size="md" variant="subtle">
                FOCUS MODE (100% CANVAS)
              </Badge>
              <Text
                fontSize="md"
                fontWeight="bold"
                fontFamily="var(--font-mono)"
                color="var(--color-text)"
              >
                {algorithm.name}
              </Text>
            </Flex>
            <Button
              size="xs"
              variant="outline"
              borderColor="var(--color-border)"
              color="var(--color-text)"
              _hover={{
                borderColor: COLOR_TOKENS.danger,
                color: COLOR_TOKENS.danger,
                bg: 'rgba(248, 113, 113, 0.1)',
              }}
              onClick={() => setIsFullscreen(false)}
              fontFamily="var(--font-mono)"
            >
              ✕ Exit Focus (Key: Z or Esc)
            </Button>
          </Flex>
        )}

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
          isFullscreen={isFullscreen}
          onPlay={play}
          onPause={pause}
          onStepBack={stepBackward}
          onStepForward={stepForward}
          onGoToStep={goToStep}
          onReset={reset}
          onSpeedChange={setSpeed}
          onRegenerate={regenerate}
          onToggleSound={toggleSound}
          onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
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
