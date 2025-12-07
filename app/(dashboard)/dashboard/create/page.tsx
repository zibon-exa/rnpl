'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { useFiles } from '@/lib/files-context';
import { Header } from '@/components/header';
import { CreateFileForm } from '@/components/create-file-form';
import { FileInspector } from '@/components/file-inspector';
import { SlideOver } from '@/components/ui/slide-over';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { File } from '@/types/file';

export default function CreateFilePage() {
  const { user } = useRequireAuth();
  const { addFile, updateFile } = useFiles();
  const router = useRouter();
  const [viewingFile, setViewingFile] = useState<File | null>(null);
  const [fileTabs, setFileTabs] = useState<React.ReactNode>(null);
  const [fileActions, setFileActions] = useState<React.ReactNode>(null);
  const [fileCenterActions, setFileCenterActions] = useState<React.ReactNode>(null);

  if (!user) {
    return null;
  }

  const handleCreateSuccess = (file: File, isDraft: boolean) => {
    addFile(file);
    if (isDraft) {
      router.push('/dashboard/files');
    } else {
      setViewingFile(file);
    }
  };

  const handleUpdateFile = (id: string, updates: Partial<File>) => {
    updateFile(id, updates);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />
      
      <main className="h-[calc(100vh-64px)]">
        <CreateFileForm 
          user={user} 
          onCreateSuccess={handleCreateSuccess}
          onCancel={() => router.push('/dashboard')}
        />
      </main>

      {/* File Inspector Slide Over - opens when file is submitted */}
      <SlideOver 
        isOpen={!!viewingFile} 
        onClose={() => {
          setViewingFile(null);
          setFileTabs(null);
          setFileActions(null);
          setFileCenterActions(null);
          router.push('/dashboard');
        }} 
        title="Details"
        tabs={fileTabs}
        actions={fileActions}
        centerActions={fileCenterActions}
      >
        {viewingFile && (
          <FileInspector 
            file={viewingFile} 
            user={user} 
            onClose={() => {
              setViewingFile(null);
              setFileTabs(null);
              setFileActions(null);
              setFileCenterActions(null);
              router.push('/dashboard');
            }} 
            onUpdate={handleUpdateFile}
            onTabsReady={(tabs) => setFileTabs(tabs)}
            onActionsReady={(actions) => setFileActions(actions)}
            onCenterActionsReady={(actions) => setFileCenterActions(actions)}
          />
        )}
      </SlideOver>
    </div>
  );
}

