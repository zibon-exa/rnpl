'use client';

import { DocumentPaper } from '@/components/document-paper';
import { DocumentHeader } from '@/components/document-header';
import { DocumentContent } from '@/components/document-content';

interface DocumentPreviewProps {
  title?: string;
  category?: string;
  documentBody?: string;
  sender?: string;
  fileId?: string;
  date?: string;
}

/**
 * Document Preview Component
 * Uses centralized document design components for consistency
 */
export function DocumentPreview({ 
  title, 
  category, 
  documentBody, 
  sender,
  fileId,
  date 
}: DocumentPreviewProps) {
  return (
    <div className="flex-1 flex flex-col items-center bg-slate-100 noise-texture overflow-y-auto">
      <DocumentPaper>
        <DocumentHeader fileId={fileId} date={date} />
        <DocumentContent 
          title={title}
          category={category}
          documentBody={documentBody}
          sender={sender}
          showPlaceholders={true}
        />
      </DocumentPaper>
    </div>
  );
}

