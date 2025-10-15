import Link from 'next/link';
import { verifySession } from '@/lib/auth';

export default async function Home() {
  const username = await verifySession();
  const isAuthenticated = !!username;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-end mb-8">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="bg-white/10 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>

          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Document Hosting Platform
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Host and share your HTML, CSS, and JavaScript documents with ease
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Link href="/dashboard" className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">📊</div>
                <h2 className="text-2xl font-semibold text-white mb-3">Dashboard</h2>
                <p className="text-gray-300">View and manage all your hosted documents</p>
              </div>
            </Link>
            
            <Link href="/upload" className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">📤</div>
                <h2 className="text-2xl font-semibold text-white mb-3">Upload Document</h2>
                <p className="text-gray-300">Upload new HTML/CSS/JS documents</p>
              </div>
            </Link>
          </div>

          <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-4">Features</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-2xl mb-2">🚀</div>
                <h4 className="text-white font-semibold mb-2">Fast Hosting</h4>
                <p className="text-gray-400 text-sm">Deploy on Vercel for lightning-fast performance</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🔗</div>
                <h4 className="text-white font-semibold mb-2">Easy Sharing</h4>
                <p className="text-gray-400 text-sm">Share your documents with simple links</p>
              </div>
              <div>
                <div className="text-2xl mb-2">💼</div>
                <h4 className="text-white font-semibold mb-2">Simple Management</h4>
                <p className="text-gray-400 text-sm">Manage all your documents from one place</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
