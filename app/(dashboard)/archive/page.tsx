'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { Folder } from 'lucide-react';

export default function ArchivePage() {
  const { user } = useRequireAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 md:py-8 px-4 md:px-6">
          <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">Archive</h1>
              <p className="text-slate-500 mt-1 text-sm md:text-base">
                View your archived files
              </p>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-16 md:py-24">
              <div className="bg-white p-6 rounded-full shadow-sm mb-6 border border-slate-200">
                <Folder className="text-slate-300" size={48} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No archived files</h3>
              <p className="text-slate-500 text-center max-w-md">
                The files you archived will appear here.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
