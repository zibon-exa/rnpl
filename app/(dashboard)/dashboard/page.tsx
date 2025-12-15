'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { useFiles } from '@/lib/files-context';
import { StatCard } from '@/components/ui/stat-card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Plus, Folder, CheckCircle, ArrowRight, FileText, Clock, RotateCcw, ChevronRight, Paperclip, Search } from 'lucide-react';
import { File } from '@/types/file';
import { Button } from '@/components/ui/button';
import { getCurrentDateBangla } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

export default function DashboardPage() {
  const { user } = useRequireAuth();
  const { files, getMyFiles, getPendingFiles, updateFile } = useFiles();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) {
    return null;
  }

  const getGreeting = () => {
    const banglaName = user.name.split('(')[0].trim();
    return `স্বাগতম, ${banglaName}! আজ ${getCurrentDateBangla()}`;
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
  
  // Get files requiring attention (pending files)
  const filesRequiringAttention = pendingFiles.slice(0, 5);
  
  // Get recent files (sorted by lastUpdated, descending)
  const recentFiles = [...files]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);

  const handleOpenFile = (file: File) => {
    router.push(`/dashboard/files/${file.id}`);
  };

  const handleUpdateFile = (id: string, updates: Partial<File>) => {
    updateFile(id, updates);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
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
            <div className="flex items-center gap-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search files..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 transition-all"
                />
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
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <StatCard
              title="Total"
              value={totalFiles}
              icon={FileText}
              colorClass="bg-[hsl(var(--color-brand))] text-[hsl(var(--color-brand))]"
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

          {/* Files Section - Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1: Files Requiring Attention */}
            <Card className="bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-800">
                    Files Requiring Attention
                  </CardTitle>
                  <button 
                    onClick={() => router.push('/dashboard/pending')} 
                    className="text-sm font-medium text-[hsl(var(--color-brand))] hover:text-[hsl(var(--color-brand-hover))] flex items-center gap-1"
                  >
                    View All <ArrowRight size={14} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {filesRequiringAttention.length > 0 ? (
                  <div className="space-y-0 divide-y divide-slate-100">
                    {filesRequiringAttention.map((file, index) => (
                      <div
                        key={file.id}
                        onClick={() => handleOpenFile(file)}
                        className="group flex items-center justify-between p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3 overflow-hidden min-w-0 flex-1">
                          <div className="bg-slate-50 p-2 rounded-lg text-slate-400 group-hover:text-[hsl(var(--color-brand))] group-hover:bg-[hsl(var(--color-brand))]/10 transition-colors shrink-0">
                            <FileText size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-slate-900 truncate group-hover:text-[hsl(var(--color-brand-hover))] transition-colors font-bangla">
                              {file.title}
                            </h4>
                            <p className="text-xs text-slate-500 truncate flex items-center gap-2">
                              <span>{file.id}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                              <span>{file.sender}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pl-3 shrink-0">
                          {file.attachments && file.attachments.length > 0 && (
                            <div className="flex items-center gap-1 text-slate-400 group-hover:text-[hsl(var(--color-brand))] transition-colors">
                              <Paperclip size={14} />
                              <span className="text-xs font-medium">{file.attachments.length}</span>
                            </div>
                          )}
                          <StatusBadge status={file.status} />
                          <ChevronRight 
                            size={16} 
                            className="text-slate-300 group-hover:text-[hsl(var(--color-light-sea-green))] group-hover:translate-x-1 transition-all" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
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
              </CardContent>
            </Card>

            {/* Column 2: Recent Files */}
            <Card className="bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-800">
                    Recent Files
                  </CardTitle>
                  <button 
                    onClick={() => router.push('/dashboard/files')} 
                    className="text-sm font-medium text-[hsl(var(--color-brand))] hover:text-[hsl(var(--color-brand-hover))] flex items-center gap-1"
                  >
                    View All <ArrowRight size={14} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {recentFiles.length > 0 ? (
                  <div className="space-y-0 divide-y divide-slate-100">
                    {recentFiles.map((file) => (
                      <div
                        key={file.id}
                        onClick={() => handleOpenFile(file)}
                        className="group flex items-center justify-between p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3 overflow-hidden min-w-0 flex-1">
                          <div className="bg-slate-50 p-2 rounded-lg text-slate-400 group-hover:text-[hsl(var(--color-brand))] group-hover:bg-[hsl(var(--color-brand))]/10 transition-colors shrink-0">
                            <FileText size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-slate-900 truncate group-hover:text-[hsl(var(--color-brand-hover))] transition-colors font-bangla">
                              {file.title}
                            </h4>
                            <p className="text-xs text-slate-500 truncate flex items-center gap-2">
                              <span>{file.id}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                              <span>{file.sender}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pl-3 shrink-0">
                          {file.attachments && file.attachments.length > 0 && (
                            <div className="flex items-center gap-1 text-slate-400 group-hover:text-[hsl(var(--color-brand))] transition-colors">
                              <Paperclip size={14} />
                              <span className="text-xs font-medium">{file.attachments.length}</span>
                            </div>
                          )}
                          <StatusBadge status={file.status} />
                          <ChevronRight 
                            size={16} 
                            className="text-slate-300 group-hover:text-[hsl(var(--color-light-sea-green))] group-hover:translate-x-1 transition-all" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center bg-slate-50/50">
                    <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                      <Folder className="text-slate-300" size={24} />
                    </div>
                    <p className="text-slate-500 text-sm font-medium">
                      No recent files.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

    </div>
  );
}
