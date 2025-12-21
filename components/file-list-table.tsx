'use client';

import { matchesSearch } from '@/lib/search-utils';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, ChevronRight, Paperclip, Folder, Grid3x3, List, ChevronDown, FileText, MessageSquare, X } from 'lucide-react';
import { File } from '@/types/file';
import { StatusBadge } from '@/components/ui/status-badge';
import { FileThumbnailItem } from '@/components/file-thumbnail-item';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarPath, getInitials } from '@/lib/avatar-utils';
import { DocumentPreview } from '@/components/document-preview';
import { mockUsers } from '@/lib/mock-users';

interface FileListTableProps {
  files: File[];
  title: string;
  onOpenFile: (file: File) => void;
}

export function FileListTable({ files, title, onOpenFile }: FileListTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const filteredFiles = useMemo(() => {
    return files.filter(f => {
      const isMatch = matchesSearch(f.title, searchTerm) || matchesSearch(f.id, searchTerm);
      const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
      return isMatch && matchesStatus;
    });
  }, [files, searchTerm, statusFilter]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="relative">
        {/* Mobile Search Overlay */}
        {isMobileSearchOpen && (
          <div className="absolute inset-0 z-20 bg-white flex items-center gap-3 p-1 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-1 duration-200">
            <Search className="text-slate-400 ml-3" size={18} />
            <input
              type="text"
              autoFocus
              placeholder="Search files..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-slate-400 h-full"
            />
            <button
              onClick={() => { setIsMobileSearchOpen(false); setSearchTerm(''); }}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${isMobileSearchOpen ? 'opacity-0 md:opacity-100' : ''}`}>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search - Mobile Icon / Desktop Input */}
            <div className="md:hidden shrink-0">
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="flex items-center justify-center w-10 h-10 bg-slate-100/50 border border-slate-200 text-slate-600 rounded-lg active:scale-95 transition-all"
              >
                <Search size={18} />
              </button>
            </div>

            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="flex h-10 w-full md:w-64 rounded-full border border-slate-200 bg-white px-3 py-2 pl-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 focus:bg-white transition-all"
              />
            </div>
            <div className="relative flex-1 md:flex-none">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="appearance-none pl-3 pr-10 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-600 cursor-pointer w-full md:w-48 h-10"
              >
                <option value="All">All Status</option>
                {['Draft', 'Pending', 'In Review', 'Approved', 'Returned'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')} className="shrink-0">
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <Grid3x3 size={16} />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <List size={16} />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>

      {/* Files List */}
      {filteredFiles.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <>
            {/* Mobile List View (Cards) */}
            <div className="md:hidden space-y-3">
              {filteredFiles.map(file => (
                <div
                  key={file.id}
                  onClick={() => onOpenFile(file)}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg shrink-0 text-slate-500">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900 line-clamp-1 text-sm">{file.title}</h3>
                        <p className="text-xs text-slate-500 font-mono">{file.id}</p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={file.status} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-50 pt-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage
                          src={getAvatarPath(file.sender, mockUsers.find(u => u.nameEn === file.sender || u.nameBn === file.sender)?.avatarId)}
                          alt={file.sender}
                        />
                        <AvatarFallback className="text-[9px]">
                          {getInitials(file.sender)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate max-w-[100px]">{file.sender}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {file.attachments && file.attachments.length > 0 && (
                        <div className="flex items-center gap-1 text-slate-400">
                          <Paperclip size={12} />
                          <span>{file.attachments.length}</span>
                        </div>
                      )}
                      {file.comments && file.comments.length > 0 && (
                        <div className="flex items-center gap-1 text-slate-400">
                          <MessageSquare size={12} />
                          <span>{file.comments.length}</span>
                        </div>
                      )}
                      <span className="text-slate-400">{file.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop List View (Table) */}
            <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="w-[80px]">File</TableHead>
                    <TableHead>Title & ID</TableHead>
                    <TableHead>Sender</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Attachments</TableHead>
                    <TableHead className="text-right">Comments</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.map((file) => (
                    <TableRow
                      key={file.id}
                      className="cursor-pointer group hover:bg-slate-50/80 transition-colors border-b border-slate-50"
                      onClick={() => onOpenFile(file)}
                    >
                      <TableCell>
                        <div className="flex items-center justify-center w-10 h-11 bg-slate-100 rounded-lg shrink-0 text-slate-400">
                          <FileText size={20} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 group-hover:text-[hsl(var(--color-brand-hover))] transition-colors">
                            {file.title}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{file.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={getAvatarPath(file.sender, mockUsers.find(u => u.nameEn === file.sender || u.nameBn === file.sender)?.avatarId)}
                              alt={file.sender}
                            />
                            <AvatarFallback className="text-[10px]">
                              {getInitials(file.sender)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-slate-600">{file.sender}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-[10px] text-slate-500 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-100">
                          {file.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-slate-400 font-mono">{file.lastUpdated}</span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={file.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        {file.attachments && file.attachments.length > 0 && (
                          <div className="flex items-center justify-end gap-1 text-slate-400">
                            <Paperclip size={14} />
                            <span className="text-xs font-medium">{file.attachments.length}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {file.comments && file.comments.length > 0 && (
                          <div className="flex items-center justify-end gap-1 text-slate-400">
                            <MessageSquare size={14} />
                            <span className="text-xs font-medium">{file.comments.length}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <ChevronRight
                          size={16}
                          className="text-slate-300 group-hover:text-[hsl(var(--color-brand))] group-hover:translate-x-0.5 transition-all"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
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

