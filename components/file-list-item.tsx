'use client';

import { FileText, ChevronRight } from 'lucide-react';
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
        <div className="bg-slate-50 p-2.5 rounded-lg text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
          <FileText size={20} />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-700 transition-colors font-bangla">
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
        <StatusBadge status={file.status} />
        <ChevronRight 
          size={16} 
          className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" 
        />
      </div>
    </div>
  );
}

