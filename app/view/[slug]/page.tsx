import { getDocument } from '@/lib/documents';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

 // Dynamically update metadata using Next.js's generateMetadata
  import { Metadata } from 'next';

  export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    // Reuse same loading logic, or fetch more details if available
    // Get nicely formatted name from slug
    const name = slug
      .replace(/-/g, ' ')
      .replace(/^\w/, c => c.toUpperCase());
    return {
      title: name,
      description: `${name}`,
      openGraph: {
        title: name,
        description: `Viewing document: ${name} (ID: ${slug})`,
        type: 'article'
      }
    };
  }

export default async function ViewDocument({ params }: PageProps) {
  const { slug } = await params;
  const content = await getDocument(slug);
 

  if (!content) {
    notFound();
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
}

