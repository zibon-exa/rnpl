'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { useFiles } from '@/lib/files-context';
import { FileListTable } from '@/components/file-list-table';
import { useRouter } from 'next/navigation';
import { File } from '@/types/file';

export default function PendingApprovalsPage() {
  const { user } = useRequireAuth();
  const { getPendingFiles } = useFiles();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const pendingFiles = getPendingFiles();

  const handleOpenFile = (file: File) => {
    router.push(`/dashboard/files/${file.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <main className="max-w-7xl mx-auto py-8 px-6">
        <FileListTable 
          files={pendingFiles} 
          title="Pending Approvals" 
          onOpenFile={handleOpenFile} 
        />
      </main>

    </div>
  );
}

