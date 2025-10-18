import dbConnect from './mongodb';
import DocumentModel, { IDocument } from './models/Document';

export interface Document {
  name: string;
  slug: string;
  created: string;
  content?: string;
}

export async function getDocuments(): Promise<Document[]> {
  try {
    await dbConnect();
    const documents = await DocumentModel.find({})
      .sort({ created: -1 })
      .lean();
    
    return documents.map(doc => ({
      name: doc.title,
      slug: doc.slug,
      created: doc.created.toISOString(),
      content: doc.content,
    }));
  } catch (error) {
    console.error('Error reading documents:', error);
    return [];
  }
}

export async function getDocument(slug: string): Promise<string | null> {
  try {
    await dbConnect();
    const document = await DocumentModel.findOne({ slug }) as IDocument | null;
    return document ? document.content : null;
  } catch (error) {
    console.error('Error reading document:', error);
    return null;
  }
}

export async function saveDocument(title: string, content: string): Promise<string> {
  await dbConnect();
  
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  const document = new DocumentModel({
    title,
    slug,
    content,
    created: new Date(),
  });
  
  await document.save();
  return slug;
}

export async function updateDocument(oldSlug: string, title: string, content: string): Promise<string> {
  await dbConnect();
  
  const newSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  const document = await DocumentModel.findOne({ slug: oldSlug });
  
  if (!document) {
    // If document doesn't exist, create a new one
    return saveDocument(title, content);
  }
  
  // Update the document
  document.title = title;
  document.slug = newSlug;
  document.content = content;
  await document.save();
  
  // If slug changed, delete the old document
  if (oldSlug !== newSlug && oldSlug) {
    try {
      // We've already updated the document with a new slug, 
      // so we don't need to delete anything in MongoDB
      // The old slug is simply no longer used
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }
  
  return newSlug;
}

export async function deleteDocument(slug: string): Promise<boolean> {
  try {
    await dbConnect();
    const result = await DocumentModel.deleteOne({ slug });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
}