'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { useFiles } from '@/lib/files-context';
import { FileListTable } from '@/components/file-list-table';
import { useRouter } from 'next/navigation';
import { File } from '@/types/file';
import { FileText as FileIcon, CheckCircle, RotateCcw } from 'lucide-react';

export default function MyFilesPage() {
  const { user } = useRequireAuth();
  const { files } = useFiles();
  const router = useRouter();

  if (!user) {
    return null;
  }

  // For Admin, show all files; for others, show only their files
  const myFiles = user.role === 'Admin'
    ? files
    : files.filter(f => f.sender === user.name);

  const handleOpenFile = (file: File) => {
    router.push(`/files/${file.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <main className="max-w-7xl mx-auto py-8 px-6">
        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-600 rounded-lg">
              <FileIcon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Files</p>
              <p className="text-2xl font-bold text-slate-900">{myFiles.length}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Approved</p>
              <p className="text-2xl font-bold text-slate-900">
                {myFiles.filter(f => f.status === 'Approved').length}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-lg">
              <RotateCcw size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Returned</p>
              <p className="text-2xl font-bold text-slate-900">
                {myFiles.filter(f => f.status === 'Returned').length}
              </p>
            </div>
          </div>
        </div>

        <FileListTable
          files={myFiles}
          title="My Files"
          onOpenFile={handleOpenFile}
        />
      </main>

    </div>
  );
}

