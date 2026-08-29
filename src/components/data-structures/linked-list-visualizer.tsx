'use client';

import { Box, Flex, Button, Input, Text, Badge, IconButton } from '@chakra-ui/react';
import {
  useLinkedListVisualizer,
  type VisualizerTab,
  type VisualizerSpeed,
} from '@/hooks/use-linked-list-visualizer';
import { COLOR_TOKENS } from '@/config/colors';

interface LinkedListVisualizerProps {
  isDoubly?: boolean;
}

export function LinkedListVisualizer({ isDoubly = false }: LinkedListVisualizerProps) {
  const {
    nodes,
    operationLog,
    activeTab,
    speed,
    currentComplexity,
    error,
    insertValue,
    insertAtValue,
    deleteValue,
    deleteIndex,
    searchValue,
    searchIndex,
    insertIndex,
    traversingIndex,
    unlinkingIndex,
    foundIndex,
    insertingAtIndex,
    animatingStatus,
    isAnimating,
    isMuted,
    setActiveTab,
    setSpeed,
    setInsertValue,
    setInsertAtValue,
    setDeleteValue,
    setDeleteIndex,
    setSearchValue,
    setSearchIndex,
    setInsertIndex,
    insertRandom,
    deleteHead,
    deleteTail,
    peekHead,
    peekTail,
    fillRandomSample,
    reverseList,
    clear,
    toggleSound,
    handleInsertHead,
    handleInsertTail,
    handleInsertAtSubmit,
    handleDeleteSubmit,
    handleDeleteAtSubmit,
    handleFindSubmit,
    handleGetAtSubmit,
  } = useLinkedListVisualizer(isDoubly);

  const tabs: { id: VisualizerTab; label: string; icon: string }[] = [
    { id: 'insert', label: 'Insert', icon: '➕' },
    { id: 'search', label: 'Search & Inspect', icon: '🔍' },
    { id: 'delete', label: 'Delete', icon: '🗑️' },
    { id: 'utils', label: 'Utilities', icon: '⚡' },
  ];

  return (
    <Box>
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
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={3}
          justify="space-between"
          align="center"
          pb={2.5}
          borderBottom="1px solid"
          borderColor={COLOR_TOKENS.border}
        >
          <Flex
            align="center"
            gap={1}
            bg="var(--color-bg)"
            p={1}
            borderRadius="lg"
            border="1px solid"
            borderColor={COLOR_TOKENS.border}
            wrap="wrap"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <Button
                  key={tab.id}
                  size="xs"
                  variant={isActive ? 'solid' : 'ghost'}
                  bg={isActive ? COLOR_TOKENS.default : 'transparent'}
                  color={isActive ? 'white' : COLOR_TOKENS.textMuted}
                  _hover={{
                    color: COLOR_TOKENS.text,
                    bg: isActive ? COLOR_TOKENS.default : COLOR_TOKENS.surfaceLight,
                  }}
                  onClick={() => setActiveTab(tab.id)}
                  fontFamily="var(--font-mono)"
                  fontSize="xs"
                  px={3}
                  borderRadius="md"
                >
                  <span style={{ marginRight: '5px' }}>{tab.icon}</span>
                  {tab.label}
                </Button>
              );
            })}
          </Flex>

          <Flex align="center" gap={2} wrap="wrap">
            <Flex
              align="center"
              gap={1.5}
              px={2.5}
              py={1}
              bg="var(--color-bg)"
              borderRadius="md"
              border="1px solid"
              borderColor={COLOR_TOKENS.border}
            >
              <Text fontSize="2xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
                Size:
              </Text>
              <Text
                fontSize="xs"
                fontWeight="bold"
                color={nodes.length >= 7 ? COLOR_TOKENS.danger : COLOR_TOKENS.default}
                fontFamily="var(--font-mono)"
              >
                {nodes.length} / 7
              </Text>
            </Flex>

            <Flex
              align="center"
              gap={1.5}
              px={2.5}
              py={1}
              bg="var(--color-bg)"
              borderRadius="md"
              border="1px solid"
              borderColor={COLOR_TOKENS.border}
            >
              <Text fontSize="2xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
                Time:
              </Text>
              <Badge colorPalette="indigo" size="xs" variant="subtle" fontFamily="var(--font-mono)">
                {currentComplexity}
              </Badge>
            </Flex>

            <Flex
              align="center"
              bg="var(--color-bg)"
              p={0.5}
              borderRadius="md"
              border="1px solid"
              borderColor={COLOR_TOKENS.border}
            >
              {([0.5, 1, 2] as VisualizerSpeed[]).map((s) => (
                <Button
                  key={s}
                  size="2xs"
                  variant={speed === s ? 'solid' : 'ghost'}
                  bg={speed === s ? COLOR_TOKENS.default : 'transparent'}
                  color={speed === s ? 'white' : COLOR_TOKENS.textMuted}
                  _hover={{ color: COLOR_TOKENS.text }}
                  onClick={() => setSpeed(s)}
                  fontFamily="var(--font-mono)"
                  px={2}
                  h="22px"
                  borderRadius="sm"
                >
                  {s}x
                </Button>
              ))}
            </Flex>

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

        {activeTab === 'insert' && (
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={4}
            justify="space-between"
            align="center"
            wrap="wrap"
          >
            <Flex align="center" gap={2} wrap="wrap">
              <Input
                size="xs"
                placeholder="Val"
                value={insertValue}
                onChange={(e) => setInsertValue(e.target.value)}
                w="60px"
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
                disabled={isAnimating || nodes.length >= 7}
              >
                + Head (H)
              </Button>
              <Button
                size="xs"
                variant="outline"
                borderColor={COLOR_TOKENS.border}
                color={COLOR_TOKENS.text}
                _hover={{ borderColor: COLOR_TOKENS.default, bg: 'var(--color-surface)' }}
                onClick={() => handleInsertTail()}
                fontFamily="var(--font-mono)"
                disabled={isAnimating || nodes.length >= 7}
              >
                + Tail (T)
              </Button>
              <Button
                size="xs"
                variant="outline"
                borderColor={COLOR_TOKENS.border}
                color={COLOR_TOKENS.textMuted}
                _hover={{ color: COLOR_TOKENS.text, borderColor: COLOR_TOKENS.textMuted }}
                onClick={insertRandom}
                fontFamily="var(--font-mono)"
                disabled={isAnimating || nodes.length >= 7}
              >
                + Random
              </Button>
            </Flex>

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
                @ Idx:
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
                disabled={isAnimating || nodes.length >= 7}
              >
                Insert At Index
              </Button>
            </Flex>
          </Flex>
        )}

        {activeTab === 'search' && (
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={3}
            justify="space-between"
            align="center"
            wrap="wrap"
          >
            <Flex align="center" gap={3} wrap="wrap">
              <Flex as="form" onSubmit={handleFindSubmit} align="center" gap={1.5}>
                <Input
                  size="xs"
                  placeholder="Target"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  w="60px"
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
                  Find Val (F)
                </Button>
              </Flex>

              <Flex as="form" onSubmit={handleGetAtSubmit} align="center" gap={1.5}>
                <Text fontSize="2xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
                  Idx:
                </Text>
                <Input
                  size="xs"
                  placeholder="Idx"
                  value={searchIndex}
                  onChange={(e) => setSearchIndex(e.target.value)}
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
                  borderColor={COLOR_TOKENS.border}
                  color={COLOR_TOKENS.text}
                  _hover={{ borderColor: COLOR_TOKENS.default }}
                  fontFamily="var(--font-mono)"
                  disabled={isAnimating || nodes.length === 0}
                >
                  Get @ Index
                </Button>
              </Flex>
            </Flex>

            <Flex align="center" gap={2}>
              <Button
                size="xs"
                variant="ghost"
                color={COLOR_TOKENS.textMuted}
                _hover={{ color: COLOR_TOKENS.text, bg: COLOR_TOKENS.surface }}
                onClick={peekHead}
                disabled={isAnimating || nodes.length === 0}
                fontFamily="var(--font-mono)"
              >
                Peek Head
              </Button>
              <Button
                size="xs"
                variant="ghost"
                color={COLOR_TOKENS.textMuted}
                _hover={{ color: COLOR_TOKENS.text, bg: COLOR_TOKENS.surface }}
                onClick={peekTail}
                disabled={isAnimating || nodes.length === 0}
                fontFamily="var(--font-mono)"
              >
                Peek Tail
              </Button>
            </Flex>
          </Flex>
        )}

        {activeTab === 'delete' && (
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={3}
            justify="space-between"
            align="center"
            wrap="wrap"
          >
            <Flex align="center" gap={3} wrap="wrap">
              <Flex as="form" onSubmit={handleDeleteSubmit} align="center" gap={1.5}>
                <Input
                  size="xs"
                  placeholder="Val"
                  value={deleteValue}
                  onChange={(e) => setDeleteValue(e.target.value)}
                  w="60px"
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
                  Delete Val (D)
                </Button>
              </Flex>

              <Flex as="form" onSubmit={handleDeleteAtSubmit} align="center" gap={1.5}>
                <Text fontSize="2xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
                  Idx:
                </Text>
                <Input
                  size="xs"
                  placeholder="Idx"
                  value={deleteIndex}
                  onChange={(e) => setDeleteIndex(e.target.value)}
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
                  borderColor={COLOR_TOKENS.danger}
                  color={COLOR_TOKENS.danger}
                  _hover={{ bg: 'rgba(248, 113, 113, 0.15)' }}
                  disabled={isAnimating || nodes.length === 0}
                  fontFamily="var(--font-mono)"
                >
                  Delete @ Idx
                </Button>
              </Flex>
            </Flex>

            <Flex align="center" gap={2}>
              <Button
                size="xs"
                variant="outline"
                borderColor={COLOR_TOKENS.border}
                color={COLOR_TOKENS.danger}
                _hover={{ borderColor: COLOR_TOKENS.danger, bg: 'rgba(248, 113, 113, 0.1)' }}
                onClick={deleteHead}
                disabled={isAnimating || nodes.length === 0}
                fontFamily="var(--font-mono)"
              >
                Delete Head
              </Button>
              <Button
                size="xs"
                variant="outline"
                borderColor={COLOR_TOKENS.border}
                color={COLOR_TOKENS.danger}
                _hover={{ borderColor: COLOR_TOKENS.danger, bg: 'rgba(248, 113, 113, 0.1)' }}
                onClick={deleteTail}
                disabled={isAnimating || nodes.length === 0}
                fontFamily="var(--font-mono)"
              >
                Delete Tail
              </Button>
            </Flex>
          </Flex>
        )}

        {activeTab === 'utils' && (
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={2.5}
            justify="space-between"
            align="center"
            wrap="wrap"
          >
            <Flex align="center" gap={2} wrap="wrap">
              <Button
                size="xs"
                variant="outline"
                borderColor={COLOR_TOKENS.default}
                color={COLOR_TOKENS.default}
                _hover={{ bg: 'rgba(129, 140, 248, 0.1)' }}
                onClick={fillRandomSample}
                disabled={isAnimating}
                fontFamily="var(--font-mono)"
              >
                🎲 Fill Random (4 Nodes)
              </Button>

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
                  ⇄ Reverse List (R)
                </Button>
              )}
            </Flex>

            <Button
              size="xs"
              variant="ghost"
              color={COLOR_TOKENS.danger}
              _hover={{ bg: 'rgba(248, 113, 113, 0.1)' }}
              onClick={clear}
              disabled={isAnimating || nodes.length === 0}
              fontFamily="var(--font-mono)"
            >
              🗑️ Clear All (C)
            </Button>
          </Flex>
        )}
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
