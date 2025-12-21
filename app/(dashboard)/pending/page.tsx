'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { useFiles } from '@/lib/files-context';
import { FileListTable } from '@/components/file-list-table';
import { useRouter } from 'next/navigation';
import { File } from '@/types/file';
import { AlertCircle, Clock, FileText } from 'lucide-react';

export default function PendingApprovalsPage() {
  const { user } = useRequireAuth();
  const { getPendingFiles } = useFiles();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const pendingFiles = getPendingFiles();

  const handleOpenFile = (file: File) => {
    router.push(`/files/${file.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <main className="max-w-7xl mx-auto py-8 px-4 md:px-6">
        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Pending</p>
              <p className="text-2xl font-bold text-slate-900">{pendingFiles.length}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">High Priority</p>
              <p className="text-2xl font-bold text-slate-900">
                {pendingFiles.filter(f => f.priority === 'High' || f.priority === 'Urgent').length}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-lg">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Overdue</p>
              <p className="text-2xl font-bold text-slate-900">
                {pendingFiles.filter(f => f.dueDate && new Date(f.dueDate) < new Date()).length}
              </p>
            </div>
          </div>
        </div>

        <FileListTable
          files={pendingFiles}
          title="Pending Approvals"
          onOpenFile={handleOpenFile}
        />
      </main>

    </div>
  );
}

