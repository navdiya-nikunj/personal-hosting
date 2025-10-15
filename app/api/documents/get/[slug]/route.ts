import { NextRequest, NextResponse } from 'next/server';
import { getDocument } from '@/lib/documents';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const content = await getDocument(slug);

    if (!content) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Extract title from slug (convert back from slug format)
    const title = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return NextResponse.json(
      { title, content, slug },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get document error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve document' },
      { status: 500 }
    );
  }
}

