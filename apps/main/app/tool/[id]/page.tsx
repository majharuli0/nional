import React from 'react';
import { notFound } from 'next/navigation';
import { TOOLS } from '../../../lib/data';
import ToolPageClient from './ToolPageClient';

// Helper to find tool by slug or id
const getTool = (id: string) => TOOLS.find(t => t.id === id || t.slug === id);

// Required for static export
export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    id: tool.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = getTool(id);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} - Free Tool`,
    description: `${tool.longDesc} Completely free to use with no login required.`,
    openGraph: {
      title: `${tool.name} - Free | Nional`,
      description: tool.longDesc,
    },
    keywords: [`free ${tool.slug}`, "no sign up ai", "free tools", "nional"],
  };
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = getTool(id);

  if (!tool) {
    return notFound();
  }

  return <ToolPageClient id={id} />;
}
