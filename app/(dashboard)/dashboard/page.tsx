'use client';

import { useAuth } from '@/lib/auth-context';
import { useFiles } from '@/lib/files-context';
import { Header } from '@/components/header';
import { StatCard } from '@/components/ui/stat-card';
import { FileListItem } from '@/components/file-list-item';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Plus, Folder, CheckCircle, ArrowRight } from 'lucide-react';
import { File } from '@/types/file';
import { SlideOver } from '@/components/ui/slide-over';
import { FileInspector } from '@/components/file-inspector';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { files, getMyFiles, getPendingFiles, updateFile } = useFiles();
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

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const myFiles = getMyFiles();
  const pendingFiles = getPendingFiles();
  const pendingCount = pendingFiles.length;
  
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
              <h1 className="text-2xl font-bold text-slate-900">Workspace</h1>
              <p className="text-slate-500 mt-1">
                {getGreeting()}, {user.name}. Here's what's happening today.
              </p>
            </div>
            <span className="text-sm font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
              {currentDate}
            </span>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Create New File"
              icon={Plus}
              colorClass="bg-indigo-600 text-indigo-600"
              onClick={() => router.push('/dashboard/create')}
            />
            <StatCard
              title="My Files"
              value={myFiles.filter(f => f.sender === user.name).length}
              icon={Folder}
              colorClass="bg-blue-500 text-blue-500"
              onClick={() => router.push('/dashboard/files')}
            />
            <StatCard
              title="Pending Approvals"
              value={pendingCount}
              icon={CheckCircle}
              colorClass="bg-amber-500 text-amber-500"
              onClick={() => router.push('/dashboard/pending')}
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
