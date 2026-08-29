'use client';

import { useState } from 'react';
import { Box, Flex, Text, Button, Code } from '@chakra-ui/react';
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
      borderColor="whiteAlpha.100"
      overflow="hidden"
      bg="#0d0d14"
    >
      <Flex
        align="center"
        justify="space-between"
        px={4}
        py={2}
        bg="whiteAlpha.50"
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
      >
        <Flex gap={1}>
          {languages.map((lang) => (
            <Button
              key={lang.id}
              size="xs"
              variant={activeLanguage === lang.id ? 'solid' : 'ghost'}
              bg={activeLanguage === lang.id ? 'indigo.600' : 'transparent'}
              color={activeLanguage === lang.id ? 'white' : 'whiteAlpha.600'}
              _hover={{ bg: activeLanguage === lang.id ? 'indigo.500' : 'whiteAlpha.100', color: 'white' }}
              borderRadius="md"
              onClick={() => setActiveLanguage(lang.id)}
            >
              {lang.label}
            </Button>
          ))}
        </Flex>

        <Button
          size="xs"
          variant="ghost"
          color={copied ? 'green.400' : 'whiteAlpha.500'}
          _hover={{ color: 'white' }}
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
          color="whiteAlpha.900"
          bg="transparent"
          lineHeight="1.7"
        >
          {code[activeLanguage]}
        </Code>
      </Box>
    </Box>
  );
}
