'use client';

import { useAuth } from '@/lib/auth-context';
import { useFiles } from '@/lib/files-context';
import { Header } from '@/components/header';
import { FileListTable } from '@/components/file-list-table';
import { FileInspector } from '@/components/file-inspector';
import { SlideOver } from '@/components/ui/slide-over';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { File } from '@/types/file';

export default function MyFilesPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { files, getMyFiles, updateFile } = useFiles();
  const router = useRouter();
  const [viewingFile, setViewingFile] = useState<File | null>(null);
  const [fileTabs, setFileTabs] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (!user) {
    return null;
  }

  // For Admin, show all files; for others, show only their files
  const myFiles = user.role === 'Admin' 
    ? files 
    : files.filter(f => f.sender === user.name);

  const handleOpenFile = (file: File) => {
    setViewingFile(file);
  };

  const handleUpdateFile = (id: string, updates: Partial<File>) => {
    updateFile(id, updates);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-8 px-6">
        <FileListTable 
          files={myFiles} 
          title="My Files" 
          onOpenFile={handleOpenFile} 
        />
      </main>

      {/* File Inspector Slide Over */}
      <SlideOver 
        isOpen={!!viewingFile} 
        onClose={() => {
          setViewingFile(null);
          setFileTabs(null);
        }} 
        title="Details"
        tabs={fileTabs}
      >
        {viewingFile && (
          <FileInspector 
            file={viewingFile} 
            user={user} 
            onClose={() => {
              setViewingFile(null);
              setFileTabs(null);
            }} 
            onUpdate={handleUpdateFile}
            onTabsReady={(tabs) => setFileTabs(tabs)}
          />
        )}
      </SlideOver>
    </div>
  );
}

