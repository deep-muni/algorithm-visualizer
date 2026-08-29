'use client';

import { Box, Flex, Button, Input, Text, Badge } from '@chakra-ui/react';
import { useStackVisualizer } from '@/hooks/use-stack-visualizer';
import { COLOR_TOKENS } from '@/config/colors';

export function StackVisualizer() {
  const {
    items,
    operationLog,
    peekedIndex,
    error,
    inputValue,
    setInputValue,
    pop,
    peek,
    clear,
    handlePushSubmit,
  } = useStackVisualizer();

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
            _hover={{ filter: 'brightness(1.15)' }}
            fontFamily="var(--font-mono)"
          >
            Push
          </Button>
        </Flex>

        <Flex align="center" gap={2} wrap="wrap">
          <Button
            size="xs"
            variant="outline"
            borderColor={COLOR_TOKENS.border}
            color={COLOR_TOKENS.text}
            _hover={{ borderColor: COLOR_TOKENS.danger, color: COLOR_TOKENS.danger }}
            onClick={pop}
            disabled={items.length === 0}
            fontFamily="var(--font-mono)"
          >
            Pop
          </Button>

          <Button
            size="xs"
            variant="outline"
            borderColor={COLOR_TOKENS.border}
            color={COLOR_TOKENS.text}
            _hover={{ borderColor: COLOR_TOKENS.compare, color: COLOR_TOKENS.compare }}
            onClick={peek}
            disabled={items.length === 0}
            fontFamily="var(--font-mono)"
          >
            Peek
          </Button>

          <Button
            size="xs"
            variant="ghost"
            color={COLOR_TOKENS.textMuted}
            _hover={{ color: COLOR_TOKENS.text }}
            onClick={clear}
            fontFamily="var(--font-mono)"
          >
            Clear
          </Button>
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
      >
        <Box
          w={{ base: '200px', sm: '240px' }}
          h="280px"
          border="2px solid"
          borderTop="none"
          borderColor={COLOR_TOKENS.border}
          borderBottomRadius="xl"
          p={2}
          display="flex"
          flexDirection="column-reverse"
          gap={2}
          position="relative"
          bg={COLOR_TOKENS.surfaceLight}
        >
          {items.map((val, idx) => {
            const isTop = idx === items.length - 1;
            const isPeeked = idx === peekedIndex;

            return (
              <Flex
                key={idx}
                h="36px"
                bg={
                  isPeeked
                    ? COLOR_TOKENS.compare
                    : isTop
                      ? COLOR_TOKENS.default
                      : COLOR_TOKENS.surface
                }
                color={isTop || isPeeked ? 'white' : COLOR_TOKENS.text}
                borderRadius="md"
                align="center"
                justify="space-between"
                px={3}
                border="1px solid"
                borderColor={isTop ? COLOR_TOKENS.default : COLOR_TOKENS.border}
                boxShadow={isTop ? '0 0 12px rgba(129, 140, 248, 0.4)' : 'none'}
                fontFamily="var(--font-mono)"
                fontWeight="bold"
                fontSize="sm"
                transition="all 0.2s ease"
              >
                <Text>[{idx}]</Text>
                <Text>{val}</Text>
                {isTop ? (
                  <Badge
                    colorPalette="purple"
                    size="xs"
                    variant="solid"
                    borderRadius="full"
                    px={1.5}
                  >
                    TOP
                  </Badge>
                ) : (
                  <Box w="24px" />
                )}
              </Flex>
            );
          })}

          {items.length === 0 && (
            <Flex h="full" align="center" justify="center">
              <Text fontSize="xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
                Empty Stack
              </Text>
            </Flex>
          )}
        </Box>
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
    </Box>
  );
}
