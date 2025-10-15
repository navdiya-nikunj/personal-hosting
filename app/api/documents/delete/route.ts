import { NextRequest, NextResponse } from 'next/server';
import { deleteDocument } from '@/lib/documents';
import { redirect } from 'next/navigation';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const slug = formData.get('slug') as string;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    await deleteDocument(slug);
    
    return redirect('/dashboard');
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}

