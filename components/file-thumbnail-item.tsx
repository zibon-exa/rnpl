'use client';

import { Paperclip, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { File } from '@/types/file';
import { StatusBadge } from '@/components/ui/status-badge';
import { DocumentPreview } from '@/components/document-preview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarPath, getInitials } from '@/lib/avatar-utils';
import { cn } from '@/lib/utils';
import { mockUsers } from '@/lib/mock-users';

interface FileThumbnailItemProps {
  file: File;
  onClick: (file: File) => void;
  variant?: 'thumbnail' | 'icon' | 'compact' | 'list';
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
          "group flex flex-col h-full cursor-pointer transition-all duration-200 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 overflow-hidden",
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
        <div className="flex flex-col gap-3 p-4 flex-1">
          {/* Title - Large, bold */}
          <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-[hsl(var(--color-brand-hover))] transition-colors">
            {file.title}
          </h4>

          {/* ID and Attachments */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono">{file.id}</span>
            {(file.attachments && file.attachments.length > 0 || file.comments && file.comments.length > 0) && (
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            )}
            {file.attachments && file.attachments.length > 0 && (
              <div className="flex items-center gap-1">
                <Paperclip size={14} />
                <span className="font-medium">{file.attachments.length}</span>
              </div>
            )}
            {file.comments && file.comments.length > 0 && (
              <div className="flex items-center gap-1 ml-1">
                <MessageSquare size={14} />
                <span className="font-medium">{file.comments.length}</span>
              </div>
            )}
          </div>

          {/* Spacer to push author and status to the bottom */}
          <div className="flex-1" />

          {/* Author and Status */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 min-w-0">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage
                  src={getAvatarPath(file.sender, mockUsers.find(u => u.nameEn === file.sender || u.nameBn === file.sender)?.avatarId)}
                  alt={file.sender}
                />
                <AvatarFallback className="bg-slate-200 text-slate-600 text-xs">
                  {getInitials(file.sender)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-slate-500 truncate min-w-0">{file.sender}</span>
            </div>
            {showStatus && <StatusBadge status={file.status} />}
          </div>
        </div>
      </div>
    );
  }

  // Icon variant - shows thumbnail on left, all info stacked vertically on right
  if (variant === 'icon') {
    return (
      <div
        onClick={handleClick}
        className={cn(
          "group flex items-stretch gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 cursor-pointer transition-all duration-200",
          className
        )}
      >
        {/* Document Thumbnail - Left with image background */}
        <div className="relative shrink-0 overflow-hidden rounded-lg self-stretch" style={{ width: '56px' }}>
          {/* Background Image */}
          <Image
            src="/imgs/thumb_bg.jpg"
            alt=""
            fill
            className="object-cover rounded-lg"
            priority={false}
          />
          {/* Document Preview Overlay */}
          <div className="absolute inset-0 flex items-start justify-center overflow-hidden" style={{ paddingTop: '8px', paddingLeft: '8px', paddingRight: '8px' }}>
            <div
              className="relative"
              style={{
                transform: 'scale(0.06)',
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
          {/* Status Dot Overlay */}
          {showStatus && (
            <div className="absolute bottom-0 right-0 z-20">
              <StatusBadge status={file.status} variant="dot" className="w-3 h-3 border-[1.5px]" />
            </div>
          )}
        </div>

        {/* File Info - Vertical Stack */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <h4 className="text-sm font-semibold text-slate-900 truncate group-hover:text-[hsl(var(--color-brand-hover))] transition-colors">
            {file.title}
          </h4>

          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <span className="font-mono">{file.id}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <div className="flex items-center gap-1.5">
              <Avatar className="h-4 w-4">
                <AvatarImage
                  src={getAvatarPath(file.sender, mockUsers.find(u => u.nameEn === file.sender || u.nameBn === file.sender)?.avatarId)}
                  alt={file.sender}
                />
                <AvatarFallback className="text-[8px]">
                  {getInitials(file.sender)}
                </AvatarFallback>
              </Avatar>
              <span>{file.sender}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <span>{file.category}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="font-mono">{file.lastUpdated}</span>
            {file.attachments && file.attachments.length > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <div className="flex items-center gap-1">
                  <Paperclip size={10} />
                  <span>{file.attachments.length}</span>
                </div>
              </>
            )}
            {file.comments && file.comments.length > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <div className="flex items-center gap-1">
                  <MessageSquare size={10} />
                  <span>{file.comments.length}</span>
                </div>
              </>
            )}
          </div>
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
        <div className="relative shrink-0 overflow-hidden rounded-lg" style={{ width: '40px', height: '44px' }}>
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
          {/* Status Dot Overlay */}
          {showStatus && (
            <div className="absolute bottom-0 right-0 z-20">
              <StatusBadge status={file.status} variant="dot" className="w-2.5 h-2.5 border" />
            </div>
          )}
        </div>

        {/* Compact Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-semibold text-slate-900 truncate group-hover:text-[hsl(var(--color-brand-hover))] transition-colors">
            {file.title}
          </h4>
          <p className="text-[10px] text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
            <span>{file.id}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-slate-300"></span>
            <span>{file.sender}</span>
          </p>
        </div>
      </div>
    );
  }

  // List variant - wide distribution for full pages
  if (variant === 'list') {
    return (
      <div
        onClick={handleClick}
        className={cn(
          "group flex items-center gap-6 p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 cursor-pointer transition-all duration-200",
          className
        )}
      >
        {/* Small Thumbnail - 40px wide */}
        <div className="relative shrink-0 overflow-hidden rounded-lg" style={{ width: '40px', height: '44px' }}>
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
          {/* Status Dot Overlay */}
          {showStatus && (
            <div className="absolute bottom-0 right-0 z-20">
              <StatusBadge status={file.status} variant="dot" className="w-2.5 h-2.5 border" />
            </div>
          )}
        </div>

        {/* Title and ID */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-900 truncate group-hover:text-[hsl(var(--color-brand-hover))] transition-colors">
            {file.title}
          </h4>
          <span className="text-[10px] text-slate-500 font-mono">{file.id}</span>
        </div>

        {/* Sender */}
        <div className="w-40 shrink-0 flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={getAvatarPath(file.sender, mockUsers.find(u => u.nameEn === file.sender || u.nameBn === file.sender)?.avatarId)}
              alt={file.sender}
            />
            <AvatarFallback className="text-[10px]">
              {getInitials(file.sender)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-slate-600 truncate">{file.sender}</span>
        </div>

        {/* Category */}
        <div className="w-32 shrink-0">
          <span className="text-[10px] text-slate-500 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-100">
            {file.category}
          </span>
        </div>

        {/* Date */}
        <div className="w-24 shrink-0 text-right">
          <span className="text-xs text-slate-400 font-mono">{file.lastUpdated}</span>
        </div>

        {/* Attachments & Comments */}
        <div className="w-24 shrink-0 flex justify-end gap-3 text-slate-400">
          {file.attachments && file.attachments.length > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip size={14} />
              <span className="text-xs font-medium">{file.attachments.length}</span>
            </div>
          )}
          {file.comments && file.comments.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              <span className="text-xs font-medium">{file.comments.length}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

