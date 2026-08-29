'use client';

import { Box, Flex, Button, Input, Text, Badge, IconButton } from '@chakra-ui/react';
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
    insertValue,
    insertAtValue,
    deleteValue,
    searchValue,
    insertIndex,
    traversingIndex,
    unlinkingIndex,
    foundIndex,
    insertingAtIndex,
    animatingStatus,
    isAnimating,
    isMuted,
    setInsertValue,
    setInsertAtValue,
    setDeleteValue,
    setSearchValue,
    setInsertIndex,
    reverseList,
    clear,
    toggleSound,
    handleInsertHead,
    handleInsertTail,
    handleInsertAtSubmit,
    handleDeleteSubmit,
    handleFindSubmit,
  } = useLinkedListVisualizer(isDoubly);

  return (
    <Box>
      {/* Top Operations Toolbar */}
      <Flex
        direction="column"
        gap={3}
        mb={5}
        p={3.5}
        bg={COLOR_TOKENS.surfaceLight}
        borderRadius="xl"
        border="1px solid"
        borderColor={COLOR_TOKENS.border}
      >
        {/* Row 1: Insert Head, Insert Tail & Insert At Index */}
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={3}
          justify="space-between"
          align={{ base: 'stretch', lg: 'center' }}
        >
          {/* Head & Tail Insert */}
          <Flex align="center" gap={2} wrap="wrap">
            <Input
              size="xs"
              placeholder="Val"
              value={insertValue}
              onChange={(e) => setInsertValue(e.target.value)}
              w="55px"
              bg="var(--color-bg)"
              color={COLOR_TOKENS.text}
              borderColor={COLOR_TOKENS.border}
              fontFamily="var(--font-mono)"
              disabled={isAnimating}
            />
            <Button
              size="xs"
              bg={COLOR_TOKENS.default}
              color="white"
              _hover={{ filter: 'brightness(1.15)' }}
              onClick={() => handleInsertHead()}
              fontFamily="var(--font-mono)"
              disabled={isAnimating}
            >
              Insert Head (H)
            </Button>
            <Button
              size="xs"
              variant="outline"
              borderColor={COLOR_TOKENS.border}
              color={COLOR_TOKENS.text}
              _hover={{ borderColor: COLOR_TOKENS.default, bg: 'var(--color-surface)' }}
              onClick={() => handleInsertTail()}
              fontFamily="var(--font-mono)"
              disabled={isAnimating}
            >
              Insert Tail (T)
            </Button>
          </Flex>

          {/* Insert at Index Form */}
          <Flex as="form" onSubmit={handleInsertAtSubmit} align="center" gap={1.5} wrap="wrap">
            <Text fontSize="2xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
              Val:
            </Text>
            <Input
              size="xs"
              placeholder="Val"
              value={insertAtValue}
              onChange={(e) => setInsertAtValue(e.target.value)}
              w="50px"
              bg="var(--color-bg)"
              color={COLOR_TOKENS.text}
              borderColor={COLOR_TOKENS.border}
              fontFamily="var(--font-mono)"
              disabled={isAnimating}
            />
            <Text fontSize="2xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
              @ idx:
            </Text>
            <Input
              size="xs"
              placeholder="Idx"
              value={insertIndex}
              onChange={(e) => setInsertIndex(e.target.value)}
              w="40px"
              bg="var(--color-bg)"
              color={COLOR_TOKENS.text}
              borderColor={COLOR_TOKENS.border}
              fontFamily="var(--font-mono)"
              disabled={isAnimating}
            />
            <Button
              type="submit"
              size="xs"
              variant="outline"
              borderColor={COLOR_TOKENS.default}
              color={COLOR_TOKENS.default}
              _hover={{ bg: 'rgba(129, 140, 248, 0.15)' }}
              fontFamily="var(--font-mono)"
              disabled={isAnimating}
            >
              Insert At Index
            </Button>
          </Flex>
        </Flex>

        {/* Row 2: Search, Delete & Global Controls */}
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={3}
          justify="space-between"
          align={{ base: 'stretch', lg: 'center' }}
          pt={2}
          borderTop="1px dashed"
          borderColor={COLOR_TOKENS.border}
        >
          <Flex align="center" gap={3} wrap="wrap">
            {/* Find */}
            <Flex as="form" onSubmit={handleFindSubmit} align="center" gap={1.5}>
              <Input
                size="xs"
                placeholder="Find"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                w="55px"
                bg="var(--color-bg)"
                color={COLOR_TOKENS.text}
                borderColor={COLOR_TOKENS.border}
                fontFamily="var(--font-mono)"
                disabled={isAnimating}
              />
              <Button
                type="submit"
                size="xs"
                variant="outline"
                borderColor={COLOR_TOKENS.compare}
                color={COLOR_TOKENS.compare}
                _hover={{ bg: 'rgba(251, 191, 36, 0.15)' }}
                fontFamily="var(--font-mono)"
                disabled={isAnimating || nodes.length === 0}
              >
                Find (F)
              </Button>
            </Flex>

            {/* Delete */}
            <Flex as="form" onSubmit={handleDeleteSubmit} align="center" gap={1.5}>
              <Input
                size="xs"
                placeholder="Del"
                value={deleteValue}
                onChange={(e) => setDeleteValue(e.target.value)}
                w="55px"
                bg="var(--color-bg)"
                color={COLOR_TOKENS.text}
                borderColor={COLOR_TOKENS.border}
                fontFamily="var(--font-mono)"
                disabled={isAnimating}
              />
              <Button
                type="submit"
                size="xs"
                variant="outline"
                borderColor={COLOR_TOKENS.danger}
                color={COLOR_TOKENS.danger}
                _hover={{ bg: 'rgba(248, 113, 113, 0.15)' }}
                disabled={isAnimating || nodes.length === 0}
                fontFamily="var(--font-mono)"
              >
                Delete (D)
              </Button>
            </Flex>
          </Flex>

          <Flex align="center" gap={2} wrap="wrap">
            {!isDoubly && (
              <Button
                size="xs"
                variant="outline"
                borderColor={COLOR_TOKENS.border}
                color={COLOR_TOKENS.compare}
                _hover={{ borderColor: COLOR_TOKENS.compare }}
                onClick={reverseList}
                disabled={isAnimating || nodes.length <= 1}
                fontFamily="var(--font-mono)"
              >
                Reverse (R)
              </Button>
            )}

            <Button
              size="xs"
              variant="ghost"
              color={COLOR_TOKENS.textMuted}
              _hover={{ color: COLOR_TOKENS.text }}
              onClick={clear}
              disabled={isAnimating}
              fontFamily="var(--font-mono)"
            >
              Clear (C)
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
      </Flex>

      {error && (
        <Text fontSize="xs" color={COLOR_TOKENS.danger} mb={3} fontFamily="var(--font-mono)">
          {error}
        </Text>
      )}

      {/* Linked List Canvas */}
      <Flex
        minH="320px"
        align="center"
        p={6}
        bg="var(--color-bg)"
        borderRadius="xl"
        border="1px solid"
        borderColor={COLOR_TOKENS.border}
        overflowX="auto"
        position="relative"
      >
        {animatingStatus && (
          <Box position="absolute" top={3} right={4}>
            <Badge
              colorPalette={
                unlinkingIndex !== null ? 'red' : foundIndex !== null ? 'green' : 'yellow'
              }
              variant="subtle"
              size="xs"
              borderRadius="full"
              px={2.5}
              py={0.5}
            >
              ⚡ {animatingStatus}
            </Badge>
          </Box>
        )}

        <Flex align="center" gap={3} minW="max-content" py={6}>
          <Box mr={1} textAlign="center">
            <Badge colorPalette="teal" size="xs" variant="solid" px={2} borderRadius="full">
              HEAD
            </Badge>
            <Text
              fontSize="10px"
              color={COLOR_TOKENS.textMuted}
              fontFamily="var(--font-mono)"
              mt={1}
            >
              ptr
            </Text>
          </Box>

          {nodes.map((node, idx) => {
            const isHead = idx === 0;
            const isTail = idx === nodes.length - 1;
            const isTraversing = idx === traversingIndex;
            const isUnlinking = idx === unlinkingIndex;
            const isFound = idx === foundIndex;
            const isInsertTarget = idx === insertingAtIndex;

            return (
              <Flex key={node.id} align="center" gap={2}>
                <Flex direction="column" align="center">
                  {/* Floating Pointer Indicator Badge */}
                  <Box minH="22px" mb={1}>
                    {isTraversing && (
                      <Badge
                        colorPalette="yellow"
                        variant="solid"
                        size="xs"
                        borderRadius="full"
                        px={2}
                      >
                        👉 current
                      </Badge>
                    )}
                    {isUnlinking && (
                      <Badge
                        colorPalette="red"
                        variant="solid"
                        size="xs"
                        borderRadius="full"
                        px={2}
                      >
                        ✂️ unlinking
                      </Badge>
                    )}
                    {isFound && (
                      <Badge
                        colorPalette="green"
                        variant="solid"
                        size="xs"
                        borderRadius="full"
                        px={2}
                      >
                        ✓ FOUND
                      </Badge>
                    )}
                    {isInsertTarget && (
                      <Badge
                        colorPalette="indigo"
                        variant="solid"
                        size="xs"
                        borderRadius="full"
                        px={2}
                      >
                        ↓ INSERTING
                      </Badge>
                    )}
                  </Box>

                  {/* Node Box */}
                  <Box
                    p={2.5}
                    bg={COLOR_TOKENS.surfaceLight}
                    borderRadius="xl"
                    border="2px solid"
                    borderColor={
                      isFound
                        ? COLOR_TOKENS.success
                        : isUnlinking
                          ? COLOR_TOKENS.danger
                          : isTraversing
                            ? COLOR_TOKENS.compare
                            : isHead
                              ? COLOR_TOKENS.default
                              : COLOR_TOKENS.border
                    }
                    boxShadow={
                      isFound
                        ? '0 0 16px rgba(52, 211, 153, 0.6)'
                        : isUnlinking
                          ? '0 0 16px rgba(248, 113, 113, 0.6)'
                          : isTraversing
                            ? '0 0 16px rgba(251, 191, 36, 0.6)'
                            : isHead
                              ? '0 0 10px rgba(129, 140, 248, 0.3)'
                              : 'none'
                    }
                    opacity={isUnlinking ? 0.6 : 1}
                    transform={
                      isTraversing || isFound
                        ? 'scale(1.08)'
                        : isUnlinking
                          ? 'scale(0.92)'
                          : 'scale(1)'
                    }
                    transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    <Flex align="center" gap={1.5}>
                      <Flex
                        w="44px"
                        h="44px"
                        bg={
                          isFound
                            ? COLOR_TOKENS.success
                            : isUnlinking
                              ? COLOR_TOKENS.danger
                              : isTraversing
                                ? COLOR_TOKENS.compare
                                : COLOR_TOKENS.surface
                        }
                        borderRadius="md"
                        align="center"
                        justify="center"
                        border="1px solid"
                        borderColor={COLOR_TOKENS.border}
                        fontFamily="var(--font-mono)"
                        fontWeight="bold"
                        fontSize="sm"
                        color={isFound || isUnlinking || isTraversing ? 'white' : COLOR_TOKENS.text}
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
                          color={isUnlinking ? COLOR_TOKENS.danger : COLOR_TOKENS.default}
                          fontFamily="var(--font-mono)"
                          fontWeight="bold"
                        >
                          {isUnlinking ? (isTail ? 'null' : `[${idx + 1}]`) : isTail ? 'null' : '•'}
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
                </Flex>

                {/* Arrow Connector */}
                <Box px={1} mt={4}>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={
                      isUnlinking
                        ? COLOR_TOKENS.danger
                        : isTraversing
                          ? COLOR_TOKENS.compare
                          : COLOR_TOKENS.default
                    }
                    fontFamily="var(--font-mono)"
                    style={{
                      transition: 'color 0.2s ease',
                      borderBottom: isUnlinking ? '2px dashed var(--color-danger)' : 'none',
                    }}
                  >
                    {isDoubly ? '⇄' : '→'}
                  </Text>
                </Box>
              </Flex>
            );
          })}

          <Box
            p={2.5}
            mt={6}
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

      {/* Live Operational Step Log */}
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

      {/* Keyboard Shortcut Hints Footer */}
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
            H
          </kbd>{' '}
          Head •{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            T
          </kbd>{' '}
          Tail •{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            F
          </kbd>{' '}
          Find •{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            D
          </kbd>{' '}
          Delete •{' '}
          {!isDoubly && (
            <>
              <kbd
                style={{
                  padding: '1px 4px',
                  borderRadius: '4px',
                  background: 'var(--color-surface-light)',
                }}
              >
                R
              </kbd>{' '}
              Reverse •{' '}
            </>
          )}
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
