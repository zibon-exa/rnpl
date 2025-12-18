'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronRight, Paperclip, Folder, Grid3x3, List, ChevronDown } from 'lucide-react';
import { File } from '@/types/file';
import { StatusBadge } from '@/components/ui/status-badge';
import { DocumentPreview } from '@/components/document-preview';
import { FileThumbnailItem } from '@/components/file-thumbnail-item';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface FileListTableProps {
  files: File[];
  title: string;
  onOpenFile: (file: File) => void;
}

export function FileListTable({ files, title, onOpenFile }: FileListTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const filteredFiles = useMemo(() => {
    return files.filter(f => {
      const matchesSearch = f.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           f.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [files, searchTerm, statusFilter]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search files..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full md:w-64 transition-all"
            />
          </div>
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-600 cursor-pointer w-full md:w-48"
            >
              <option value="All">All Status</option>
              {['Draft', 'Pending', 'In Review', 'Approved', 'Returned'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid3x3 size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      {/* Files List */}
      {filteredFiles.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredFiles.map(file => (
              <FileThumbnailItem
                key={file.id}
                file={file}
                onClick={onOpenFile}
                variant="thumbnail"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFiles.map(file => (
              <FileThumbnailItem
                key={file.id}
                file={file}
                onClick={onOpenFile}
                variant="icon"
              />
            ))}
          </div>
        )
      ) : (
        <div className="p-10 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center bg-slate-50/50">
          <div className="bg-white p-3 rounded-full shadow-sm mb-3">
            <Folder className="text-slate-300" size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium">
            No files found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}

