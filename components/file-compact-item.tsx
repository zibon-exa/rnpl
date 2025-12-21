'use client';

import Image from 'next/image';
import { DocumentPreview } from '@/components/document-preview';
import { cn } from '@/lib/utils';

interface FileCompactItemProps {
  id: string;
  title: string;
  category: string;
  sender: string;
  status: 'Draft' | 'Pending' | 'In Review' | 'Approved' | 'Returned';
  lastUpdated: string;
  documentBody?: string;
  onClick?: () => void;
  className?: string;
}

export function FileCompactItem({
  id,
  title,
  category,
  sender,
  status,
  lastUpdated,
  documentBody,
  onClick,
  className
}: FileCompactItemProps) {
  const truncateTitle = (title: string, maxLength: number = 35) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 min-w-0 cursor-pointer",
        className
      )}
    >
      {/* File Thumbnail - Using same approach as FileThumbnailItem */}
      <div className="relative shrink-0 overflow-hidden rounded-lg" style={{ width: '40px', height: '40px' }}>
        {/* Background Image */}
        <Image
          src="/imgs/thumb_bg.jpg"
          alt=""
          fill
          className="object-cover rounded-lg"
          priority={false}
        />
        {/* Document Preview Overlay */}
        <div className="absolute inset-0 flex items-start justify-center overflow-hidden" style={{ paddingTop: '6px', paddingLeft: '6px', paddingRight: '6px' }}>
          <div
            className="relative"
            style={{
              transform: 'scale(0.045)',
              transformOrigin: 'top center',
              width: '794px',
              height: '1123px',
              pointerEvents: 'none'
            }}
          >
            <DocumentPreview
              title={title}
              category={category}
              documentBody={documentBody}
              sender={sender}
              fileId={id}
              date={lastUpdated}
              zoom={1}
              language="bn"
            />
          </div>
        </div>
      </div>
      
      {/* File Info - Only title and ref number */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900 truncate">
          {truncateTitle(title)}
        </p>
        <p className="text-xs text-slate-500 font-mono">
          {id}
        </p>
      </div>
    </div>
  );
}