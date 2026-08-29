'use client';

import { useState } from 'react';
import { Box, Flex, Button, Input, Text } from '@chakra-ui/react';
import { useArrayConfig } from '@/hooks/use-array-config';

interface ArrayConfigBarProps {
  onArrayChange: (arr: number[]) => void;
  disabled?: boolean;
  currentArray?: number[];
}

const sizeOptions = [8, 12, 16, 20];

export function ArrayConfigBar({ onArrayChange, disabled, currentArray }: ArrayConfigBarProps) {
  const {
    customInput,
    inputError,
    arraySize,
    handlePreset,
    handleSizeChange,
    handleInputChange,
    handleApplyCustom,
  } = useArrayConfig(onArrayChange);

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    const dataStr = currentArray && currentArray.length > 0 ? currentArray.join(',') : '';
    const url = dataStr
      ? `${window.location.origin}${window.location.pathname}?data=${dataStr}`
      : window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      bg="var(--color-surface)"
      borderRadius="xl"
      border="1px solid"
      borderColor="var(--color-border)"
      p={3}
      mb={4}
    >
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap={3}
        justify="space-between"
        align={{ base: 'stretch', lg: 'center' }}
      >
        <Flex align="center" gap={2} wrap="wrap">
          <Text
            fontSize="xs"
            fontWeight="bold"
            color="var(--color-text-muted)"
            fontFamily="var(--font-mono)"
          >
            Presets:
          </Text>

          <Button
            size="xs"
            variant="outline"
            borderColor="var(--color-border)"
            color="var(--color-text)"
            _hover={{ borderColor: 'var(--color-indigo)', bg: 'var(--color-surface-light)' }}
            onClick={() => handlePreset('random')}
            disabled={disabled}
          >
            Random
          </Button>

          <Button
            size="xs"
            variant="outline"
            borderColor="var(--color-border)"
            color="var(--color-text)"
            _hover={{ borderColor: 'var(--color-indigo)', bg: 'var(--color-surface-light)' }}
            onClick={() => handlePreset('reversed')}
            disabled={disabled}
          >
            Reversed
          </Button>

          <Button
            size="xs"
            variant="outline"
            borderColor="var(--color-border)"
            color="var(--color-text)"
            _hover={{ borderColor: 'var(--color-indigo)', bg: 'var(--color-surface-light)' }}
            onClick={() => handlePreset('nearly-sorted')}
            disabled={disabled}
          >
            Nearly Sorted
          </Button>

          <Button
            size="xs"
            variant="outline"
            borderColor="var(--color-border)"
            color="var(--color-text)"
            _hover={{ borderColor: 'var(--color-indigo)', bg: 'var(--color-surface-light)' }}
            onClick={() => handlePreset('few-unique')}
            disabled={disabled}
          >
            Duplicates
          </Button>
        </Flex>

        <Flex align="center" gap={3} wrap="wrap">
          <Flex align="center" gap={1}>
            <Text fontSize="xs" color="var(--color-text-muted)" fontFamily="var(--font-mono)">
              Size:
            </Text>
            {sizeOptions.map((sz) => (
              <Button
                key={sz}
                size="xs"
                variant={arraySize === sz ? 'solid' : 'ghost'}
                bg={arraySize === sz ? 'var(--color-indigo)' : 'transparent'}
                color={arraySize === sz ? 'white' : 'var(--color-text-muted)'}
                _hover={{
                  bg: arraySize === sz ? 'var(--color-indigo)' : 'var(--color-surface-light)',
                  color: 'var(--color-text)',
                }}
                onClick={() => handleSizeChange(sz)}
                disabled={disabled}
                fontFamily="var(--font-mono)"
              >
                {sz}
              </Button>
            ))}
          </Flex>

          <Flex as="form" onSubmit={handleApplyCustom} align="center" gap={2}>
            <Input
              size="xs"
              placeholder="e.g. 50, 12, 85, 34"
              value={customInput}
              onChange={(e) => handleInputChange(e.target.value)}
              disabled={disabled}
              borderColor={inputError ? 'red.400' : 'var(--color-border)'}
              bg="var(--color-surface-light)"
              color="var(--color-text)"
              _focus={{ borderColor: 'var(--color-indigo)' }}
              fontFamily="var(--font-mono)"
              maxW={{ base: 'full', md: '180px' }}
            />

            <Button
              type="submit"
              size="xs"
              bg="var(--color-indigo)"
              color="white"
              _hover={{ bg: 'var(--color-indigo-dim)' }}
              disabled={disabled || !customInput.trim()}
            >
              Apply
            </Button>
          </Flex>

          <Button
            size="xs"
            variant="outline"
            borderColor={copied ? '#34d399' : 'var(--color-border)'}
            color={copied ? '#34d399' : 'var(--color-text)'}
            bg={copied ? 'rgba(52, 211, 153, 0.1)' : 'transparent'}
            _hover={{
              borderColor: copied ? '#34d399' : 'var(--color-indigo)',
              bg: copied ? 'rgba(52, 211, 153, 0.15)' : 'var(--color-surface-light)',
            }}
            onClick={handleShare}
            fontFamily="var(--font-mono)"
          >
            {copied ? '✓ Copied URL!' : '🔗 Share URL'}
          </Button>
        </Flex>
      </Flex>

      {inputError && (
        <Text fontSize="xs" color="red.400" mt={2} fontFamily="var(--font-mono)">
          {inputError}
        </Text>
      )}
    </Box>
  );
}
