'use client';

import { useState } from 'react';
import { Box, Flex, Button, Input, Text, Badge, IconButton } from '@chakra-ui/react';
import { useStackVisualizer } from '@/hooks/use-stack-visualizer';
import { COLOR_TOKENS } from '@/config/colors';

export function StackVisualizer() {
  const {
    items,
    operationLog,
    peekedIndex,
    error,
    inputValue,
    isMuted,
    setInputValue,
    pop,
    peek,
    clear,
    toggleSound,
    handlePushSubmit,
  } = useStackVisualizer();

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    const dataStr = items.join(',');
    const url = `${window.location.origin}${window.location.pathname}?items=${dataStr}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSimulatedAddress = (idx: number) => {
    const base = 0x7fff40;
    return `0x${(base - idx * 4).toString(16).toUpperCase()}`;
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
        <Flex as="form" onSubmit={handlePushSubmit} align="center" gap={2} wrap="wrap">
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
            Push (Key: P)
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
            onClick={pop}
            disabled={items.length === 0}
            fontFamily="var(--font-mono)"
          >
            Pop (Key: O)
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
            onClick={peek}
            disabled={items.length === 0}
            fontFamily="var(--font-mono)"
          >
            Peek (Key: K)
          </Button>

          <Button
            size="xs"
            variant="outline"
            borderColor={copied ? '#34d399' : COLOR_TOKENS.border}
            color={copied ? '#34d399' : COLOR_TOKENS.text}
            bg={copied ? 'rgba(52, 211, 153, 0.1)' : 'transparent'}
            _hover={{
              borderColor: copied ? '#34d399' : COLOR_TOKENS.default,
              bg: copied ? 'rgba(52, 211, 153, 0.15)' : 'var(--color-surface)',
            }}
            onClick={handleShare}
            fontFamily="var(--font-mono)"
          >
            {copied ? '✓ Copied URL!' : '🔗 Share Stack'}
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
        direction="column-reverse"
        align="center"
        justify="flex-start"
        p={6}
        bg="var(--color-bg)"
        borderRadius="xl"
        border="1px solid"
        borderColor={COLOR_TOKENS.border}
        gap={2.5}
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
                SP Offset:{' '}
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
                {hoveredIdx === items.length - 1
                  ? 'Top of Stack (TOS)'
                  : `Offset +${(items.length - 1 - hoveredIdx) * 4}B`}
              </Text>
            </Flex>
          </Box>
        )}

        <Box
          w="180px"
          h="4px"
          bg={COLOR_TOKENS.border}
          borderRadius="full"
          opacity={0.6}
          title="Stack Base"
        />

        {items.length === 0 ? (
          <Text fontSize="xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)" py={12}>
            Stack is empty
          </Text>
        ) : (
          items.map((val, idx) => {
            const isTop = idx === items.length - 1;
            const isPeeked = idx === peekedIndex;
            const isHovered = hoveredIdx === idx;

            return (
              <Flex
                key={idx}
                w="180px"
                h="42px"
                bg={
                  isPeeked
                    ? COLOR_TOKENS.compare
                    : isTop
                      ? COLOR_TOKENS.default
                      : isHovered
                        ? 'var(--color-surface-light)'
                        : COLOR_TOKENS.surfaceLight
                }
                color="white"
                align="center"
                justify="space-between"
                px={4}
                borderRadius="lg"
                border="1px solid"
                borderColor={
                  isHovered
                    ? 'var(--color-indigo)'
                    : isTop || isPeeked
                      ? 'transparent'
                      : COLOR_TOKENS.border
                }
                boxShadow={
                  isPeeked
                    ? '0 0 16px rgba(251, 191, 36, 0.5)'
                    : isTop
                      ? '0 0 12px rgba(129, 140, 248, 0.4)'
                      : isHovered
                        ? '0 0 12px rgba(129, 140, 248, 0.3)'
                        : 'none'
                }
                transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                transform={isPeeked || isHovered ? 'scale(1.04)' : 'scale(1)'}
                cursor="pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  fontFamily="var(--font-mono)"
                  color={isPeeked || isTop ? 'white' : COLOR_TOKENS.text}
                >
                  {val}
                </Text>
                <Flex align="center" gap={1.5}>
                  <Text
                    fontSize="10px"
                    fontFamily="var(--font-mono)"
                    color={isPeeked || isTop ? 'rgba(255,255,255,0.7)' : COLOR_TOKENS.textMuted}
                  >
                    [{idx}]
                  </Text>
                  {isTop && (
                    <Badge colorPalette="teal" size="xs" variant="solid" px={1.5} fontSize="9px">
                      TOP
                    </Badge>
                  )}
                  {isPeeked && (
                    <Badge colorPalette="yellow" size="xs" variant="solid" px={1.5} fontSize="9px">
                      PEEK
                    </Badge>
                  )}
                </Flex>
              </Flex>
            );
          })
        )}
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
            P
          </kbd>{' '}
          Push •{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            O
          </kbd>{' '}
          Pop •{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            K
          </kbd>{' '}
          Peek •{' '}
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
