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
import { KpiSparklineCard } from '@/components/kpi-sparkline-card';
import { DepartmentHeatmap } from '@/components/department-heatmap';
import { BlockerList } from '@/components/blocker-list';
import { EfficiencyScatterChart } from '@/components/efficiency-scatter-chart';
import { RiskEscalationTrend } from '@/components/risk-escalation-trend';
import { FileThumbnailItem } from '@/components/file-thumbnail-item';
import {
  kpiData,
  departmentData,
  blockerData,
  efficiencyData,
  riskTrendData,
} from '@/lib/dashboard-data';

export default function DashboardPage() {
  const { user } = useRequireAuth();
  const { files, getMyFiles, getPendingFiles, updateFile } = useFiles();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) {
    return null;
  }

  const getGreeting = () => {
    return `স্বাগতম, ${user.nameBn}! আজ ${getCurrentDateBangla()}`;
  };

  const myFiles = getMyFiles();
  const pendingFiles = getPendingFiles();

  // Calculate statistics
  const pendingCount = pendingFiles.length;
  const approvedFiles = files.filter(f => f.status === 'Approved').length;
  const myFilesCount = myFiles.filter(f => f.sender === user.name).length;
  const returnedFiles = files.filter(f => f.status === 'Returned' && f.sender === user.name).length;

  // Get files requiring attention (pending files)
  const filesRequiringAttention = pendingFiles.slice(0, 5);

  // Get recent files (sorted by lastUpdated, descending)
  const recentFiles = [...files]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);

  const handleOpenFile = (file: File) => {
    router.push(`/files/${file.id}`);
  };

  const handleUpdateFile = (id: string, updates: Partial<File>) => {
    updateFile(id, updates);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <main className="flex-1 flex overflow-hidden">
        {/* Left Pane - Dashboard */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto py-8 px-6">
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Header Section */}
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500 mt-1 font-bangla">
                  {getGreeting()}
                </p>
              </div>

              {/* First Row: Essential Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard
                  title="My Files"
                  value={myFilesCount}
                  icon={Folder}
                  colorClass="bg-blue-500 text-blue-500"
                  onClick={() => router.push('/files')}
                />
                <StatCard
                  title="Pending Files"
                  value={pendingCount}
                  icon={Clock}
                  colorClass="bg-amber-500 text-amber-500"
                  onClick={() => router.push('/pending')}
                />
                <StatCard
                  title="Approved"
                  value={approvedFiles}
                  icon={CheckCircle}
                  colorClass="bg-emerald-500 text-emerald-500"
                />
                <StatCard
                  title="Returned"
                  value={returnedFiles}
                  icon={RotateCcw}
                  colorClass="bg-rose-500 text-rose-500"
                />
              </div>

              {/* Second Row: KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {kpiData.map((kpi, index) => (
                  <KpiSparklineCard key={index} data={kpi} />
                ))}
              </div>

              {/* Charts Row: Heatmap and Blockers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DepartmentHeatmap data={departmentData} />
                <BlockerList data={blockerData} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane - Files Sidebar */}
        <div className="w-[396px] min-w-[396px] border-l border-slate-200 bg-white overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Files Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Files</h2>
              <Button
                onClick={() => router.push('/create')}
                className="text-white bg-[hsl(var(--color-brand))] hover:bg-[hsl(196,60%,50%)] transition-colors"
              >
                <Plus size={18} />
                New
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search Files"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Pending Files Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Pending Files</h3>
                <button
                  onClick={() => router.push('/pending')}
                  className="text-sm font-medium text-[hsl(var(--color-brand))] hover:text-[hsl(var(--color-brand-hover))] flex items-center gap-1"
                >
                  View All
                </button>
              </div>

              {filesRequiringAttention.length > 0 ? (
                <div className="space-y-3">
                  {filesRequiringAttention.map((file) => (
                    <FileThumbnailItem
                      key={file.id}
                      file={file}
                      onClick={handleOpenFile}
                      variant="icon"
                    />
                  ))}
                </div>
              ) : (
                <div className="p-10 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center bg-slate-50/50">
                  <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <Folder className="text-slate-300" size={24} />
                  </div>
                  <p className="text-slate-500 text-sm font-medium">
                    No pending files.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
