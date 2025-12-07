'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { useFiles } from '@/lib/files-context';
import { Header } from '@/components/header';
import { FileListTable } from '@/components/file-list-table';
import { FileInspector } from '@/components/file-inspector';
import { SlideOver } from '@/components/ui/slide-over';
import { useState } from 'react';
import { File } from '@/types/file';

export default function PendingApprovalsPage() {
  const { user } = useRequireAuth();
  const { files, getPendingFiles, updateFile } = useFiles();
  const [viewingFile, setViewingFile] = useState<File | null>(null);
  const [fileTabs, setFileTabs] = useState<React.ReactNode>(null);
  const [fileActions, setFileActions] = useState<React.ReactNode>(null);
  const [fileCenterActions, setFileCenterActions] = useState<React.ReactNode>(null);

  if (!user) {
    return null;
  }

  const pendingFiles = getPendingFiles();

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
          files={pendingFiles} 
          title="Pending Approvals" 
          onOpenFile={handleOpenFile} 
        />
      </main>

      {/* File Inspector Slide Over */}
      <SlideOver 
        isOpen={!!viewingFile} 
        onClose={() => {
          setViewingFile(null);
          setFileTabs(null);
          setFileActions(null);
          setFileCenterActions(null);
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

