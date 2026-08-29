'use client';

import { useState } from 'react';
import { Box, Flex, Button, Code } from '@chakra-ui/react';
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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code[activeLanguage]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      borderRadius="xl"
      border="1px solid"
      borderColor="var(--color-border)"
      overflow="hidden"
      bg="var(--color-bg)"
    >
      <Flex
        align="center"
        justify="space-between"
        px={3}
        py={2}
        bg="var(--color-surface-light)"
        borderBottom="1px solid"
        borderColor="var(--color-border)"
      >
        <Flex gap={1}>
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
                onClick={() => setActiveLanguage(lang.id)}
              >
                {lang.label}
              </Button>
            );
          })}
        </Flex>

        <Button
          size="xs"
          variant="ghost"
          color={copied ? '#34d399' : 'var(--color-text-muted)'}
          _hover={{ color: 'var(--color-text)' }}
          onClick={handleCopy}
          fontFamily="var(--font-mono)"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </Button>
      </Flex>

      <Box p={4} overflowX="auto">
        <Code
          display="block"
          whiteSpace="pre"
          fontFamily="var(--font-mono)"
          fontSize="13px"
          color="var(--color-text)"
          bg="transparent"
          lineHeight="1.7"
        >
          {code[activeLanguage]}
        </Code>
      </Box>
    </Box>
  );
}
