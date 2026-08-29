'use client';

import { ChakraProvider as ChakraUIProvider, defaultSystem } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface ChakraProviderProps {
  children: ReactNode;
}

export function ChakraProvider({ children }: ChakraProviderProps) {
  return <ChakraUIProvider value={defaultSystem}>{children}</ChakraUIProvider>;
}
