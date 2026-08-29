'use client';

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
            _hover={{ filter: 'brightness(1.15)' }}
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
            _hover={{ borderColor: COLOR_TOKENS.danger, color: COLOR_TOKENS.danger }}
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
            _hover={{ borderColor: COLOR_TOKENS.compare, color: COLOR_TOKENS.compare }}
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
            _hover={{ color: COLOR_TOKENS.text }}
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
            _hover={{ color: COLOR_TOKENS.text, bg: COLOR_TOKENS.surface }}
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
        justify="center"
        p={6}
        bg="var(--color-bg)"
        borderRadius="xl"
        border="1px solid"
        borderColor={COLOR_TOKENS.border}
        overflowX="auto"
      >
        <Flex align="center" gap={2} minW="max-content" py={4}>
          <Flex direction="column" align="center" mr={2}>
            <Badge colorPalette="teal" size="xs" variant="solid" px={2} borderRadius="full">
              OUT (Front)
            </Badge>
            <Text fontSize="xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)" mt={1}>
              ← Dequeue
            </Text>
          </Flex>

          <Flex
            p={3}
            bg={COLOR_TOKENS.surfaceLight}
            borderRadius="xl"
            border="2px dashed"
            borderColor={COLOR_TOKENS.border}
            gap={3}
            minH="90px"
            align="center"
            minW="240px"
          >
            {items.map((val, idx) => {
              const isFront = idx === 0;
              const isRear = idx === items.length - 1;
              const isHighlighted = isFront && frontPeeked;

              return (
                <Box key={idx} textAlign="center">
                  <Flex
                    w="56px"
                    h="56px"
                    bg={
                      isHighlighted
                        ? COLOR_TOKENS.compare
                        : isFront
                          ? COLOR_TOKENS.default
                          : COLOR_TOKENS.surface
                    }
                    color={isFront || isHighlighted ? 'white' : COLOR_TOKENS.text}
                    borderRadius="lg"
                    align="center"
                    justify="center"
                    border="1px solid"
                    borderColor={isFront ? COLOR_TOKENS.default : COLOR_TOKENS.border}
                    boxShadow={isFront ? '0 0 12px rgba(129, 140, 248, 0.4)' : 'none'}
                    fontFamily="var(--font-mono)"
                    fontWeight="bold"
                    fontSize="md"
                    transition="all 0.2s ease"
                  >
                    {val}
                  </Flex>
                  <Text
                    fontSize="10px"
                    color={COLOR_TOKENS.textMuted}
                    fontFamily="var(--font-mono)"
                    mt={1}
                  >
                    {isFront && isRear
                      ? 'Front/Rear'
                      : isFront
                        ? 'Front [0]'
                        : isRear
                          ? `Rear [${idx}]`
                          : `[${idx}]`}
                  </Text>
                </Box>
              );
            })}

            {items.length === 0 && (
              <Flex w="full" justify="center">
                <Text fontSize="xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
                  Empty Queue
                </Text>
              </Flex>
            )}
          </Flex>

          <Flex direction="column" align="center" ml={2}>
            <Badge colorPalette="purple" size="xs" variant="solid" px={2} borderRadius="full">
              IN (Rear)
            </Badge>
            <Text fontSize="xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)" mt={1}>
              Enqueue ←
            </Text>
          </Flex>
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
            D / Backspace
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
