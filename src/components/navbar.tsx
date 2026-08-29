'use client';

import Link from 'next/link';
import { Container, Flex, Box, Text, IconButton } from '@chakra-ui/react';
import { siteConfig } from '@/config/site';

function GithubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

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

          <Flex align="center">
            <IconButton
              asChild
              aria-label="GitHub Repository"
              variant="ghost"
              size="sm"
              color="whiteAlpha.800"
              _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
            >
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
              >
                <GithubIcon />
              </a>
            </IconButton>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
