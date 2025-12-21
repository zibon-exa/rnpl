'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, ChevronRight, Paperclip, Folder, Grid3x3, List, ChevronDown } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
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
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
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
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.map((file) => (
                  <TableRow 
                    key={file.id} 
                    className="cursor-pointer group"
                    onClick={() => onOpenFile(file)}
                  >
                    <TableCell>
                      <div className="relative overflow-hidden rounded-lg shrink-0" style={{ width: '40px', height: '44px' }}>
                        <Image
                          src="/imgs/thumb_bg.jpg"
                          alt=""
                          fill
                          className="object-cover rounded-lg"
                          priority={false}
                        />
                        <div className="absolute inset-0 flex items-start justify-center overflow-hidden" style={{ paddingTop: '8px', paddingLeft: '8px', paddingRight: '8px' }}>
                          <div 
                            className="relative"
                            style={{ 
                              transform: 'scale(0.035)',
                              transformOrigin: 'top center',
                              width: '794px',
                              height: '1123px',
                              pointerEvents: 'none'
                            }}
                          >
                            <DocumentPreview
                              title={file.title}
                              category={file.category}
                              documentBody={file.documentBody}
                              sender={file.sender}
                              fileId={file.id}
                              date={file.lastUpdated}
                              zoom={1}
                              language="bn"
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 group-hover:text-[hsl(var(--color-brand-hover))] transition-colors font-bangla">
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
                      <span className="text-[10px] text-slate-500 font-bangla px-2 py-0.5 bg-slate-50 rounded-md border border-slate-100">
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

