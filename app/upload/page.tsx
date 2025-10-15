"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ViewMode = 'editor' | 'preview' | 'split';

export default function Upload() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const router = useRouter();

  const previewContent = content || '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#999;">Your preview will appear here...</div>';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsUploading(true);

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mt-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold text-white">Upload Document</h1>
              
              <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewMode('editor')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'editor'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  📝 Editor
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'split'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  📊 Split
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('preview')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'preview'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  👁️ Preview
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-white font-semibold mb-2">
                  Document Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My Awesome Document"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className={`grid gap-4 ${viewMode === 'split' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {(viewMode === 'editor' || viewMode === 'split') && (
                  <div>
                    <label htmlFor="content" className="block text-white font-semibold mb-2">
                      HTML Content
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Paste your HTML, CSS, and JavaScript code here..."
                      required
                      rows={viewMode === 'split' ? 24 : 20}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
                    />
                    <p className="text-gray-400 text-sm mt-2">
                      You can include HTML, CSS (in &lt;style&gt; tags), and JavaScript (in &lt;script&gt; tags)
                    </p>
                  </div>
                )}
                
                {(viewMode === 'preview' || viewMode === 'split') && (
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Live Preview
                    </label>
                    <div className="bg-white rounded-lg overflow-hidden border-4 border-white/20" style={{ height: viewMode === 'split' ? '600px' : '500px' }}>
                      <iframe
                        title="Preview"
                        srcDoc={previewContent}
                        className="w-full h-full"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Uploading...' : 'Upload Document'}
                </button>
                <Link
                  href="/dashboard"
                  className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20 inline-block text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mt-6">
            <h2 className="text-xl font-semibold text-white mb-4">Example HTML Template</h2>
            <pre className="bg-black/30 p-4 rounded-lg text-gray-300 text-sm overflow-x-auto">
{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Document</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: linear-gradient(to right, #667eea, #764ba2);
      color: white;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255,255,255,0.1);
      padding: 30px;
      border-radius: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello World!</h1>
    <p>This is my hosted document.</p>
  </div>
  <script>
    console.log('Document loaded!');
  </script>
</body>
</html>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

