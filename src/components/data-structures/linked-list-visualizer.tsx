'use client';

import { Box, Flex, Button, Input, Text, Badge } from '@chakra-ui/react';
import { useLinkedListVisualizer } from '@/hooks/use-linked-list-visualizer';
import { COLOR_TOKENS } from '@/config/colors';

interface LinkedListVisualizerProps {
  isDoubly?: boolean;
}

export function LinkedListVisualizer({ isDoubly = false }: LinkedListVisualizerProps) {
  const {
    nodes,
    operationLog,
    error,
    inputValue,
    setInputValue,
    deleteValue,
    setDeleteValue,
    reverseList,
    clear,
    handleInsertHeadSubmit,
    handleInsertTailSubmit,
    handleDeleteSubmit,
  } = useLinkedListVisualizer(isDoubly);

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
        <Flex align="center" gap={2} wrap="wrap">
          <Input
            size="xs"
            placeholder="Val"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            w="65px"
            bg="var(--color-bg)"
            color={COLOR_TOKENS.text}
            borderColor={COLOR_TOKENS.border}
            fontFamily="var(--font-mono)"
          />
          <Button
            size="xs"
            bg={COLOR_TOKENS.default}
            color="white"
            _hover={{ filter: 'brightness(1.15)' }}
            onClick={handleInsertHeadSubmit}
            fontFamily="var(--font-mono)"
          >
            Insert Head
          </Button>
          <Button
            size="xs"
            variant="outline"
            borderColor={COLOR_TOKENS.border}
            color={COLOR_TOKENS.text}
            _hover={{ borderColor: COLOR_TOKENS.default }}
            onClick={handleInsertTailSubmit}
            fontFamily="var(--font-mono)"
          >
            Insert Tail
          </Button>
        </Flex>

        <Flex align="center" gap={2} wrap="wrap">
          <Input
            size="xs"
            placeholder="Val"
            value={deleteValue}
            onChange={(e) => setDeleteValue(e.target.value)}
            w="65px"
            bg="var(--color-bg)"
            color={COLOR_TOKENS.text}
            borderColor={COLOR_TOKENS.border}
            fontFamily="var(--font-mono)"
          />
          <Button
            size="xs"
            variant="outline"
            borderColor={COLOR_TOKENS.border}
            color={COLOR_TOKENS.danger}
            _hover={{ borderColor: COLOR_TOKENS.danger, bg: 'rgba(248, 113, 113, 0.1)' }}
            onClick={handleDeleteSubmit}
            disabled={nodes.length === 0}
            fontFamily="var(--font-mono)"
          >
            Delete
          </Button>

          {!isDoubly && (
            <Button
              size="xs"
              variant="outline"
              borderColor={COLOR_TOKENS.border}
              color={COLOR_TOKENS.compare}
              _hover={{ borderColor: COLOR_TOKENS.compare }}
              onClick={reverseList}
              disabled={nodes.length <= 1}
              fontFamily="var(--font-mono)"
            >
              Reverse
            </Button>
          )}

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
        p={6}
        bg="var(--color-bg)"
        borderRadius="xl"
        border="1px solid"
        borderColor={COLOR_TOKENS.border}
        overflowX="auto"
      >
        <Flex align="center" gap={3} minW="max-content" py={4}>
          <Box mr={1}>
            <Badge colorPalette="teal" size="xs" variant="solid" px={2} borderRadius="full">
              HEAD
            </Badge>
          </Box>

          {nodes.map((node, idx) => {
            const isHead = idx === 0;
            const isTail = idx === nodes.length - 1;

            return (
              <Flex key={node.id} align="center" gap={2}>
                <Box
                  p={2.5}
                  bg={COLOR_TOKENS.surfaceLight}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={isHead ? COLOR_TOKENS.default : COLOR_TOKENS.border}
                  boxShadow={isHead ? '0 0 10px rgba(129, 140, 248, 0.3)' : 'none'}
                >
                  <Flex align="center" gap={1.5}>
                    <Flex
                      w="44px"
                      h="44px"
                      bg={COLOR_TOKENS.surface}
                      borderRadius="md"
                      align="center"
                      justify="center"
                      border="1px solid"
                      borderColor={COLOR_TOKENS.border}
                      fontFamily="var(--font-mono)"
                      fontWeight="bold"
                      fontSize="sm"
                      color={COLOR_TOKENS.text}
                    >
                      {node.value}
                    </Flex>
                    <Box
                      px={2}
                      py={1}
                      bg="var(--color-bg)"
                      borderRadius="md"
                      border="1px solid"
                      borderColor={COLOR_TOKENS.border}
                      textAlign="center"
                    >
                      <Text
                        fontSize="9px"
                        color={COLOR_TOKENS.textMuted}
                        fontFamily="var(--font-mono)"
                      >
                        next
                      </Text>
                      <Text
                        fontSize="10px"
                        color={COLOR_TOKENS.default}
                        fontFamily="var(--font-mono)"
                      >
                        {isTail ? 'null' : '•'}
                      </Text>
                    </Box>
                  </Flex>

                  <Flex justify="space-between" align="center" mt={1.5} px={1}>
                    <Text
                      fontSize="10px"
                      color={COLOR_TOKENS.textMuted}
                      fontFamily="var(--font-mono)"
                    >
                      [{idx}]
                    </Text>
                    {isHead && (
                      <Badge colorPalette="indigo" size="xs" variant="subtle" px={1}>
                        Head
                      </Badge>
                    )}
                    {isTail && !isHead && (
                      <Badge colorPalette="purple" size="xs" variant="subtle" px={1}>
                        Tail
                      </Badge>
                    )}
                  </Flex>
                </Box>

                <Box px={1}>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={COLOR_TOKENS.default}
                    fontFamily="var(--font-mono)"
                  >
                    {isDoubly ? '⇄' : '→'}
                  </Text>
                </Box>
              </Flex>
            );
          })}

          <Box
            p={2.5}
            bg={COLOR_TOKENS.surfaceLight}
            borderRadius="xl"
            border="1px dashed"
            borderColor={COLOR_TOKENS.border}
            opacity={0.7}
          >
            <Text
              fontSize="xs"
              fontWeight="bold"
              color={COLOR_TOKENS.textMuted}
              fontFamily="var(--font-mono)"
            >
              NULL
            </Text>
          </Box>
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
    </Box>
  );
}
