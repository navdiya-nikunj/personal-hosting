import fs from 'fs/promises';
import path from 'path';

export interface Document {
  name: string;
  slug: string;
  created: string;
  path: string;
}

const DOCUMENTS_DIR = path.join(process.cwd(), 'public', 'documents');

export async function getDocuments(): Promise<Document[]> {
  try {
    await fs.mkdir(DOCUMENTS_DIR, { recursive: true });
    const files = await fs.readdir(DOCUMENTS_DIR);
    
    const documents = await Promise.all(
      files
        .filter(file => file.endsWith('.html'))
        .map(async (file) => {
          const filePath = path.join(DOCUMENTS_DIR, file);
          const stats = await fs.stat(filePath);
          const slug = file.replace('.html', '');
          
          return {
            name: slug.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()),
            slug,
            created: stats.birthtime.toISOString(),
            path: filePath,
          };
        })
    );

    return documents.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  } catch (error) {
    console.error('Error reading documents:', error);
    return [];
  }
}

export async function getDocument(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(DOCUMENTS_DIR, `${slug}.html`);
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error reading document:', error);
    return null;
  }
}

export async function saveDocument(title: string, content: string): Promise<string> {
  await fs.mkdir(DOCUMENTS_DIR, { recursive: true });
  
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  const filePath = path.join(DOCUMENTS_DIR, `${slug}.html`);
  await fs.writeFile(filePath, content, 'utf-8');
  
  return slug;
}

export async function updateDocument(oldSlug: string, title: string, content: string): Promise<string> {
  await fs.mkdir(DOCUMENTS_DIR, { recursive: true });
  
  const newSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  const oldFilePath = path.join(DOCUMENTS_DIR, `${oldSlug}.html`);
  const newFilePath = path.join(DOCUMENTS_DIR, `${newSlug}.html`);
  
  // Write the updated content
  await fs.writeFile(newFilePath, content, 'utf-8');
  
  // If the slug changed (title changed), delete the old file
  if (oldSlug !== newSlug) {
    try {
      await fs.unlink(oldFilePath);
    } catch (error) {
      console.error('Error deleting old document:', error);
    }
  }
  
  return newSlug;
}

export async function deleteDocument(slug: string): Promise<boolean> {
  try {
    const filePath = path.join(DOCUMENTS_DIR, `${slug}.html`);
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
}

