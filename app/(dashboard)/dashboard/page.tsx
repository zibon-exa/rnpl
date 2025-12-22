'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { useFiles } from '@/lib/files-context';
import { StatCard } from '@/components/ui/stat-card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Folder, CheckCircle, ArrowRight, FileText, Clock, RotateCcw, ChevronRight, Paperclip, Search, Timer, Zap, Leaf, TrendingUp, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { File } from '@/types/file';
import { Button } from '@/components/ui/button';
import { getCurrentDateBangla } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { KpiSparklineCard } from '@/components/kpi-sparkline-card';
import { DepartmentHeatmap } from '@/components/department-heatmap';
import { BlockerList } from '@/components/blocker-list';
import { DelayedFilesList } from '@/components/delayed-files-list';
import { EfficiencyScatterChart } from '@/components/efficiency-scatter-chart';
import { RiskEscalationTrend } from '@/components/risk-escalation-trend';
import { FileThumbnailItem } from '@/components/file-thumbnail-item';
import {
  kpiData,
  departmentData,
  blockerData,
  delayedFilesData,
  efficiencyData,
  riskTrendData,
} from '@/lib/dashboard-data';
import { matchesSearch } from '@/lib/search-utils';

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

  // Search logic
  const searchResults = searchTerm.trim()
    ? files.filter(f => matchesSearch(f.title, searchTerm) || matchesSearch(f.id, searchTerm))
    : [];

  const displayedFiles = searchTerm.trim() ? searchResults : filesRequiringAttention;
  const sectionTitle = searchTerm.trim() ? 'Search Results' : 'Pending Files';
  const showViewAll = !searchTerm.trim();

  const handleOpenFile = (file: File) => {
    router.push(`/files/${file.id}`);
  };

  const handleUpdateFile = (id: string, updates: Partial<File>) => {
    updateFile(id, updates);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Pane - Dashboard */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="max-w-7xl mx-auto py-6 md:py-8 px-4 md:px-6">
            <div className="space-y-2 md:space-y-4 animate-in fade-in duration-500">
              {/* Header Section */}
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900">My Desk</h1>
                <p className="text-slate-500 mt-1 font-bangla text-sm md:text-base">
                  {getGreeting()}
                </p>
              </div>

              {/* First Row: Essential Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
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
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                {kpiData.map((kpi, index) => (
                  <KpiSparklineCard key={index} data={kpi} />
                ))}
              </div>

              {/* Third Row: Impact Stats (Wide) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
                {/* Man-Hours Saved */}
                <Card className="bg-white border-slate-100 shadow overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1.5 mb-3">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Man-Hours Saved
                      </p>
                      <TooltipProvider>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <Info size={12} className="text-slate-400 hover:text-slate-600 cursor-help transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[200px] text-xs">
                            Estimated operational time saved via automation.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-2xl font-bold text-slate-900 tracking-tight block leading-none">
                          1,245
                        </span>
                        <div className="flex items-center gap-1 mt-1.5">
                          <TrendingUp size={12} className="text-emerald-500" />
                          <p className="text-[10px] font-medium text-emerald-500">
                            +124h <span className="text-slate-400 font-normal ml-0.5">(≈ 52 days)</span>
                          </p>
                        </div>
                      </div>

                      <div className="h-[32px] w-[60px] flex items-end justify-end">
                        <Timer className="h-8 w-8 text-indigo-500 opacity-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Papers Saved */}
                <Card className="bg-white border-slate-100 shadow overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1.5 mb-3">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Papers Saved
                      </p>
                      <TooltipProvider>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <Info size={12} className="text-slate-400 hover:text-slate-600 cursor-help transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[200px] text-xs">
                            Digital pages generated and archived.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-2xl font-bold text-slate-900 tracking-tight block leading-none">
                          15.8k
                        </span>
                        <div className="flex items-center gap-1 mt-1.5">
                          <TrendingUp size={12} className="text-emerald-500" />
                          <p className="text-[10px] font-medium text-emerald-500">
                            ~2 trees saved
                          </p>
                        </div>
                      </div>

                      <div className="h-[32px] w-[60px] flex items-end justify-end">
                        <Leaf className="h-8 w-8 text-emerald-500 opacity-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row: Heatmap and Delayed Files */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
                <DepartmentHeatmap data={departmentData} />
                <DelayedFilesList data={delayedFilesData} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane - Files Sidebar */}
        <div className="w-full lg:w-[396px] lg:min-w-[396px] border-t lg:border-t-0 lg:border-l border-slate-200 bg-white overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search Files"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex h-10 w-full rounded-full border border-slate-200 bg-white px-3 py-2 pl-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 focus:bg-white transition-all"
              />
            </div>

            {/* Pending Files / Search Results Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">{sectionTitle}</h3>
                {showViewAll && (
                  <button
                    onClick={() => router.push('/pending')}
                    className="text-sm font-medium text-[hsl(var(--color-brand))] hover:text-[hsl(var(--color-brand-hover))] flex items-center gap-1"
                  >
                    View All
                  </button>
                )}
              </div>

              {displayedFiles.length > 0 ? (
                <div className="space-y-3">
                  {displayedFiles.map((file) => (
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
                    {searchTerm.trim() ? 'No matching files found.' : 'No pending files.'}
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
