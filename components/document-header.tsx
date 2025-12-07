'use client';

import Image from 'next/image';
import { formatFileIdToBangla, formatDateToBangla } from '@/lib/utils';

interface DocumentHeaderProps {
  fileId?: string;
  date?: string;
}

/**
 * Centralized document header component
 * Used in all document previews to ensure consistent design
 */
export function DocumentHeader({ fileId, date }: DocumentHeaderProps) {
  const previewFileId = fileId || 'RNPL-0000';
  const previewDate = date || new Date().toISOString().slice(0, 10);

  return (
    <div className="mb-6 pb-4">
      {/* Logo and Company Names - Horizontal Layout */}
      <div className="flex items-center gap-4 mb-4">
        {/* Logo - Smaller */}
        <div className="shrink-0">
          <Image
            src="/logo.png"
            alt="RNPL Logo"
            width={50}
            height={50}
            className="h-auto w-auto"
            priority
          />
        </div>
        
        {/* Company Names - Left Aligned */}
        <div className="flex-1">
          <p className="text-sm font-bangla font-semibold mb-0" style={{ color: 'hsl(197, 60%, 56%)' }}>
            আরপিসিএল-নরিনকো ইন্টারন্যাশনাল পাওয়ার লিমিটেড
          </p>
          <p className="text-sm font-semibold leading-tight" style={{ color: 'hsl(197, 60%, 56%)' }}>
            RPCL-NORINCO INTL POWER LIMITED
          </p>
        </div>
      </div>
      
      {/* Divider between logo+names and address */}
      <div className="border-t border-slate-200 mb-3"></div>
      
      {/* Corporate Office Section */}
      <div className="text-[10px] text-slate-700 mb-3">
        <div className="flex items-start justify-between">
          <div className="text-left">
            <p>Atlanta Trade Center (Level-7)</p>
            <p>House # 01, Road # 1/A, Sector # 04</p>
            <p>Uttara, Dhaka-1230.</p>
          </div>
          <div className="text-right">
            <p>+88 02 48956157, +88 02 48956158</p>
            <p>rnpled@gmail.com</p>
            <p>www.rnpl.com.bd</p>
          </div>
        </div>
      </div>
      
      {/* Reference and Date */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <div>
          <p className="text-[10px] text-slate-600 font-bangla">স্মারক নং: {formatFileIdToBangla(previewFileId)}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-600 font-bangla">তারিখ: {formatDateToBangla(previewDate)}</p>
        </div>
      </div>
    </div>
  );
}

