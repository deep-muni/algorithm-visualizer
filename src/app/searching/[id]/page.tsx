import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { searchingAlgorithms, algorithmMap } from '@/data';
import { AlgorithmPageClient } from '@/components/visualizer';
import type { AlgorithmId } from '@/types/algorithm';

export const dynamic = 'force-static';

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return searchingAlgorithms.map((algo) => ({
    id: algo.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const algo = algorithmMap[id as AlgorithmId];

  if (!algo) {
    return { title: 'Algorithm Not Found' };
  }

  return {
    title: `${algo.name} Visualizer | Algorithm Visualizer`,
    description: algo.shortDescription,
  };
}

export default async function SearchingPage({ params }: Props) {
  const { id } = await params;
  const algorithm = algorithmMap[id as AlgorithmId];

  if (!algorithm || algorithm.category !== 'searching') {
    notFound();
  }

  return <AlgorithmPageClient algorithm={algorithm} />;
}
