import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { sortingAlgorithms, algorithmMap } from '@/data';
import { SortingPageClient } from '@/components/sorting';
import type { AlgorithmId } from '@/types/algorithm';

export const dynamic = 'force-static';

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return sortingAlgorithms.map((algo) => ({
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

export default async function SortingPage({ params }: Props) {
  const { id } = await params;
  const algorithm = algorithmMap[id as AlgorithmId];

  if (!algorithm || algorithm.category !== 'sorting') {
    notFound();
  }

  return <SortingPageClient algorithm={algorithm} />;
}
