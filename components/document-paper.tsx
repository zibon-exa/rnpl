'use client';

import { ReactNode } from 'react';

interface DocumentPaperProps {
  children: ReactNode;
}

/**
 * Centralized document paper container
 * Only contains the white paper - background is handled by parent
 * Ensures consistent styling for all document previews
 */
export function DocumentPaper({ children }: DocumentPaperProps) {
  return (
    <div className="bg-white w-full min-h-[1200px] shadow-lg border border-slate-200 p-8 md:p-12 relative mx-auto max-w-2xl z-10">
      {children}
    </div>
  );
}

