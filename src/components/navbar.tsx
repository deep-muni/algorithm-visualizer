'use client';

import Link from 'next/link';
import { Container, Flex, Box, Text, Button } from '@chakra-ui/react';
import { siteConfig } from '@/config/site';

export function Navbar() {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={50}
      borderBottom="1px solid"
      borderColor="whiteAlpha.300"
      bg="rgba(13, 13, 20, 0.85)"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <Container maxW="1200px" px={4} py={3}>
        <Flex justify="space-between" align="center">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Flex align="center" gap={2}>
              <Box
                w="28px"
                h="28px"
                borderRadius="md"
                bg="indigo.600"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontWeight="bold"
                fontSize="sm"
                boxShadow="0 0 12px rgba(129, 140, 248, 0.4)"
              >
                ∿
              </Box>
              <Text
                fontSize="md"
                fontWeight="bold"
                color="white"
                fontFamily="var(--font-mono)"
                letterSpacing="-0.02em"
              >
                {siteConfig.name}
              </Text>
            </Flex>
          </Link>

          <Flex align="center" gap={3}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Button
                size="xs"
                variant="ghost"
                color="whiteAlpha.800"
                _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
                fontFamily="var(--font-mono)"
              >
                Algorithms
              </Button>
            </Link>

            <Button
              asChild
              size="xs"
              variant="outline"
              borderColor="whiteAlpha.300"
              color="whiteAlpha.900"
              _hover={{ borderColor: 'indigo.400', bg: 'whiteAlpha.100' }}
              fontFamily="var(--font-mono)"
            >
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
