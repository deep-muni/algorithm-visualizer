import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { algorithmMap } from '@/data';
import { AlgorithmPageClient } from '@/components/visualizer/algorithm-page-client';
import type { AlgorithmId } from '@/types/algorithm';

interface AlgorithmPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AlgorithmPageProps): Promise<Metadata> {
  const { id } = await params;
  const algorithm = algorithmMap[id as AlgorithmId];
  if (!algorithm) return {};
  return {
    title: algorithm.name,
    description: algorithm.shortDescription,
  };
}

export default async function AlgorithmPage({ params }: AlgorithmPageProps) {
  const { id } = await params;
  const algorithm = algorithmMap[id as AlgorithmId];

  if (!algorithm) {
    notFound();
  }

  return <AlgorithmPageClient algorithm={algorithm} />;
}
