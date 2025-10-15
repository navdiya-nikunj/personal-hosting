import { NextRequest, NextResponse } from 'next/server';
import { updateDocument } from '@/lib/documents';

export async function POST(request: NextRequest) {
  try {
    const { slug, title, content } = await request.json();

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'Slug, title and content are required' },
        { status: 400 }
      );
    }

    const newSlug = await updateDocument(slug, title, content);

    return NextResponse.json(
      { success: true, slug: newSlug },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

