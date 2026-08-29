'use client';

import { useState, useCallback } from 'react';
import type { AlgorithmCode, CodeLanguage } from '@/types/algorithm';

export interface CodeLanguageOption {
  id: CodeLanguage;
  label: string;
}

export const languages: CodeLanguageOption[] = [
  { id: 'typescript', label: 'TypeScript' },
  { id: 'java', label: 'Java' },
  { id: 'python', label: 'Python' },
];

export function useCodePanel(code: AlgorithmCode) {
  const [activeLanguage, setActiveLanguage] = useState<CodeLanguage>('typescript');
  const [copied, setCopied] = useState(false);

  const currentCode = code[activeLanguage];
  const lines = currentCode.split('\n');

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [currentCode]);

  return {
    activeLanguage,
    setActiveLanguage,
    copied,
    handleCopy,
    currentCode,
    lines,
    languages,
  };
}
