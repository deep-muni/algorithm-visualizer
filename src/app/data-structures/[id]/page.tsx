import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { dataStructures, dataStructureMap } from '@/data';
import { DataStructurePageClient } from '@/components/data-structures';
import type { DataStructureId } from '@/types/algorithm';

export const dynamic = 'force-static';

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return dataStructures.map((ds) => ({
    id: ds.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const ds = dataStructureMap[id as DataStructureId];

  if (!ds) {
    return { title: 'Data Structure Not Found' };
  }

  return {
    title: `${ds.name} Visualizer | Algorithm Visualizer`,
    description: ds.shortDescription,
  };
}

export default async function DataStructurePage({ params }: Props) {
  const { id } = await params;
  const dataStructure = dataStructureMap[id as DataStructureId];

  if (!dataStructure) {
    notFound();
  }

  return <DataStructurePageClient dataStructure={dataStructure} />;
}
