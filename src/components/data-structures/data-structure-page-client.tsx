'use client';

import { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Box, Flex, Text, Separator, Button } from '@chakra-ui/react';
import type { DataStructureInfo } from '@/types/algorithm';
import { CodePanel, ComplexityCard, PageNavHeader } from '@/components/shared';
import { StackVisualizer } from './stack-visualizer';
import { QueueVisualizer } from './queue-visualizer';
import { LinkedListVisualizer } from './linked-list-visualizer';
import { getLegendItems } from '@/lib/algorithm-utils';
import { soundEngine } from '@/lib/audio-synthesizer';
import { COLOR_TOKENS } from '@/config/colors';

interface DataStructurePageClientProps {
  dataStructure: DataStructureInfo;
}

export function DataStructurePageClient({ dataStructure }: DataStructurePageClientProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(() => soundEngine.isMuted());

  const toggleSound = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleSound();
      } else if (e.code === 'KeyS') {
        e.preventDefault();
        handleShare();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, toggleSound]);

  const legendItems = getLegendItems(dataStructure.category);

  return (
    <Container maxW="1200px" py={6} px={4}>
      <PageNavHeader
        title={dataStructure.name}
        category={dataStructure.category}
        currentId={dataStructure.id}
        isMuted={isMuted}
        onToggleSound={toggleSound}
        onShare={handleShare}
        isCopied={copied}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
      />

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
          <Flex justify="flex-end" mb={2}>
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
              ✕ Exit Focus (Esc / Z)
            </Button>
          </Flex>
        )}

        {dataStructure.id === 'stack' && <StackVisualizer />}
        {dataStructure.id === 'queue' && <QueueVisualizer />}
        {dataStructure.id === 'singly-linked-list' && <LinkedListVisualizer isDoubly={false} />}
        {dataStructure.id === 'doubly-linked-list' && <LinkedListVisualizer isDoubly={true} />}
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
              <CodePanel code={dataStructure.code} />
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
            <ComplexityCard complexity={dataStructure.complexity} />
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
              {dataStructure.description}
            </Text>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
