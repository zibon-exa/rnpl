'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronRight, Paperclip } from 'lucide-react';
import { File } from '@/types/file';
import { StatusBadge } from '@/components/ui/status-badge';

interface FileListTableProps {
  files: File[];
  title: string;
  onOpenFile: (file: File) => void;
}

export function FileListTable({ files, title, onOpenFile }: FileListTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const filteredFiles = useMemo(() => {
    return files.filter(f => {
      const matchesSearch = f.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           f.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [files, searchTerm, statusFilter]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search files..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full md:w-64 transition-all"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-600 cursor-pointer"
          >
            <option value="All">All Status</option>
            {['Draft', 'Pending', 'In Review', 'Approved', 'Returned'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              {['File', 'Status', 'Category', 'Last Updated', ''].map((h, i) => (
                <th key={i} className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredFiles.map(file => (
              <tr 
                key={file.id} 
                onClick={() => onOpenFile(file)} 
                className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900 group-hover:text-[hsl(var(--color-brand-hover))] transition-colors font-bangla">
                    {file.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">{file.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={file.status} />
                    {file.attachments && file.attachments.length > 0 && (
                      <div className="flex items-center gap-1 text-slate-400 group-hover:text-[hsl(var(--color-brand))] transition-colors">
                        <Paperclip size={14} />
                        <span className="text-xs font-medium">{file.attachments.length}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-bangla">{file.category}</td>
                <td className="px-6 py-4 text-sm text-slate-500 font-mono">{file.lastUpdated}</td>
                <td className="px-6 py-4 text-right">
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-[hsl(var(--color-brand))] ml-auto" />
                </td>
              </tr>
            ))}
            {filteredFiles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                  No files found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

