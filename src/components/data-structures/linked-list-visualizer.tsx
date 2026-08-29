'use client';

import { useState } from 'react';
import { Box, Flex, Button, Input, Text, Badge, IconButton, Separator } from '@chakra-ui/react';
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

  const [hoveredNodeIdx, setHoveredNodeIdx] = useState<number | null>(null);

  const tabs: { id: VisualizerTab; label: string; icon: string }[] = [
    { id: 'insert', label: 'Insert', icon: '➕' },
    { id: 'search', label: 'Search & Inspect', icon: '🔍' },
    { id: 'delete', label: 'Delete', icon: '🗑️' },
    { id: 'utils', label: 'Utilities', icon: '⚡' },
  ];

  const getSimulatedAddress = (idx: number) => {
    const base = 0x7ffe20;
    return `0x${(base + idx * 0x20).toString(16).toUpperCase()}`;
  };

  return (
    <Box>
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
        {hoveredNodeIdx !== null && hoveredNodeIdx < nodes.length && (
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
            <Flex align="center" gap={3} wrap="wrap">
              <Text
                fontSize="xs"
                fontFamily="var(--font-mono)"
                color="var(--color-text)"
                fontWeight="bold"
              >
                Addr:{' '}
                <span style={{ color: 'var(--color-indigo)' }}>
                  {getSimulatedAddress(hoveredNodeIdx)}
                </span>
              </Text>
              <Text fontSize="xs" fontFamily="var(--font-mono)" color="var(--color-text)">
                Val:{' '}
                <span style={{ color: COLOR_TOKENS.default, fontWeight: 'bold' }}>
                  {nodes[hoveredNodeIdx].value}
                </span>
              </Text>
              <Text fontSize="2xs" color="var(--color-text-muted)" fontFamily="var(--font-mono)">
                Next &rarr;{' '}
                {hoveredNodeIdx < nodes.length - 1
                  ? getSimulatedAddress(hoveredNodeIdx + 1)
                  : 'NULL (0x0)'}
              </Text>
              {isDoubly && (
                <Text fontSize="2xs" color="var(--color-text-muted)" fontFamily="var(--font-mono)">
                  Prev &larr;{' '}
                  {hoveredNodeIdx > 0 ? getSimulatedAddress(hoveredNodeIdx - 1) : 'NULL (0x0)'}
                </Text>
              )}
            </Flex>
          </Box>
        )}

        <Flex align="center" gap={0} minW="max-content" py={4}>
          <Flex direction="column" align="center" mr={3}>
            <Badge colorPalette="teal" size="xs" variant="solid" px={2} borderRadius="full">
              HEAD
            </Badge>
            <Text
              fontSize="10px"
              color={COLOR_TOKENS.textMuted}
              fontFamily="var(--font-mono)"
              mt={1}
            >
              &rarr;
            </Text>
          </Flex>

          {nodes.length === 0 ? (
            <Flex align="center" justify="center" px={12} py={8}>
              <Text fontSize="xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
                Linked list is empty (HEAD &rarr; NULL)
              </Text>
            </Flex>
          ) : (
            nodes.map((node, idx) => {
              const isHead = idx === 0;
              const isTail = idx === nodes.length - 1;
              const isTraversing = idx === traversingIndex;
              const isUnlinking = idx === unlinkingIndex;
              const isFound = idx === foundIndex;
              const isInserting = idx === insertingAtIndex;
              const isHovered = hoveredNodeIdx === idx;

              let nodeBg: string = COLOR_TOKENS.surfaceLight;
              let nodeBorderColor: string = COLOR_TOKENS.border;
              let nodeGlow: string = 'none';

              if (isFound) {
                nodeBg = COLOR_TOKENS.success;
                nodeBorderColor = COLOR_TOKENS.success;
                nodeGlow = '0 0 20px rgba(52, 211, 153, 0.6)';
              } else if (isUnlinking) {
                nodeBg = COLOR_TOKENS.danger;
                nodeBorderColor = COLOR_TOKENS.danger;
                nodeGlow = '0 0 20px rgba(248, 113, 113, 0.6)';
              } else if (isTraversing) {
                nodeBg = COLOR_TOKENS.compare;
                nodeBorderColor = COLOR_TOKENS.compare;
                nodeGlow = '0 0 16px rgba(251, 191, 36, 0.6)';
              } else if (isInserting) {
                nodeBg = COLOR_TOKENS.default;
                nodeBorderColor = COLOR_TOKENS.default;
                nodeGlow = '0 0 16px rgba(129, 140, 248, 0.6)';
              } else if (isHovered) {
                nodeBg = 'var(--color-surface-light)';
                nodeBorderColor = 'var(--color-indigo)';
                nodeGlow = '0 0 12px rgba(129, 140, 248, 0.3)';
              }

              return (
                <Flex key={node.id} align="center">
                  <Flex
                    direction="column"
                    align="center"
                    cursor="pointer"
                    onMouseEnter={() => setHoveredNodeIdx(idx)}
                    onMouseLeave={() => setHoveredNodeIdx(null)}
                  >
                    <Flex
                      w="88px"
                      h="54px"
                      bg={nodeBg}
                      borderRadius="xl"
                      border="2px solid"
                      borderColor={nodeBorderColor}
                      boxShadow={nodeGlow}
                      transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                      transform={
                        isFound || isTraversing || isUnlinking || isInserting || isHovered
                          ? 'scale(1.08)'
                          : 'scale(1)'
                      }
                      overflow="hidden"
                    >
                      <Flex
                        flex={1.2}
                        direction="column"
                        align="center"
                        justify="center"
                        borderRight="1px solid"
                        borderColor={nodeBorderColor}
                        px={1}
                      >
                        <Text
                          fontSize="sm"
                          fontWeight="bold"
                          fontFamily="var(--font-mono)"
                          color={
                            isFound || isUnlinking || isInserting ? 'white' : COLOR_TOKENS.text
                          }
                        >
                          {node.value}
                        </Text>
                        <Text
                          fontSize="9px"
                          fontFamily="var(--font-mono)"
                          color={
                            isFound || isUnlinking || isInserting
                              ? 'rgba(255,255,255,0.7)'
                              : COLOR_TOKENS.textMuted
                          }
                        >
                          [{idx}]
                        </Text>
                      </Flex>

                      <Flex
                        flex={0.8}
                        direction="column"
                        align="center"
                        justify="center"
                        bg="var(--color-bg)"
                        px={1}
                      >
                        <Text
                          fontSize="8px"
                          fontFamily="var(--font-mono)"
                          color={COLOR_TOKENS.textMuted}
                          fontWeight="bold"
                        >
                          {isDoubly ? 'PTRS' : 'NEXT'}
                        </Text>
                        <Text
                          fontSize="8px"
                          fontFamily="var(--font-mono)"
                          color={
                            idx < nodes.length - 1 ? COLOR_TOKENS.default : COLOR_TOKENS.danger
                          }
                        >
                          {idx < nodes.length - 1 ? '•' : 'Ø'}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex align="center" gap={1} mt={1.5}>
                      {isHead && (
                        <Badge colorPalette="teal" size="xs" variant="subtle" fontSize="8px" px={1}>
                          HEAD
                        </Badge>
                      )}
                      {isTail && !isHead && (
                        <Badge
                          colorPalette="purple"
                          size="xs"
                          variant="subtle"
                          fontSize="8px"
                          px={1}
                        >
                          TAIL
                        </Badge>
                      )}
                    </Flex>
                  </Flex>

                  <Flex align="center" px={1}>
                    <Text
                      fontSize="xs"
                      fontFamily="var(--font-mono)"
                      color={isDoubly ? COLOR_TOKENS.default : COLOR_TOKENS.textMuted}
                      fontWeight="bold"
                    >
                      {isDoubly ? '⇄' : '→'}
                    </Text>
                  </Flex>
                </Flex>
              );
            })
          )}

          <Flex direction="column" align="center" ml={2}>
            <Badge colorPalette="gray" size="xs" variant="outline" px={2} borderRadius="full">
              NULL
            </Badge>
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
        justify="space-between"
        minH="48px"
        wrap="wrap"
        gap={2}
      >
        <Text
          fontSize="sm"
          fontWeight="medium"
          color={COLOR_TOKENS.text}
          fontFamily="var(--font-mono)"
        >
          {operationLog}
        </Text>
        {animatingStatus && (
          <Badge colorPalette="yellow" size="xs" variant="subtle" fontFamily="var(--font-mono)">
            {animatingStatus}
          </Badge>
        )}
      </Flex>

      {error && (
        <Text fontSize="xs" color={COLOR_TOKENS.danger} mt={2} fontFamily="var(--font-mono)">
          {error}
        </Text>
      )}

      <Separator my={4} borderColor={COLOR_TOKENS.border} />

      <Flex
        direction="column"
        gap={3}
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
          wrap="wrap"
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
                    color: isActive ? 'white' : COLOR_TOKENS.text,
                    bg: isActive ? COLOR_TOKENS.default : 'var(--color-surface)',
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
                  _hover={{
                    color: speed === s ? 'white' : COLOR_TOKENS.text,
                    bg: speed === s ? COLOR_TOKENS.default : 'var(--color-surface)',
                  }}
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
              _hover={{ color: COLOR_TOKENS.text, bg: 'var(--color-surface)' }}
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
                _hover={{ filter: 'brightness(1.15)', bg: COLOR_TOKENS.default, color: 'white' }}
                onClick={() => handleInsertHead()}
                fontFamily="var(--font-mono)"
                disabled={isAnimating || nodes.length >= 7}
              >
                + Head (H)
              </Button>
              <Button
                size="xs"
                bg={COLOR_TOKENS.default}
                color="white"
                _hover={{ filter: 'brightness(1.15)', bg: COLOR_TOKENS.default, color: 'white' }}
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
                color={COLOR_TOKENS.text}
                _hover={{ borderColor: COLOR_TOKENS.default, bg: 'var(--color-surface)' }}
                onClick={insertRandom}
                fontFamily="var(--font-mono)"
                disabled={isAnimating || nodes.length >= 7}
              >
                🎲 Random
              </Button>
            </Flex>

            <Flex as="form" onSubmit={handleInsertAtSubmit} align="center" gap={2} wrap="wrap">
              <Text fontSize="2xs" color={COLOR_TOKENS.textMuted} fontFamily="var(--font-mono)">
                Insert @ Idx:
              </Text>
              <Input
                size="xs"
                placeholder="Idx"
                value={insertIndex}
                onChange={(e) => setInsertIndex(e.target.value)}
                w="45px"
                bg="var(--color-bg)"
                color={COLOR_TOKENS.text}
                borderColor={COLOR_TOKENS.border}
                fontFamily="var(--font-mono)"
                disabled={isAnimating}
              />
              <Input
                size="xs"
                placeholder="Val"
                value={insertAtValue}
                onChange={(e) => setInsertAtValue(e.target.value)}
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
                borderColor={COLOR_TOKENS.default}
                color={COLOR_TOKENS.default}
                _hover={{
                  borderColor: COLOR_TOKENS.default,
                  color: COLOR_TOKENS.default,
                  bg: 'rgba(129, 140, 248, 0.1)',
                }}
                fontFamily="var(--font-mono)"
                disabled={isAnimating || nodes.length >= 7}
              >
                Insert @ Position
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
                  _hover={{
                    borderColor: COLOR_TOKENS.compare,
                    color: COLOR_TOKENS.compare,
                    bg: 'rgba(251, 191, 36, 0.15)',
                  }}
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
                  _hover={{
                    borderColor: COLOR_TOKENS.default,
                    color: COLOR_TOKENS.default,
                    bg: 'rgba(129, 140, 248, 0.1)',
                  }}
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
                _hover={{ color: COLOR_TOKENS.text, bg: 'var(--color-surface)' }}
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
                _hover={{ color: COLOR_TOKENS.text, bg: 'var(--color-surface)' }}
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
            <Flex align="center" gap={2} wrap="wrap">
              <Button
                size="xs"
                variant="outline"
                borderColor={COLOR_TOKENS.border}
                color={COLOR_TOKENS.danger}
                _hover={{
                  borderColor: COLOR_TOKENS.danger,
                  color: COLOR_TOKENS.danger,
                  bg: 'rgba(248, 113, 113, 0.1)',
                }}
                onClick={deleteHead}
                disabled={isAnimating || nodes.length === 0}
                fontFamily="var(--font-mono)"
              >
                - Delete Head (D)
              </Button>
              <Button
                size="xs"
                variant="outline"
                borderColor={COLOR_TOKENS.border}
                color={COLOR_TOKENS.danger}
                _hover={{
                  borderColor: COLOR_TOKENS.danger,
                  color: COLOR_TOKENS.danger,
                  bg: 'rgba(248, 113, 113, 0.1)',
                }}
                onClick={deleteTail}
                disabled={isAnimating || nodes.length === 0}
                fontFamily="var(--font-mono)"
              >
                - Delete Tail
              </Button>
            </Flex>

            <Flex align="center" gap={3} wrap="wrap">
              <Flex as="form" onSubmit={handleDeleteSubmit} align="center" gap={1.5}>
                <Input
                  size="xs"
                  placeholder="Val"
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
                  _hover={{
                    borderColor: COLOR_TOKENS.danger,
                    color: COLOR_TOKENS.danger,
                    bg: 'rgba(248, 113, 113, 0.1)',
                  }}
                  fontFamily="var(--font-mono)"
                  disabled={isAnimating || nodes.length === 0}
                >
                  Delete Value
                </Button>
              </Flex>

              <Flex as="form" onSubmit={handleDeleteAtSubmit} align="center" gap={1.5}>
                <Input
                  size="xs"
                  placeholder="Idx"
                  value={deleteIndex}
                  onChange={(e) => setDeleteIndex(e.target.value)}
                  w="45px"
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
                  _hover={{
                    borderColor: COLOR_TOKENS.danger,
                    color: COLOR_TOKENS.danger,
                    bg: 'rgba(248, 113, 113, 0.1)',
                  }}
                  fontFamily="var(--font-mono)"
                  disabled={isAnimating || nodes.length === 0}
                >
                  Delete @ Idx
                </Button>
              </Flex>
            </Flex>
          </Flex>
        )}

        {activeTab === 'utils' && (
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={3}
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
                _hover={{
                  borderColor: COLOR_TOKENS.default,
                  color: COLOR_TOKENS.default,
                  bg: 'rgba(129, 140, 248, 0.15)',
                }}
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
                  _hover={{
                    borderColor: COLOR_TOKENS.compare,
                    color: COLOR_TOKENS.compare,
                    bg: 'rgba(251, 191, 36, 0.15)',
                  }}
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
              _hover={{ color: COLOR_TOKENS.danger, bg: 'rgba(248, 113, 113, 0.15)' }}
              onClick={clear}
              disabled={isAnimating || nodes.length === 0}
              fontFamily="var(--font-mono)"
            >
              🗑️ Clear All (C)
            </Button>
          </Flex>
        )}
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
          Sound •{' '}
          <kbd
            style={{
              padding: '1px 4px',
              borderRadius: '4px',
              background: 'var(--color-surface-light)',
            }}
          >
            Z
          </kbd>{' '}
          Focus
        </Text>
      </Flex>
    </Box>
  );
}
