'use client';

import { useState } from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import type { AlgorithmCode, CodeLanguage } from '@/types/algorithm';

interface CodePanelProps {
  code: AlgorithmCode;
}

const languages: { id: CodeLanguage; label: string }[] = [
  { id: 'typescript', label: 'TypeScript' },
  { id: 'java', label: 'Java' },
  { id: 'python', label: 'Python' },
];

export function CodePanel({ code }: CodePanelProps) {
  const [activeLanguage, setActiveLanguage] = useState<CodeLanguage>('typescript');
  const [copied, setCopied] = useState(false);

  const currentCode = code[activeLanguage];
  const lines = currentCode.split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      w="full"
      borderRadius="xl"
      border="1px solid"
      borderColor="var(--color-border)"
      overflow="hidden"
      bg="var(--color-bg)"
    >
      {/* Code Header Bar */}
      <Flex
        align="center"
        justify="space-between"
        px={4}
        py={2.5}
        bg="var(--color-surface-light)"
        borderBottom="1px solid"
        borderColor="var(--color-border)"
      >
        <Flex gap={1.5}>
          {languages.map((lang) => {
            const isActive = activeLanguage === lang.id;
            return (
              <Button
                key={lang.id}
                size="xs"
                variant={isActive ? 'solid' : 'ghost'}
                bg={isActive ? 'var(--color-indigo)' : 'transparent'}
                color={isActive ? 'white' : 'var(--color-text-muted)'}
                _hover={{
                  bg: isActive ? 'var(--color-indigo-dim)' : 'var(--color-surface)',
                  color: 'var(--color-text)',
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
          borderColor="var(--color-border)"
          color={copied ? '#34d399' : 'var(--color-text)'}
          _hover={{ borderColor: 'var(--color-indigo)', bg: 'var(--color-surface)' }}
          onClick={handleCopy}
          fontFamily="var(--font-mono)"
        >
          {copied ? '✓ Copied' : 'Copy Code'}
        </Button>
      </Flex>

      {/* Code Body with max-height and custom scrolling */}
      <Box maxH="380px" overflowY="auto" overflowX="auto" p={4}>
        <Flex minW="max-content">
          {/* Line Numbers Gutter */}
          <Box
            userSelect="none"
            pr={4}
            mr={4}
            borderRight="1px solid"
            borderColor="var(--color-border)"
            textAlign="right"
          >
            {lines.map((_, i) => (
              <Text
                key={i}
                fontSize="13px"
                fontFamily="var(--font-mono)"
                lineHeight="1.7"
                color="var(--color-text-muted)"
                opacity={0.5}
              >
                {i + 1}
              </Text>
            ))}
          </Box>

          {/* Code text */}
          <Box flex={1}>
            <pre
              style={{
                margin: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                lineHeight: '1.7',
                color: 'var(--color-text)',
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
