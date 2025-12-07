'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { useFiles } from '@/lib/files-context';
import { Header } from '@/components/header';
import { StatCard } from '@/components/ui/stat-card';
import { FileListItem } from '@/components/file-list-item';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Plus, Folder, CheckCircle, ArrowRight, FileText, Clock, RotateCcw } from 'lucide-react';
import { File } from '@/types/file';
import { SlideOver } from '@/components/ui/slide-over';
import { FileInspector } from '@/components/file-inspector';
import { Button } from '@/components/ui/button';
import { getCurrentDateBangla } from '@/lib/utils';

export default function DashboardPage() {
  const { user } = useRequireAuth();
  const { files, getMyFiles, getPendingFiles, updateFile } = useFiles();
  const router = useRouter();
  const [viewingFile, setViewingFile] = useState<File | null>(null);
  const [fileTabs, setFileTabs] = useState<React.ReactNode>(null);
  const [fileActions, setFileActions] = useState<React.ReactNode>(null);
  const [fileCenterActions, setFileCenterActions] = useState<React.ReactNode>(null);

  if (!user) {
    return null;
  }

  const getGreeting = () => {
    return `স্বাগতম, ${user.name}! আজ ${getCurrentDateBangla()}`;
  };

  const myFiles = getMyFiles();
  const pendingFiles = getPendingFiles();
  
  // Calculate statistics
  const totalFiles = files.length;
  const pendingCount = pendingFiles.length;
  const approvedFiles = files.filter(f => f.status === 'Approved').length;
  const myFilesCount = myFiles.filter(f => f.sender === user.name).length;
  const returnedFiles = files.filter(f => f.status === 'Returned' && f.sender === user.name).length;
  const filesThisMonth = files.filter(f => {
    const fileDate = new Date(f.lastUpdated);
    const now = new Date();
    return fileDate.getMonth() === now.getMonth() && fileDate.getFullYear() === now.getFullYear();
  }).length;
  
  // Show recent files requiring attention (pending approvals) or recent user files
  const relevantFiles = pendingFiles.length > 0 
    ? pendingFiles.slice(0, 3)
    : myFiles.filter(f => f.sender === user.name).slice(0, 3);

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
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-500 mt-1 font-bangla">
                {getGreeting()}
              </p>
            </div>
            <Button 
              onClick={() => router.push('/dashboard/create')}
              className="text-white"
              style={{ 
                backgroundColor: 'hsl(var(--color-brand))',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'hsl(196, 60%, 50%)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'hsl(var(--color-brand))'}
            >
              <Plus size={18} className="mr-2" />
              Create New File
            </Button>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <StatCard
              title="Total"
              value={totalFiles}
              icon={FileText}
              colorClass="bg-indigo-600 text-indigo-600"
            />
            <StatCard
              title="Pending"
              value={pendingCount}
              icon={Clock}
              colorClass="bg-amber-500 text-amber-500"
              onClick={() => router.push('/dashboard/pending')}
            />
            <StatCard
              title="Approved"
              value={approvedFiles}
              icon={CheckCircle}
              colorClass="bg-emerald-500 text-emerald-500"
            />
            <StatCard
              title="My Files"
              value={myFilesCount}
              icon={Folder}
              colorClass="bg-blue-500 text-blue-500"
              onClick={() => router.push('/dashboard/files')}
            />
            <StatCard
              title="Returned"
              value={returnedFiles}
              icon={RotateCcw}
              colorClass="bg-rose-500 text-rose-500"
            />
            <StatCard
              title="This Month"
              value={filesThisMonth}
              icon={FileText}
              colorClass="bg-purple-500 text-purple-500"
            />
          </div>

          {/* Recent Activity Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                {pendingFiles.length > 0 ? 'Files Requiring Attention' : 'Recent File Activity'}
              </h2>
              <button 
                onClick={() => router.push(pendingFiles.length > 0 ? '/dashboard/pending' : '/dashboard/files')} 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                View All <ArrowRight size={14} />
              </button>
            </div>
            
            <div className="grid gap-3">
              {relevantFiles.length > 0 ? (
                relevantFiles.map(file => (
                  <FileListItem key={file.id} file={file} onClick={handleOpenFile} />
                ))
              ) : (
                <div className="p-10 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center bg-slate-50/50">
                  <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <Folder className="text-slate-300" size={24} />
                  </div>
                  <p className="text-slate-500 text-sm font-medium">
                    No files currently require your attention.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
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
