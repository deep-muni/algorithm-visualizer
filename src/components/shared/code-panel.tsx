'use client';

import { Box, Flex, Button, Text } from '@chakra-ui/react';
import type { AlgorithmCode } from '@/types/algorithm';
import { useCodePanel } from '@/hooks/use-code-panel';
import { COLOR_TOKENS } from '@/config/colors';

interface CodePanelProps {
  code: AlgorithmCode;
}

export function CodePanel({ code }: CodePanelProps) {
  const { activeLanguage, setActiveLanguage, copied, handleCopy, currentCode, lines, languages } =
    useCodePanel(code);

  return (
    <Box
      w="full"
      h="full"
      display="flex"
      flexDirection="column"
      borderRadius="xl"
      border="1px solid"
      borderColor={COLOR_TOKENS.border}
      overflow="hidden"
      bg="var(--color-bg)"
    >
      <Flex
        align="center"
        justify="space-between"
        px={4}
        py={2.5}
        bg={COLOR_TOKENS.surfaceLight}
        borderBottom="1px solid"
        borderColor={COLOR_TOKENS.border}
        flexShrink={0}
      >
        <Flex gap={1.5}>
          {languages.map((lang) => {
            const isActive = activeLanguage === lang.id;
            return (
              <Button
                key={lang.id}
                size="xs"
                variant={isActive ? 'solid' : 'ghost'}
                bg={isActive ? COLOR_TOKENS.default : 'transparent'}
                color={isActive ? 'white' : COLOR_TOKENS.textMuted}
                _hover={{
                  bg: isActive ? 'var(--color-indigo-dim)' : COLOR_TOKENS.surface,
                  color: COLOR_TOKENS.text,
                }}
                borderRadius="md"
                fontFamily="var(--font-mono)"
                fontWeight={isActive ? 'bold' : 'medium'}
                onClick={() => setActiveLanguage(lang.id)}
              >
                {lang.label}
              </Button>
            );
          })}
        </Flex>

        <Button
          size="xs"
          variant="outline"
          borderColor={COLOR_TOKENS.border}
          color={copied ? COLOR_TOKENS.success : COLOR_TOKENS.text}
          _hover={{ borderColor: COLOR_TOKENS.default, bg: COLOR_TOKENS.surface }}
          onClick={handleCopy}
          fontFamily="var(--font-mono)"
        >
          {copied ? '✓ Copied' : 'Copy Code'}
        </Button>
      </Flex>

      <Box flex={1} minH={0} overflowY="auto" overflowX="auto" p={4}>
        <Flex minW="max-content">
          <Box
            userSelect="none"
            pr={4}
            mr={4}
            borderRight="1px solid"
            borderColor={COLOR_TOKENS.border}
            textAlign="right"
          >
            {lines.map((_, i) => (
              <Text
                key={i}
                fontSize="13px"
                fontFamily="var(--font-mono)"
                lineHeight="1.7"
                color={COLOR_TOKENS.textMuted}
                opacity={0.5}
              >
                {i + 1}
              </Text>
            ))}
          </Box>

          <Box flex={1}>
            <pre
              style={{
                margin: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                lineHeight: '1.7',
                color: COLOR_TOKENS.text,
              }}
            >
              <code>{currentCode}</code>
            </pre>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
