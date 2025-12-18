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
  zoom?: number;
  language?: 'bn' | 'en';
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
  date,
  zoom = 1,
  language = 'bn'
}: DocumentPreviewProps) {
  return (
    <div className="flex flex-col items-center bg-slate-100">
      <DocumentPaper zoom={zoom}>
        <DocumentHeader fileId={fileId} date={date} language={language} />
        <DocumentContent 
          title={title}
          category={category}
          documentBody={documentBody}
          sender={sender}
          showPlaceholders={true}
          language={language}
        />
      </DocumentPaper>
    </div>
  );
}

