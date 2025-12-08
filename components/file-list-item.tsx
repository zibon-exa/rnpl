'use client';

import { FileText, ChevronRight, Paperclip } from 'lucide-react';
import { File } from '@/types/file';
import { StatusBadge } from '@/components/ui/status-badge';

interface FileListItemProps {
  file: File;
  onClick: (file: File) => void;
}

export function FileListItem({ file, onClick }: FileListItemProps) {
  return (
    <div 
      onClick={() => onClick(file)} 
      className="group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 cursor-pointer transition-all duration-200"
    >
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="bg-slate-50 p-2.5 rounded-lg text-slate-400 group-hover:text-[hsl(var(--color-brand))] group-hover:bg-[hsl(var(--color-brand))]/10 transition-colors">
          <FileText size={20} />
        </div>
        <div className="min-w-0">
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
      <div className="flex items-center gap-4 pl-4 shrink-0">
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
  );
}

