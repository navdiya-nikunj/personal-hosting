import Link from 'next/link';
import { getDocuments } from '@/lib/documents';
import DocumentCard from '@/components/DocumentCard';
import { verifySession } from '@/lib/auth';
import LogoutButton from '@/components/LogoutButton';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const documents = await getDocuments();
  const username = await verifySession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-2 inline-block">
                ← Back to Home
              </Link>
              <h1 className="text-4xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-300 mt-2">
                Welcome, <span className="text-blue-400">{username}</span> • Manage your hosted documents
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/upload"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
              >
                + Upload New Document
              </Link>
              <LogoutButton />
            </div>
          </div>

          {documents.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
              <div className="text-6xl mb-4">📄</div>
              <h2 className="text-2xl font-semibold text-white mb-3">No documents yet</h2>
              <p className="text-gray-300 mb-6">Upload your first HTML document to get started</p>
              <Link
                href="/upload"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Upload Document
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.slug}
                  name={doc.name}
                  slug={doc.slug}
                  created={doc.created}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

