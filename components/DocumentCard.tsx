"use client";

import Link from 'next/link';
import { useState } from 'react';

interface DocumentCardProps {
  name: string;
  slug: string;
  created: string;
}

export default function DocumentCard({ name, slug, created }: DocumentCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/view/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    const formData = new FormData();
    formData.append('slug', slug);

    const response = await fetch('/api/documents/delete', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      window.location.reload();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📄</span>
            <h3 className="text-xl font-semibold text-white">{name}</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Created: {new Date(created).toLocaleString()}
          </p>
          <div className="flex gap-3">
            <Link
              href={`/view/${slug}`}
              target="_blank"
              className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg font-medium hover:bg-blue-500/30 transition-colors border border-blue-500/30"
            >
              View Document
            </Link>
            <button
              onClick={handleCopyLink}
              className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-lg font-medium hover:bg-purple-500/30 transition-colors border border-purple-500/30"
            >
              {copied ? '✓ Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg font-medium hover:bg-red-500/30 transition-colors border border-red-500/30"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium border border-green-500/30">
            Live
          </div>
        </div>
      </div>
    </div>
  );
}

