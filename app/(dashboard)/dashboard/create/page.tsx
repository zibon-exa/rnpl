'use client';

import { useAuth } from '@/lib/auth-context';
import { useFiles } from '@/lib/files-context';
import { Header } from '@/components/header';
import { CreateFileForm } from '@/components/create-file-form';
import { FileInspector } from '@/components/file-inspector';
import { SlideOver } from '@/components/ui/slide-over';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { File } from '@/types/file';

export default function CreateFilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { addFile, updateFile } = useFiles();
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
      
      <main className="max-w-7xl mx-auto py-8 px-6">
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
          router.push('/dashboard');
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
              router.push('/dashboard');
            }} 
            onUpdate={handleUpdateFile}
            onTabsReady={(tabs) => setFileTabs(tabs)}
          />
        )}
      </SlideOver>
    </div>
  );
}

