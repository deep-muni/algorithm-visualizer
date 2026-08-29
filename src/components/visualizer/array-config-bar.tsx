'use client';

import { useState } from 'react';
import { Box, Flex, Button, Input, Text } from '@chakra-ui/react';
import {
  generateRandomArray,
  generateReversedArray,
  generateNearlySortedArray,
  generateFewUniqueArray,
} from '@/lib/visualizers';

interface ArrayConfigBarProps {
  onArrayChange: (arr: number[]) => void;
  disabled?: boolean;
}

export function ArrayConfigBar({ onArrayChange, disabled }: ArrayConfigBarProps) {
  const [customInput, setCustomInput] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [arraySize, setArraySize] = useState<number>(12);

  const handlePreset = (
    type: 'random' | 'reversed' | 'nearly-sorted' | 'few-unique',
    size = arraySize
  ) => {
    let arr: number[] = [];
    if (type === 'random') arr = generateRandomArray(size);
    else if (type === 'reversed') arr = generateReversedArray(size);
    else if (type === 'nearly-sorted') arr = generateNearlySortedArray(size);
    else if (type === 'few-unique') arr = generateFewUniqueArray(size);

    setInputError(null);
    onArrayChange(arr);
  };

  const handleSizeChange = (newSize: number) => {
    setArraySize(newSize);
    handlePreset('random', newSize);
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const parsed = customInput
      .split(/[, ]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map(Number);

    if (parsed.some((n) => isNaN(n) || n <= 0 || n > 999)) {
      setInputError('Enter positive numbers between 1 and 999');
      return;
    }

    if (parsed.length < 3) {
      setInputError('Provide at least 3 numbers');
      return;
    }

    if (parsed.length > 30) {
      setInputError('Maximum 30 numbers allowed');
      return;
    }

    setInputError(null);
    setCustomInput('');
    onArrayChange(parsed);
  };

  return (
    <Box
      bg="var(--color-surface)"
      borderRadius="xl"
      border="1px solid"
      borderColor="whiteAlpha.300"
      p={4}
      mb={4}
    >
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap={4}
        justify="space-between"
        align={{ base: 'stretch', lg: 'center' }}
      >
        <Flex align="center" gap={2} wrap="wrap">
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color="whiteAlpha.700"
            fontFamily="var(--font-mono)"
          >
            Presets:
          </Text>

          <Button
            size="xs"
            variant="outline"
            borderColor="whiteAlpha.300"
            color="whiteAlpha.900"
            _hover={{ borderColor: 'indigo.400', bg: 'whiteAlpha.200' }}
            onClick={() => handlePreset('random')}
            disabled={disabled}
          >
            Random
          </Button>

          <Button
            size="xs"
            variant="outline"
            borderColor="whiteAlpha.300"
            color="whiteAlpha.900"
            _hover={{ borderColor: 'indigo.400', bg: 'whiteAlpha.200' }}
            onClick={() => handlePreset('reversed')}
            disabled={disabled}
          >
            Reversed
          </Button>

          <Button
            size="xs"
            variant="outline"
            borderColor="whiteAlpha.300"
            color="whiteAlpha.900"
            _hover={{ borderColor: 'indigo.400', bg: 'whiteAlpha.200' }}
            onClick={() => handlePreset('nearly-sorted')}
            disabled={disabled}
          >
            Nearly Sorted
          </Button>

          <Button
            size="xs"
            variant="outline"
            borderColor="whiteAlpha.300"
            color="whiteAlpha.900"
            _hover={{ borderColor: 'indigo.400', bg: 'whiteAlpha.200' }}
            onClick={() => handlePreset('few-unique')}
            disabled={disabled}
          >
            Duplicates
          </Button>
        </Flex>

        <Flex align="center" gap={3} wrap="wrap">
          <Flex align="center" gap={1}>
            <Text fontSize="xs" color="whiteAlpha.600" fontFamily="var(--font-mono)">
              Size:
            </Text>
            {[8, 12, 16, 20].map((sz) => (
              <Button
                key={sz}
                size="xs"
                variant={arraySize === sz ? 'solid' : 'ghost'}
                bg={arraySize === sz ? 'indigo.600' : 'transparent'}
                color={arraySize === sz ? 'white' : 'whiteAlpha.700'}
                _hover={{ bg: arraySize === sz ? 'indigo.500' : 'whiteAlpha.200', color: 'white' }}
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
              onChange={(e) => {
                setCustomInput(e.target.value);
                if (inputError) setInputError(null);
              }}
              disabled={disabled}
              borderColor={inputError ? 'red.400' : 'whiteAlpha.300'}
              bg="whiteAlpha.50"
              color="white"
              _focus={{ borderColor: 'indigo.400' }}
              fontFamily="var(--font-mono)"
              maxW={{ base: 'full', md: '180px' }}
            />

            <Button
              type="submit"
              size="xs"
              bg="indigo.600"
              color="white"
              _hover={{ bg: 'indigo.500' }}
              disabled={disabled || !customInput.trim()}
            >
              Apply
            </Button>
          </Flex>
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
