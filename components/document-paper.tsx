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
interface DocumentPaperProps {
  children: ReactNode;
  zoom?: number;
}

/**
 * Centralized document paper container
 * A4 dimensions: 210mm x 297mm (8.27" x 11.69")
 * At 96 DPI: 794px x 1123px
 * Uses aspect ratio for responsive scaling
 */
export function DocumentPaper({ children, zoom = 1 }: DocumentPaperProps) {
  // A4 dimensions at 96 DPI
  // Width: 210mm = 794px, Height: 297mm = 1123px
  const baseWidth = 794;
  const baseHeight = 1123;
  
  return (
    <div 
      className="bg-white shadow-lg border border-slate-200 p-8 md:p-12 relative z-10"
      style={{
        width: `${baseWidth}px`,
        minHeight: `${baseHeight}px`,
        transform: `scale(${zoom})`,
        transformOrigin: 'top center',
      }}
    >
      {children}
    </div>
  );
}

