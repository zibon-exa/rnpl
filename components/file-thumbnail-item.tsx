'use client';

import { Paperclip } from 'lucide-react';
import Image from 'next/image';
import { File } from '@/types/file';
import { StatusBadge } from '@/components/ui/status-badge';
import { DocumentPreview } from '@/components/document-preview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarPath, getInitials } from '@/lib/avatar-utils';
import { cn } from '@/lib/utils';

interface FileThumbnailItemProps {
  file: File;
  onClick: (file: File) => void;
  variant?: 'thumbnail' | 'icon' | 'compact';
  showAttachments?: boolean;
  showStatus?: boolean;
  className?: string;
}

export function FileThumbnailItem({ 
  file, 
  onClick, 
  variant = 'thumbnail',
  showAttachments = true,
  showStatus = true,
  className
}: FileThumbnailItemProps) {
  const handleClick = () => {
    onClick(file);
  };

  // Thumbnail variant - shows document preview on top, info below (for grid view)
  if (variant === 'thumbnail') {
    return (
      <div
        onClick={handleClick}
        className={cn(
          "group flex flex-col cursor-pointer transition-all duration-200 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 overflow-hidden",
          className
        )}
      >
        {/* Document Preview - Full width with image background */}
        <div className="relative w-full overflow-hidden rounded-t-lg" style={{ height: '160px' }}>
          {/* Background Image */}
          <Image
            src="/imgs/thumb_bg.jpg"
            alt=""
            fill
            className="object-cover rounded-t-lg"
            priority={false}
          />
          {/* Document Preview Overlay */}
          <div className="absolute inset-0 flex items-start justify-center overflow-hidden" style={{ paddingTop: '24px', paddingLeft: '16px', paddingRight: '16px' }}>
            <div 
              className="relative"
              style={{ 
                transform: 'scale(0.30)',
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
        
        {/* File Info - Below preview */}
        <div className="flex flex-col gap-3 p-4">
          {/* Title - Large, bold */}
          <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-[hsl(var(--color-brand-hover))] transition-colors font-bangla">
            {file.title}
          </h4>
          
          {/* ID and Attachments */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono">{file.id}</span>
            {file.attachments && file.attachments.length > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <div className="flex items-center gap-1">
                  <Paperclip size={14} />
                  <span className="font-medium">{file.attachments.length}</span>
                </div>
              </>
            )}
          </div>
          
          {/* Author and Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={getAvatarPath(file.sender)} alt={file.sender} />
                <AvatarFallback className="bg-slate-200 text-slate-600 text-xs">
                  {getInitials(file.sender)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-slate-500">{file.sender}</span>
            </div>
            {showStatus && <StatusBadge status={file.status} />}
          </div>
        </div>
      </div>
    );
  }

  // Icon variant - shows thumbnail on left, info in middle, status/attachments on right (for list view)
  if (variant === 'icon') {
    return (
      <div
        onClick={handleClick}
        className={cn(
          "group flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 cursor-pointer transition-all duration-200",
          className
        )}
      >
        {/* Document Thumbnail - Left with image background */}
        <div className="relative shrink-0 overflow-hidden rounded-lg" style={{ width: '120px', height: '80px' }}>
          {/* Background Image */}
          <Image
            src="/imgs/thumb_bg.jpg"
            alt=""
            fill
            className="object-cover rounded-lg"
            priority={false}
          />
          {/* Document Preview Overlay */}
          <div className="absolute inset-0 flex items-start justify-center overflow-hidden" style={{ paddingTop: '16px', paddingLeft: '16px', paddingRight: '16px' }}>
            <div 
              className="relative"
              style={{ 
                transform: 'scale(0.18)',
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
        
        {/* File Info - Middle */}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-semibold text-slate-900 truncate group-hover:text-[hsl(var(--color-brand-hover))] transition-colors font-bangla">
            {file.title}
          </h4>
          <div className="text-[10px] text-slate-500 truncate flex items-center gap-2 mt-0.5">
            <span>{file.id}</span>
            {file.attachments && file.attachments.length > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <div className="flex items-center gap-1">
                  <Paperclip size={12} />
                  <span className="font-medium">{file.attachments.length}</span>
                </div>
              </>
            )}
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <div className="flex items-center gap-1.5">
              <Avatar className="h-5 w-5">
                <AvatarImage src={getAvatarPath(file.sender)} alt={file.sender} />
                <AvatarFallback className="bg-slate-200 text-slate-600 text-[10px]">
                  {getInitials(file.sender)}
                </AvatarFallback>
              </Avatar>
              <span>{file.sender}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-slate-500 font-bangla">{file.category}</span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-500 font-mono">{file.lastUpdated}</span>
          </div>
        </div>
        
        {/* Status and Attachments - Right */}
        <div className="flex items-center gap-4 pl-4 shrink-0">
          {showStatus && <StatusBadge status={file.status} />}
        </div>
      </div>
    );
  }

  // Compact variant - minimal info, smaller size
  if (variant === 'compact') {
    return (
      <div
        onClick={handleClick}
        className={cn(
          "group flex items-center gap-2 cursor-pointer transition-all rounded-lg p-2 hover:bg-slate-50",
          className
        )}
      >
        {/* Small Thumbnail */}
        <div className="bg-slate-100 rounded overflow-hidden relative shrink-0" style={{ width: '40px', height: '56px', padding: '4px 4px 0 4px' }}>
          <div 
            className="relative"
            style={{ 
              transform: 'scale(0.04)',
              transformOrigin: 'top left',
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
        
        {/* Compact Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-semibold text-slate-900 truncate group-hover:text-[hsl(var(--color-brand-hover))] transition-colors font-bangla">
            {file.title}
          </h4>
          <p className="text-[10px] text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
            <span>{file.id}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-slate-300"></span>
            <span>{file.sender}</span>
          </p>
        </div>
        {showStatus && (
          <div className="shrink-0">
            <StatusBadge status={file.status} />
          </div>
        )}
      </div>
    );
  }

  return null;
}

