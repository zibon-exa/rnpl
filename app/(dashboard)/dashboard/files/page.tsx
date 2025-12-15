'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { useFiles } from '@/lib/files-context';
import { FileListTable } from '@/components/file-list-table';
import { useRouter } from 'next/navigation';
import { File } from '@/types/file';

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
    router.push(`/dashboard/files/${file.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <main className="max-w-7xl mx-auto py-8 px-6">
        <FileListTable 
          files={myFiles} 
          title="My Files" 
          onOpenFile={handleOpenFile} 
        />
      </main>

    </div>
  );
}

