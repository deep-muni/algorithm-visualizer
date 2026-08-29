'use client';

import { useState } from 'react';
import { Box, Flex, Button, Input, Text, Badge, IconButton } from '@chakra-ui/react';
import { useQueueVisualizer } from '@/hooks/use-queue-visualizer';
import { COLOR_TOKENS } from '@/config/colors';

export function QueueVisualizer() {
  const {
    items,
    operationLog,
    frontPeeked,
    error,
    inputValue,
    isMuted,
    setInputValue,
    dequeue,
    front,
    clear,
    toggleSound,
    handleEnqueueSubmit,
  } = useQueueVisualizer();

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const getSimulatedAddress = (idx: number) => {
    const base = 0x7ffd10;
    return `0x${(base + idx * 4).toString(16).toUpperCase()}`;
  };

  return (
    <Box>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={3}
        justify="space-between"
        align="center"
        mb={5}
        p={3}
        bg={COLOR_TOKENS.surfaceLight}
        borderRadius="xl"
        border="1px solid"
        borderColor={COLOR_TOKENS.border}
      >
        <Flex as="form" onSubmit={handleEnqueueSubmit} align="center" gap={2} wrap="wrap">
          <Input
            size="xs"
            placeholder="Value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            w="80px"
            bg="var(--color-bg)"
            color={COLOR_TOKENS.text}
            borderColor={COLOR_TOKENS.border}
            fontFamily="var(--font-mono)"
          />
          <Button
            type="submit"
            size="xs"
            bg={COLOR_TOKENS.default}
            color="white"
            _hover={{ filter: 'brightness(1.15)', bg: COLOR_TOKENS.default, color: 'white' }}
            fontFamily="var(--font-mono)"
          >
            Enqueue (Key: E)
          </Button>
        </Flex>

        <Flex align="center" gap={2} wrap="wrap">
          <Button
            size="xs"
            variant="outline"
            borderColor={COLOR_TOKENS.border}
            color={COLOR_TOKENS.text}
            _hover={{
              borderColor: COLOR_TOKENS.danger,
              color: COLOR_TOKENS.danger,
              bg: 'rgba(248, 113, 113, 0.1)',
            }}
            onClick={dequeue}
            disabled={items.length === 0}
            fontFamily="var(--font-mono)"
          >
            Dequeue (Key: D)
          </Button>

          <Button
            size="xs"
            variant="outline"
            borderColor={COLOR_TOKENS.border}
            color={COLOR_TOKENS.text}
            _hover={{
              borderColor: COLOR_TOKENS.compare,
              color: COLOR_TOKENS.compare,
              bg: 'rgba(251, 191, 36, 0.1)',
            }}
            onClick={front}
            disabled={items.length === 0}
            fontFamily="var(--font-mono)"
          >
            Front (Key: F)
          </Button>

          <Button
            size="xs"
            variant="ghost"
            color={COLOR_TOKENS.textMuted}
            _hover={{ color: COLOR_TOKENS.text, bg: 'var(--color-surface)' }}
            onClick={clear}
            fontFamily="var(--font-mono)"
          >
            Clear (Key: C)
          </Button>

          <IconButton
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            variant="ghost"
            size="xs"
            borderRadius="full"
            color={isMuted ? COLOR_TOKENS.textMuted : COLOR_TOKENS.default}
            _hover={{ color: COLOR_TOKENS.text, bg: 'var(--color-surface)' }}
            onClick={toggleSound}
            title={isMuted ? 'Enable sound effects (Key: M)' : 'Mute sound effects (Key: M)'}
          >
            {isMuted ? '🔇' : '🔊'}
          </IconButton>
        </Flex>
      </Flex>

      {error && (
        <Text fontSize="xs" color={COLOR_TOKENS.danger} mb={3} fontFamily="var(--font-mono)">
          {error}
        </Text>
      )}

      <Flex
        minH="320px"
        align="center"
        justify="flex-start"
        p={6}
        bg="var(--color-bg)"
        borderRadius="xl"
        border="1px solid"
        borderColor={COLOR_TOKENS.border}
        overflowX="auto"
        position="relative"
      >
        {hoveredIdx !== null && hoveredIdx < items.length && (
          <Box
            position="absolute"
            top={2.5}
            left="50%"
            transform="translateX(-50%)"
            zIndex={10}
            px={3.5}
            py={1.5}
            bg="var(--color-surface)"
            borderRadius="xl"
            border="1px solid var(--color-border)"
            boxShadow="0 8px 24px var(--color-shadow)"
            backdropFilter="blur(12px)"
            pointerEvents="none"
          >
            <Flex align="center" gap={3}>
              <Text
                fontSize="xs"
                fontFamily="var(--font-mono)"
                color="var(--color-text)"
                fontWeight="bold"
              >
                Queue Memory:{' '}
                <span style={{ color: 'var(--color-indigo)' }}>
                  {getSimulatedAddress(hoveredIdx)}
                </span>
              </Text>
              <Text fontSize="xs" fontFamily="var(--font-mono)" color="var(--color-text)">
                Val:{' '}
                <span style={{ color: COLOR_TOKENS.default, fontWeight: 'bold' }}>
                  {items[hoveredIdx]}
                </span>
              </Text>
              <Text fontSize="2xs" color="var(--color-text-muted)" fontFamily="var(--font-mono)">
                •{' '}
                {hoveredIdx === 0
                  ? 'Head (Next to Dequeue)'
                  : hoveredIdx === items.length - 1
                    ? 'Rear (Last Enqueued)'
                    : `Slot +${hoveredIdx}`}
              </Text>
            </Flex>
          </Box>
        )}

        <Flex align="center" gap={3} minW="max-content" py={4}>
          <Box mr={2} textAlign="center">
            <Badge colorPalette="teal" size="xs" variant="solid" px={2} borderRadius="full">
              FRONT
            </Badge>
            <Text
              fontSize="10px"
              color={COLOR_TOKENS.textMuted}
              fontFamily="var(--font-mono)"
              mt={1}
            >
              dequeue &rarr;
            </Text>
          </Box>

          {items.length === 0 ? (
            <Text
              fontSize="xs"
              color={COLOR_TOKENS.textMuted}
              fontFamily="var(--font-mono)"
              px={12}
            >
              Queue is empty
            </Text>
          ) : (
            items.map((val, idx) => {
              const isFront = idx === 0;
              const isRear = idx === items.length - 1;
              const isPeeked = isFront && frontPeeked;
              const isHovered = hoveredIdx === idx;

              return (
                <Flex
                  key={idx}
                  w="68px"
                  h="68px"
                  direction="column"
                  align="center"
                  justify="center"
                  bg={
                    isPeeked
                      ? COLOR_TOKENS.compare
                      : isFront
                        ? COLOR_TOKENS.default
                        : isHovered
                          ? 'var(--color-surface-light)'
                          : COLOR_TOKENS.surfaceLight
                  }
                  color="white"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={
                    isHovered
                      ? 'var(--color-indigo)'
                      : isFront || isPeeked
                        ? 'transparent'
                        : COLOR_TOKENS.border
                  }
                  boxShadow={
                    isPeeked
                      ? '0 0 16px rgba(251, 191, 36, 0.5)'
                      : isFront
                        ? '0 0 12px rgba(129, 140, 248, 0.4)'
                        : isHovered
                          ? '0 0 12px rgba(129, 140, 248, 0.3)'
                          : 'none'
                  }
                  transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                  transform={isPeeked || isHovered ? 'scale(1.06)' : 'scale(1)'}
                  cursor="pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    fontFamily="var(--font-mono)"
                    color={isPeeked || isFront ? 'white' : COLOR_TOKENS.text}
                  >
                    {val}
                  </Text>
                  <Text
                    fontSize="9px"
                    fontFamily="var(--font-mono)"
                    color={isPeeked || isFront ? 'rgba(255,255,255,0.7)' : COLOR_TOKENS.textMuted}
                    mt={0.5}
                  >
                    [{idx}]
                  </Text>
                  {isRear && !isFront && (
                    <Badge
                      colorPalette="purple"
                      size="xs"
                      variant="solid"
                      px={1}
                      fontSize="8px"
                      mt={1}
                    >
                      REAR
                    </Badge>
                  )}
                </Flex>
              );
            })
          )}

          {items.length > 0 && (
            <Box ml={2} textAlign="center">
              <Badge colorPalette="purple" size="xs" variant="solid" px={2} borderRadius="full">
                REAR
              </Badge>
              <Text
                fontSize="10px"
                color={COLOR_TOKENS.textMuted}
                fontFamily="var(--font-mono)"
                mt={1}
              >
                &larr; enqueue
              </Text>
            </Box>
          )}
        </Flex>
      </Flex>

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
          {operationLog}
        </Text>
      </Flex>

      <Flex justify="center" align="center" gap={2} mt={3} opacity={0.6}>
        <Text fontSize="2xs" fontFamily="var(--font-mono)" color={COLOR_TOKENS.textMuted}>
          Shortcuts:{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            E
          </kbd>{' '}
          Enqueue •{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            D
          </kbd>{' '}
          Dequeue •{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            F
          </kbd>{' '}
          Front •{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            C
          </kbd>{' '}
          Clear •{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            M
          </kbd>{' '}
          Sound
        </Text>
      </Flex>
    </Box>
  );
}
